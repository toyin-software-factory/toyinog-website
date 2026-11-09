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
  const wantsJson = (request.headers.get('accept') ?? '').includes(
    'application/json',
  );
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
    form = await request.formData();
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
  } catch {
    return respond(request, { ok: false, error: 'send' });
  }
  return respond(request, { ok: true });
}
