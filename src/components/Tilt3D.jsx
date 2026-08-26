import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion'

/**
 * Pointer-tracked 3D tilt. The card rotates on two axes toward the cursor,
 * lifts slightly in +z, and drops a shadow that deepens with the lift — the
 * three cues together are what make a flat div read as a physical panel
 * rather than a hover colour change.
 *
 * The shadow is doing the work a specular highlight would do on a dark
 * theme. On white paper an additive highlight is invisible, so the only
 * honest cue that a card has come toward the viewer is the shadow it casts.
 *
 * Rotation is capped low (default 8°) on purpose: past ~12° the text edges
 * start to blur and the effect turns into a gimmick.
 */
export default function Tilt3D({ children, className = '', max = 8, glare = true }) {
  const reduced = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const lift = useMotionValue(0)

  const sx = useSpring(mx, { stiffness: 200, damping: 22 })
  const sy = useSpring(my, { stiffness: 200, damping: 22 })
  const sz = useSpring(lift, { stiffness: 200, damping: 24 })

  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max])
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max])
  const z = useTransform(sz, [0, 1], [0, 26])

  const gxPct = useTransform(sx, [-0.5, 0.5], ['12%', '88%'])
  const gyPct = useTransform(sy, [-0.5, 0.5], ['12%', '88%'])
  const glareOpacity = useTransform(sz, [0, 1], [0, 1])
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${gxPct} ${gyPct}, rgba(217,122,18,0.10), transparent 62%)`

  /* On white paper a specular highlight reads as nothing at all, so the depth
     cue is a shadow that grows as the card lifts toward the viewer. */
  const shY = useTransform(sz, [0, 1], [2, 22])
  const shBlur = useTransform(sz, [0, 1], [8, 44])
  const shAlpha = useTransform(sz, [0, 1], [0.05, 0.28])
  const boxShadow = useMotionTemplate`0px ${shY}px ${shBlur}px -14px rgba(18,16,14,${shAlpha})`

  function onMove(e) {
    if (reduced) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  function onEnter() {
    if (!reduced) lift.set(1)
  }

  function onLeave() {
    mx.set(0)
    my.set(0)
    lift.set(0)
  }

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      style={{ perspective: 1000 }}
      className={`${className} [transform-style:preserve-3d]`}
    >
      <motion.div
        style={{ rotateX, rotateY, z, boxShadow, transformStyle: 'preserve-3d' }}
        className="relative h-full rounded-2xl"
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden="true"
            style={{ background: glareBg, opacity: glareOpacity }}
            className="pointer-events-none absolute inset-0 rounded-2xl"
          />
        )}
      </motion.div>
    </motion.div>
  )
}
