// src/app/studies/areas/[slug]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { studiesImages } from '@/lib/images';
import BackButton from '@/components/ui/BackButton';

type AreaContent = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  body: string;
};

const AREAS: Record<string, AreaContent> = {
  'psicologia-do-desporto': {
    title: 'Psicologia do Desporto',
    imageSrc: studiesImages.areasOfInterest_1,
    imageAlt: 'Atleta em contexto desportivo, a representar psicologia do desporto',
    body: 'A Psicologia do Desporto estuda como pensamentos, emoções e comportamento influenciam o rendimento e o bem estar de atletas e equipas. Vai muito além da motivação em dia de jogo. Trabalha a gestão de ansiedade, o foco, a autoconfiança, a rotina de treino e a recuperação após lesão. Também explora comunicação em equipa, liderança, relação com treinadores e a pressão de expectativas, seja no alto rendimento ou no desporto amador. Uma abordagem psicológica ajuda a criar hábitos mentais consistentes, definir objetivos realistas e lidar com falhas sem perder direção. Interessa me especialmente a prevenção de burnout, a identidade do atleta e a transição de carreira, temas muitas vezes invisíveis. Quando o treino mental é integrado no quotidiano, o desempenho tende a tornar se mais estável e o desporto volta a ser também um lugar de prazer. Em contexto académico, este tema permite ligar ciência, prática e ética, respeitando limites e individualidade de cada atleta. É uma área onde o rigor faz a diferença.',
  },
  'psicologia-clinica': {
    title: 'Psicologia Clínica',
    imageSrc: studiesImages.areasOfInterest_2,
    imageAlt: 'Ambiente de consulta, a representar psicologia clínica',
    body: 'A Psicologia Clínica dedica se à compreensão do sofrimento psicológico e à promoção de saúde mental ao longo do ciclo de vida. Analisa como experiências, vínculos, crenças e padrões de coping influenciam emoções e escolhas. Nesta área, o trabalho passa por avaliar dificuldades como ansiedade, depressão, stress, luto, perturbações do sono ou baixa autoestima, e por construir caminhos de mudança com base em evidência científica. Um ponto central é a relação terapêutica, um espaço seguro onde a pessoa pode organizar a sua história e testar novas formas de estar. Interessa me a integração entre escuta, psicoeducação e práticas que promovem autonomia, sem prometer soluções rápidas. A clínica é também prevenção, aprender a reconhecer sinais, pedir ajuda e cuidar de si antes de chegar ao limite. Ao longo do curso, quero aprofundar modelos de intervenção e também a leitura crítica de estudos, para não depender apenas de intuição. E quero aprender a adaptar linguagem e técnicas a cada pessoa. Com calma.',
  },
  neuropsicologia: {
    title: 'Neuropsicologia',
    imageSrc: studiesImages.areasOfInterest_3,
    imageAlt: 'Elementos visuais ligados ao cérebro e cognição, a representar neuropsicologia',
    body: 'A Neuropsicologia estuda a ligação entre o cérebro e o comportamento. Procura perceber como processos como atenção, memória, linguagem, funções executivas e regulação emocional se manifestam no dia a dia, e como podem ser afetados por desenvolvimento, envelhecimento, trauma, doença neurológica ou condições psicológicas. A avaliação neuropsicológica usa testes e entrevista para mapear pontos fortes e dificuldades, ajudando a esclarecer queixas de esquecimento, distração, cansaço mental ou alterações de personalidade. Os resultados servem para orientar intervenção, estratégias de compensação e, quando necessário, encaminhamento para outras especialidades. Interessa me a forma como o contexto, o sono, o stress e a saúde emocional interferem no funcionamento cognitivo. Compreender o cérebro é também compreender a pessoa inteira, não apenas um resultado num teste. No futuro, gostava de aprofundar instrumentos de avaliação e aprender a comunicar conclusões de forma clara, útil e humana. É essa ponte entre dados e vida real que me fascina.',
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function StudiesAreaPage({ params }: PageProps) {
  const { slug } = await params;
  const area = AREAS[slug];

  if (!area) {
    notFound();
  }

  return (
    <section className='studies-area' aria-labelledby='studies-area-heading'>
      <div className='studies-area__container site-container site-container--wide'>
        <header className='studies-area__header'>
          <h1 id='studies-area-heading' className='studies-area__title'>
            {area.title}
          </h1>
        </header>
        <BackButton />
        <div className='studies-area__grid'>
          <div className='studies-area__media'>
            <Image
              src={area.imageSrc}
              alt={area.imageAlt}
              width={980}
              height={640}
              className='studies-area__image'
              sizes='(min-width: 1024px) 980px, 100vw'
              priority
            />
          </div>

          <div className='studies-area__content'>
            <p className='studies-area__text'>{area.body}</p>
          </div>
        </div>
        <BackButton />
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  return [
    { slug: 'psicologia-do-desporto' },
    { slug: 'psicologia-clinica' },
    { slug: 'neuropsicologia' },
  ];
}
