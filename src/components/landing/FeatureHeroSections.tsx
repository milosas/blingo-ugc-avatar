import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../contexts/LanguageContext';

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-[#FF6B35] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CreditBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0EB] text-[#FF6B35] text-sm font-medium">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {text}
    </span>
  );
}

// Visual mockup placeholders for each section
function ImageToImageVisual() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-[#FFF0EB] to-[#FFE0D4] rounded-2xl p-6 aspect-[4/3] flex items-center justify-center">
        <div className="flex items-center gap-4">
          {/* Before */}
          <div className="w-24 h-32 md:w-32 md:h-40 bg-white rounded-xl shadow-md flex items-center justify-center">
            <svg className="w-10 h-10 text-[#CCCCCC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          {/* Arrow */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <span className="text-xs text-[#FF6B35] font-medium">AI</span>
          </div>
          {/* After */}
          <div className="w-24 h-32 md:w-32 md:h-40 bg-white rounded-xl shadow-md border-2 border-[#FF6B35] flex items-center justify-center">
            <svg className="w-10 h-10 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
      {/* Floating badge */}
      <div className="absolute -top-3 -right-3 bg-[#FF6B35] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
        AI
      </div>
    </div>
  );
}

function ImageGeneratorVisual() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-[#EBF0FF] to-[#D4E0FF] rounded-2xl p-6 aspect-[4/3] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Text prompt */}
          <div className="bg-white rounded-xl shadow-md px-4 py-3 max-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />
              <div className="h-2 bg-[#E5E5E3] rounded-full w-32" />
            </div>
            <div className="h-2 bg-[#E5E5E3] rounded-full w-24" />
          </div>
          {/* Arrow down */}
          <div className="w-8 h-8 rounded-full bg-[#4A6CF7] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          {/* Generated images grid */}
          <div className="flex gap-2">
            <div className="w-16 h-20 md:w-20 md:h-24 bg-white rounded-lg shadow-md border border-[#4A6CF7]/20" />
            <div className="w-16 h-20 md:w-20 md:h-24 bg-white rounded-lg shadow-md border-2 border-[#4A6CF7]" />
            <div className="w-16 h-20 md:w-20 md:h-24 bg-white rounded-lg shadow-md border border-[#4A6CF7]/20" />
          </div>
        </div>
      </div>
      <div className="absolute -top-3 -right-3 bg-[#4A6CF7] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
        NEW
      </div>
    </div>
  );
}

function PostCreatorVisual() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-[#F0EBFF] to-[#E0D4FF] rounded-2xl p-6 aspect-[4/3] flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-4 max-w-[220px] w-full">
          {/* Post header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#9B6CF7]" />
            <div>
              <div className="h-2 bg-[#1A1A1A] rounded-full w-20 mb-1" />
              <div className="h-1.5 bg-[#E5E5E3] rounded-full w-14" />
            </div>
          </div>
          {/* Post image placeholder */}
          <div className="w-full h-20 bg-gradient-to-br from-[#F0EBFF] to-[#E0D4FF] rounded-lg mb-3" />
          {/* Post text */}
          <div className="space-y-1.5">
            <div className="h-2 bg-[#E5E5E3] rounded-full w-full" />
            <div className="h-2 bg-[#E5E5E3] rounded-full w-4/5" />
            <div className="h-2 bg-[#E5E5E3] rounded-full w-3/5" />
          </div>
          {/* Hashtags */}
          <div className="flex gap-1 mt-2">
            <span className="text-[8px] text-[#9B6CF7] font-medium">#brand</span>
            <span className="text-[8px] text-[#9B6CF7] font-medium">#fashion</span>
            <span className="text-[8px] text-[#9B6CF7] font-medium">#style</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeatureBlockProps {
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  features: string[];
  creditInfo: string;
  cta: string;
  ctaLink: string;
  visual: React.ReactNode;
  reversed?: boolean;
  bgColor: string;
}

function FeatureBlock({
  badge,
  badgeColor,
  title,
  subtitle,
  features,
  creditInfo,
  cta,
  ctaLink,
  visual,
  reversed,
  bgColor,
}: FeatureBlockProps) {
  return (
    <div className={`py-16 md:py-24 px-4 ${bgColor}`}>
      <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reversed ? 'lg:[direction:rtl]' : ''}`}>
        {/* Text content */}
        <div className={reversed ? 'lg:[direction:ltr]' : ''}>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 ${badgeColor}`}>
            {badge}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">
            {title}
          </h3>
          <p className="text-lg text-[#666666] mb-8 leading-relaxed">
            {subtitle}
          </p>
          <ul className="space-y-4 mb-8">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-[#444444]">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              to={ctaLink}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#FF6B35] text-white font-semibold rounded-full hover:bg-[#E55A2B] transition-colors shadow-md hover:shadow-lg"
            >
              {cta}
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <CreditBadge text={creditInfo} />
          </div>
        </div>
        {/* Visual */}
        <div className={reversed ? 'lg:[direction:ltr]' : ''}>
          {visual}
        </div>
      </div>
    </div>
  );
}

