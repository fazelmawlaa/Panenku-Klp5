import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { EcosystemSection } from '@/components/landing/EcosystemSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { CtaSection } from '@/components/landing/CtaSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fafaf7] text-neutral-900 font-sans selection:bg-[#c6f24d] selection:text-neutral-950 flex flex-col">
      {/* Floating Pill Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section matching Image 2 */}
        <HeroSection />

        {/* Services Section matching Image 1 */}
        <ServicesSection />

        {/* Ecosystem & Tentang Kami Section */}
        <EcosystemSection />

        {/* Interactive FAQ Section */}
        <FaqSection />

        {/* Call to Action Banner */}
        <CtaSection />
      </main>

      {/* Modern Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
