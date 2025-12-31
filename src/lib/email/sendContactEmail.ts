// src/lib/email/sendContactEmail.ts

import { Resend } from 'resend';

type SendContactEmailInput = {
  name: string;
  phone?: string;
  email: string;
  message: string;
  createdAtIso: string;
  messageId: string;
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

export async function sendContactEmail(input: SendContactEmailInput): Promise<ResendSendResult> {
  const provider = getProvider();

  const normalized = provider === 'resende' ? 'resend' : provider;

  if (normalized && normalized !== 'resend') {
    throw new Error(`Unsupported EMAIL_PROVIDER: ${provider}`);
  }

  const apiKey = requireEnv('RESEND_API_KEY');
  const from = requireEnv('MAIL_FROM');
  const to = requireEnv('MAIL_DEFAULT_TO');

  const resend = new Resend(apiKey);

  const safeName = escapeHtml(input.name);
  const safePhone = escapeHtml(input.phone || '');
  const safeEmail = escapeHtml(input.email);
  const safeMessage = escapeHtml(input.message);

  const subject = `Novo contacto: ${input.name}`;

  const text = [
    'Novo pedido de contacto',
    '',
    `Nome: ${input.name}`,
    `Email: ${input.email}`,
    `Telefone: ${input.phone || ''}`,
    `Data: ${input.createdAtIso}`,
    `Id: ${input.messageId}`,
    '',
    'Mensagem:',
    input.message,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5">
      <h2>Novo pedido de contacto</h2>
      <p><strong>Nome:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Telefone:</strong> ${safePhone || '&nbsp;'}</p>
      <p><strong>Data:</strong> ${escapeHtml(input.createdAtIso)}</p>
      <p><strong>Id:</strong> ${escapeHtml(input.messageId)}</p>
      <hr />
      <p><strong>Mensagem:</strong></p>
      <pre style="white-space: pre-wrap; font-family: inherit">${safeMessage}</pre>
    </div>
  `;

  const result = await resend.emails.send({
    from,
    to,
    subject,
    text,
    html,
    replyTo: input.email,
  });

  return result as unknown as ResendSendResult;
}
