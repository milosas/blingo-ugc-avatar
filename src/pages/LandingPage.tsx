import { HeroSection } from '../components/landing/HeroSection';
import { FeatureHeroSections } from '../components/landing/FeatureHeroSections';
import { FAQSection } from '../components/landing/FAQSection';

export default function LandingPage() {
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
