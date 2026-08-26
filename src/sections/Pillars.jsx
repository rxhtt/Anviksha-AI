import Reveal from '../components/Reveal.jsx'
import Tilt3D from '../components/Tilt3D.jsx'
import { IconUnderstand, IconMonitor, IconPrevent } from '../components/Icons.jsx'

const PILLARS = [
  {
    Icon: IconUnderstand,
    kicker: 'Understand',
    title: 'Know your health',
    body: 'Decode your body’s signals with AI-driven health insights tailored to you.',
  },
  {
    Icon: IconMonitor,
    kicker: 'Monitor',
    title: 'Track & analyze',
    body: 'Continuously track vitals and biomarkers to stay informed in real time.',
  },
  {
    Icon: IconPrevent,
    kicker: 'Prevent',
    title: 'Stay ahead',
    body: 'Act before symptoms arise. Your health, guided proactively every day.',
  },
]

export default function Pillars() {
  return (
    <section id="how" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
            What is Anviksha?
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] text-ink-900 sm:text-5xl">
            An AI-powered preventive health intelligence platform that helps you understand,
            monitor, and improve your health{' '}
            <span className="italic text-brand-700">before you become a patient.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map(({ Icon, kicker, title, body }, i) => (
            <Reveal key={kicker} delay={0.06 * i}>
              <Tilt3D className="h-full">
                <article className="group h-full rounded-2xl border border-line bg-gradient-to-b from-paper-50 to-paper p-7 transition-colors duration-200 hover:border-brand-500/50">
                  <span className="inline-flex rounded-xl border border-brand-500/30 bg-brand-100 p-2.5 text-brand-700 transition-colors duration-200 group-hover:border-brand-500/60 [transform:translateZ(30px)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700 [transform:translateZ(16px)]">
                    {kicker}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-ink-900 [transform:translateZ(12px)]">
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
