import Image from 'next/image';
import Link from 'next/link';
import MultiStepForm from './MultiStepForm';

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950 text-white shadow-2xl">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/o8gdx534/image/upload/v1786635468/Gemini_Generated_Image_7xpxct7xpxct7xpx.png"
          alt="Sağlık Hizmetleri"
          fill
          className="object-cover opacity-95"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/85 to-slate-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_35%)]" />
      </div>
     
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-8 lg:py-20">
        <MultiStepForm />

        <div className="mx-auto flex max-w-[540px] flex-col items-center text-center lg:ml-auto lg:items-end lg:text-right">
          <span className="mb-6 inline-flex items-center rounded-full border border-teal-300/40 bg-teal-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-teal-100 backdrop-blur-sm">
            Saç Ekimi Danışmanlığı
          </span>

          <h1
            className="mb-5 w-full text-[2.7rem] font-[600] leading-[0.98] tracking-[-0.05em] text-white sm:text-[4rem] lg:text-[5rem]"
            style={{ fontFamily: '"Open Sans", sans-serif' }}
          >
            En uygun saç ekimi uzmanını bulun
          </h1>

          <p
            className="mx-auto max-w-[480px] text-[1.02rem] leading-[1.8] text-slate-200/90 sm:text-[1.08rem] lg:ml-0 lg:mr-0 lg:text-right"
            style={{ fontFamily: '"Open Sans", sans-serif' }}
          >
            FUE, DHI, fiyat ve klinik seçimini tek ekranda değerlendirin. Kısa bir form doldurun; size uygun doktor ve klinik önerileri için doğru adımda rehberlik edelim.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-end">
            <Link
              href="/doctors"
              className="inline-flex w-full items-center justify-center rounded-xl bg-teal-500 px-7 py-3.5 text-sm font-semibold tracking-[0.02em] text-white shadow-[0_18px_35px_rgba(20,184,166,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-400 sm:w-auto"
            >
              Doktorları Gör
            </Link>
            <a
              href="#about"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold tracking-[0.02em] text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
            >
              Süreç
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-200 lg:justify-end">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Güvenli değerlendirme
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-400" />
              Uzman eşleşmesi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}