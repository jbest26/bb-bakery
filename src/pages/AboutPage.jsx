import { useState } from 'react'
import { supabase } from '../lib/supabase'

/* ═══════════════════════════════════════════════════════════════════════════════
   Comparison table data
   ═══════════════════════════════════════════════════════════════════════════════ */
const COMPARISON_ROWS = [
  { what: 'Made by hand',        bb: '✓ Every loaf',       shelf: '✗ Industrial' },
  { what: 'Fermentation time',   bb: '48–72 hours',         shelf: '2–4 hours' },
  { what: 'Ingredients',         bb: 'Flour, water, salt',  shelf: '10–20+ additives' },
  { what: 'Preservatives',       bb: 'None',                shelf: 'Usually yes' },
  { what: 'Freshness',           bb: 'Baked that morning',  shelf: 'Days old at best' },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   Stay in the loop — signup form → Supabase "signups" table
   ═══════════════════════════════════════════════════════════════════════════════ */
function SignupForm() {
  const [phase, setPhase] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [form, setForm]   = useState({ name: '', phone: '' })
  const [errMsg, setErr]  = useState('')

  const field = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setPhase('submitting')
    setErr('')

    const { error } = await supabase.from('signups').insert({
      name:  form.name.trim(),
      phone: form.phone.trim(),
    })

    if (error) {
      console.error(error)
      setErr('Something went wrong — try again or just text us.')
      setPhase('error')
      return
    }

    setPhase('success')
  }

  const inputCls =
    'w-full rounded-xl border border-bb-brown/12 bg-bb-card px-4 py-3 ' +
    'text-bb-brown placeholder:text-bb-brown/30 ' +
    'focus:outline-none focus:ring-2 focus:ring-bb-terra/40 transition'

  if (phase === 'success') {
    return (
      <div className="rounded-2xl bg-bb-card ring-1 ring-bb-olive/20 p-6 text-center animate-slide-down">
        <p className="text-3xl mb-2">🎉</p>
        <p className="font-fraunces text-xl text-bb-brown">You're on the list!</p>
        <p className="text-bb-brown/55 mt-1 text-sm">
          We'll text you when the next bake is ready.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        required
        type="text"
        placeholder="Your first name"
        value={form.name}
        onChange={field('name')}
        className={inputCls}
      />
      <input
        required
        type="tel"
        placeholder="Phone number"
        value={form.phone}
        onChange={field('phone')}
        className={inputCls}
      />

      {phase === 'error' && (
        <p className="text-sm text-bb-terra text-center">{errMsg}</p>
      )}

      <button
        type="submit"
        disabled={phase === 'submitting'}
        className="w-full py-3.5 rounded-2xl bg-bb-brown text-white text-base font-semibold
                   hover:bg-bb-brown/90 active:scale-[0.98] disabled:opacity-50
                   transition-all shadow-sm"
      >
        {phase === 'submitting' ? 'Saving… 🍞' : 'Notify me →'}
      </button>
    </form>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Page root
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <div className="bb-container pt-8 pb-16 space-y-12">

      {/* ── Bio section ─────────────────────────────────────────────────────────── */}
      <section>
        <h1 className="font-fraunces text-3xl sm:text-4xl text-bb-brown leading-tight mb-6">
          Hi, I'm BB
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">

          {/* Photo placeholder */}
          <div className="w-full sm:w-48 flex-shrink-0">
            <div className="w-full sm:w-48 aspect-square rounded-2xl
                            bg-gradient-to-br from-[#D4B896] via-[#C49A6C] to-[#8B6340]
                            flex flex-col items-center justify-center gap-2">
              <span className="text-5xl">👩‍🍳</span>
              <span className="text-white/60 text-xs uppercase tracking-widest">photo coming</span>
            </div>
          </div>

          {/* Bio text */}
          <div className="flex-1 space-y-4 text-[15px] text-bb-brown/75 leading-relaxed">
            <p>
              BB is a home bakery in Scarsdale, NY. Every loaf is made by hand using a
              3-year-old sourdough starter, local flour where possible, and more time than
              any supermarket would ever spend.
            </p>
            <p>
              Test bakes are free for the first few weeks — because the best feedback comes
              from real people eating real bread.
            </p>
            <p className="text-bb-brown/45 text-sm italic">
              — Made in someone's kitchen, not a factory.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-bb-brown/8" />

      {/* ── Comparison table ────────────────────────────────────────────────────── */}
      <section>
        <h2 className="font-fraunces text-2xl sm:text-3xl text-bb-brown mb-1">
          BB vs The Shelf
        </h2>
        <p className="text-sm text-bb-brown/45 mb-5">
          Here's what you're actually getting.
        </p>

        <div className="rounded-2xl overflow-hidden ring-1 ring-bb-brown/10 bg-bb-card">
          {/* Table header */}
          <div className="grid grid-cols-3 bg-bb-brown text-white text-xs font-semibold
                          uppercase tracking-widest px-4 py-3">
            <span>What you get</span>
            <span className="text-bb-terra text-center">BB</span>
            <span className="text-center opacity-60">Supermarket</span>
          </div>

          {/* Rows */}
          {COMPARISON_ROWS.map((row, i) => (
            <div
              key={row.what}
              className={`grid grid-cols-3 px-4 py-3 text-sm gap-2
                          ${i % 2 === 0 ? 'bg-bb-card' : 'bg-bb-bg/60'}
                          ${i < COMPARISON_ROWS.length - 1 ? 'border-b border-bb-brown/6' : ''}`}
            >
              <span className="text-bb-brown/60 font-medium">{row.what}</span>
              <span className="text-bb-olive font-semibold text-center">{row.bb}</span>
              <span className="text-bb-brown/40 text-center">{row.shelf}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-bb-brown/8" />

      {/* ── Stay in the loop ────────────────────────────────────────────────────── */}
      <section>
        <h2 className="font-fraunces text-2xl sm:text-3xl text-bb-brown mb-1">
          Stay in the loop
        </h2>
        <p className="text-sm text-bb-brown/50 mb-5">
          We'll text you when the next bake is on. No spam, just bread.
        </p>

        <div className="max-w-sm">
          <SignupForm />
        </div>
      </section>

    </div>
  )
}
