// src/components/studies/StudyProjectCard.tsx

export interface StudyProjectCardProps {
  title: string;
  area: string;
  period?: string;
  description: string;
  context?: string;
}

export default function StudyProjectCard({
  title,
  area,
  period,
  description,
  context,
}: StudyProjectCardProps) {
  return (
    <article className='studyCard'>
      <header className='studyCardHeader'>
        <h3 className='studyCardTitle'>{title}</h3>
        <p className='studyCardArea'>{area}</p>
        {period && <p className='studyCardPeriod'>{period}</p>}
      </header>
      <p className='studyCardDescription'>{description}</p>
      {context && <p className='studyCardContext'>{context}</p>}
    </article>
  );
}
