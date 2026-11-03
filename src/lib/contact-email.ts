/**
 * Builds the email that a contact-form submission turns into: a plain-text
 * version and an HTML version in the website's own visual language (canvas
 * background, white cards with hairline borders, mono eyebrows, indigo
 * accents, pill button). Table-based with inline styles so it renders the
 * same in Gmail, Outlook, Apple Mail and Zoho.
 */
import { site, addressLines } from '../data/site';

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  topic?: string;
  message: string;
  receivedAt: Date;
}

/* Design tokens, mirrored from src/styles/global.css */
const T = {
  canvas: '#fafaf8',
  canvas2: '#f2f1ec',
  surface: '#ffffff',
  ink: '#0b0d1f',
  slate: '#5b5e73',
  slateLight: '#8d8f9f',
  line: '#e6e5df',
  lineStrong: '#d9d8d0',
  indigo: '#4c4fd6',
  indigoTint: '#eef0ff',
  signal: '#0f9f7a',
  signalTint: '#e6f6f0',
};
const SANS = "'Instrument Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";
const DISPLAY = "'Bricolage Grotesque','Instrument Sans',-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";
const MONO = "'IBM Plex Mono',SFMono-Regular,Menlo,Consolas,monospace";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

const nl2br = (s: string) => escape(s).replace(/\r?\n/g, '<br>');

const formatDate = (d: Date) =>
  d.toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' });

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

/** Mono eyebrow with the site's square marker. */
const eyebrow = (text: string, color = T.indigo) =>
  `<span style="display:inline-block;width:7px;height:7px;border-radius:2px;background:${color};vertical-align:middle;margin:-2px 8px 0 0"></span><span style="font:500 11px/1 ${MONO};letter-spacing:.12em;text-transform:uppercase;color:${color};vertical-align:middle">${text}</span>`;

/** Small stat chip like the ones in the site's hero facts. */
const chip = (k: string, v: string) => `
  <td style="padding:0 8px 8px 0">
    <table role="presentation" cellpadding="0" cellspacing="0" style="border:1px solid ${T.line};border-radius:12px;background:${T.surface}">
      <tr>
        <td style="padding:10px 14px">
          <div style="font:500 10px/1.2 ${MONO};letter-spacing:.1em;text-transform:uppercase;color:${T.slateLight};padding-bottom:4px">${k}</div>
          <div style="font:600 14px/1.3 ${SANS};letter-spacing:-.01em;color:${T.ink};white-space:nowrap">${v}</div>
        </td>
      </tr>
    </table>
  </td>`;

