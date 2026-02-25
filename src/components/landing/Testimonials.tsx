import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Gabija Kazlauskaitė',
    role: 'E-komercijos vadovė',
    initials: 'GK',
    color: 'bg-[#FF6B35]',
    quote:
      'reEDITme visiškai pakeitė mūsų produktų fotografiją. Anksčiau samdėme fotografą ir modelius kiekvienam sezonui — dabar viską padarome per kelias minutes su AI. Sutaupome tūkstančius eurų kas mėnesį.',
    stars: 5,
  },
  {
    name: 'Tomas Petravičius',
    role: 'Socialinių tinklų kūrėjas',
    initials: 'TP',
    color: 'bg-[#9B6CF7]',
    quote:
      'Kaip turinio kūrėjas, man reikia nuolat generuoti naują turinį. Su reEDITme galiu sukurti profesionalias nuotraukas ir įrašus per minutę. Mano sekėjų skaičius išaugo 3x per 2 mėnesius!',
    stars: 5,
  },
  {
    name: 'Laura Mickutė',
    role: 'Mados prekės ženklo įkūrėja',
    initials: 'LM',
    color: 'bg-[#10B981]',
    quote:
      'Modelių kūrimo funkcija yra fantastinė. Galiu parodyti savo drabužius ant skirtingų modelių be jokio fotosesijų organizavimo. Kokybė stebina — klientai net nepastebi skirtumo.',
    stars: 5,
  },
];

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function Testimonials() {
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
            Atsiliepimai
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
            Ką sako mūsų naudotojai
          </h2>
          <p className="text-[#666666] max-w-xl mx-auto">
            Šimtai kurėjų jau naudoja reEDITme savo turinio kūrimui
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-2xl border border-[#E5E5E3] p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <StarIcon key={si} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#444444] text-sm leading-relaxed mb-6">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">{t.name}</p>
                  <p className="text-xs text-[#999]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
