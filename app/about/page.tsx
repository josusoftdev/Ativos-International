import { AboutHero } from "@/app/components/layout/about-hero";
import { ContactCard } from "@/app/components/layout/contact-card";
import { FaqSection } from "@/app/components/layout/faq-section";
import { Header } from "@/app/components/layout/header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050813] text-slate-100">
      <Header />

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
        <AboutHero />
        <ContactCard />
        <FaqSection />
      </main>
    </div>
  );
}