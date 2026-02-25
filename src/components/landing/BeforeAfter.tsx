import { motion } from 'framer-motion';

const EXAMPLES = [
  {
    before: {
      bg: 'bg-gradient-to-br from-[#E5E5E3] to-[#D4D4D2]',
      label: 'Paprasta produkto nuotrauka',
      icon: (
        <svg className="w-10 h-10 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    after: {
      bg: 'bg-gradient-to-br from-[#FFF0EB] to-[#FFD4C4]',
      label: 'Profesionali modelio nuotrauka',
      icon: (
        <svg className="w-10 h-10 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  },
  {
    before: {
      bg: 'bg-gradient-to-br from-[#E5E5E3] to-[#D4D4D2]',
      label: 'Tuščias idėjų lapas',
      icon: (
        <svg className="w-10 h-10 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    after: {
      bg: 'bg-gradient-to-br from-[#F0EBFF] to-[#D4C4FF]',
      label: 'Paruoštas socialinių tinklų įrašas',
      icon: (
        <svg className="w-10 h-10 text-[#9B6CF7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  },
  {
    before: {
      bg: 'bg-gradient-to-br from-[#E5E5E3] to-[#D4D4D2]',
      label: 'Viena nuotrauka',
      icon: (
        <svg className="w-10 h-10 text-[#999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    after: {
      bg: 'bg-gradient-to-br from-[#ECFDF5] to-[#C4FFE5]',
      label: 'Pilnas AI modelis su variacijomis',
      icon: (
        <svg className="w-10 h-10 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  },
];

export function BeforeAfter() {
  return (
    <section className="py-16 md:py-24 px-4 bg-[#F7F7F5]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-[#FF6B35] uppercase tracking-wide mb-2">
            AI transformacijos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
            Pamatykite skirtumą
          </h2>
          <p className="text-[#666666] max-w-xl mx-auto">
            Nuo paprastų nuotraukų iki profesionalaus turinio per kelias sekundes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXAMPLES.map((example, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-2xl border border-[#E5E5E3] p-5 shadow-sm"
            >
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Before */}
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#999] uppercase tracking-wide mb-2">
                    Prieš
                  </span>
                  <div className={`${example.before.bg} rounded-xl aspect-square flex items-center justify-center`}>
                    {example.before.icon}
                  </div>
                </div>
                {/* After */}
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#FF6B35] uppercase tracking-wide mb-2">
                    Po
                  </span>
                  <div className={`${example.after.bg} rounded-xl aspect-square flex items-center justify-center relative`}>
                    {example.after.icon}
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-[#FF6B35] rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#999]">{example.before.label}</span>
                <svg className="w-4 h-4 text-[#FF6B35] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="text-[#1A1A1A] font-medium">{example.after.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
