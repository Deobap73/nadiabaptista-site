// src/lib/i18n/home.ts

import type { Lang } from './types';

type HomeHowHelpCard = {
  title: string;
  text: string;
};

type HomeQuickLinkKey = 'portfolio' | 'studies' | 'blog';

type HomeDict = {
  hero: {
    imageAltDesktop: string;
    imageAltMobile: string;
    namePrefix: string;
    heading: string;
    description: string;
  };
  landingMobile: {
    titleFirst: string;
    titleSecond: string;
    intro: string;
    imageAlt: string;
    cta: string;
  };
  aboutHighlight: {
    imageAlt: string;
    title: string;
    text: string;
    button: string;
  };
  howHelp: {
    title: string;
    intro: string;
    cards: HomeHowHelpCard[];
  };
  quickLinks: {
    title: string;
    explore: string;
    items: Record<
      HomeQuickLinkKey,
      {
        label: string;
        alt: string;
      }
    >;
  };
  newsletter: {
    heading: string;
    description: string;
    buttonLabel: string;
    placeholders: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
};

const PT: HomeDict = {
  hero: {
    imageAltDesktop: 'Retrato da psicóloga Nádia Baptista num consultório acolhedor',
    imageAltMobile: 'Retrato da psicóloga Nádia Baptista em ambiente acolhedor',
    namePrefix: 'Nádia',
    heading: 'Baptista',
    description:
      'Encontre o espaço seguro para se ouvir. Juntos, criaremos o caminho para a sua maior clareza mental.',
  },
  landingMobile: {
    titleFirst: 'Nádia',
    titleSecond: 'Baptista',
    intro:
      'Encontre o espaço seguro para se ouvir. Juntos, criaremos o caminho para a sua maior clareza mental.',
    imageAlt: 'Retrato da psicóloga Nádia Baptista',
    cta: 'Seja bem vindo',
  },
  aboutHighlight: {
    imageAlt: 'Retrato profissional da psicóloga Nádia Baptista',
    title: 'Nádia Baptista',
    text: 'Defendo uma abordagem à Psicologia que alia o rigor científico da Neuropsicologia à dinâmica do Desporto. O meu foco enquanto estudante é compreender como podemos otimizar processos cognitivos para encontrar soluções práticas e eficazes. Acredito na partilha de ferramentas que capacitem o indivíduo a lidar com desafios de forma autónoma, olhando para as experiências passadas como aprendizagem para potenciar o rendimento futuro.',
    button: 'Mais informações',
  },
  howHelp: {
    title: 'MENTE, CÉREBRO E PERFORMANCE',
    intro:
      'O equilíbrio entre o rendimento desportivo e a saúde cognitiva é a chave para o sucesso. Enquanto finalizo o meu percurso na Universidade Fernando Pessoa, exploro como a Neuropsicologia e a Psicologia do Desporto se cruzam para otimizar o foco, a gestão do stress e a resiliência emocional. Descubra a ciência por trás de uma mente de elite.',
    cards: [
      {
        title: 'Processos e Emoções',
        text: 'Estudo e exploração dos mecanismos do bem estar emocional e dos padrões de comportamento. Uma análise académica sobre estratégias práticas para enfrentar os desafios do dia a dia e promover o equilíbrio mental em adultos.',
      },
      {
        title: 'Desporto e Performance',
        text: 'Investigação sobre o impacto do stress e da comunicação no rendimento de equipas e atletas. Foco no estudo da saúde mental em contextos de alta performance, prevenindo o desgaste e otimizando o sucesso coletivo.',
      },
      {
        title: 'Cérebro e Literacia',
        text: 'Divulgação de conhecimento científico sobre o funcionamento cerebral. Recursos educativos sobre regulação do sono, gestão do stress e desenvolvimento de competências cognitivas fundamentais para a autoconfiança.',
      },
    ],
  },
  quickLinks: {
    title: 'Recursos úteis',
    explore: 'EXPLORE',
    items: {
      portfolio: {
        label: 'Portfolio',
        alt: 'Retrato profissional da psicóloga, em preto e branco',
      },
      studies: {
        label: 'Studies',
        alt: 'Psicóloga sentada à secretária com documentos de estudo',
      },
      blog: {
        label: 'Blog',
        alt: 'Psicóloga a sorrir enquanto escreve no portátil',
      },
    },
  },
  newsletter: {
    heading: 'Nutra a Sua Mente',
    description:
      'Receba insights exclusivos e ferramentas práticas para o seu bem estar diretamente da futura Psicóloga Nádia. Sem ruído, apenas conteúdo valioso.',
    buttonLabel: 'Subscreve (Newsletter)',
    placeholders: {
      firstName: 'Primeiro Nome',
      lastName: 'Último Nome',
      email: 'Email',
    },
  },
};

const EN: HomeDict = {
  hero: {
    imageAltDesktop: 'Portrait of Nadia Baptista in a warm office setting',
    imageAltMobile: 'Portrait of Nadia Baptista in a warm environment',
    namePrefix: 'Nadia',
    heading: 'Baptista',
    description:
      'Find a safe space to listen to yourself. Together, we will build a path to greater mental clarity.',
  },
  landingMobile: {
    titleFirst: 'Nadia',
    titleSecond: 'Baptista',
    intro:
      'Find a safe space to listen to yourself. Together, we will build a path to greater mental clarity.',
    imageAlt: 'Portrait of Nadia Baptista',
    cta: 'Welcome',
  },
  aboutHighlight: {
    imageAlt: 'Professional portrait of Nadia Baptista',
    title: 'Nadia Baptista',
    text: 'I support an approach to Psychology that combines the scientific rigor of Neuropsychology with the dynamics of Sport. As a student, my focus is to understand how we can optimize cognitive processes to find practical and effective solutions. I believe in sharing tools that help people face challenges with autonomy, using past experiences as learning to support future performance.',
    button: 'Learn more',
  },
  howHelp: {
    title: 'MIND, BRAIN AND PERFORMANCE',
    intro:
      'Balancing sports performance and cognitive wellbeing is essential. While I complete my studies at Universidade Fernando Pessoa, I explore how Neuropsychology and Sport Psychology connect to improve focus, stress management and emotional resilience. Discover the science behind an elite mind.',
    cards: [
      {
        title: 'Processes and Emotions',
        text: 'Study and exploration of emotional wellbeing mechanisms and behavior patterns. An academic view on practical strategies to face daily challenges and support mental balance in adults.',
      },
      {
        title: 'Sport and Performance',
        text: 'Research on the impact of stress and communication on teams and athletes. Focused on mental health in high performance contexts, preventing burnout and supporting collective success.',
      },
      {
        title: 'Brain and Literacy',
        text: 'Sharing scientific knowledge about brain function. Educational resources on sleep regulation, stress management and cognitive skills that support confidence.',
      },
    ],
  },
  quickLinks: {
    title: 'Useful resources',
    explore: 'EXPLORE',
    items: {
      portfolio: {
        label: 'Portfolio',
        alt: 'Professional portrait in black and white',
      },
      studies: {
        label: 'Studies',
        alt: 'Student at a desk with study documents',
      },
      blog: {
        label: 'Blog',
        alt: 'Writing on a laptop with a smile',
      },
    },
  },
  newsletter: {
    heading: 'Feed your mind',
    description:
      'Receive exclusive insights and practical tools for wellbeing from Nadia. No noise, only useful content.',
    buttonLabel: 'Subscribe (Newsletter)',
    placeholders: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
    },
  },
};

export function getHomeDict(lang: Lang): HomeDict {
  return lang === 'en' ? EN : PT;
}
