// src/lib/i18n/contact.ts

import type { Lang } from './types';

type ContactDict = {
  hero: {
    title: string;
    textLine1: string;
    textLine2: string;
    textLine3: string;
    imageAlt: string;
  };
  form: {
    ariaSection: string;
    ariaInfo: string;
    ariaSend: string;

    info: {
      emailTitle: string;
      phoneTitle: string;
      addressTitle: string;
      socialTitle: string;
      instagram: string;
      facebook: string;
      linkedin: string;
    };

    placeholders: {
      name: string;
      phone: string;
      email: string;
      message: string;
    };

    button: {
      send: string;
      sending: string;
    };

    feedback: {
      success: string;
      error: string;
    };
  };
};

const PT: ContactDict = {
  hero: {
    title: 'Entre em contacto comigo',
    textLine1: 'Envie mensagem através do',
    textLine2: 'formulário abaixo e retornarei o contacto',
    textLine3: 'logo que possível.',
    imageAlt: 'Retrato profissional em ambiente de trabalho',
  },
  form: {
    ariaSection: 'Formulário de contacto',
    ariaInfo: 'Informações de contacto',
    ariaSend: 'Enviar mensagem',

    info: {
      emailTitle: 'Email',
      phoneTitle: 'Telefone',
      addressTitle: 'Morada',
      socialTitle: 'Social',
      instagram: 'Instagram',
      facebook: 'Facebook',
      linkedin: 'LinkedIn',
    },

    placeholders: {
      name: 'Nome',
      phone: 'Telefone',
      email: 'Email',
      message: 'Mensagem',
    },

    button: {
      send: 'Enviar',
      sending: 'A enviar...',
    },

    feedback: {
      success: 'Mensagem enviada.',
      error: 'Ocorreu um erro. Tente novamente.',
    },
  },
};

const EN: ContactDict = {
  hero: {
    title: 'Get in touch',
    textLine1: 'Send a message using the',
    textLine2: 'form below and I will get back to you',
    textLine3: 'as soon as possible.',
    imageAlt: 'Professional portrait in a work environment',
  },
  form: {
    ariaSection: 'Contact form',
    ariaInfo: 'Contact details',
    ariaSend: 'Send message',

    info: {
      emailTitle: 'Email',
      phoneTitle: 'Phone',
      addressTitle: 'Address',
      socialTitle: 'Social',
      instagram: 'Instagram',
      facebook: 'Facebook',
      linkedin: 'LinkedIn',
    },

    placeholders: {
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      message: 'Message',
    },

    button: {
      send: 'Send',
      sending: 'Sending...',
    },

    feedback: {
      success: 'Message sent.',
      error: 'Something went wrong. Please try again.',
    },
  },
};

export function getContactDict(lang: Lang): ContactDict {
  return lang === 'en' ? EN : PT;
}
