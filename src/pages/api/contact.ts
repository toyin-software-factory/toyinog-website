import type { APIRoute } from 'astro';
import { handleContact } from '../../lib/contact/handler';

export const prerender = false;

export const POST: APIRoute = ({ request, locals }) =>
  handleContact(request, locals.runtime.env);
