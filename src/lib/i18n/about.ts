// src/lib/i18n/about.ts

import type { Lang } from './types';

type AboutCopy = {
  hero: {
    title: string;
    text: string;
    cta: string;
    imageAlt: string;
  };
  motivation: {
    text: string;
  };
  myStorie: {
    title: string;
    topText: string;
    bottomText: string;
    imageTopAlt: string;
    imageBottomAlt: string;
  };
};

export const aboutCopy: Record<Lang, AboutCopy> = {
  pt: {
    hero: {
      title: 'Nádia Baptista',
      text: 'Olá, sou a Nádia e estudo Psicologia. Tenho 18 anos e iniciei este ano a minha formação académica na Universidade Fernando Pessoa, onde estou a realizar a licenciatura em Psicologia.\nCriei este blog para partilhar o meu percurso, as aprendizagens que vou desenvolvendo ao longo da licenciatura e, no futuro, divulgar parte do meu trabalho.',
      cta: 'Mais informações',
      imageAlt:
        'Retrato profissional da Nádia Baptista sentada num sofá, num ambiente calmo e iluminado',
    },
    motivation: {
      text: 'Conhecimento é poder, mas conhecimento sobre si mesmo é auto capacitação',
    },
    myStorie: {
      title: 'UMA TRAJETÓRIA BASEADA\nNO ACREDITAR',
      topText:
        'Alguns dos meus hobbies incluem jogar voleibol, uma atividade que ocupa uma parte importante da minha rotina e que me acompanha há vários anos.\nGosto de ouvir música e de descobrir sítios novos, tanto na minha cidade como fora dela.\nTenho também gosto por viajar e conhecer diferentes locais, apreciar as suas histórias, culturas e gastronomias e observar como cada lugar tem a sua identidade própria.',
      bottomText:
        'Quando concluir a licenciatura, pretendo ingressar num mestrado em Psicologia do Desporto ou em Neuropsicologia, duas áreas que continuo a ponderar.\nA Psicologia do Desporto atrai me de forma particular, porque o desporto sempre fez parte da minha vida.\nComo atleta, reconheço as dificuldades que podem surgir no dia a dia, sobretudo a gestão da pressão, das lesões e de outras exigências que nem sempre recebem o acompanhamento adequado. Gostaria de contribuir para esta área, oferecendo apoio especializado a quem vive estes desafios.',
      imageTopAlt: 'Nádia sentada no chão num ambiente calmo e acolhedor',
      imageBottomAlt: 'Nádia encostada a uma pilha de livros com expressão serena',
    },
  },
  en: {
    hero: {
      title: 'Nadia Baptista',
      text: 'Hi, I am Nadia and I study Psychology. I am 18 and I started my academic path at Universidade Fernando Pessoa, where I am completing a degree in Psychology.\nI created this blog to share my journey, what I learn during my degree, and later to share part of my work.',
      cta: 'More information',
      imageAlt:
        'Professional portrait of Nadia Baptista sitting on a sofa, in a calm and well lit setting',
    },
    motivation: {
      text: 'Knowledge is power, but knowledge about yourself is self empowerment',
    },
    myStorie: {
      title: 'A PATH BUILT\nON BELIEF',
      topText:
        'Some of my hobbies include playing volleyball, an activity that has been a big part of my routine for years.\nI enjoy listening to music and discovering new places, both in my city and beyond.\nI also love travelling and exploring different places, their stories, cultures, and food, and noticing how each place has its own identity.',
      bottomText:
        'After finishing my degree, I plan to start a masters in Sport Psychology or Neuropsychology, two areas I am still considering.\nSport Psychology interests me deeply because sport has always been part of my life.\nAs an athlete, I know the challenges that can show up day to day, especially managing pressure, injuries, and other demands that do not always get the right support. I would like to contribute to this field by offering specialised support to people who face these challenges.',
      imageTopAlt: 'Nadia sitting on the floor in a calm and cosy setting',
      imageBottomAlt: 'Nadia leaning against a stack of books with a calm expression',
    },
  },
};
