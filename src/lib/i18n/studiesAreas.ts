// src/lib/i18n/studiesAreas.ts
import type { Lang } from './types';
import type { StudyAreaSlug } from '@/content/studies/areas';

export type StudiesAreaStrings = {
  title: string;
  imageAlt: string;
  body: string;
};

const PT: Record<StudyAreaSlug, StudiesAreaStrings> = {
  'psicologia-do-desporto': {
    title: 'Psicologia do Desporto',
    imageAlt: 'Atleta em contexto desportivo, a representar psicologia do desporto',
    body: 'A Psicologia do Desporto estuda como pensamentos, emoções e comportamento influenciam o rendimento e o bem estar de atletas e equipas. Vai muito além da motivação em dia de jogo. Trabalha a gestão de ansiedade, o foco, a autoconfiança, a rotina de treino e a recuperação após lesão. Também explora comunicação em equipa, liderança, relação com treinadores e a pressão de expectativas, seja no alto rendimento ou no desporto amador. Uma abordagem psicológica ajuda a criar hábitos mentais consistentes, definir objetivos realistas e lidar com falhas sem perder direção. Interessa me especialmente a prevenção de burnout, a identidade do atleta e a transição de carreira, temas muitas vezes invisíveis. Quando o treino mental é integrado no quotidiano, o desempenho tende a tornar se mais estável e o desporto volta a ser também um lugar de prazer. Em contexto académico, este tema permite ligar ciência, prática e ética, respeitando limites e individualidade de cada atleta. É uma área onde o rigor faz a diferença.',
  },
  'psicologia-clinica': {
    title: 'Psicologia Clínica',
    imageAlt: 'Ambiente de consulta, a representar psicologia clínica',
    body: 'A Psicologia Clínica dedica se à compreensão do sofrimento psicológico e à promoção de saúde mental ao longo do ciclo de vida. Analisa como experiências, vínculos, crenças e padrões de coping influenciam emoções e escolhas. Nesta área, o trabalho passa por avaliar dificuldades como ansiedade, depressão, stress, luto, perturbações do sono ou baixa autoestima, e por construir caminhos de mudança com base em evidência científica. Um ponto central é a relação terapêutica, um espaço seguro onde a pessoa pode organizar a sua história e testar novas formas de estar. Interessa me a integração entre escuta, psicoeducação e práticas que promovem autonomia, sem prometer soluções rápidas. A clínica é também prevenção, aprender a reconhecer sinais, pedir ajuda e cuidar de si antes de chegar ao limite. Ao longo do curso, quero aprofundar modelos de intervenção e também a leitura crítica de estudos, para não depender apenas de intuição. E quero aprender a adaptar linguagem e técnicas a cada pessoa. Com calma.',
  },
  neuropsicologia: {
    title: 'Neuropsicologia',
    imageAlt: 'Elementos visuais ligados ao cérebro e cognição, a representar neuropsicologia',
    body: 'A Neuropsicologia estuda a ligação entre o cérebro e o comportamento. Procura perceber como processos como atenção, memória, linguagem, funções executivas e regulação emocional se manifestam no dia a dia, e como podem ser afetados por desenvolvimento, envelhecimento, trauma, doença neurológica ou condições psicológicas. A avaliação neuropsicológica usa testes e entrevista para mapear pontos fortes e dificuldades, ajudando a esclarecer queixas de esquecimento, distração, cansaço mental ou alterações de personalidade. Os resultados servem para orientar intervenção, estratégias de compensação e, quando necessário, encaminhamento para outras especialidades. Interessa me a forma como o contexto, o sono, o stress e a saúde emocional interferem no funcionamento cognitivo. Compreender o cérebro é também compreender a pessoa inteira, não apenas um resultado num teste. No futuro, gostava de aprofundar instrumentos de avaliação e aprender a comunicar conclusões de forma clara, útil e humana. É essa ponte entre dados e vida real que me fascina.',
  },
};

const EN: Record<StudyAreaSlug, StudiesAreaStrings> = {
  'psicologia-do-desporto': {
    title: 'Sport Psychology',
    imageAlt: 'Athlete in a sports context, representing sport psychology',
    body: 'Sport Psychology explores how thoughts, emotions, and behavior influence performance and wellbeing in athletes and teams. It goes far beyond motivation on game day. It includes anxiety management, focus, confidence, training routines, and recovery after injury. It also looks at team communication, leadership, relationships with coaches, and the pressure of expectations, both in elite settings and amateur sports. A psychological approach helps build consistent mental habits, set realistic goals, and handle setbacks without losing direction. I am especially interested in burnout prevention, athlete identity, and career transitions, topics that are often invisible. When mental training becomes part of daily practice, performance tends to become more stable and sport can feel enjoyable again. In an academic context, this area connects science, practice, and ethics, respecting limits and each athlete’s individuality.',
  },
  'psicologia-clinica': {
    title: 'Clinical Psychology',
    imageAlt: 'Therapy room setting, representing clinical psychology',
    body: 'Clinical Psychology focuses on understanding psychological distress and promoting mental health across the lifespan. It considers how experiences, relationships, beliefs, and coping patterns shape emotions and choices. The work often includes assessing difficulties such as anxiety, depression, stress, grief, sleep problems, or low self esteem, and building pathways for change grounded in scientific evidence. A central element is the therapeutic relationship, a safe space where a person can organize their story and try new ways of being. I value the integration of listening, psychoeducation, and practices that support autonomy, without promising quick fixes. Clinical work is also prevention, learning to recognize signals, ask for help, and care for yourself before reaching the limit. During my studies, I want to deepen intervention models and critical reading of research, and learn how to adapt language and techniques to each person. Calmly.',
  },
  neuropsicologia: {
    title: 'Neuropsychology',
    imageAlt: 'Visual elements linked to the brain and cognition, representing neuropsychology',
    body: 'Neuropsychology studies the connection between the brain and behavior. It explores how attention, memory, language, executive functions, and emotional regulation show up in everyday life, and how they can be affected by development, aging, trauma, neurological conditions, or psychological factors. A neuropsychological assessment combines tests and interview to map strengths and difficulties, helping clarify concerns such as forgetfulness, distractibility, mental fatigue, or changes in personality. Results support intervention planning, compensation strategies, and when needed, referral to other specialties. I am interested in how context, sleep, stress, and emotional health influence cognitive functioning. Understanding the brain also means understanding the whole person, not just a test score. In the future, I want to deepen assessment tools and communicate conclusions in a clear, useful, human way. That bridge between data and real life is what fascinates me.',
  },
};

export function getStudiesAreasDict(lang: Lang): Record<StudyAreaSlug, StudiesAreaStrings> {
  return lang === 'en' ? EN : PT;
}
