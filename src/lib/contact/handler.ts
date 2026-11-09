import { contactSchema, readContactForm } from './schema';
import { sendContactEmail, type MailEnv } from './email';
import { verifyTurnstile } from './turnstile';

export interface ContactEnv extends MailEnv {
  TURNSTILE_SECRET_KEY: string;
}

export type ContactError = 'invalid' | 'captcha' | 'send' | 'config';

export interface ContactDeps {
  fetch?: typeof fetch;
  sendEmail?: typeof sendContactEmail;
}

// Generous for a 5000 char message (4 bytes per char) plus the token and multipart overhead.
const MAX_BODY_BYTES = 64 * 1024;

/** Read the body with a hard byte cap; returns null when it is missing or too large. */
async function readBoundedBody(request: Request): Promise<Uint8Array | null> {
  const declared = Number(request.headers.get('content-length'));
  if (declared > MAX_BODY_BYTES || !request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

const STATUS: Record<ContactError, number> = {
  invalid: 400,
  captcha: 403,
  send: 502,
  config: 500,
};

function respond(
  request: Request,
  result: { ok: true } | { ok: false; error: ContactError },
) {
  const wantsJson = (request.headers.get('accept') ?? '')
    .toLowerCase()
    .includes('application/json');
  if (wantsJson) {
    return Response.json(result, {
      status: result.ok ? 200 : STATUS[result.error],
    });
  }
  const location = result.ok
    ? '/contact?sent=1'
    : `/contact?error=${result.error}`;
  // 303 so the browser follows with GET.
  return new Response(null, { status: 303, headers: { location } });
}

/** Never log message contents, tokens or secrets from this function. */
export async function handleContact(
  request: Request,
  env: Partial<ContactEnv>,
  deps: ContactDeps = {},
): Promise<Response> {
  let form: FormData;
  try {
    const body = await readBoundedBody(request);
    if (!body) return respond(request, { ok: false, error: 'invalid' });
    form = await new Response(body.buffer as ArrayBuffer, {
      headers: { 'content-type': request.headers.get('content-type') ?? '' },
    }).formData();
  } catch {
    return respond(request, { ok: false, error: 'invalid' });
  }
  const { fields, honeypot } = readContactForm(form);

  // Bots fill the hidden field: pretend success, send nothing.
  if (honeypot.trim() !== '') return respond(request, { ok: true });

  const parsed = contactSchema.safeParse(fields);
  if (!parsed.success) return respond(request, { ok: false, error: 'invalid' });

  if (
    !env.TURNSTILE_SECRET_KEY ||
    !env.SEND_EMAIL ||
    !env.CONTACT_TO_EMAIL ||
    !env.CONTACT_FROM_EMAIL
  ) {
    return respond(request, { ok: false, error: 'config' });
  }

  const human = await verifyTurnstile(
    env.TURNSTILE_SECRET_KEY,
    parsed.data.turnstileToken,
    request.headers.get('cf-connecting-ip'),
    deps.fetch,
  );
  if (!human) return respond(request, { ok: false, error: 'captcha' });

  try {
    await (deps.sendEmail ?? sendContactEmail)(env as ContactEnv, parsed.data);
  } catch (err) {
    // Error name only: enough to tell failures apart, never message contents or secrets.
    console.error(
      'contact: send failed',
      err instanceof Error ? err.name : 'unknown',
    );
    return respond(request, { ok: false, error: 'send' });
  }
  return respond(request, { ok: true });
}
