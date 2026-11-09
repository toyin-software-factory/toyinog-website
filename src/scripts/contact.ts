// Progressive enhancement for the contact form: inline validation and status
// without a reload. Without JS the form posts to /api/contact and redirects.

interface Turnstile {
  reset: () => void;
}

const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
const statusEl = document.querySelector<HTMLElement>('[data-form-status]');

if (form && statusEl) {
  const messages: Record<string, string> = JSON.parse(
    form.dataset.messages ?? '{}',
  );
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
  const fields = ['name', 'email', 'message'] as const;

  const show = (kind: 'ok' | 'error', text: string) => {
    statusEl.className = `status ${kind}`;
    statusEl.replaceChildren();
    const glyph = document.createElement('span');
    glyph.setAttribute('aria-hidden', 'true');
    glyph.textContent = kind === 'ok' ? '✓ ' : '! ';
    statusEl.append(glyph, text);
    statusEl.hidden = false;
    statusEl.focus();
  };

  const setFieldError = (name: string, text: string) => {
    const input = form.elements.namedItem(name) as
      HTMLInputElement | HTMLTextAreaElement;
    const error = form.querySelector<HTMLElement>(`#${input.id}-error`);
    if (!error) return;
    error.textContent = text ? `! ${text}` : '';
    error.hidden = !text;
    if (text) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  };

  // Same rules as the server schema (src/lib/contact/schema.ts).
  const validate = (data: FormData) => {
    const value = (key: string) => String(data.get(key) ?? '').trim();
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const problems: Record<(typeof fields)[number], boolean> = {
      name: value('name').length < 1 || value('name').length > 100,
      email:
        value('email').length < 1 ||
        value('email').length > 254 ||
        email.validity.typeMismatch,
      message: value('message').length < 10 || value('message').length > 5000,
    };
    let first: string | null = null;
    for (const name of fields) {
      setFieldError(name, problems[name] ? messages[name] : '');
      if (problems[name] && !first) first = name;
    }
    return first;
  };

  const resetCaptcha = () =>
    (window as unknown as { turnstile?: Turnstile }).turnstile?.reset();

  // A redirect from a plain POST already rendered the status: move focus to it.
  if (statusEl.dataset.initial) statusEl.focus();

  form.noValidate = true;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);

    const firstInvalid = validate(data);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement).focus();
      return;
    }
    if (!data.get('cf-turnstile-response')) {
      show('error', messages.missingCaptcha);
      return;
    }

    if (submit) submit.disabled = true;
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      const result: { ok: boolean; error?: string } = await response
        .json()
        .catch(() => ({ ok: false, error: 'send' }));
      if (result.ok) {
        form.reset();
        show('ok', messages.sent);
      } else {
        show('error', messages[result.error ?? ''] ?? messages.send);
      }
    } catch {
      show('error', messages.network);
    } finally {
      // A Turnstile token is single use.
      resetCaptcha();
      if (submit) submit.disabled = false;
    }
  });
}
