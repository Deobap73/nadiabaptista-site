// src/lib/email/sendNewsletterConfirmEmail.ts

import { Resend } from 'resend';

type Input = {
  toEmail: string;
  toName?: string;
  confirmUrl: string;
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

export async function sendNewsletterConfirmEmail(input: Input): Promise<ResendSendResult> {
  const provider = getProvider();
  const normalized = provider === 'resende' ? 'resend' : provider;

  if (normalized && normalized !== 'resend') {
    throw new Error(`Unsupported EMAIL_PROVIDER: ${provider}`);
  }

  const apiKey = requireEnv('RESEND_API_KEY');
  const from = requireEnv('MAIL_FROM');

  const resend = new Resend(apiKey);

  const subject = 'Confirma a tua subscrição';

  const nameLine = input.toName ? `Olá ${input.toName},` : 'Olá,';

  const text = [
    nameLine,
    '',
    'Recebemos o teu pedido para subscrever a newsletter.',
    'Para confirmares, abre este link:',
    input.confirmUrl,
    '',
    'Se não foste tu, podes ignorar este email.',
    '',
    'Cancelar subscrição:',
    input.unsubscribeUrl,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5">
      <p>${escapeHtml(nameLine)}</p>
      <p>Recebemos o teu pedido para subscrever a newsletter.</p>
      <p>
        <a href="${escapeHtml(input.confirmUrl)}">Confirmar subscrição</a>
      </p>
      <p>Se não foste tu, podes ignorar este email.</p>
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
