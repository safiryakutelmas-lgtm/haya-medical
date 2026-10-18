import { getAllCases } from '@/services/caseService';
import ResultCard from '@/components/ResultCard';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export default async function ResultsPage() {
  const cases = await getAllCases();

  return (
    <main className="min-h-screen bg-slate-50/60 pb-20 pt-24 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Üst Başlık Seksiyonu */}
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-block rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-bold text-teal-700 ring-1 ring-teal-500/20 mb-3">
            ✨ Saç Ekimi Öncesi & Sonrası
          </span>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Gerçek Hasta Sonuçları & Vakalar
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Sistemdeki onaylı klinikler tarafından gerçekleştirilen en güncel saç ekimi sonuçlarını inceleyin, klinikleri karşılaştırın.
          </p>
        </div>

        {/* Sonuç Kartları Izgarası */}
        {cases.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            Henüz eklenmiş bir saç ekimi sonucu bulunmuyor.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((caseItem) => (
              <ResultCard key={caseItem.id} item={caseItem} showClinicInfo={true} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}