import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'

const STAGES = [
  { n: '01', label: 'Current health', body: 'Where you are today, read from your reports and signals.' },
  { n: '02', label: 'Awareness & tracking', body: 'Vitals and biomarkers, continuously in view.' },
  { n: '03', label: 'Personalized insights', body: 'What your trajectory means, in plain language.' },
  { n: '04', label: 'Future health', body: 'Where you’re heading — and how to change it.' },
]

/* The winding luminous path: the deck's central image of a health trajectory. */
function JourneyPath() {
  const d = 'M30 288 C 92 276, 132 250, 120 214 C 108 178, 182 168, 216 148 C 252 127, 238 98, 228 74'

  return (
    <svg
      viewBox="0 0 300 310"
      fill="none"
      className="h-full w-full"
      role="img"
      aria-label="A winding path rising toward a destination marker, representing your health trajectory over time."
    >
      <defs>
        <linearGradient id="journey-grad" x1="30" y1="288" x2="228" y2="74">
          {/* Runs light→dark as it climbs. On white paper, weight is what reads as
              "further along" — the opposite of a glowing line on a dark ground. */}
          <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.35" />
          <stop offset="55%" stopColor="var(--color-brand-600)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-brand-700)" />
        </linearGradient>
        <filter id="journey-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soft wash beneath the stroke */}
      <motion.path
        d={d}
        stroke="url(#journey-grad)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.2"
        filter="url(#journey-glow)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />

      {/* The path itself */}
      <motion.path
        d={d}
        stroke="url(#journey-grad)"
        strokeWidth="2.6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />

      {/* Destination marker */}
      <motion.g
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <path
          d="M228 32c-8.8 0-16 7.2-16 16 0 11.4 16 26 16 26s16-14.6 16-26c0-8.8-7.2-16-16-16z"
          fill="var(--color-brand-700)"
        />
        {/* A paper-coloured hole, so the pin reads as a pin and not a blob. */}
        <circle cx="228" cy="48" r="6" fill="var(--color-paper)" />
      </motion.g>

      <motion.circle
        cx="30"
        cy="288"
        r="5"
        fill="var(--color-brand-600)"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.35 }}
      />
    </svg>
  )
}

export default function Journey() {
  return (
    <section className="relative border-y border-line bg-paper-50">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
                Imagine Google Maps…
              </p>
              <h2 className="mt-4 font-display text-4xl leading-[1.08] text-ink-900 sm:text-5xl">
                Your health. Mapped. Predicted. Improved.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-700 sm:text-lg">
                Google Maps doesn&apos;t just tell you where you are. It tells you where
                you&apos;re heading, and how to get to a better destination. Anviksha does exactly
                that for your health.
              </p>
            </Reveal>

            <ol className="mt-10 space-y-5">
              {STAGES.map((s, i) => (
                <Reveal key={s.n} delay={0.06 * i} as="li">
                  <div className="flex gap-4">
                    <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-brand-700">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink-900">{s.label}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-700">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div
                className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_60%_30%,rgba(217,122,18,0.10),transparent_65%)]"
                aria-hidden="true"
              />
              <div className="relative h-full w-full p-4">
                <JourneyPath />
              </div>
              <p className="absolute inset-x-0 top-2 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700">
                Your future health
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
