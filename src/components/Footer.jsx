import Logo from './Logo.jsx'

const PARTNER_MAILTO =
  'mailto:anviksha.health@gmail.com' +
  '?subject=Partnership%20%2F%20investment%20enquiry' +
  '&body=Hello%2C%0A%0AI%27m%20reaching%20out%20about%20Anviksha%20regarding%3A%0A' +
  '%E2%80%A2%20Clinical%20mentorship%0A%E2%80%A2%20Pilot%20hospital%20or%20strategic%20partnership%0A' +
  '%E2%80%A2%20Product%20validation%0A%0A'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-100">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Logo className="h-7 w-8 text-ink-900" />
              <span className="font-mono text-sm font-semibold tracking-[0.24em] text-ink-900">
                ANVIKSHA
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-700">
              Know Better. Live Better. India&apos;s AI preventive healthcare platform.
            </p>
            <a
              href="mailto:anviksha.health@gmail.com"
              className="mt-4 inline-block cursor-pointer text-sm text-ink-700 transition-colors duration-200 hover:text-brand-700"
            >
              anviksha.health@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Product
              </h2>
              <ul className="mt-4 space-y-2.5">
                {[
                  { label: 'The problem', href: '#problem' },
                  { label: 'How it works', href: '#how' },
                  { label: 'Why now', href: '#why-now' },
                  { label: 'Get early access', href: '#waitlist' },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="cursor-pointer text-sm text-ink-700 transition-colors duration-200 hover:text-ink-900"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="max-w-xs">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Partners &amp; investors
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-700">
                We&apos;re looking for clinical mentorship, pilot hospitals, and product
                validation partners.
              </p>
              <a
                href={PARTNER_MAILTO}
                className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors duration-200 hover:text-ink-900"
              >
                Get in touch
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <p className="text-xs leading-relaxed text-ink-500">
            Anviksha provides wellness and lifestyle insights for informational purposes only. It
            is not a medical device and is not a substitute for professional medical advice,
            diagnosis, or treatment. Always consult a qualified healthcare provider about your
            health.
          </p>
          <p className="mt-4 text-xs text-ink-500">
            © {new Date().getFullYear()} Anviksha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
