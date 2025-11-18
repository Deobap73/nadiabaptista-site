// src/app/studies/page.tsx

import type { Metadata } from 'next';
import StudyProjectCard from '@/components/studies/StudyProjectCard';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Studies · Nadia Baptista · Psychology student in Porto',
    description:
      'Overview of the main study areas, projects and academic interests of Nadia Baptista during her psychology degree in Porto.',
  };
}

export default function StudiesPage() {
  const studyProjects = [
    {
      title: 'Fundamentals of Clinical Psychology',
      area: 'Core course - clinical focus',
      period: 'Ongoing',
      description:
        'Work with basic clinical concepts, such as assessment of symptoms, interview structure and first contact with clinical case studies.',
      context:
        'Useful later for building a safe and structured way of receiving people in a clinical setting.',
    },
    {
      title: 'Young Adult Mental Health',
      area: 'Seminar or optional course',
      period: 'Planned',
      description:
        'Interest in topics such as anxiety, academic pressure and life transitions in young adults.',
      context:
        'Can be the base for future projects, articles and clinical work focused on this age group.',
    },
    {
      title: 'Research Methods in Psychology',
      area: 'Academic research',
      period: 'Ongoing',
      description:
        'Development of basic research skills, from reading scientific articles to planning simple research questions.',
      context:
        'Helps keep practice later connected with scientific evidence and critical thinking.',
    },
  ];

  return (
    <main className='pageContainer'>
      <section className='pageSection' aria-labelledby='studiesTitle'>
        <header className='pageHeader'>
          <p className='pageKicker'>Academic path</p>
          <h1 id='studiesTitle' className='pageTitle'>
            Studies and areas of interest
          </h1>
          <p className='pageIntro'>
            This page presents the areas of psychology that Nadia is most drawn to, along with
            subjects and projects that are part of her path as a student. The goal is to show how
            she is building the base that will later support her clinical work.
          </p>
        </header>

        <section className='pageBlock' aria-labelledby='studyProjectsTitle'>
          <div className='pageBlockHeader'>
            <h2 id='studyProjectsTitle' className='pageBlockTitle'>
              Study projects and key subjects
            </h2>
            <p className='pageBlockText'>
              These examples are only a starting point. Over time, this section can grow with new
              projects, course work, group assignments and research experiences.
            </p>
          </div>

          <div className='cardGrid'>
            {studyProjects.map((item) => (
              <StudyProjectCard
                key={item.title}
                title={item.title}
                area={item.area}
                period={item.period}
                description={item.description}
                context={item.context}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
