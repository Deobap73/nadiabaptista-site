// src\app\about\page.tsx

import AboutMotivationSentence from '@/components/about/AboutMotivationSentence';
import AboutHero from '../../components/about/AboutHero';
import AboutMyStorie from '@/components/about/AboutMyStorie';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMotivationSentence />
      <AboutMyStorie />
    </>
  );
}
