// src/content/home/howICanHelpCards.ts

export type HelpCard = {
  title: string;
  text: string;
};

export const howICanHelpCards: HelpCard[] = [
  {
    title: 'Terapia Individual',
    text:
      'Apoio emocional e acompanhamento psicológico num espaço seguro e confidencial. ' +
      'As sessões destinam se a adultos e focam se na compreensão do bem estar emocional, ' +
      'padrões de comportamento e estratégias práticas para lidar com os desafios do dia a dia.',
  },
  {
    title: 'Consultas no Local de Trabalho',
    text:
      'Apoio especializado para profissionais e equipas que enfrentam desgaste emocional, ' +
      'dificuldades de comunicação ou impacto psicológico relacionado com o ambiente laboral. ' +
      'Estas consultas ajudam a melhorar a saúde mental no trabalho, prevenir burnout ' +
      'e promover relações mais saudáveis.',
  },
  {
    title: 'Cursos de Autoajuda',
    text:
      'Programas orientados para quem procura desenvolver competências pessoais, gerir stress, ' +
      'fortalecer autoestima e promover equilíbrio emocional. ' +
      'Os cursos combinam exercícios práticos, reflexões guiadas e ferramentas simples ' +
      'para aplicar no quotidiano.',
  },
];
