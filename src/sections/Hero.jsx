import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import WaitlistForm from '../components/WaitlistForm.jsx'
import KineticMatrix from '../components/KineticMatrix.jsx'

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const reduced = useReducedMotion()

  /* Pointer-driven 3D tilt on the copy block, so the text sits in the same
     space as the lattice behind it instead of floating flat on top of it. */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 20 })
  const sy = useSpring(my, { stiffness: 55, damping: 20 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7])
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5])
  const shiftX = useTransform(sx, [-0.5, 0.5], [14, -14])

  function onMove(e) {
    if (reduced) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <section
      id="top"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative isolate min-h-[92vh] overflow-hidden"
      style={{ perspective: 1400 }}
    >
      {/* The kinetic lattice — reacts to cursor, ripples on click */}
      <KineticMatrix />

      {/* Paper wash over the lattice so the copy always clears contrast */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-1/3 left-1/4 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,122,18,0.09),transparent_62%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/88 to-paper/25" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <motion.div
        style={reduced ? undefined : { rotateX, rotateY, x: shiftX, transformStyle: 'preserve-3d' }}
        className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-6 pb-24 pt-36 sm:pt-40"
      >
        <motion.p
          custom={0}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-brand-500/40 bg-brand-100 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-700"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-600" />
          India&apos;s Preventive Health Intelligence Platform
        </motion.p>

        <motion.h1
          custom={1}
          variants={rise}
          initial="hidden"
          animate="show"
          className="max-w-4xl font-display text-5xl leading-[1.04] text-ink-900 sm:text-6xl lg:text-7xl"
        >
          AI for healthier decisions.
          <span className="mt-1 block italic text-brand-700">
            Before they become medical decisions.
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink-700"
        >
          Health shouldn&apos;t start in the hospital. It should start with you. Anviksha reads
          your health signals, understands your trajectory, and guides you toward a healthier
          future — before illness ever begins.
        </motion.p>

        <motion.div custom={3} variants={rise} initial="hidden" animate="show" className="mt-10">
          <WaitlistForm id="waitlist" size="lg" />
        </motion.div>

        <motion.p
          custom={4}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-14 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-500"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
          </svg>
          Move your cursor through the lattice — click anywhere to send a shockwave
        </motion.p>
      </motion.div>
    </section>
  )
}
