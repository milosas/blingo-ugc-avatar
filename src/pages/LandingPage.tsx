import { HeroSection } from '../components/landing/HeroSection';
import { FeatureHeroSections } from '../components/landing/FeatureHeroSections';
import { FAQSection } from '../components/landing/FAQSection';
import { usePageTitle } from '../hooks/usePageTitle';

export default function LandingPage() {
  usePageTitle('AI UGC turinio kūrimo platforma');

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <HeroSection />

      {/* 3 Feature Hero Sections */}
      <FeatureHeroSections />
      <FAQSection />
    </div>
  );
}
