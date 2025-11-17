// src/app/blog/[slug]/page.tsx

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <main>
      <section>
        <h1>Artigo do blog</h1>
        <p>
          Este é um espaço reservado para o artigo com o identificador{' '}
          <strong>{params.slug}</strong>. Na fase seguinte vamos ligar este conteúdo a dados reais,
          mesmo que seja apenas mock data.
        </p>
      </section>
    </main>
  );
}
