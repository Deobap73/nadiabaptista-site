// src/lib/email/sendNewsletterEmails.ts

import { Resend } from 'resend';
import { buildPublicUrl } from '@/lib/newsletter/newsletterUrl';
import { signUnsubscribe } from '@/lib/newsletter/newsletterUnsubSignature';

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

function getResend(): Resend {
  const provider = getProvider();
  const normalized = provider === 'resende' ? 'resend' : provider;

  if (normalized && normalized !== 'resend') {
    throw new Error(`Unsupported EMAIL_PROVIDER: ${provider}`);
  }

  const apiKey = requireEnv('RESEND_API_KEY');
  return new Resend(apiKey);
}

export async function sendNewsletterConfirmEmail(input: {
  toEmail: string;
  toName?: string | null;
  confirmUrl: string;
}): Promise<ResendSendResult> {
  const resend = getResend();
  const from = requireEnv('MAIL_FROM');

  const safeName = escapeHtml(input.toName || '');
  const safeUrl = escapeHtml(input.confirmUrl);

  const subject = 'Confirma a tua subscrição na Newsletter';

  const text = [
    'Olá,',
    '',
    'Recebemos um pedido de subscrição na Newsletter.',
    'Para confirmares, abre este link.',
    input.confirmUrl,
    '',
    'Se não fizeste este pedido, ignora este email.',
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6">
      <h2>Confirma a tua subscrição</h2>
      <p>Olá${safeName ? ` ${safeName}` : ''},</p>
      <p>Recebemos um pedido de subscrição na Newsletter.</p>
      <p>
        <a href="${safeUrl}" style="display:inline-block;padding:10px 14px;background:#C5D3D6;color:#0f172a;text-decoration:none;border-radius:10px">
          Confirmar subscrição
        </a>
      </p>
      <p style="font-size: 13px; color: #334155">
        Se não fizeste este pedido, ignora este email.
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

export async function sendNewsletterEventEmail(input: {
  toEmail: string;
  toName?: string | null;
  title: string;
  url: string;
  unsubscribeUrl: string;
}): Promise<ResendSendResult> {
  const resend = getResend();
  const from = requireEnv('MAIL_FROM');

  const safeName = escapeHtml(input.toName || '');
  const safeTitle = escapeHtml(input.title);
  const safeUrl = escapeHtml(input.url);
  const safeUnsub = escapeHtml(input.unsubscribeUrl);

  const subject = `Novo conteúdo: ${input.title}`;

  const text = [
    `Olá${input.toName ? ` ${input.toName}` : ''},`,
    '',
    'Há novo conteúdo publicado no site.',
    input.title,
    input.url,
    '',
    'Para deixar de receber emails, usa este link.',
    input.unsubscribeUrl,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6">
      <p>Olá${safeName ? ` ${safeName}` : ''},</p>
      <p>Há novo conteúdo publicado no site.</p>
      <h3 style="margin: 10px 0">${safeTitle}</h3>
      <p>
        <a href="${safeUrl}" style="display:inline-block;padding:10px 14px;background:#C5D3D6;color:#0f172a;text-decoration:none;border-radius:10px">
          Ler agora
        </a>
      </p>
      <hr />
      <p style="font-size: 13px; color: #334155">
        Se quiseres deixar de receber emails, podes
        <a href="${safeUnsub}"> cancelar aqui</a>.
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

export function buildConfirmUrl(token: string): string {
  return buildPublicUrl(`/api/newsletter/confirm?token=${encodeURIComponent(token)}`);
}

export function buildUnsubscribeUrl(email: string): string {
  const sig = signUnsubscribe(email);
  return buildPublicUrl(
    `/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&sig=${encodeURIComponent(sig)}`
  );
}
