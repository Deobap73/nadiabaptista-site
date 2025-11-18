// src/app/portfolio/page.tsx

import PortfolioItemCard from '@/components/portfolio/PortfolioItemCard';

export default function PortfolioPage() {
  const portfolioItems = [
    {
      title: 'Psychology degree in Porto',
      type: 'Academic training',
      period: 'In progress',
      description:
        'Nadia is completing her degree in psychology in Porto. During this time she is exploring different areas and building a solid base in theory and practice.',
      highlight:
        'Later this card can be updated with the exact institution, year of conclusion and key modules.',
    },
    {
      title: 'Soft skills and human contact',
      type: 'Personal and relational skills',
      period: '',
      description:
        'Listening with attention, observing with care and keeping an honest and simple communication style are central values for Nadia.',
      highlight:
        'These skills will be important in any future clinical role and can be illustrated with concrete experiences over time.',
    },
    {
      title: 'Projects, volunteering and activities',
      type: 'Practical experiences',
      period: '',
      description:
        'This space will later gather internships, volunteering and other activities where Nadia applies what she learns in real contexts.',
      highlight:
        'For now, it is a placeholder that signals the intention to link study and practice in a responsible way.',
    },
  ];

  return (
    <main className='pageContainer'>
      <section className='pageSection' aria-labelledby='portfolioTitle'>
        <header className='pageHeader'>
          <p className='pageKicker'>Professional profile in progress</p>
          <h1 id='portfolioTitle' className='pageTitle'>
            Portfolio and path of Nadia Baptista
          </h1>
          <p className='pageIntro'>
            This page offers a clear view of Nadia as a future psychologist. It gathers her academic
            path, key skills and experiences that show how she is preparing for clinical practice.
          </p>
        </header>

        <section className='pageBlock' aria-labelledby='portfolioItemsTitle'>
          <div className='pageBlockHeader'>
            <h2 id='portfolioItemsTitle' className='pageBlockTitle'>
              Main elements of the portfolio
            </h2>
            <p className='pageBlockText'>
              Each card below represents a part of the path. In the future this area can include
              more detailed entries with dates, roles and links.
            </p>
          </div>

          <div className='cardGrid'>
            {portfolioItems.map((item) => (
              <PortfolioItemCard
                key={item.title}
                title={item.title}
                type={item.type}
                period={item.period}
                description={item.description}
                highlight={item.highlight}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
