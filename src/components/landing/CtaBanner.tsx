import { Link } from 'react-router';
import { motion } from 'framer-motion';

export function CtaBanner() {
  return (
    <section className="px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A1A2E] via-[#2D1B69] to-[#1A1A2E] px-6 py-16 md:py-20 text-center"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF6B35]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#9B6CF7]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
          >
            Pradėkite kurti turinį su AI
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70 mb-8 max-w-lg mx-auto"
          >
            Nemokamas bandymas — jokių kreditinių kortelių. Išbandykite visas funkcijas jau dabar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              to="/generator"
              className="shimmer-hover inline-flex items-center justify-center px-10 py-4 bg-[#FF6B35] text-white text-lg font-semibold rounded-full hover:bg-[#E55A2B] transition-colors shadow-lg hover:shadow-[0_4px_30px_rgba(255,107,53,0.4)]"
            >
              Pradėti nemokamai
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
