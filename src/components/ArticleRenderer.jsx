import Image from 'next/image';

export default function ArticleRenderer({ blocks }) {
  return (
    <div className="prose prose-slate max-w-none space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          // Başlık Bloğu (H2, H3, H4)
          case 'heading': {
            const Tag = `h${block.level || 2}`;
            return (
              <Tag 
                key={index} 
                className={`font-bold tracking-tight text-slate-900 ${
                  block.level === 3 ? 'text-xl mt-6' : 'text-2xl mt-8 mb-4'
                }`}
              >
                {block.text}
              </Tag>
            );
          }

          // Paragraf Bloğu
          case 'paragraph':
            return (
              <p key={index} className="text-slate-600 leading-relaxed text-base">
                {block.text}
              </p>
            );

          // Görsel Bloğu
          case 'image':
            return (
              <figure key={index} className="my-8 overflow-hidden rounded-2xl bg-slate-100">
                <div className="relative h-72 sm:h-96 w-full">
                  <Image
                    src={block.src}
                    alt={block.alt || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
                {block.caption && (
                  <figcaption className="p-3 text-center text-xs text-slate-500 bg-slate-50 border-t border-slate-100">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          // Liste Bloğu
          case 'list':
            return (
              <ul key={index} className="space-y-2 my-4 list-disc pl-5 text-slate-600">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );

          // Bilgi/Uyarı Kutusu (Callout)
          case 'callout':
            return (
              <div key={index} className="my-6 rounded-xl border-l-4 border-emerald-500 bg-emerald-50/50 p-4 text-sm text-emerald-900">
                {block.text}
              </div>
            );

          // Sıkça Sorulan Sorular (FAQ)
          case 'faq':
            return (
              <div key={index} className="my-10 space-y-4 rounded-2xl bg-slate-50 p-6 border border-slate-200/60">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{block.title}</h3>
                {block.items.map((faq, i) => (
                  <details key={i} className="group rounded-lg bg-white p-4 border border-slate-200/80 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-800">
                      <span>{faq.q}</span>
                      <span className="transition group-open:-rotate-180">↓</span>
                    </summary>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}