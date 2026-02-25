import { HeroSection } from '../components/landing/HeroSection';
import { SocialProof } from '../components/landing/SocialProof';
import { FeatureHeroSections } from '../components/landing/FeatureHeroSections';
import { BeforeAfter } from '../components/landing/BeforeAfter';
import { Testimonials } from '../components/landing/Testimonials';
import { FAQSection } from '../components/landing/FAQSection';
import { CtaBanner } from '../components/landing/CtaBanner';
import { usePageTitle } from '../hooks/usePageTitle';

export default function LandingPage() {
  usePageTitle('AI UGC turinio kūrimo platforma');

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <HeroSection />

      {/* Social Proof - Stats */}
      <SocialProof />

      {/* 3 Feature Hero Sections (includes platform stats bar + feature blocks) */}
      <FeatureHeroSections />

      {/* Before / After Showcase */}
      <BeforeAfter />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQSection />

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}
