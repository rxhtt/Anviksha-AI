import Reveal from '../components/Reveal.jsx'
import Tilt3D from '../components/Tilt3D.jsx'
import { IconCpu, IconTrend, IconHeart } from '../components/Icons.jsx'

const REASONS = [
  {
    Icon: IconCpu,
    kicker: 'Intelligent infrastructure',
    title: 'AI is ready',
    body: 'Large language models, wearables, and real-time diagnostics have matured enough to power truly personalized health guidance.',
  },
  {
    Icon: IconTrend,
    kicker: 'Digital healthcare shift',
    title: 'Adoption is accelerating',
    body: 'Post-pandemic India has seen a 3x surge in digital health app usage, with young adults leading the shift toward proactive wellness.',
    source: {
      label: 'Comscore',
      href: 'https://www.comscore.com/por/Insights/Infographics/Traffic-to-health-apps-in-India-has-increased-by-249-percent-since-2018',
    },
  },
  {
    Icon: IconHeart,
    kicker: 'A necessity, not a choice',
    title: 'Prevention is now essential',
    body: 'Digital banking changed how India manages money. Preventive healthtech will change how India manages life.',
  },
]

export default function WhyNow() {
  return (
    <section id="why-now" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
            Why now?
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.08] text-ink-900 sm:text-5xl">
            The moment is here.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REASONS.map(({ Icon, kicker, title, body, source }, i) => (
            <Reveal key={title} delay={0.06 * i}>
              <Tilt3D className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 transition-colors duration-200 hover:border-ink-400">
                  <span className="inline-flex w-fit rounded-xl border border-brand-500/30 bg-brand-100 p-2.5 text-brand-700 [transform:translateZ(28px)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                    {kicker}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-ink-900 [transform:translateZ(14px)]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">{body}</p>

                  {source && (
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto cursor-pointer pt-5 text-xs text-ink-500 underline decoration-ink-400 underline-offset-2 transition-colors duration-200 hover:text-brand-700"
                    >
                      Source: {source.label}
                    </a>
                  )}
                </article>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
