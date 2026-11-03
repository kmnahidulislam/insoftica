/**
 * Builds the email that a contact-form submission turns into: a plain-text
 * version and a simple HTML version. One column, every field labelled, the
 * site's type and colours, nothing decorative. Table-based with inline
 * styles so it renders the same in Gmail, Outlook, Apple Mail and Zoho.
 */
import { site, addressLines } from '../data/site';

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  topic?: string;
  message: string;
  receivedAt: Date;
  /** Visitor IP as seen by the server, for abuse follow-up. */
  ip?: string;
  /** Browser user agent, trimmed. */
  userAgent?: string;
}

const C = {
  canvas: '#fafaf8',
  surface: '#ffffff',
  ink: '#0b0d1f',
  slate: '#5b5e73',
  muted: '#8d8f9f',
  line: '#e6e5df',
  indigo: '#4c4fd6',
};
const SANS = "'Instrument Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";
const DISPLAY = "'Bricolage Grotesque','Instrument Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";
const MONO = "'IBM Plex Mono',SFMono-Regular,Menlo,Consolas,monospace";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

const nl2br = (s: string) => escape(s).replace(/\r?\n/g, '<br>');

const formatDate = (d: Date) =>
  d.toLocaleString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' }) +
  ' (London time)';

export function buildContactEmail(s: ContactSubmission) {
  const topic = s.topic?.trim() || 'Not specified';
  const company = s.company?.trim() || '';
  const when = formatDate(s.receivedAt);
  const host = site.url.replace(/^https?:\/\//, '');
  const subject = `Website enquiry from ${s.name}${company ? `, ${company}` : ''} — ${topic}`;
  const replyHref = `mailto:${encodeURIComponent(s.email)}?subject=${encodeURIComponent(`Re: your message to ${site.name}`)}`;

  // Every field, in the order it should be read.
  const fields: [string, string][] = [
    ['Name', escape(s.name)],
    ['Email', `<a href="mailto:${escape(s.email)}" style="color:${C.indigo};text-decoration:none">${escape(s.email)}</a>`],
    ['Company', company ? escape(company) : `<span style="color:${C.muted}">Not given</span>`],
    ['Topic', escape(topic)],
    ['Received', escape(when)],
    ['Sent from', `<a href="${site.url}/contact" style="color:${C.slate};text-decoration:none">${escape(host)}/contact</a>`],
    ...(s.ip ? ([['IP address', escape(s.ip)]] as [string, string][]) : []),
    ...(s.userAgent ? ([['Browser', escape(s.userAgent)]] as [string, string][]) : []),
  ];

  const text = [
    `New enquiry from the ${site.name} website`,
    '',
    `Name:       ${s.name}`,
    `Email:      ${s.email}`,
    `Company:    ${company || 'Not given'}`,
    `Topic:      ${topic}`,
    `Received:   ${when}`,
    `Sent from:  ${host}/contact`,
    s.ip ? `IP address: ${s.ip}` : null,
    s.userAgent ? `Browser:    ${s.userAgent}` : null,
    '',
    'Message',
    '',
    s.message,
    '',
    `Reply to this email to answer ${s.name} directly.`,
    '',
    `${site.legalName}, ${addressLines.join(', ')}`,
  ]
    .filter((l) => l !== null)
    .join('\n');

  const rows = fields
    .map(
      ([k, v]) => `
          <tr>
            <td style="padding:9px 24px 9px 0;border-bottom:1px solid ${C.line};font:400 14px/1.5 ${SANS};color:${C.muted};white-space:nowrap;vertical-align:top;width:1%">${k}</td>
            <td style="padding:9px 0;border-bottom:1px solid ${C.line};font:400 15px/1.5 ${SANS};color:${C.ink};vertical-align:top">${v}</td>
          </tr>`
    )
    .join('');

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escape(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${C.canvas};-webkit-font-smoothing:antialiased;word-break:break-word">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escape(s.message.slice(0, 120).replace(/\s+/g, ' '))}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.canvas}">
  <tr>
    <td align="center" style="padding:40px 16px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.surface};border:1px solid ${C.line};border-radius:12px">
        <tr>
          <td style="padding:36px 40px 40px">

            <a href="${site.url}" style="text-decoration:none">
              <img src="${site.url}/brand/insoftica-blue.png" width="118" height="21" alt="${escape(site.name)}" style="display:block;border:0;height:21px;width:auto;font:800 20px/1 ${DISPLAY};color:${C.indigo}">
            </a>

            <h1 style="margin:28px 0 6px;font:700 22px/1.3 ${DISPLAY};letter-spacing:-.02em;color:${C.ink}">New enquiry from the website</h1>
            <p style="margin:0 0 26px;font:400 15px/1.6 ${SANS};color:${C.slate}">Someone filled in the contact form at ${escape(host)}. Their details and message are below. Reply to this email and it goes to them.</p>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.line}">${rows}
            </table>

            <p style="margin:28px 0 10px;font:500 11px/1 ${MONO};letter-spacing:.1em;text-transform:uppercase;color:${C.muted}">Message</p>
            <p style="margin:0;font:400 16px/1.65 ${SANS};color:${C.ink}">${nl2br(s.message)}</p>

            <p style="margin:32px 0 0">
              <a href="${replyHref}" style="display:inline-block;background:${C.indigo};color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 18px;font:600 14px/1 ${SANS}">Reply to ${escape(s.name)}</a>
            </p>

          </td>
        </tr>
      </table>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
        <tr>
          <td style="padding:20px 8px 0;font:400 12px/1.7 ${SANS};color:${C.muted}">
            This message was sent to you by the contact form on ${escape(host)}. The form checks for spam before sending; if this still looks like spam, delete it.<br>
            ${escape(site.legalName)}, ${addressLines.map(escape).join(', ')}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  return { subject, text, html };
}
