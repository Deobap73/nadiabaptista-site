// src/components/home/LandingMobile.tsx
'use client';

interface Props {
  onContinue: () => void;
}

export default function LandingMobile({ onContinue }: Props) {
  return (
    <main className='landingMobile' aria-labelledby='landingMobileTitle'>
      <div className='landingMobileInner'>
        <div className='landingMobileLogo'>Nadia Baptista</div>

        <div className='landingMobilePortrait' aria-hidden='true'>
          N
        </div>

        <h1 id='landingMobileTitle' className='landingMobileName'>
          Nadia Baptista
        </h1>

        <p className='landingMobileRole'>Psicologa em Porto</p>

        <p className='landingMobileIntro'>
          Consultas de psicologia para jovens adultos e adultos que atravessam momentos de
          ansiedade, mudanca ou sobrecarga emocional. Um espaco calmo, seguro e confidencial onde
          pode falar com tempo sobre o que esta a viver.
        </p>

        <button type='button' className='landingMobileButton' onClick={onContinue}>
          Seja bem vindo
        </button>
      </div>
    </main>
  );
}
