// src/lib/i18n/auth.ts

import type { Lang } from './types';

type AuthDict = {
  modal: {
    ariaLabel: string;
    close: string;
  };
  headline: string;
  subheadline: string;
  divider: string;
  labels: {
    email: string;
    password: string;
  };
  placeholders: {
    email: string;
    password: string;
  };
  errors: {
    invalid: string;
    unexpected: string;
  };
  loading: string;
  submit: string;
  footer: {
    noAccount: string;
    create: string;
  };
};

const PT: AuthDict = {
  modal: {
    ariaLabel: 'Login',
    close: 'Fechar',
  },
  headline: 'Seja bem vindo de volta',
  subheadline: 'Faça login com',
  divider: 'Ou...',
  labels: {
    email: 'Email',
    password: 'Password',
  },
  placeholders: {
    email: 'Email',
    password: 'Password',
  },
  errors: {
    invalid: 'Login inválido. Confirma email e password.',
    unexpected: 'Erro inesperado. Tenta novamente.',
  },
  loading: 'A entrar...',
  submit: 'LOG IN',
  footer: {
    noAccount: 'Não tem conta?',
    create: 'Crie conta aqui',
  },
};

const EN: AuthDict = {
  modal: {
    ariaLabel: 'Login',
    close: 'Close',
  },
  headline: 'Welcome back',
  subheadline: 'Sign in with',
  divider: 'Or...',
  labels: {
    email: 'Email',
    password: 'Password',
  },
  placeholders: {
    email: 'Email',
    password: 'Password',
  },
  errors: {
    invalid: 'Invalid login. Check email and password.',
    unexpected: 'Unexpected error. Try again.',
  },
  loading: 'Signing in...',
  submit: 'LOG IN',
  footer: {
    noAccount: 'No account?',
    create: 'Create one here',
  },
};

export function getAuthDict(lang: Lang): AuthDict {
  return lang === 'en' ? EN : PT;
}
