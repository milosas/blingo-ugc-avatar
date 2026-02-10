import { useLanguage } from '../../contexts/LanguageContext';

const PLANS = ['starter', 'pro', 'unlimited'] as const;

export function PricingSection() {
  const { t } = useLanguage();

  const pricing = t.landing?.pricing;

  return (
    <section id="pricing" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
          {pricing?.title || 'Simple, Transparent Pricing'}
        </h2>
        <p className="text-[#666666] mb-12 max-w-2xl mx-auto">
          {pricing?.subtitle || 'Choose the plan that fits your needs'}
        </p>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {PLANS.map((plan, index) => {
            const planData = pricing?.plans?.[plan];
            const isPopular = index === 1;

            return (
              <div
                key={plan}
                className={`relative bg-[#F7F7F5] border rounded-2xl p-6 text-left transition-all hover:shadow-lg hover:-translate-y-1 ${
                  isPopular
                    ? 'border-[#FF6B35] ring-2 ring-[#FF6B35] ring-offset-2'
                    : 'border-[#E5E5E3]'
                }`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#FF6B35] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {pricing?.mostPopular || 'Most Popular'}
                    </span>
                  </div>
                )}

                {/* Badge */}
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                    isPopular
                      ? 'bg-[#FF6B35] text-white'
                      : 'bg-[#E5E5E3] text-[#666666]'
                  }`}
                >
                  {planData?.badge || plan}
                </div>

                {/* Name + subtitle */}
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1">
                  {planData?.name || plan}
                </h3>
                <p className="text-sm text-[#666666] mb-4">
                  {planData?.subtitle || ''}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl font-bold text-[#1A1A1A]">
                    {planData?.price || 'TBD'}
                  </span>
                  <span className="text-[#666666] text-sm">
                    {pricing?.perMonth || '/month'}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {(planData?.features || []).map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#666666]">
                      <svg className="w-4 h-4 text-[#FF6B35] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`w-full py-3 rounded-full font-medium text-sm transition-all min-h-[44px] ${
                    isPopular
                      ? 'bg-[#FF6B35] text-white hover:bg-[#E55A2B] hover:shadow-md'
                      : 'bg-white border border-[#E5E5E3] text-[#1A1A1A] hover:border-[#FF6B35] hover:text-[#FF6B35]'
                  }`}
                >
                  {pricing?.getPlan || 'Get Plan'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Credit Packs */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
            {pricing?.credits?.title || 'Need More Credits?'}
          </h3>
          <p className="text-[#666666] mb-8">
            {pricing?.credits?.subtitle || 'Buy additional credits anytime. No subscription required.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(pricing?.credits?.packs || []).map((pack: any, index: number) => (
              <div
                key={index}
                className="bg-[#F7F7F5] border border-[#E5E5E3] rounded-2xl p-5 text-center hover:border-[#FF6B35] hover:shadow-md transition-all hover:-translate-y-1"
              >
                {/* Save badge */}
                {pack.save && (
                  <div className="inline-block bg-[#FFF0EB] text-[#FF6B35] text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
                    {pricing?.credits?.save || 'Save'} {pack.save}
                  </div>
                )}

                {/* Price */}
                <p className="text-2xl font-bold text-[#1A1A1A] mb-1">
                  {pack.price}
                </p>
                <p className="text-sm text-[#666666] mb-4">
                  {pack.credits} {t.auth?.credits?.toLowerCase?.() || 'credits'}
                </p>

                {/* Buy button */}
                <button className="w-full py-2.5 bg-white border border-[#E5E5E3] rounded-full text-sm font-medium text-[#1A1A1A] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all min-h-[44px]">
                  {pricing?.credits?.buyNow || 'Buy Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