export function buildContactEmail(s: ContactSubmission) {
  const topic = s.topic?.trim() || 'General enquiry';
  const company = s.company?.trim() || '';
  const when = formatDate(s.receivedAt);
  const subject = `[Website] ${topic}: ${s.name}`;
  const replyHref = `mailto:${encodeURIComponent(s.email)}?subject=${encodeURIComponent(`Re: your message to ${site.name}`)}`;
  const host = site.url.replace(/^https?:\/\//, '');
  const preview = `${s.name}${company ? ` (${company})` : ''} wrote about "${topic}". ${s.message.slice(0, 90).replace(/\s+/g, ' ')}`;

  const text = [
    `NEW MESSAGE FROM THE ${site.name.toUpperCase()} WEBSITE`,
    '',
    `Name:     ${s.name}`,
    `Email:    ${s.email}`,
    company ? `Company:  ${company}` : null,
    `Topic:    ${topic}`,
    `Received: ${when} (London)`,
    '',
    'MESSAGE',
    '-------',
    s.message,
    '',
    `Reply to this email to answer ${s.name} directly.`,
    `Sent by the contact form at ${host}/contact. Passed the form's spam checks.`,
    `${site.legalName}, ${addressLines.join(', ')}`,
  ]
    .filter((l) => l !== null)
    .join('\n');

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escape(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${T.canvas};-webkit-font-smoothing:antialiased;word-break:break-word">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escape(preview)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${T.canvas};background-image:radial-gradient(${T.lineStrong} 1px,transparent 1px);background-size:22px 22px">
  <tr>
    <td align="center" style="padding:36px 16px 40px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px">

        <!-- Header: wordmark + source -->
        <tr>
          <td style="padding:0 2px 20px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle">
                  <a href="${site.url}" style="text-decoration:none">
                    <img src="${site.url}/brand/insoftica-blue.png" width="134" height="24" alt="${escape(site.name)}" style="display:block;border:0;height:24px;width:auto;font:800 22px/1 ${DISPLAY};color:${T.indigo};letter-spacing:-.03em">
                  </a>
                </td>
                <td align="right" style="vertical-align:middle;font:500 11px/1 ${MONO};letter-spacing:.1em;text-transform:uppercase;color:${T.slateLight}">
                  Contact form &nbsp;&middot;&nbsp; ${escape(host)}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Main card -->
        <tr>
          <td style="background:${T.surface};border:1px solid ${T.line};border-radius:18px;box-shadow:0 10px 30px -18px rgba(11,13,31,.18)">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

              <!-- Card head -->
              <tr>
                <td style="padding:28px 30px 22px;border-bottom:1px solid ${T.line}">
                  <div style="padding-bottom:12px">${eyebrow('New message')}</div>
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="vertical-align:middle;padding-right:14px">
                        <div style="width:46px;height:46px;border-radius:12px;background:${T.indigoTint};text-align:center;font:700 16px/46px ${DISPLAY};color:${T.indigo};letter-spacing:.02em">${escape(initials(s.name))}</div>
                      </td>
                      <td style="vertical-align:middle">
                        <div style="font:800 24px/1.15 ${DISPLAY};letter-spacing:-.025em;color:${T.ink}">${escape(s.name)}</div>
                        <div style="padding-top:4px;font:400 14px/1.4 ${SANS};color:${T.slate}">
                          <a href="mailto:${escape(s.email)}" style="color:${T.indigo};text-decoration:none">${escape(s.email)}</a>${company ? ` &nbsp;&middot;&nbsp; ${escape(company)}` : ''}
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Chips -->
              <tr>
                <td style="padding:22px 30px 10px">
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      ${chip('Topic', escape(topic))}
                      ${chip('Received', escape(when))}
                      ${chip('Checks', `<span style="color:${T.signal}">&#10003;</span>&nbsp;Passed`)}
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Message -->
              <tr>
                <td style="padding:12px 30px 28px">
                  <div style="padding-bottom:12px">${eyebrow('Message', T.slateLight)}</div>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:${T.canvas2};border-radius:14px;padding:20px 22px;font:400 16px/1.65 ${SANS};color:${T.ink}">
                        ${nl2br(s.message)}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Actions -->
              <tr>
                <td style="padding:0 30px 30px">
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-right:12px">
                        <a href="${replyHref}" style="display:inline-block;background:${T.indigo};color:#ffffff;text-decoration:none;border-radius:999px;padding:13px 22px;font:600 14px/1 ${SANS};letter-spacing:-.005em">Reply to ${escape(s.name.split(/\s+/)[0] ?? s.name)} &nbsp;&rarr;</a>
                      </td>
                      <td style="font:400 13px/1.4 ${SANS};color:${T.slate}">or simply reply to this email</td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>

        <!-- Promise strip -->
        <tr>
          <td style="padding:14px 2px 0">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${T.signalTint};border-radius:12px">
              <tr>
                <td style="padding:12px 16px;font:500 13px/1.4 ${SANS};color:#0a6b52">
                  The website promises a reply within two working days.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:22px 2px 0;font:400 12px/1.7 ${SANS};color:${T.slateLight}">
            Sent by the contact form at <a href="${site.url}/contact" style="color:${T.slate}">${escape(host)}/contact</a>.
            Reply-To is set to the sender, so a normal reply goes straight to them.<br>
            ${escape(site.legalName)} &nbsp;&middot;&nbsp; ${addressLines.map(escape).join(', ')}
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
