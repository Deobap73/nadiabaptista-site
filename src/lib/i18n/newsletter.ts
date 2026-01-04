// src/lib/i18n/newsletter.ts

import type { Lang } from '@/lib/i18n';

type NewsletterDict = {
  toast: {
    invalidEmail: string;
    subscribeFail: string;
    alreadySubscribed: string;
    confirmationSent: string;
  };
  button: {
    sending: string;
  };
};

const PT: NewsletterDict = {
  toast: {
    invalidEmail: 'Escreve um email válido.',
    subscribeFail: 'Falha ao subscrever. Tenta de novo.',
    alreadySubscribed: 'Já estás subscrito.',
    confirmationSent: 'Enviámos um email de confirmação. Verifica a tua caixa de entrada.',
  },
  button: {
    sending: 'A enviar...',
  },
};

const EN: NewsletterDict = {
  toast: {
    invalidEmail: 'Please enter a valid email.',
    subscribeFail: 'Subscription failed. Please try again.',
    alreadySubscribed: 'You are already subscribed.',
    confirmationSent: 'We sent a confirmation email. Please check your inbox.',
  },
  button: {
    sending: 'Sending...',
  },
};

export function getNewsletterDict(lang: Lang): NewsletterDict {
  return lang === 'en' ? EN : PT;
}
