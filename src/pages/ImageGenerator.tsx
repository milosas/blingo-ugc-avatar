import { useLanguage } from '../contexts/LanguageContext';
import { useImageGenerator } from '../hooks/useImageGenerator';
import { getPlaceholderForIndustry } from '../constants/industries';
import { IndustrySelect } from '../components/post-creator/IndustrySelect';

export default function ImageGenerator() {
  const { t } = useLanguage();
  const ig = useImageGenerator();

  const p = t.imageGeneratorPage || {} as any;
  const canGenerate = ig.industry && ig.prompt.trim().length >= 3;

  return (
    <div className="page-enter max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
        {p.title || 'Nuotraukų generatorius'}
      </h1>
      <p className="text-[#666] mb-8">
        {p.subtitle || 'Sukurkite nuotraukas su AI pagal jūsų aprašymą'}
      </p>

      <div className="space-y-6">
        {/* 1. Industry Select */}
        <IndustrySelect
          value={ig.industry}
          onChange={ig.setIndustry}
          label={p.industryLabel || 'Sritis'}
          placeholder={p.industryPlaceholder || 'Pasirinkite sritį...'}
        />

        {/* 2. Prompt Textarea */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
            {p.promptLabel || 'Aprašymas'}
          </label>
          <textarea
            value={ig.prompt}
            onChange={(e) => ig.setPrompt(e.target.value)}
            placeholder={getPlaceholderForIndustry(ig.industry)}
            rows={4}
            className="w-full px-4 py-3 border border-[#E5E5E3] rounded-xl text-sm text-[#1A1A1A] placeholder-[#999] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35]/20 outline-none resize-none transition-colors"
          />
          <p className="text-xs text-[#999] mt-1">
            {p.promptHint || 'Aprašykite norimą nuotrauką kuo detaliau'}
          </p>
        </div>

        {/* 3. Generate Button */}
        <button
          onClick={ig.generate}
          disabled={!canGenerate || ig.isLoading}
          className="w-full py-3.5 bg-[#FF6B35] text-white font-semibold rounded-xl hover:bg-[#E55A2B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {ig.isLoading ? (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              {p.generating || 'Generuojama...'}
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {p.generate || 'Generuoti nuotrauką'}
            </>
          )}
        </button>

        {/* 4. Error */}
        {ig.error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-600">{ig.error}</p>
          </div>
        )}

        {/* 5. Result */}
        {ig.generatedImageUrl && (
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              {p.resultLabel || 'Sugeneruota nuotrauka'}
            </label>
            <div className="bg-white border border-[#E5E5E3] rounded-xl overflow-hidden">
              <img
                src={ig.generatedImageUrl}
                alt="Generated"
                className="w-full object-contain max-h-[600px]"
              />
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={ig.downloadImage}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6B35] text-white text-sm font-medium rounded-xl hover:bg-[#E55A2B] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {p.download || 'Atsisiųsti'}
              </button>

              <button
                onClick={ig.regenerate}
                disabled={ig.isLoading}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E5E3] text-[#1A1A1A] text-sm font-medium rounded-xl hover:bg-[#F7F7F5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className={`w-4 h-4 ${ig.isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {p.regenerate || 'Generuoti dar kartą'}
              </button>
            </div>
          </div>
        )}

        {/* 6. Save Status */}
        {(ig.isSaving || ig.savedId) && (
          <div className="text-center">
            {ig.isSaving ? (
              <p className="text-sm text-[#999] flex items-center justify-center gap-2">
                <span className="w-3 h-3 rounded-full border border-[#999] border-t-transparent animate-spin inline-block" />
                {p.saving || 'Saugoma...'}
              </p>
            ) : ig.savedId ? (
              <p className="text-sm text-green-600 flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {p.saved || 'Išsaugota'}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
