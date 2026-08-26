import Reveal from '../components/Reveal.jsx'
import WaitlistForm from '../components/WaitlistForm.jsx'

export default function CTA() {
  return (
    <section className="relative isolate overflow-hidden border-t border-line bg-paper-50">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(217,122,18,0.14),transparent_62%)]" />
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <circle cx="720" cy="700" r="420" stroke="var(--color-brand-500)" strokeWidth="1" />
          <circle cx="720" cy="700" r="560" stroke="var(--color-brand-500)" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <Reveal>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
            A future worth building
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.08] text-ink-900 sm:text-5xl">
            Imagine checking your health becoming as normal as checking your bank balance.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-700">
            That future starts with prevention. That future starts with Anviksha.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <WaitlistForm id="join" size="lg" />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.22em] text-brand-700">
            Know Better. Live Better.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
