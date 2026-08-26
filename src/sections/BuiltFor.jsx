import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import Tilt3D from '../components/Tilt3D.jsx'
import { IconMonitor, IconHeart, IconPin } from '../components/Icons.jsx'

/**
 * Counts up once, the first time it scrolls into view.
 *
 * Seeded with the final value rather than 0 on purpose: if the observer never
 * fires, reduced motion is on, or the animation is interrupted, the number on
 * screen is still the correct one. A count-up that fails should look static, not
 * report zero.
 */
function CountUp({ to, decimals = 0 }) {
  const ref = useRef(null)
  const started = useRef(false)
  const inView = useInView(ref, { once: true, margin: '-64px' })
  const reduced = useReducedMotion()
  const [n, setN] = useState(to)

  useEffect(() => {
    if (!inView || reduced || started.current) return
    started.current = true
    const controls = animate(0, to, {
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(v),
    })
    return () => controls.stop()
  }, [inView, reduced, to])

  return (
    <span ref={ref} className="tabular-nums">
      {n.toFixed(decimals)}
    </span>
  )
}

const TRAITS = [
  {
    Icon: IconMonitor,
    title: 'Already on the phone',
    body: 'This is the cohort with the highest smartphone and app adoption in the country. Preventive health does not need to teach them a new habit — it needs to fit into one they already have.',
  },
  {
    Icon: IconHeart,
    title: 'Already interested',
    body: 'Interest in fitness, sleep, and nutrition is rising fast. What is missing is not motivation. It is a system that connects those daily signals to what they actually mean for your body.',
  },
  {
    Icon: IconPin,
    title: 'Still unserved',
    body: 'Almost every health service in India is built to receive a patient. Very little of it is built to keep you from becoming one — which is exactly the gap this age group falls into.',
  },
]

export default function BuiltFor() {
  return (
    <section id="built-for" className="scroll-mt-24 border-y border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
              Who this is for
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.08] text-ink-900 sm:text-5xl">
              Built for the generation healthcare keeps{' '}
              <span className="italic text-brand-700">waiting&nbsp;on.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              Young adults are not ignoring their health. They are being handed a system that only
              opens its doors once something has already gone wrong — and then asks them to pay for
              the delay.
            </p>

            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-8">
              <div>
                <dd className="font-mono text-5xl font-bold leading-none tracking-tight text-ink-900">
                  <CountUp to={400} />
                  <span className="text-brand-700">M+</span>
                </dd>
                <dt className="mt-3 max-w-[13rem] text-sm leading-relaxed text-ink-500">
                  Young adults in India in this age band
                </dt>
              </div>
              <div>
                <dd className="font-mono text-5xl font-bold leading-none tracking-tight text-ink-900">
                  18<span className="text-ink-400">–</span>35
                </dd>
                <dt className="mt-3 max-w-[13rem] text-sm leading-relaxed text-ink-500">
                  The years that set the trajectory for everything after
                </dt>
              </div>
            </dl>
          </Reveal>

          <div className="grid gap-4 self-center">
            {TRAITS.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={0.06 * i}>
                <Tilt3D className="h-full" max={6}>
                  <article className="flex h-full gap-5 rounded-2xl border border-line bg-paper-50 p-6 transition-colors duration-200 hover:border-brand-500/50">
                    <span className="inline-flex h-fit shrink-0 rounded-xl border border-brand-500/30 bg-brand-100 p-2.5 text-brand-700 [transform:translateZ(26px)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-ink-900 [transform:translateZ(12px)]">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-700">{body}</p>
                    </div>
                  </article>
                </Tilt3D>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
