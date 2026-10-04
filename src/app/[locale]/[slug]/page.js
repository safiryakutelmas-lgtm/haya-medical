import { notFound } from 'next/navigation';
import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';

import ArticleRenderer from '@/components/ArticleRenderer';
import ScrollProgress from '@/components/ScrollProgress';


// Kurşun geçirmez ve akıllı dosya okuma fonksiyonu
async function getArticle(locale, slug) {
  // Sistem iki ihtimale de baksın (src içinde mi, dışında mı?)
  const pathsToTry = [
    path.join(process.cwd(), 'src', 'content', locale, `${slug}.json`),
    path.join(process.cwd(), 'content', locale, `${slug}.json`)
  ];

  let fileContents = null;
  let foundPath = "";

  for (const filePath of pathsToTry) {
    try {
      fileContents = await fs.readFile(filePath, 'utf8');
      foundPath = filePath;
      break; // Dosyayı bulursa döngüden çık
    } catch (e) {
      continue; // Bulamazsa diğer klasör ihtimaline geç
    }
  }

  // İki ihtimalde de bulamazsa nokta atışı hatayı terminale bas
  if (!fileContents) {
    console.log("-----------------------------------------");
    console.log("❌ KRİTİK HATA: JSON DOSYASI BULUNAMADI!");
    console.log(`Gidilen URL: /${locale}/${slug}`);
    console.log("Şu iki adrese bakıldı ama dosya yok:");
    console.log(`1) ${pathsToTry[0]}`);
    console.log(`2) ${pathsToTry[1]}`);
    console.log("-----------------------------------------");
    return null;
  }

  // Dosya başarıyla okundu
  return JSON.parse(fileContents);
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const article = await getArticle(locale, slug);
  
  if (!article) return {};

  return {
    title: article.seo?.title || article.hero?.title,
    description: article.seo?.description,
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

          <ArticleRenderer blocks={article.blocks} />

        </article>
      </main>
    </>
  );
}