import Reveal from '../components/Reveal.jsx'
import Tilt3D from '../components/Tilt3D.jsx'
import { IconClock, IconCost, IconFragmented } from '../components/Icons.jsx'

const PROBLEMS = [
  {
    Icon: IconClock,
    title: 'Late awareness',
    body: 'Young adults only seek medical help when symptoms appear — often too late for early intervention or prevention.',
  },
  {
    Icon: IconCost,
    title: 'High cost',
    body: 'By the time symptoms appear, prevention has already become treatment — and treatment is far more expensive.',
  },
  {
    Icon: IconFragmented,
    title: 'Fragmented care',
    body: 'Health data is scattered across apps, labs, and clinics. No unified picture means no proactive understanding of your own health.',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
            The problem
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.08] text-ink-900 sm:text-5xl">
            Healthcare today is reactive, not preventive.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PROBLEMS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={0.06 * i}>
              <Tilt3D className="h-full">
                <article className="h-full rounded-2xl border border-line bg-paper p-7 transition-colors duration-200 hover:border-ink-400">
                  <span className="inline-flex rounded-xl border border-brand-500/30 bg-brand-100 p-2.5 text-brand-700 [transform:translateZ(28px)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink-900 [transform:translateZ(14px)]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">{body}</p>
                </article>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
