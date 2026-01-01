// src/lib/email/sendNewsletterEventEmail.ts

import { Resend } from 'resend';

type Input = {
  toEmail: string;
  toName?: string;
  title: string;
  url: string;
  unsubscribeUrl: string;
};

type ResendSendResult = {
  id?: string;
  error?: unknown;
};

function requireEnv(name: string): string {
  const v = (process.env[name] || '').trim();
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getProvider(): string {
  return (process.env.EMAIL_PROVIDER || '').trim().toLowerCase();
}

export async function sendNewsletterEventEmail(input: Input): Promise<ResendSendResult> {
  const provider = getProvider();
  const normalized = provider === 'resende' ? 'resend' : provider;

  if (normalized && normalized !== 'resend') {
    throw new Error(`Unsupported EMAIL_PROVIDER: ${provider}`);
  }

  const apiKey = requireEnv('RESEND_API_KEY');
  const from = requireEnv('MAIL_FROM');

  const resend = new Resend(apiKey);

  const subject = `Novo conteúdo: ${input.title}`;

  const greet = input.toName ? `Olá ${input.toName},` : 'Olá,';

  const text = [
    greet,
    '',
    'Há conteúdo novo no site.',
    '',
    input.title,
    input.url,
    '',
    'Cancelar subscrição:',
    input.unsubscribeUrl,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5">
      <p>${escapeHtml(greet)}</p>
      <p>Há conteúdo novo no site.</p>
      <p><strong>${escapeHtml(input.title)}</strong></p>
      <p><a href="${escapeHtml(input.url)}">Abrir conteúdo</a></p>
      <hr />
      <p style="font-size: 12px; opacity: 0.85">
        <a href="${escapeHtml(input.unsubscribeUrl)}">Cancelar subscrição</a>
      </p>
    </div>
  `;

  const result = await resend.emails.send({
    from,
    to: input.toEmail,
    subject,
    text,
    html,
  });

  return result as unknown as ResendSendResult;
}
