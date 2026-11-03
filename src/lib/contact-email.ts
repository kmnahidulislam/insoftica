/**
 * Builds the email that a contact-form submission turns into: a plain-text
 * version and a branded HTML version. Table-based with inline styles so it
 * renders the same in Gmail, Outlook, Apple Mail and Zoho.
 */
import { site } from '../data/site';

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  topic?: string;
  message: string;
  receivedAt: Date;
  page?: string;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

const nl2br = (s: string) => escape(s).replace(/\r?\n/g, '<br>');

const formatDate = (d: Date) =>
  d.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/London' }) + ' (London)';

export function buildContactEmail(s: ContactSubmission) {
  const topic = s.topic?.trim() || 'General enquiry';
  const company = s.company?.trim() || '';
  const when = formatDate(s.receivedAt);
  const subject = `[Website] ${topic}: ${s.name}`;
  const replySubject = encodeURIComponent(`Re: your message to ${site.name}`);
  const replyHref = `mailto:${encodeURIComponent(s.email)}?subject=${replySubject}`;

  const text = [
    `New message from the ${site.name} website`,
    '',
    `Name:     ${s.name}`,
    `Email:    ${s.email}`,
    company ? `Company:  ${company}` : null,
    `Topic:    ${topic}`,
    `Received: ${when}`,
    '',
    '--- Message ---',
    s.message,
    '',
    `Reply to this email to answer ${s.name} directly.`,
    `Sent by the contact form at ${site.url.replace(/^https?:\/\//, '')}.`,
  ]
    .filter((l) => l !== null)
    .join('\n');

  const rows: [string, string][] = [
    ['Name', escape(s.name)],
    ['Email', `<a href="mailto:${escape(s.email)}" style="color:#4c4fd6;text-decoration:none">${escape(s.email)}</a>`],
    ...(company ? ([['Company', escape(company)]] as [string, string][]) : []),
    ['Topic', escape(topic)],
    ['Received', escape(when)],
  ];

  const rowHtml = rows
    .map(
      ([k, v], i) => `
        <tr>
          <td style="padding:10px 0;border-top:${i ? '1px solid #ecebe5' : '0'};font:500 11px/1.4 'IBM Plex Mono',Menlo,Consolas,monospace;letter-spacing:.08em;text-transform:uppercase;color:#8d8f9f;width:110px;vertical-align:top">${k}</td>
          <td style="padding:10px 0;border-top:${i ? '1px solid #ecebe5' : '0'};font:500 15px/1.5 'Instrument Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#0b0d1f;vertical-align:top">${v}</td>
        </tr>`
    )
    .join('');

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta name="color-scheme" content="light">
<title>${escape(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#fafaf8;-webkit-font-smoothing:antialiased">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escape(s.name)} wrote via the website about ${escape(topic)}.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafaf8">
  <tr>
    <td align="center" style="padding:32px 16px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">

        <tr>
          <td style="padding:0 4px 18px">
            <span style="font:800 22px/1 'Bricolage Grotesque','Instrument Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;letter-spacing:-.03em;color:#4c4fd6">Insoftica</span>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;border:1px solid #e6e5df;border-radius:16px;padding:28px 28px 24px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:6px;font:500 11px/1.4 'IBM Plex Mono',Menlo,Consolas,monospace;letter-spacing:.1em;text-transform:uppercase;color:#4c4fd6">
                  &#9632;&nbsp; New message from the website
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:18px;font:800 26px/1.15 'Bricolage Grotesque','Instrument Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;letter-spacing:-.025em;color:#0b0d1f">
                  ${escape(s.name)}
                  <span style="display:inline-block;vertical-align:middle;margin-left:8px;padding:4px 10px;border-radius:999px;background:#eef0ff;font:600 12px/1.2 'Instrument Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;letter-spacing:0;color:#4c4fd6">${escape(topic)}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowHtml}</table>
                </td>
              </tr>
              <tr>
                <td style="padding-top:20px">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:#f6f5f0;border-left:3px solid #4c4fd6;border-radius:0 10px 10px 0;padding:16px 18px;font:400 15px/1.65 'Instrument Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#0b0d1f">
                        ${nl2br(s.message)}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding-top:22px">
                  <a href="${replyHref}" style="display:inline-block;background:#4c4fd6;color:#ffffff;text-decoration:none;border-radius:999px;padding:12px 20px;font:600 14px/1 'Instrument Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif">Reply to ${escape(s.name)} &rarr;</a>
                  <span style="display:inline-block;margin-left:12px;font:400 13px/1.4 'Instrument Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#5b5e73">or just reply to this email</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:18px 4px 0;font:400 12px/1.6 'Instrument Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#8d8f9f">
            Sent by the contact form at <a href="${site.url}/contact" style="color:#8d8f9f">${escape(site.url.replace(/^https?:\/\//, ''))}</a>.
            Reply-To is set to the sender, so a normal reply goes straight to them.<br>
            ${escape(site.legalName)}
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