interface PlatformStats {
  images: number;
  avatars: number;
  posts: number;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

function usePlatformStats(): PlatformStats {
  const [stats, setStats] = useState<PlatformStats>({ images: 0, avatars: 0, posts: 0 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(`${supabaseUrl}/functions/v1/platform-stats`, {
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'apikey': supabaseAnonKey,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStats({ images: data.images || 0, avatars: data.avatars || 0, posts: data.posts || 0 });
        }
      } catch {
        // Stats are non-critical, fail silently
      }
    }
    fetchStats();
  }, []);

  return stats;
}

function PlatformStatsBar({ stats, labels }: { stats: PlatformStats; labels: any }) {
  const hasStats = stats.images > 0 || stats.avatars > 0 || stats.posts > 0;
  if (!hasStats) return null;

  const items = [
    { value: stats.images, label: labels?.imagesCreated || 'Sukurta paveikslėlių', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { value: stats.avatars, label: labels?.imagesEdited || 'Redaguota paveikslėlių', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { value: stats.posts, label: labels?.postsCreated || 'Sukurta įrašų', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  ];

  return (
    <div className="bg-[#1A1A1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-6 md:gap-12">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white">
                {item.value.toLocaleString()}
              </p>
              <p className="text-xs md:text-sm text-[#999999] mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureHeroSections() {
  const { t } = useLanguage();
  const stats = usePlatformStats();

  const features = t.landing?.features;
  const platformStats = t.landing?.platformStats;

  return (
    <section id="modules">
      {/* Platform-wide stats bar */}
      <PlatformStatsBar stats={stats} labels={platformStats} />

      {/* Section 1: Image-to-Image */}
      <FeatureBlock
        badge={features?.imageToImage?.badge || 'Most Popular'}
        badgeColor="bg-[#FF6B35] text-white"
        title={features?.imageToImage?.title || 'Product Photos on Real Models'}
        subtitle={features?.imageToImage?.subtitle || 'Upload a clothing or product photo — AI will place it on a selected model.'}
        features={[
          features?.imageToImage?.feature1 || 'Choose from 10+ professional models or upload your own avatar',
          features?.imageToImage?.feature2 || 'Change environments, poses, styles, and moods with one click',
          features?.imageToImage?.feature3 || 'Get studio-quality photos ready for social media and e-commerce',
        ]}
        creditInfo={features?.imageToImage?.creditInfo || 'From 1 credit per photo'}
        cta={features?.imageToImage?.cta || 'Try Now'}
        ctaLink="/generator"
        visual={<ImageToImageVisual />}
        bgColor="bg-white"
      />

      {/* Section 2: Image Generator */}
      <FeatureBlock
        badge={features?.imageGenerator?.badge || 'New'}
        badgeColor="bg-[#4A6CF7] text-white"
        title={features?.imageGenerator?.title || 'AI Image Generator'}
        subtitle={features?.imageGenerator?.subtitle || 'Create entirely new, unique product images from scratch with AI.'}
        features={[
          features?.imageGenerator?.feature1 || 'Describe your desired image and AI will create it in seconds',
          features?.imageGenerator?.feature2 || 'Choose the style, composition, and mood to match your brand',
          features?.imageGenerator?.feature3 || 'Export in high resolution, ready for print and web',
        ]}
        creditInfo={features?.imageGenerator?.creditInfo || 'From 2 credits per image'}
        cta={features?.imageGenerator?.cta || 'Start Creating'}
        ctaLink="/generator"
        reversed
        visual={<ImageGeneratorVisual />}
        bgColor="bg-[#F7F7F5]"
      />

      {/* Section 3: Post Creator */}
      <FeatureBlock
        badge={features?.postCreator?.badge || 'All-in-One'}
        badgeColor="bg-[#9B6CF7] text-white"
        title={features?.postCreator?.title || 'Social Media Post Creator'}
        subtitle={features?.postCreator?.subtitle || 'Create professional marketing posts in just a few clicks.'}
        features={[
          features?.postCreator?.feature1 || 'AI writes copy tailored to your brand voice and audience',
          features?.postCreator?.feature2 || 'Create posts with images or text-only — your choice',
          features?.postCreator?.feature3 || 'Optimized for Instagram, Facebook, TikTok, and more',
        ]}
        creditInfo={features?.postCreator?.creditInfo || 'From 1 credit per post'}
        cta={features?.postCreator?.cta || 'Create Post'}
        ctaLink="/post-creator"
        visual={<PostCreatorVisual />}
        bgColor="bg-white"
      />
    </section>
  );
}
