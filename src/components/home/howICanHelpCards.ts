// src/content/home/howICanHelpCards.ts

export type HelpCard = {
  title: string;
  text: string;
};

export const howICanHelpCards: HelpCard[] = [
  {
    title: 'Processos e Emoções',
    text:
      'Estudo e exploração dos mecanismos do bem-estar emocional e dos padrões de comportamento. ' +
      'Uma análise académica sobre estratégias práticas para enfrentar os desafios ' +
      'do dia a dia e promover o equilíbrio mental em adultos.',
  },
  {
    title: 'Desporto e Performance',
    text:
      'Investigação sobre o impacto do stress e da comunicação no rendimento de equipas e atletas. ' +
      'Foco no estudo da saúde mental em contextos de alta performance, ' +
      'prevenindo o desgaste e otimizando o sucesso coletivo. ' +
      'e promover relações mais saudáveis.',
  },
  {
    title: 'Cérebro e Literacia',
    text:
      'Divulgação de conhecimento científico sobre o funcionamento cerebral. ' +
      'Recursos educativos sobre regulação do sono, gestão do stress e desenvolvimento ' +
      'de competências cognitivas fundamentais para a autoconfiança.',
  },
];
