
import ClinicsComponent from '@/components/ClinicsComponent';
import { Footer } from '@/components/footer/footers-02';
import Hero from '@/components/Hero';
import PartnerLogoBant from '@/components/partner-logo-bant';

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full">
      <Hero />
      <PartnerLogoBant />
    <ClinicsComponent/>
      <Footer/>
    </main>
  );
}