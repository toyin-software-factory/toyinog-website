import { describe, expect, it, vi } from 'vitest';
import { handleContact, type ContactEnv } from '../../src/lib/contact/handler';

const send = vi.fn(async (_message: unknown) => {});
const env: ContactEnv = {
  TURNSTILE_SECRET_KEY: 'secret',
  CONTACT_TO_EMAIL: 'owner@example.com',
  CONTACT_FROM_EMAIL: 'contact@example.com',
  SEND_EMAIL: { send },
};

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Hello, I would like to work with you.',
  'cf-turnstile-response': 'token',
  website: '',
};

function post(fields: Record<string, string>, accept = 'application/json') {
  const body = new FormData();
  for (const [k, v] of Object.entries(fields)) body.set(k, v);
  return new Request('https://toyinog.com/api/contact', {
    method: 'POST',
    body,
    headers: { accept },
  });
}

const turnstile = (success: boolean) =>
  vi.fn(async () => Response.json({ success })) as unknown as typeof fetch;

describe('POST /api/contact', () => {
  it('sends the email with Reply-To set to the sender on the happy path', async () => {
    send.mockClear();
    const res = await handleContact(post(valid), env, {
      fetch: turnstile(true),
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledOnce();
    const message = send.mock.calls[0][0] as {
      from: string;
      to: string;
      raw: string;
    };
    expect(message.to).toBe('owner@example.com');
    expect(message.raw).toContain('Reply-To: ada@example.com');
  });

  it('redirects plain HTML posts back to /contact?sent=1', async () => {
    const res = await handleContact(post(valid, 'text/html'), env, {
      fetch: turnstile(true),
    });
    expect(res.status).toBe(303);
    expect(res.headers.get('location')).toBe('/contact?sent=1');
  });

  it('rejects invalid input without calling Turnstile or sending', async () => {
    send.mockClear();
    const fetchSpy = turnstile(true);
    const res = await handleContact(post({ ...valid, email: 'nope' }), env, {
      fetch: fetchSpy,
    });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: 'invalid' });
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it('redirects invalid plain HTML posts with ?error=invalid', async () => {
    const res = await handleContact(
      post({ ...valid, name: '' }, 'text/html'),
      env,
    );
    expect(res.headers.get('location')).toBe('/contact?error=invalid');
  });

  it('rejects over-length messages', async () => {
    const res = await handleContact(
      post({ ...valid, message: 'x'.repeat(5001) }),
      env,
    );
    expect(res.status).toBe(400);
  });

  it('rejects when Turnstile verification fails', async () => {
    send.mockClear();
    const res = await handleContact(post(valid), env, {
      fetch: turnstile(false),
    });
    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ ok: false, error: 'captcha' });
    expect(send).not.toHaveBeenCalled();
  });

  it('silently accepts and drops honeypot submissions', async () => {
    send.mockClear();
    const fetchSpy = turnstile(true);
    const res = await handleContact(
      post({ ...valid, website: 'http://spam.example' }),
      env,
      { fetch: fetchSpy },
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });
});
