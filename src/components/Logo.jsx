/**
 * Anviksha mark — a redraw of the supplied logo as flat vector geometry.
 *
 * The mark is an "A" with no crossbar (two legs meeting at a pointed apex,
 * open at the foot), crossed by a rising swoosh, with a stem dropping to the
 * baseline. The triangular counter near the apex is not a separate shape: it
 * is the notch between the two legs, showing above the swoosh that cuts
 * across it. That is also what produces the three feet on the baseline — the
 * swoosh's tail and the left leg merge into one wide foot on the left, the
 * stem lands in the middle, and the right leg lands on the right.
 *
 * Drawn as filled paths rather than strokes so the terminals can taper: the
 * swoosh is thick where it leaves the baseline and thin where it exits past
 * the right leg, which is what gives the mark its sense of direction.
 *
 * currentColor throughout, so the mark inherits whatever ink it sits in and
 * can never drift out of the theme. The source raster is kept in brand/ at
 * the repo root — deliberately outside public/, so a 1.5 MB PNG is not
 * copied into every build.
 */
export default function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg
      viewBox="0 0 104 92"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* the A: apex, right leg, notch, left leg */}
      <path d="M50 6 L95 86 L79 86 L50 26 L21 86 L5 86 Z" />
      {/* the rising swoosh, tapering left-to-right */}
      <path d="M5 86 C7 64, 24 50, 50 45 C72 41, 86 40, 98 39 L98 45 C84 46, 70 48, 52 53 C32 59, 21 70, 21 86 Z" />
      {/* centre stem */}
      <path d="M45 48 L54 48 L54 86 L45 86 Z" />
    </svg>
  )
}
