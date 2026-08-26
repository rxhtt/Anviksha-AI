import { useEffect, useRef } from 'react'

/**
 * KINETIC MATRIX — a 3D spring-mass lattice, built from the published spec of
 * `21st.dev/r/daiwiikharihar/kinetic-matrix` (that registry entry is gated behind
 * authentication, so this is an independent implementation of the four behaviours
 * it describes, not a copy of its source):
 *
 *   1. Spring-mass lattice     — every node is tethered to its home by Hooke's law
 *                                (F = -kx) with velocity damping.
 *   2. Cursor force field      — a radial repulsion well that follows the pointer
 *                                and also pushes nodes toward the viewer in +z.
 *   3. Synaptic data pulses    — bright packets that travel node-to-node along
 *                                lattice edges, brightening what they pass through.
 *   4. Gravitational shockwave — a click emits an expanding ring impulse that
 *                                displaces every node it sweeps over.
 *
 * Rendered on canvas 2D with hand-rolled perspective projection: nodes carry a
 * real z coordinate, the whole lattice rotates on two axes, and depth drives
 * scale, alpha, and line width. Colours are read from the CSS theme tokens at
 * runtime, so the lattice restyles itself if the palette in index.css changes.
 */

const SPACING = 48
const FOCAL = 900
const SPRING = 0.022
const DAMPING = 0.9
const CURSOR_RADIUS = 190
const CURSOR_STRENGTH = 2.6
const SHOCKWAVE_SPEED = 0.62 // px per ms
const SHOCKWAVE_LIFE = 1500 // ms
const MAX_PULSES = 7

/**
 * Age of a shockwave in ms, never negative.
 *
 * The clamp is load-bearing, not defensive noise. A wave is stamped with
 * performance.now() inside the click handler, but the render loop measures
 * against the requestAnimationFrame timestamp — and that timestamp is taken
 * at the *start* of the frame. A click that lands after that moment but
 * before the callback runs produces a born time slightly in the future, so
 * the raw age goes fractionally negative. That fed a negative radius into
 * ctx.arc(), which throws IndexSizeError and kills the animation loop —
 * one unlucky click and the hero freezes.
 */
function ageOf(wave, now) {
  return Math.max(0, now - wave.born)
}

