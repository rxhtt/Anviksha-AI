import { useState } from 'react'

/**
 * Email capture. No backend wired yet — `submit()` is the single place to
 * drop in your provider call (Formspree / Resend / Supabase / your own API).
 * Until then it validates, shows pending + success states, and keeps the
 * address in local state so nothing is silently lost.
 */
export default function WaitlistForm({ id = 'waitlist', size = 'md' }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | pending | done | error
  const [error, setError] = useState('')

  const pad = size === 'lg' ? 'py-4 text-base' : 'py-3.5 text-base'

  async function submit(e) {
    e.preventDefault()
    setError('')

    const value = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setState('error')
      setError('Please enter a valid email address.')
      return
    }

    setState('pending')
    try {
      // TODO: POST `value` to your waitlist endpoint here.
      await new Promise((r) => setTimeout(r, 600))
      setState('done')
    } catch {
      setState('error')
      setError('Something went wrong. Please try again, or email us directly.')
    }
  }

  if (state === 'done') {
    return (
      <div
        id={id}
        role="status"
        className="max-w-lg scroll-mt-28 rounded-xl border border-brand-500/40 bg-brand-100 px-5 py-4"
      >
        <p className="font-semibold text-ink-900">You&apos;re on the list.</p>
        <p className="mt-1 text-sm text-ink-700">
          We&apos;ll email {email} when early access opens.
        </p>
      </div>
    )
  }

  return (
    <div id={id} className="max-w-lg scroll-mt-28">
      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={submit} noValidate>
        <div className="flex-1">
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${id}-email`}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (state === 'error') setState('idle')
            }}
            aria-invalid={state === 'error'}
            aria-describedby={error ? `${id}-error` : undefined}
            /* placeholder sits at ink-500, not ink-400 — a 2.7:1 placeholder is
               decoration, and this one has to be readable as a hint. */
            className={`w-full rounded-xl border bg-paper px-4 ${pad} text-ink-900 placeholder:text-ink-500 transition-colors duration-200 ${
              state === 'error' ? 'border-red-500' : 'border-line hover:border-ink-400'
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={state === 'pending'}
          className={`cursor-pointer rounded-xl bg-ink-900 px-6 ${pad} font-semibold text-paper transition-colors duration-200 hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {state === 'pending' ? 'Joining…' : 'Get early access'}
        </button>
      </form>

      {/* Reserve the line so validation text never shifts the layout. */}
      <p
        id={`${id}-error`}
        role={state === 'error' ? 'alert' : undefined}
        className="mt-3 min-h-[1.25rem] text-sm"
      >
        {error ? (
          <span className="text-red-700">{error}</span>
        ) : (
          <span className="text-ink-500">
            Free to start. Built for ages 18–35. No spam, unsubscribe anytime.
          </span>
        )}
      </p>
    </div>
  )
}
