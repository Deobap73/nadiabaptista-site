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
  myStory: {
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
      // SEO: Enfatizando a formação académica e o objetivo profissional
      text: 'Olá, sou a Nádia e a Psicologia é a minha paixão. Atualmente, realizo a minha licenciatura na Universidade Fernando Pessoa, onde exploro os fundamentos do comportamento humano.\nCriei este espaço digital para partilhar o meu percurso académico, as competências que vou desenvolvendo e, futuramente, divulgar o meu trabalho clínico e de investigação.',
      cta: 'Entrar em contacto',
      imageAlt:
        'Retrato profissional da Nádia Baptista em ambiente clínico iluminado, transmitindo serenidade e confiança',
    },
    motivation: {
      text: '“Conhecimento é poder, mas o autoconhecimento é a verdadeira capacitação.”',
    },
    myStory: {
      title: 'UMA TRAJETÓRIA BASEADA\nNO ACREDITAR',
      topText:
        'Para além da academia, o voleibol é o desporto que moldou a minha disciplina há vários anos.\nSou entusiasta pela descoberta: seja através da música, de novas gastronomias ou de viagens que me permitem observar a identidade única de cada cultura e lugar.',
      // SEO: Palavras-chave como "Mestrado", "Especializado", "Gestão de pressão"
      bottomText:
        'O meu foco futuro reside na Psicologia do Desporto e na Neuropsicologia. Como atleta, compreendo profundamente os desafios da alta performance, como a gestão da pressão e a recuperação de lesões.\nO meu objetivo é oferecer apoio especializado a atletas e indivíduos, integrando o rigor científico com a compreensão da experiência prática.',
      imageTopAlt: 'Nádia Baptista num momento de reflexão num ambiente acolhedor',
      imageBottomAlt: 'Nádia Baptista em ambiente de estudo, reforçando a dedicação académica',
    },
  },
  en: {
    hero: {
      title: 'Nadia Baptista',
      // SEO: Using "Academic journey" and "Clinical work" for better professional indexing
      text: 'Hi, I’m Nadia, a Psychology student dedicated to understanding human behavior. I am currently pursuing my degree at Universidade Fernando Pessoa.\nI created this blog to document my academic journey, share the insights I develop along the way, and eventually showcase my professional clinical and research work.',
      cta: 'Get in touch',
      imageAlt:
        'Professional portrait of Nadia Baptista in a bright, calm setting, conveying trust and professionalism',
    },
    motivation: {
      text: '"Knowledge is power, but self-knowledge is true empowerment."',
    },
    myStory: {
      title: 'A PATH BUILT\nON BELIEF',
      topText:
        'Beyond my studies, volleyball has been a cornerstone of my routine for years, teaching me teamwork and resilience.\nI am passionate about discovery—whether through music, new cuisines, or travel that reveals the unique cultural identity of every place I visit.',
      // SEO: Keywords "Sports Psychology", "Neuropsychology", "Athletic performance"
      bottomText:
        'Upon completing my degree, I intend to specialize in Sports Psychology or Neuropsychology. Having been an athlete myself, I am intimately aware of the psychological demands of sports, from pressure management to injury recovery.\nI aim to contribute to this field by providing specialized support to those navigating these unique challenges.',
      imageTopAlt: 'Nadia Baptista in a calm and inviting setting, reflecting on her path',
      imageBottomAlt:
        'Nadia Baptista in a study environment, leaning against books with a focused expression',
    },
  },
};