function hexToRgb(hex) {
  const h = hex.replace('#', '').trim()
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h
  const n = parseInt(full, 16)
  if (Number.isNaN(n)) return [160, 154, 146]
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export default function KineticMatrix({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    /* Colours come from the theme tokens rather than being hard-coded. On the
       white ground the lattice reads as a technical drawing: slate hairlines,
       brand nodes, and dark pulse heads. Alphas are deliberately higher than a
       dark theme would use — thin light-on-dark lines glow, thin dark-on-light
       lines just disappear. */
    const css = getComputedStyle(document.documentElement)
    const token = (name, fallback) => css.getPropertyValue(name).trim() || fallback
    const EDGE = hexToRgb(token('--color-ink-400', '#a09a92'))
    const NODE = hexToRgb(token('--color-brand-600', '#b25e10'))
    const HOT = hexToRgb(token('--color-brand-700', '#8a4b0f'))

    let width = 0
    let height = 0
    let dpr = 1
    let cols = 0
    let rows = 0
    let nodes = []
    let pulses = []
    let shockwaves = []
    let raf = 0
    let lastSpawn = 0
    let running = true

    /* Pointer is tracked on window so the canvas can stay pointer-events:none
       and never steal clicks from the hero's form. */
    const pointer = { x: -9999, y: -9999, active: false }

    function build() {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      /* Overscan by 3 in each direction: perspective pulls the far edges inward,
         so the lattice has to start wider than the viewport to fill it. */
      cols = Math.ceil(width / SPACING) + 3
      rows = Math.ceil(height / SPACING) + 3

      nodes = []
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const hx = (i - (cols - 1) / 2) * SPACING
          const hy = (j - (rows - 1) / 2) * SPACING
          /* A gentle standing wave on the home plane so the lattice reads as a
             surface in space rather than a flat grid. */
          const hz = Math.sin(i * 0.55) * Math.cos(j * 0.5) * 16
          nodes.push({ hx, hy, hz, x: hx, y: hy, z: hz, vx: 0, vy: 0, vz: 0, sx: 0, sy: 0, s: 1, glow: 0 })
        }
      }
      pulses = []
    }

    const at = (i, j) => nodes[j * cols + i]

    function spawnPulse() {
      if (pulses.length >= MAX_PULSES || cols < 4 || rows < 4) return
      const horizontal = Math.random() < 0.5
      if (horizontal) {
        const j = 1 + Math.floor(Math.random() * (rows - 2))
        pulses.push({ i: 0, j, di: 1, dj: 0, t: 0, len: cols - 1, speed: 0.0035 + Math.random() * 0.003 })
      } else {
        const i = 1 + Math.floor(Math.random() * (cols - 2))
        pulses.push({ i, j: 0, di: 0, dj: 1, t: 0, len: rows - 1, speed: 0.0035 + Math.random() * 0.003 })
      }
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active =
        pointer.x >= -60 && pointer.x <= width + 60 && pointer.y >= -60 && pointer.y <= height + 60
    }

    function onPointerLeave() {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    function onPointerDown(e) {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > width || y > height) return
      shockwaves.push({ x, y, born: performance.now() })
      if (shockwaves.length > 4) shockwaves.shift()
    }

    function frame(now) {
      if (!running) return

      const cx = width / 2
      const cy = height / 2

      /* Slow two-axis autorotation, nudged by pointer parallax. */
      const px = pointer.active ? (pointer.x / width - 0.5) : 0
      const py = pointer.active ? (pointer.y / height - 0.5) : 0
      const ry = Math.sin(now * 0.00012) * 0.3 + px * 0.28
      const rx = Math.sin(now * 0.00009) * 0.14 - py * 0.2

      const cosY = Math.cos(ry)
      const sinY = Math.sin(ry)
      const cosX = Math.cos(rx)
      const sinX = Math.sin(rx)

      /* Retire expired shockwaves. */
      shockwaves = shockwaves.filter((w) => now - w.born < SHOCKWAVE_LIFE)

      /* ── Physics + projection ────────────────────────────────────── */
      for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k]

        // 1. Spring back toward home (Hooke) with damping.
        n.vx += (n.hx - n.x) * SPRING
        n.vy += (n.hy - n.y) * SPRING
        n.vz += (n.hz - n.z) * SPRING

        // 2. Cursor force field, measured in screen space against last frame's
        //    projection — visually exact and far cheaper than un-projecting.
        if (pointer.active) {
          const dx = n.sx - pointer.x
          const dy = n.sy - pointer.y
          const d2 = dx * dx + dy * dy
          if (d2 < CURSOR_RADIUS * CURSOR_RADIUS) {
            const d = Math.sqrt(d2) || 1
            const falloff = 1 - d / CURSOR_RADIUS
            const f = falloff * falloff * CURSOR_STRENGTH
            n.vx += (dx / d) * f
            n.vy += (dy / d) * f
            n.vz += falloff * falloff * 5.5 // lift toward the viewer
          }
        }

        // 3. Gravitational shockwave: an expanding ring that displaces on pass.
        for (let w = 0; w < shockwaves.length; w++) {
          const wave = shockwaves[w]
          const age = ageOf(wave, now)
          const radius = age * SHOCKWAVE_SPEED
          const dx = n.sx - wave.x
          const dy = n.sy - wave.y
          const d = Math.sqrt(dx * dx + dy * dy) || 1
          const band = Math.abs(d - radius)
          if (band < 58) {
            const decay = 1 - age / SHOCKWAVE_LIFE
            const f = (1 - band / 58) * decay * decay * 3.4
            n.vx += (dx / d) * f
            n.vy += (dy / d) * f
            n.vz -= f * 3.2 // punched away from the viewer
          }
        }

        n.vx *= DAMPING
        n.vy *= DAMPING
        n.vz *= DAMPING
        n.x += n.vx
        n.y += n.vy
        n.z += n.vz

        // Rotate (Y then X), then perspective-project.
        const x1 = n.x * cosY + n.z * sinY
        const z1 = -n.x * sinY + n.z * cosY
        const y2 = n.y * cosX - z1 * sinX
        const z2 = n.y * sinX + z1 * cosX

        const s = FOCAL / (FOCAL + z2)
        n.s = s
        n.sx = cx + x1 * s
        n.sy = cy + y2 * s
        n.glow *= 0.9
      }

      /* ── Pulses travel the lattice and brighten what they cross ──── */
      if (now - lastSpawn > 620) {
        spawnPulse()
        lastSpawn = now
      }

      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p]
        pulse.t += pulse.speed * pulse.len * 16
        if (pulse.t >= pulse.len) {
          pulses.splice(p, 1)
          continue
        }
        const idx = Math.floor(pulse.t)
        const frac = pulse.t - idx
        const a = at(pulse.i + pulse.di * idx, pulse.j + pulse.dj * idx)
        const b = at(pulse.i + pulse.di * (idx + 1), pulse.j + pulse.dj * (idx + 1))
        if (!a || !b) {
          pulses.splice(p, 1)
          continue
        }
        pulse.px = a.sx + (b.sx - a.sx) * frac
        pulse.py = a.sy + (b.sy - a.sy) * frac
        pulse.ps = a.s + (b.s - a.s) * frac
        a.glow = Math.max(a.glow, 1 - frac)
        b.glow = Math.max(b.glow, frac)
      }

      /* ── Draw ────────────────────────────────────────────────────── */
      ctx.clearRect(0, 0, width, height)

      // Edges: right and down neighbours only, so each is drawn once.
      ctx.lineWidth = 1
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const n = at(i, j)
          const depth = Math.max(0, Math.min(1, (n.s - 0.75) / 0.55))
          const alpha = 0.07 + depth * 0.26

          if (i < cols - 1) {
            const r = at(i + 1, j)
            ctx.strokeStyle = `rgba(${EDGE[0]},${EDGE[1]},${EDGE[2]},${alpha})`
            ctx.beginPath()
            ctx.moveTo(n.sx, n.sy)
            ctx.lineTo(r.sx, r.sy)
            ctx.stroke()
          }
          if (j < rows - 1) {
            const d = at(i, j + 1)
            ctx.strokeStyle = `rgba(${EDGE[0]},${EDGE[1]},${EDGE[2]},${alpha})`
            ctx.beginPath()
            ctx.moveTo(n.sx, n.sy)
            ctx.lineTo(d.sx, d.sy)
            ctx.stroke()
          }
        }
      }

      // Nodes, sized and lit by depth plus any pulse glow.
      for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k]
        const depth = Math.max(0, Math.min(1, (n.s - 0.75) / 0.55))
        const r = (0.7 + depth * 1.3) * (1 + n.glow * 1.5)
        const alpha = 0.18 + depth * 0.4 + n.glow * 0.55
        const c = n.glow > 0.15 ? HOT : NODE
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${Math.min(1, alpha)})`
        ctx.beginPath()
        ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Pulse heads, with a soft halo.
      for (let p = 0; p < pulses.length; p++) {
        const pulse = pulses[p]
        if (pulse.px == null) continue
        const r = 2.2 * (pulse.ps || 1)
        const grad = ctx.createRadialGradient(pulse.px, pulse.py, 0, pulse.px, pulse.py, r * 7)
        grad.addColorStop(0, `rgba(${HOT[0]},${HOT[1]},${HOT[2]},0.42)`)
        grad.addColorStop(1, `rgba(${HOT[0]},${HOT[1]},${HOT[2]},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(pulse.px, pulse.py, r * 7, 0, Math.PI * 2)
        ctx.fill()

        /* A dark core, not a white one — on white paper the packet has to be
           the darkest thing on screen to read as the head of the pulse. */
        ctx.fillStyle = `rgba(${HOT[0]},${HOT[1]},${HOT[2]},0.95)`
        ctx.beginPath()
        ctx.arc(pulse.px, pulse.py, r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Shockwave rings, so the click reads as cause and not coincidence.
      for (let w = 0; w < shockwaves.length; w++) {
        const wave = shockwaves[w]
        const age = ageOf(wave, now)
        const radius = age * SHOCKWAVE_SPEED
        const decay = 1 - age / SHOCKWAVE_LIFE
        ctx.strokeStyle = `rgba(${HOT[0]},${HOT[1]},${HOT[2]},${decay * decay * 0.45})`
        ctx.lineWidth = 1.6 * decay
        ctx.beginPath()
        ctx.arc(wave.x, wave.y, radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      raf = requestAnimationFrame(frame)
    }

    /* A single settled frame for anyone who asked for reduced motion. */
    function drawStatic() {
      const cx = width / 2
      const cy = height / 2
      ctx.clearRect(0, 0, width, height)
      for (const n of nodes) {
        const s = FOCAL / (FOCAL + n.hz)
        n.sx = cx + n.hx * s
        n.sy = cy + n.hy * s
        n.s = s
      }
      ctx.strokeStyle = `rgba(${EDGE[0]},${EDGE[1]},${EDGE[2]},0.22)`
      ctx.lineWidth = 1
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const n = at(i, j)
          if (i < cols - 1) {
            const r = at(i + 1, j)
            ctx.beginPath()
            ctx.moveTo(n.sx, n.sy)
            ctx.lineTo(r.sx, r.sy)
            ctx.stroke()
          }
          if (j < rows - 1) {
            const d = at(i, j + 1)
            ctx.beginPath()
            ctx.moveTo(n.sx, n.sy)
            ctx.lineTo(d.sx, d.sy)
            ctx.stroke()
          }
        }
      }
      ctx.fillStyle = `rgba(${NODE[0]},${NODE[1]},${NODE[2]},0.42)`
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.sx, n.sy, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function start() {
      cancelAnimationFrame(raf)
      build()
      if (motionQuery.matches) {
        drawStatic()
      } else {
        raf = requestAnimationFrame(frame)
      }
    }

    /* Pause when scrolled out of view — no reason to burn a GPU on an
       animation nobody is looking at. */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!running) {
            running = true
            if (!motionQuery.matches) raf = requestAnimationFrame(frame)
          }
        } else {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const ro = new ResizeObserver(() => start())
    ro.observe(canvas)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    motionQuery.addEventListener('change', start)

    start()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerleave', onPointerLeave)
      motionQuery.removeEventListener('change', start)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
