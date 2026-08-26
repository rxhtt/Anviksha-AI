import { useEffect, useMemo, useRef, useState } from 'react'
import { useSpring, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import { IconClock, IconFlame, IconScale, IconHeart, IconReport } from '../components/Icons.jsx'

/**
 * Interactive illustration of the product's core claim: the same person has more
 * than one possible ten-year path, and early action is what separates them.
 *
 * IMPORTANT — this is a demonstration model, not a clinical one. The weights below
 * are made up for the purpose of showing the interaction; they are disclosed in the
 * <details> block at the bottom of the section so a reader can see exactly what the
 * curve is doing. Nothing here should read as a prediction about a real person.
 *
 * Series colours are measured against the white surface with the dataviz
 * validator, not chosen by eye. The first attempt — rust vs olive — failed
 * hard: ΔE 3.8 under deuteranopia, which is the classic red/green collapse.
 * With blue ruled out, the one hue axis that survives red/green CVD is gone,
 * so the separation has to come from LIGHTNESS instead — a dark rust against
 * a bright amber, which clears the validator's CVD, lightness-band, chroma
 * and normal-vision checks on a #ffffff surface.
 *
 * The bright amber sits at 2.15:1 on white, which the validator flags as a
 * contrast WARN. That is not dismissable — it obliges visible labels or a
 * table. Both are already here: each line carries its end value in ink, the
 * legend names both series at all times and mirrors the dash, and the table
 * below repeats every value. Identity never rests on colour alone.
 */

const REACTIVE = { key: 'reactive', label: 'If nothing changes', color: '#9a3412', dash: '6 4' }
const PREVENTIVE = { key: 'preventive', label: 'With early action', color: '#f59e0b', dash: null }

const HABITS = [
  { id: 'sleep', Icon: IconClock, label: 'Consistent sleep', detail: '7–8 h in the same window', weight: 11 },
  { id: 'activity', Icon: IconFlame, label: 'Weekly activity', detail: '150 min of moderate movement', weight: 13 },
  { id: 'nutrition', Icon: IconScale, label: 'Balanced nutrition', detail: 'More fibre, less refined sugar', weight: 10 },
  { id: 'stress', Icon: IconHeart, label: 'Stress & recovery', detail: 'Tracked load, real downtime', weight: 8 },
  { id: 'screening', Icon: IconReport, label: 'Annual screening', detail: 'Baseline bloodwork every year', weight: 12 },
]
const MAX_WEIGHT = HABITS.reduce((s, h) => s + h.weight, 0) /* 54 */

/* ---- geometry -------------------------------------------------------------
   The viewBox is sized to the measured container, so one user unit is one CSS
   pixel. An SVG otherwise scales its whole coordinate system along with its
   box: a fixed 640-unit viewBox renders its 11px axis labels at about 5px on a
   phone. Sizing the coordinate system to the box instead keeps 2px strokes,
   10px markers and 11px labels at exactly those sizes on every screen, and lets
   only the plot's proportions adapt. */
const Y_MAX = 80
const HORIZON = 10
const STEPS = 41 /* 41 points over 10 years → whole year y sits at index 4y */
const BASE = 18
const REACTIVE_END = 72
const REACTIVE_EXP = 1.7

function layout(w) {
  const narrow = w < 420
  const fs = { tick: narrow ? 10 : 11, title: narrow ? 9 : 10, end: narrow ? 11 : 12 }
  /* Taller in proportion as it narrows, so the curve keeps vertical room on a
     phone, but clamped so it never becomes a letterbox or a tower. */
  const h = Math.min(300, Math.max(230, Math.round(w * 0.62)))
  return {
    vb: { w, h },
    fs,
    plot: {
      l: fs.tick * 2 + 14 /* a two-digit y label plus its gap */,
      r: w - 14,
      t: 24,
      b: h - (fs.tick + 22) /* the x-axis band */,
    },
  }
}

const xAt = (g, t) => g.plot.l + (t / HORIZON) * (g.plot.r - g.plot.l)
const yAt = (g, v) => g.plot.b - (v / Y_MAX) * (g.plot.b - g.plot.t)

function curve(end, exp) {
  return Array.from({ length: STEPS }, (_, i) => {
    const f = i / (STEPS - 1)
    return BASE + (end - BASE) * Math.pow(f, exp)
  })
}
const toPath = (g, vals) =>
  vals
    .map(
      (v, i) =>
        `${i ? 'L' : 'M'}${xAt(g, (i / (STEPS - 1)) * HORIZON).toFixed(1)} ${yAt(g, v).toFixed(1)}`,
    )
    .join(' ')

const REACTIVE_VALS = curve(REACTIVE_END, REACTIVE_EXP)
const Y_TICKS = [0, 20, 40, 60, 80]
const X_TICKS = [0, 2, 4, 6, 8, 10]

/* The legend key mirrors the line it stands for, dash included. */
const keyStyle = (s) =>
  s.dash
    ? { backgroundImage: `repeating-linear-gradient(90deg, ${s.color} 0 5px, transparent 5px 8px)` }
    : { background: s.color }

export default function Trajectory() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(() => new Set(['sleep', 'activity']))
  const [year, setYear] = useState(HORIZON)
  const [showTable, setShowTable] = useState(false)

  /* contentRect excludes the wrapper's padding, so this is the width the SVG
     actually gets. Starts at a desktop guess and is corrected before paint. */
  const plotRef = useRef(null)
  const [g, setG] = useState(() => layout(760))
  useEffect(() => {
    const el = plotRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width)
      if (w > 0) setG((prev) => (prev.vb.w === w ? prev : layout(w)))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const weight = HABITS.reduce((s, h) => (active.has(h.id) ? s + h.weight : s), 0)

  /* Settled targets. All *numbers* on screen come from these, so the readout never
     flickers mid-transition; only the drawn path follows the spring. */
  const end = REACTIVE_END - weight
  const exp = REACTIVE_EXP - 0.55 * (weight / MAX_WEIGHT)
  const vals = useMemo(() => curve(end, exp), [end, exp])

  const endMV = useSpring(end, { stiffness: 90, damping: 18 })
  const expMV = useSpring(exp, { stiffness: 90, damping: 18 })
  const [anim, setAnim] = useState({ end, exp })
  useEffect(() => {
    endMV.set(end)
    expMV.set(exp)
  }, [end, exp, endMV, expMV])
  useMotionValueEvent(endMV, 'change', (v) => setAnim((a) => ({ ...a, end: v })))
  useMotionValueEvent(expMV, 'change', (v) => setAnim((a) => ({ ...a, exp: v })))

  const drawn = reduced ? vals : curve(anim.end, anim.exp)
  const preventivePath = toPath(g, drawn)
  const reactivePath = useMemo(() => toPath(g, REACTIVE_VALS), [g])
  /* Avoided-risk band: down the upper path, back along the lower one. */
  const bandPath = (() => {
    const at = (i, v) =>
      `${xAt(g, (i / (STEPS - 1)) * HORIZON).toFixed(1)} ${yAt(g, v).toFixed(1)}`
    const down = REACTIVE_VALS.map((v, i) => at(i, v))
    const back = drawn.map((v, i) => at(i, v)).reverse()
    return `M${down.join(' L')} L${back.join(' L')} Z`
  })()

  const idx = year * 4
  const readout = [
    { ...REACTIVE, value: REACTIVE_VALS[idx] },
    { ...PREVENTIVE, value: vals[idx] },
  ]
  const gapNow = REACTIVE_VALS[idx] - vals[idx]

  /* End-labels are only drawn when the two endpoints are far enough apart to stay
     attached to their own line; otherwise the legend carries identity on its own.
     Expressed in multiples of the label's own size, so it holds at any width. */
  const endGap = yAt(g, vals[STEPS - 1]) - yAt(g, REACTIVE_VALS[STEPS - 1])
  const showEndLabels = endGap >= 2.4 * g.fs.end

  function toggle(id) {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function onPlotMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    const svgX = ((e.clientX - r.left) / r.width) * g.vb.w
    const t = ((svgX - g.plot.l) / (g.plot.r - g.plot.l)) * HORIZON
    setYear(Math.max(0, Math.min(HORIZON, Math.round(t))))
  }

  const crossX = xAt(g, year)

  return (
    <section id="trajectory" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-700">
            Try it yourself
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] text-ink-900 sm:text-5xl">
            A test result is a dot. Your health is a{' '}
            <span className="italic text-brand-700">direction.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">
            Reports tell you where you are today. What actually decides your next decade is the
            slope you are on — and which habits bend it. Switch a few on and watch the two paths
            separate.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 rounded-3xl border border-line bg-paper-50 p-5 sm:p-7">
            {/* Controls — one row above everything they scope */}
            <fieldset>
              <legend className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Habits in place
              </legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {HABITS.map(({ id, Icon, label, detail, weight: w }) => {
                  const on = active.has(id)
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggle(id)}
                      aria-pressed={on}
                      title={`${detail} · −${w} points at year 10`}
                      className={`group flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-colors duration-200 ${
                        on
                          ? 'border-brand-500/60 bg-brand-100 text-ink-900'
                          : 'border-line bg-paper text-ink-700 hover:border-ink-400 hover:text-ink-900'
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                          on ? 'text-brand-700' : 'text-ink-400'
                        }`}
                      />
                      <span className="text-sm font-semibold">{label}</span>
                      <span
                        aria-hidden="true"
                        className={`ml-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${
                          on ? 'border-brand-600 bg-brand-600' : 'border-ink-400'
                        }`}
                      >
                        {on && (
                          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-paper" aria-hidden="true">
                            <path
                              d="M1.5 5.2 4 7.6 8.5 2.6"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_15rem]">
              {/* ---- plot ---- */}
              <div ref={plotRef} className="relative rounded-2xl border border-line bg-paper p-1">
                <svg
                  viewBox={`0 0 ${g.vb.w} ${g.vb.h}`}
                  className="block h-auto w-full"
                  role="img"
                  aria-label={`Illustrative risk index over ten years. If nothing changes, it rises from ${BASE} to ${REACTIVE_END}. With the ${active.size} selected habits, it reaches ${Math.round(end)} instead. Full values are in the data table below.`}
                >
                  {/* gridlines — solid hairlines, one step off the surface */}
                  {Y_TICKS.map((v) => (
                    <line
                      key={v}
                      x1={g.plot.l}
                      x2={g.plot.r}
                      y1={yAt(g, v)}
                      y2={yAt(g, v)}
                      stroke="rgba(18,16,14,0.10)"
                      strokeWidth="1"
                    />
                  ))}
                  {Y_TICKS.map((v) => (
                    <text
                      key={`t${v}`}
                      x={g.plot.l - 10}
                      y={yAt(g, v) + g.fs.tick * 0.36}
                      textAnchor="end"
                      fontSize={g.fs.tick}
                      className="fill-ink-500 [font-variant-numeric:tabular-nums]"
                    >
                      {v}
                    </text>
                  ))}
                  {X_TICKS.map((t) => (
                    <text
                      key={`x${t}`}
                      x={xAt(g, t)}
                      y={g.plot.b + g.fs.tick + 12}
                      textAnchor="middle"
                      fontSize={g.fs.tick}
                      className="fill-ink-500 [font-variant-numeric:tabular-nums]"
                    >
                      {t === 0 ? 'Now' : `${t}y`}
                    </text>
                  ))}
                  <text
                    x={g.plot.l}
                    y={g.plot.t - 9}
                    textAnchor="start"
                    fontSize={g.fs.title}
                    className="fill-ink-500 font-semibold uppercase tracking-[0.14em]"
                  >
                    Illustrative risk index
                  </text>

                  {/* the avoided-risk band between the two paths. Amber is far lighter
                      than the rust above it, so the band needs more alpha than a
                      mid-tone fill would to register on white at all. */}
                  <path d={bandPath} fill={PREVENTIVE.color} opacity="0.18" />

                  {/* crosshair */}
                  <line
                    x1={crossX}
                    x2={crossX}
                    y1={g.plot.t}
                    y2={g.plot.b}
                    stroke="rgba(18,16,14,0.22)"
                    strokeWidth="1"
                  />

                  {/* Preventive first, reactive on top: with no habits selected the two
                      paths coincide exactly, and "if nothing changes" is the honest
                      line to leave visible. The dash rides the DARK series on purpose
                      — dashes cut ink coverage, and the bright amber has none to spare
                      on white. */}
                  <path
                    d={preventivePath}
                    fill="none"
                    stroke={PREVENTIVE.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={reactivePath}
                    fill="none"
                    stroke={REACTIVE.color}
                    strokeWidth="2"
                    strokeDasharray={REACTIVE.dash}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* crosshair markers — 2px surface ring keeps them legible on crossing */}
                  {[...readout].reverse().map((s) => (
                    <circle
                      key={s.key}
                      cx={crossX}
                      cy={yAt(g, s.value)}
                      r="5"
                      fill={s.color}
                      stroke="var(--color-paper)"
                      strokeWidth="2"
                    />
                  ))}

                  {showEndLabels &&
                    readout.map((s) => (
                      <text
                        key={`e${s.key}`}
                        x={g.plot.r - 4}
                        y={
                          yAt(g, s.key === REACTIVE.key ? REACTIVE_VALS[STEPS - 1] : vals[STEPS - 1]) -
                          11
                        }
                        textAnchor="end"
                        fontSize={g.fs.end}
                        className="fill-ink-900 font-bold [font-variant-numeric:tabular-nums]"
                      >
                        {Math.round(s.key === REACTIVE.key ? REACTIVE_END : end)}
                      </text>
                    ))}

                  {/* hit layer — full plot, so the pointer only needs the right X */}
                  <rect
                    x={g.plot.l}
                    y={g.plot.t}
                    width={g.plot.r - g.plot.l}
                    height={g.plot.b - g.plot.t}
                    fill="transparent"
                    onPointerMove={onPlotMove}
                    style={{ cursor: 'crosshair' }}
                  />
                </svg>

              </div>

              {/* ---- readout rail ----
                  This doubles as the legend: both series are named here at all times
                  with their line-key, so identity never depends on colour alone, and
                  keeping it out of the plot means it cannot cover an axis or a mark. */}
              <div className="flex flex-col gap-5">
                <div className="rounded-2xl border border-line bg-paper p-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">
                    {year === 0 ? 'Today' : `Year ${year}`}
                  </p>
                  <ul className="mt-3.5 space-y-3">
                    {readout.map((s) => (
                      <li key={s.key} className="flex items-baseline gap-2.5">
                        <span
                          aria-hidden="true"
                          className="relative top-[-0.3rem] h-0.5 w-4 shrink-0 rounded-full"
                          style={keyStyle(s)}
                        />
                        <span className="w-8 text-xl font-bold leading-none text-ink-900 [font-variant-numeric:tabular-nums]">
                          {Math.round(s.value)}
                        </span>
                        <span className="text-xs leading-snug text-ink-500">{s.label}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 border-t border-line pt-4">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">
                      Gap
                    </p>
                    <p className="mt-1.5 text-4xl font-extrabold leading-none text-ink-900">
                      {Math.round(gapNow)}
                      <span className="ml-1.5 text-base font-bold text-ink-500">pts</span>
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-ink-700">
                      {gapNow < 1
                        ? 'Both paths are identical. Switch on a habit to separate them.'
                        : 'Distance between the two paths on this illustrative index.'}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="traj-year"
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500"
                  >
                    Inspect year
                  </label>
                  <input
                    id="traj-year"
                    type="range"
                    min="0"
                    max={HORIZON}
                    step="1"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="mt-2.5 w-full cursor-pointer accent-brand-600"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowTable((v) => !v)}
                  aria-expanded={showTable}
                  aria-controls="traj-table"
                  className="mt-auto cursor-pointer self-start rounded-lg border border-line bg-paper px-3 py-2 text-xs font-semibold text-ink-700 transition-colors duration-200 hover:border-ink-400 hover:text-ink-900"
                >
                  {showTable ? 'Hide data table' : 'Show data table'}
                </button>
              </div>
            </div>

            {/* accessible twin — every plotted value, no hovering required */}
            {showTable && (
              <div id="traj-table" className="mt-7 overflow-x-auto">
                <table className="w-full min-w-[30rem] border-collapse text-sm">
                  <caption className="pb-3 text-left text-xs text-ink-500">
                    Illustrative risk index by year, for the {active.size} selected habit
                    {active.size === 1 ? '' : 's'}.
                  </caption>
                  <thead>
                    <tr className="border-b border-line text-left">
                      <th scope="col" className="py-2.5 pr-4 font-semibold text-ink-500">Year</th>
                      <th scope="col" className="py-2.5 pr-4 font-semibold text-ink-500">
                        {REACTIVE.label}
                      </th>
                      <th scope="col" className="py-2.5 pr-4 font-semibold text-ink-500">
                        {PREVENTIVE.label}
                      </th>
                      <th scope="col" className="py-2.5 font-semibold text-ink-500">Gap</th>
                    </tr>
                  </thead>
                  <tbody className="[font-variant-numeric:tabular-nums]">
                    {Array.from({ length: HORIZON + 1 }, (_, y) => (
                      <tr key={y} className="border-b border-line">
                        <th scope="row" className="py-2 pr-4 text-left font-medium text-ink-700">
                          {y === 0 ? 'Now' : y}
                        </th>
                        <td className="py-2 pr-4 text-ink-900">{Math.round(REACTIVE_VALS[y * 4])}</td>
                        <td className="py-2 pr-4 text-ink-900">{Math.round(vals[y * 4])}</td>
                        <td className="py-2 text-ink-900">
                          {Math.round(REACTIVE_VALS[y * 4] - vals[y * 4])}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* the honesty block */}
            <details className="group mt-7 border-t border-line pt-5">
              <summary className="cursor-pointer list-none text-xs font-semibold text-ink-500 transition-colors duration-200 hover:text-brand-700">
                <span className="underline decoration-ink-400 underline-offset-2">
                  How this illustration is calculated
                </span>
                <span aria-hidden="true" className="ml-1.5 inline-block group-open:hidden">+</span>
                <span aria-hidden="true" className="ml-1.5 hidden group-open:inline-block">−</span>
              </summary>
              <div className="mt-4 max-w-2xl space-y-3 text-xs leading-relaxed text-ink-700">
                <p>
                  <strong className="text-ink-900">This is a demonstration, not a prediction.</strong>{' '}
                  The numbers are invented to show how the interaction works. They are not derived
                  from clinical data and they do not describe you or anyone else.
                </p>
                <p>
                  Both curves are{' '}
                  <code className="rounded bg-paper-100 px-1.5 py-0.5 font-mono text-ink-900">
                    18 + (end − 18) · (year/10)^k
                  </code>
                  . The upper path is fixed at end&nbsp;=&nbsp;72, k&nbsp;=&nbsp;1.7. Each habit you
                  switch on subtracts a fixed number of points from the lower path&apos;s endpoint —
                  {' '}
                  {HABITS.map((h, i) => (
                    <span key={h.id}>
                      {i > 0 && ', '}
                      {h.label.toLowerCase()} {h.weight}
                    </span>
                  ))}{' '}
                  — and flattens its curve toward k&nbsp;=&nbsp;1.15. All five gives back the full{' '}
                  {MAX_WEIGHT} points, which is why the line goes flat.
                </p>
                <p>
                  The real product works the other way around: it reads your own history, reports,
                  and day-to-day signals rather than a slider. Anviksha is not a medical device and
                  does not diagnose.
                </p>
              </div>
            </details>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
