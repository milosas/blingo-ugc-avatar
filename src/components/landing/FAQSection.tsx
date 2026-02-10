import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FAQItem } from './FAQItem';

const FAQ_KEYS = [
  'whatIsTool',
  'howGeneration',
  'whatAreCredits',
  'howUploadAvatars',
  'isDataSafe',
  'howContact',
] as const;

export function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = t.landing?.faq?.items;

  return (
    <section id="faq" className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] text-center mb-4">
          {t.landing?.faq?.title || 'Frequently Asked Questions'}
        </h2>
        <p className="text-[#666666] text-center mb-12">
          {t.landing?.faq?.subtitle || 'Got questions? We have answers'}
        </p>

        <div className="space-y-3">
          {FAQ_KEYS.map((key, index) => (
            <FAQItem
              key={key}
              question={faqItems?.[key]?.question || key}
              answer={faqItems?.[key]?.answer || ''}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
