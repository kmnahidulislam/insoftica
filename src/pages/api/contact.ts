/**
 * Contact form endpoint. Receives the form, checks it, and sends it on as an
 * email through plain SMTP, so any provider works: change the SMTP_* values
 * in the environment and nothing in the code changes. Credentials come from
 * environment variables only (see .env.example) and are never rendered into
 * the static pages. Runs on Cloudflare Workers via worker-mailer.
 */
import type { APIRoute } from 'astro';
import { WorkerMailer } from 'worker-mailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } from 'astro:env/server';
import { site } from '../../data/site';
import { buildContactEmail } from '../../lib/contact-email';

export const prerender = false;

const MAX = { name: 120, email: 200, company: 160, topic: 80, message: 5000 };
const WINDOW_MS = 10 * 60 * 1000;
const PER_WINDOW = 5;
const recent = new Map<string, number[]>();

const tooMany = (ip: string) => {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > PER_WINDOW;
};

const clean = (value: FormDataEntryValue | null, max: number) =>
  String(value ?? '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
    .trim()
    .slice(0, max);

const respond = (request: Request, ok: boolean, message: string, status: number) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  if (wantsJson) return new Response(JSON.stringify({ ok, message }), { status, headers: { 'content-type': 'application/json' } });
  // Plain HTML form submission (no JavaScript): bounce back to the page.
  return new Response(null, { status: 303, headers: { location: `/contact?${ok ? 'sent=1' : 'error=1'}#contact-form` } });
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return respond(request, false, 'Could not read the form.', 400);
  }

  // Honeypot: real visitors never see this field.
  if (clean(data.get('website'), 50)) return respond(request, true, 'Thanks.', 200);

  let ip = 'unknown';
  try {
    ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || clientAddress;
  } catch {
    /* clientAddress is unavailable in some environments */
  }
  if (tooMany(ip)) return respond(request, false, 'Too many messages in a short time. Please try again later.', 429);

  const name = clean(data.get('name'), MAX.name);
  const email = clean(data.get('email'), MAX.email);
  const company = clean(data.get('company'), MAX.company);
  const topic = clean(data.get('topic'), MAX.topic);
  const message = clean(data.get('message'), MAX.message);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return respond(request, false, 'Please fill in your name, a valid email address and a message.', 422);
  }

  const host = SMTP_HOST;
  const user = SMTP_USER;
  const pass = SMTP_PASS;
  const port = SMTP_PORT ?? 587;
  const to = CONTACT_TO || site.email;
  const from = CONTACT_FROM || user;

  if (!host || !user || !pass) {
    console.error('[contact] SMTP_HOST, SMTP_USER and SMTP_PASS must be set');
    return respond(request, false, 'The contact form is not configured yet.', 500);
  }

  const mail = buildContactEmail({ name, email, company, topic, message, receivedAt: new Date() });

  try {
    await WorkerMailer.send(
      {
        host,
        port,
        // 465 is implicit TLS; 587 and 2525 start plain and upgrade with STARTTLS.
        secure: port === 465,
        startTls: port !== 465,
        credentials: { username: user, password: pass },
        authType: ['plain', 'login'],
        socketTimeoutMs: 15000,
        responseTimeoutMs: 15000,
      },
      {
        from: { name: `${site.name} website`, email: from },
        to: { email: to },
        reply: { name: name.replace(/"/g, ''), email },
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      }
    );
  } catch (err) {
    console.error('[contact] send failed:', err instanceof Error ? err.message : err);
    return respond(request, false, 'Sending failed. Please email us directly.', 502);
  }

  return respond(request, true, 'Thanks. Your message has been sent and we will reply by email.', 200);
};

export const GET: APIRoute = () => new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
