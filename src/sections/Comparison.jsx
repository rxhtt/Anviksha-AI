import Reveal from '../components/Reveal.jsx'
import Tilt3D from '../components/Tilt3D.jsx'
import {
  IconScale,
  IconFlame,
  IconReport,
  IconBell,
  IconTrend,
} from '../components/Icons.jsx'

const TODAY = [
  { Icon: IconScale, label: 'Count' },
  { Icon: IconFlame, label: 'Calories' },
  { Icon: IconReport, label: 'Reports' },
  { Icon: IconBell, label: 'Reminders' },
]

export default function Comparison() {
  return (
    <section className="relative border-y border-line bg-paper-50">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
            Why Anviksha?
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.08] text-ink-900 sm:text-5xl">
            Not another health tracker.
          </h2>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2">
          {/* Today's apps — deliberately muted, and deliberately flatter in z */}
          <Reveal>
            <Tilt3D className="h-full" max={4} glare={false}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 sm:p-8">
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Today’s health apps
                </h3>

                <ul className="mt-7 grid grid-cols-4 gap-3">
                  {TODAY.map(({ Icon, label }) => (
                    <li key={label} className="flex flex-col items-center gap-2.5 text-center">
                      <span className="inline-flex rounded-xl border border-line p-2.5 text-ink-400">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="text-xs text-ink-500">{label}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-8 text-base leading-relaxed text-ink-500">
                  They log what already happened. Useful, but backward-looking — a record, not a
                  direction.
                </p>
              </div>
            </Tilt3D>
          </Reveal>

          {/* Anviksha — the warm side, and the one that leans out of the page */}
          <Reveal delay={0.08}>
            <Tilt3D className="h-full" max={9}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-500/40 bg-brand-100 p-7 sm:p-8">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(217,122,18,0.18),transparent_65%)]"
                  aria-hidden="true"
                />
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                  Anviksha
                </h3>

                <span className="mt-7 inline-flex w-fit rounded-xl border border-brand-500/40 bg-paper p-2.5 text-brand-700 [transform:translateZ(30px)]">
                  <IconTrend className="h-6 w-6" />
                </span>

                <p className="mt-5 text-base leading-relaxed text-ink-900 [transform:translateZ(14px)]">
                  AI analyzes your health history, medical reports, lifestyle, and risk factors to
                  help you understand where your health is heading.
                </p>

                <p className="mt-auto pt-8 text-base leading-relaxed text-brand-700">
                  A preventive health intelligence platform — forward-looking by design.
                </p>
              </div>
            </Tilt3D>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-14 max-w-3xl text-center font-display text-3xl leading-snug text-ink-900 sm:text-4xl">
            Most health apps tell you where you are.
            <span className="mt-1.5 block italic text-brand-700">
              Anviksha helps you understand where you’re going.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
