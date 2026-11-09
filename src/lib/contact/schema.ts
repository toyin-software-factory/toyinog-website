import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().max(254).pipe(z.email()),
  message: z.string().trim().min(10).max(5000),
  turnstileToken: z.string().min(1).max(2048),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Map the raw form field names onto the schema's keys. Non-string values become undefined. */
export function readContactForm(form: FormData) {
  const str = (key: string) => {
    const value = form.get(key);
    return typeof value === 'string' ? value : undefined;
  };
  return {
    fields: {
      name: str('name'),
      email: str('email'),
      message: str('message'),
      turnstileToken: str('cf-turnstile-response'),
    },
    honeypot: str('website') ?? '',
  };
}
