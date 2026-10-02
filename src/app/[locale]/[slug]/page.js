import { notFound } from 'next/navigation';
import Image from 'next/image';
import ArticleRenderer from '@/components/ArticleRenderer';
// 1. ADIM: İlerleme çubuğunu import ediyoruz
import ScrollProgress from '@/components/ScrollProgress';

async function getArticle(locale, slug) {
  try {
    const article = await import(`@/content/${locale}/${slug}.json`);
    return article.default;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const article = await getArticle(locale, slug);
  if (!article) return {};

  return {
    title: article.seo.title,
    description: article.seo.description,
  };
}

export default async function ArticlePage({ params }) {
  const { locale, slug } = await params;
  const article = await getArticle(locale, slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* 2. ADIM: TAM BURAYA KOYUYORSUN (React Fragment '<>' içinde en başa) */}
      <ScrollProgress />

      <main className="min-h-screen bg-white py-12">
        <article className="max-w-3xl mx-auto px-4">
          
          {/* HERO/KAPAK ALANI */}
          <header className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              {article.hero.title}
            </h1>
            {article.hero.subtitle && (
              <p className="text-lg text-slate-500">{article.hero.subtitle}</p>
            )}

            {article.hero.coverImage && (
              <div className="relative h-64 sm:h-96 w-full my-6 overflow-hidden rounded-2xl shadow-sm">
                <Image
                  src={article.hero.coverImage}
                  alt={article.hero.imageAlt || article.hero.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}
          </header>

          {/* İÇERİK BLOKLARI MOTORU */}
          <ArticleRenderer blocks={article.blocks} />

        </article>
      </main>
    </>
  );
}