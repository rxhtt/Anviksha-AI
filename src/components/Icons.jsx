/**
 * Icon set — uniform 24x24 viewBox, 1.6 stroke, currentColor.
 * Lucide-style geometry so every glyph reads as one family. No emoji.
 */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function IconClock({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5l3 2" />
    </svg>
  )
}

export function IconCost({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M8 4h8" />
      <path d="M8 8h8" />
      <path d="M13.5 20 7 13h3a4 4 0 0 0 0-8" />
    </svg>
  )
}

export function IconFragmented({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="5.5" width="6" height="6" rx="1.5" />
      <rect x="4.5" y="15" width="6" height="6" rx="1.5" />
      <rect x="14.5" y="15.5" width="5.5" height="5.5" rx="1.5" />
    </svg>
  )
}

export function IconUnderstand({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M3 12h3.5l2-4.5 3 9 2.5-6 1.8 3.5H21" />
    </svg>
  )
}

export function IconMonitor({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 12V8" />
      <path d="M12 12l3.5 2" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconPrevent({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l7 3v6c0 4.2-2.9 7.7-7 9-4.1-1.3-7-4.8-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function IconCpu({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10.5 10.5h3v3h-3z" />
      <path d="M10 3v2M14 3v2M10 19v2M14 19v2M3 10h2M3 14h2M19 10h2M19 14h2" />
    </svg>
  )
}

export function IconTrend({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  )
}

export function IconHeart({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M20.4 6.6a5 5 0 0 0-7.1 0L12 7.9l-1.3-1.3a5 5 0 1 0-7.1 7.1L12 21l8.4-7.3a5 5 0 0 0 0-7.1z" />
      <path d="M6 12.5h3l1.5-2 2 3.5 1.5-2h3" />
    </svg>
  )
}

export function IconPin({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export function IconArrowRight({ className = 'h-5 w-5' }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

/* — "Today's health apps" row: Count, Calories, Reports, Reminders — */

export function IconScale({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8v3" />
      <circle cx="12" cy="13.5" r="3" />
    </svg>
  )
}

export function IconFlame({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3c3 3.5 5.5 5.8 5.5 9a5.5 5.5 0 1 1-11 0c0-2 1-3.6 2.5-5" />
      <path d="M12 18a2.5 2.5 0 0 0 2.5-2.5c0-1.4-1.2-2.3-2.5-4-1.3 1.7-2.5 2.6-2.5 4A2.5 2.5 0 0 0 12 18z" />
    </svg>
  )
}

export function IconReport({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 17v-3M12 17v-5M15 17v-2" />
    </svg>
  )
}

export function IconBell({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M18 9a6 6 0 1 0-12 0c0 4-2 5-2 5h16s-2-1-2-5z" />
      <path d="M10.5 18a1.8 1.8 0 0 0 3 0" />
    </svg>
  )
}
