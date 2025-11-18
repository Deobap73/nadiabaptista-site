// src/components/home/LandingMobile.tsx
'use client';

interface Props {
  onContinue: () => void;
}

export default function LandingMobile({ onContinue }: Props) {
  return (
    <div>
      <h1>Landing Mobile</h1>
      <p>Pequena descrição aqui</p>
      <button onClick={onContinue}>Seja bem vindo</button>
    </div>
  );
}
