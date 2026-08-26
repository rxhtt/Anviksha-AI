import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'

const LINKS = [
  { label: 'The problem', href: '#problem' },
  { label: 'How it works', href: '#how' },
  { label: 'Try it', href: '#trajectory' },
  { label: 'FAQ', href: '#faq' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  /* Close the mobile sheet on Escape. */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-4 top-4 z-50 mx-auto max-w-6xl">
      {/* A hairline plus a soft lift: on white, a border alone doesn't separate
          the bar from the content scrolling under it. */}
      <nav
        aria-label="Main"
        className="rounded-2xl border border-line bg-paper/85 shadow-[0_10px_30px_-22px_rgba(18,16,14,0.4)] backdrop-blur-md"
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Anviksha home">
            <Logo className="h-7 w-8 text-ink-900" />
            <span className="font-mono text-sm font-semibold tracking-[0.24em] text-ink-900">
              ANVIKSHA
            </span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="cursor-pointer text-sm font-medium text-ink-500 transition-colors duration-200 hover:text-ink-900"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#waitlist"
              className="hidden cursor-pointer rounded-xl bg-ink-900 px-4 py-2 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-ink-700 sm:inline-block"
            >
              Get early access
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="cursor-pointer rounded-lg p-2 text-ink-500 transition-colors duration-200 hover:text-ink-900 md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <ul id="mobile-menu" className="border-t border-line px-4 py-3 md:hidden">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block cursor-pointer py-2.5 text-sm font-medium text-ink-500 transition-colors duration-200 hover:text-ink-900"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <a
                href="#waitlist"
                onClick={() => setOpen(false)}
                className="block cursor-pointer rounded-xl bg-ink-900 px-4 py-2.5 text-center text-sm font-semibold text-paper"
              >
                Get early access
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  )
}
