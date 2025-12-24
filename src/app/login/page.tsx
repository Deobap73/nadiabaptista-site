// src/app/login/page.tsx

export default function LoginPage() {
  return (
    <main
      className='site-container'
      style={{ paddingTop: 'var(--space-64)', paddingBottom: 'var(--space-72)' }}>
      <h1 style={{ fontFamily: 'var(--fontHeading)', color: 'var(--colorText)' }}>Login</h1>
      <p style={{ marginTop: 'var(--space-12)', maxWidth: 520 }}>
        Esta página vai evoluir mais tarde com autenticação real. Por agora existe para suportar o
        link do menu.
      </p>
    </main>
  );
}
