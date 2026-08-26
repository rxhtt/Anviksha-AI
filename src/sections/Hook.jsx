import Reveal from '../components/Reveal.jsx'

export default function Hook() {
  return (
    <section className="relative border-y border-line bg-paper-50">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
            What if…
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal delay={0.05}>
            {/* The two questions are set in the display serif, not the UI sans —
                they're meant to be read as a voice, not as interface copy. */}
            <div className="h-full rounded-2xl border border-line bg-paper p-7 sm:p-9">
              <p className="font-display text-2xl leading-snug text-ink-700 sm:text-3xl">
                How many of you checked your bank balance this week?
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-ink-500">
                Most of us, more than once.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="h-full rounded-2xl border border-brand-500/35 bg-brand-100 p-7 sm:p-9">
              <p className="font-display text-2xl leading-snug text-ink-900 sm:text-3xl">
                When was the last time you checked your health?
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-brand-700">
                Most of us can&apos;t remember.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <p className="mt-12 max-w-2xl text-lg leading-relaxed text-ink-700 sm:text-xl">
            We track our money every day.{' '}
            <span className="font-semibold text-ink-900">
              Yet most of us never track the one thing that keeps us alive.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
