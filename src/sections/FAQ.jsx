import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'

/**
 * Answers here are grounded in the pitch deck where the deck actually says
 * something (what the platform reads, the free + premium model, the three
 * pillars). Where it does not — timing, wearables, and above all data handling —
 * the copy commits to a process rather than inventing a fact. Those are marked in
 * the handover notes as needing a real decision before launch.
 */
const FAQS = [
  {
    q: 'Is Anviksha a doctor, or a replacement for one?',
    a: 'No, and it is not trying to be. Anviksha is not a medical device and it does not diagnose, treat, or prescribe. It reads your health signals and shows you what direction they are pointing, so that the conversation you eventually have with a clinician starts from evidence instead of from a symptom. Anything that looks urgent, it tells you to take to a professional.',
  },
  {
    q: 'What does it actually look at?',
    a: 'Four things: your health history, your medical reports, your day-to-day lifestyle patterns, and your known risk factors. On their own each of those is a fragment sitting in a different app or a different lab portal. Read together and over time, they form a trajectory — and a trajectory is something you can still change.',
  },
  {
    q: 'How is this different from the health app already on my phone?',
    a: 'Most health apps are very good mirrors. They show you your steps, your sleep, your last reading, and they stop there — the interpretation is left to you. Anviksha is built around the step after the number: what this pattern means for you specifically, what it is likely to lead to, and which single change would matter most right now.',
  },
  {
    q: 'Do I need a smartwatch or a wearable?',
    a: 'It should not be the price of entry. The platform is designed to work from what you can already give it — your reports, your history, and what you tell it about how you live. A wearable adds resolution to the picture rather than being what makes the picture possible.',
  },
  {
    q: 'What will it cost?',
    a: 'The plan is a free tier that covers basic health tracking and insights, with a paid tier for the deeper work — personalised health plans, predictive analysis, and continuous monitoring. Exact pricing is not set yet, and we would rather tell you nothing than tell you a number we then change.',
  },
  {
    q: 'Where does my health data go?',
    a: 'This is the most sensitive data you have, and it deserves a real answer rather than a reassuring sentence. The full data-handling policy — what is stored, where, for how long, and who can ever see it — will be published before the first user is onboarded, and anything beyond what the app needs in order to function will be opt-in, not default. If that policy is not something you are comfortable with, you should not sign up.',
  },
  {
    q: 'When can I actually use it?',
    a: 'Anviksha is pre-launch. The waitlist is genuinely a waitlist, not a marketing list — joining it gets you early access when the first version is ready, and nothing in between except an email when there is something real to show you.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const reduced = useReducedMotion()

  return (
    <section id="faq" className="scroll-mt-24">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
            Questions
          </p>
          <h2 className="mt-4 font-display text-4xl leading-[1.08] text-ink-900 sm:text-5xl">
            The things worth asking first.
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i
            return (
              <div key={q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    className="group flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left transition-colors duration-200"
                  >
                    <span
                      className={`text-base font-bold transition-colors duration-200 sm:text-lg ${
                        isOpen ? 'text-brand-700' : 'text-ink-900 group-hover:text-brand-700'
                      }`}
                    >
                      {q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-200 ${
                        isOpen
                          ? 'rotate-45 border-brand-500/60 bg-brand-100 text-brand-700'
                          : 'border-line text-ink-500 group-hover:border-ink-400 group-hover:text-ink-900'
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      initial={reduced ? undefined : { height: 0, opacity: 0 }}
                      animate={reduced ? undefined : { height: 'auto', opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pr-10 text-[0.95rem] leading-relaxed text-ink-700">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <Reveal>
          <p className="mt-10 text-sm text-ink-500">
            Something we have not answered?{' '}
            <a
              href="mailto:anviksha.health@gmail.com"
              className="cursor-pointer font-semibold text-brand-700 underline decoration-brand-500/50 underline-offset-4 transition-colors duration-200 hover:text-ink-900 hover:decoration-ink-900"
            >
              Ask us directly
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  )
}
