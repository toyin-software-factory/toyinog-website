import type { ContactInput } from './schema';

export interface SendEmailBinding {
  send(message: unknown): Promise<void>;
}

export interface MailEnv {
  SEND_EMAIL: SendEmailBinding;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
}

/** RFC 2047 encode a header value so non-ASCII and CR/LF cannot break the header. */
function encodeHeader(value: string): string {
  const clean = value.replace(/[\r\n]+/g, ' ').trim();
  // eslint-disable-next-line no-control-regex
  if (/^[\x20-\x7e]*$/.test(clean) && !/["\\<>]/.test(clean)) return clean;
  return `=?UTF-8?B?${toBase64(clean)}?=`;
}

function toBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

/** Build the raw MIME message. Body is base64 so message text can never inject headers. */
export function buildMime(env: MailEnv, input: ContactInput): string {
  const body = toBase64(
    `From: ${input.name} <${input.email}>\r\n\r\n${input.message}`,
  ).replace(/(.{76})/g, '$1\r\n');
  const headers = [
    `From: Toyinog.com contact form <${env.CONTACT_FROM_EMAIL}>`,
    `To: ${env.CONTACT_TO_EMAIL}`,
    `Reply-To: ${input.email}`,
    `Subject: ${encodeHeader(`Contact form: ${input.name}`)}`,
    `Message-ID: <${crypto.randomUUID()}@${env.CONTACT_FROM_EMAIL.split('@')[1]}>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ];
  return `${headers.join('\r\n')}\r\n\r\n${body}`;
}

export async function sendContactEmail(
  env: MailEnv,
  input: ContactInput,
): Promise<void> {
  // Only resolvable inside the Workers runtime; aliased to a stub in tests.
  const { EmailMessage } = await import('cloudflare:email');
  const message = new EmailMessage(
    env.CONTACT_FROM_EMAIL,
    env.CONTACT_TO_EMAIL,
    buildMime(env, input),
  );
  await env.SEND_EMAIL.send(message);
}
