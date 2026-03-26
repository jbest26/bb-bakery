import { useState, useEffect } from 'react'
import bake from '../data/bake.json'
import { supabase } from '../lib/supabase'

// ─── Today's date (YYYY-MM-DD, local) ─────────────────────────────────────────
const today = new Date().toLocaleDateString('en-CA')

// ─── Brand colours for each supermarket (placeholder fills) ───────────────────
const STORE_COLOURS = {
  'Whole Foods':  '#00674B',
  'Wegmans':      '#CC0000',
  "Trader Joe's": '#B20838',
  'Stop & Shop':  '#E31837',
  "Balducci's":   '#8B4513',
  'Costco':       '#005DAA',
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 1 — Hero bread card
   ═══════════════════════════════════════════════════════════════════════════════ */
function HeroCard() {
  const [imgError, setImgError] = useState(false)

  return (
    <section className="bb-container pt-6 fade-up-1">
      <div className="rounded-3xl overflow-hidden bg-bb-card shadow-md ring-1 ring-bb-brown/8">

        {/* Bread image — warm gradient fallback when photo isn't loaded yet */}
        {!imgError
          ? (
            <img
              src={bake.breadImage}
              alt={bake.breadName}
              onError={() => setImgError(true)}
              className="w-full aspect-[4/3] object-cover"
            />
          )
          : (
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#D4B896] via-[#C49A6C] to-[#8B6340]
                            flex flex-col items-center justify-center gap-2">
              <span className="text-5xl">🍞</span>
              <span className="text-white/60 text-sm tracking-wide">photo coming soon</span>
            </div>
          )
        }

        {/* Card body */}
        <div className="px-5 pt-4 pb-6">

          {/* FREE badge */}
          {bake.isFree && (
            <span className="inline-flex items-center gap-1.5 bg-bb-terra text-white
                             text-xs font-semibold uppercase tracking-widest
                             px-3 py-1 rounded-full mb-3">
              ✨ {bake.freeLabel}
            </span>
          )}

          <h1 className="font-fraunces text-3xl sm:text-4xl text-bb-brown leading-snug">
            {bake.breadName}
          </h1>
          <p className="mt-2 text-bb-brown/65 text-[15px] leading-relaxed">
            {bake.description}
          </p>

          {/* Date stamp */}
          <p className="mt-4 text-xs text-bb-brown/35 tracking-wider uppercase">
            {new Date(bake.date + 'T00:00:00').toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 2 — Supermarket comparison panel
   ═══════════════════════════════════════════════════════════════════════════════ */
function ComparisonPanel() {
  const bbPrice = bake.isFree ? 'Free' : 'Ask us'

  return (
    <section className="pt-8 fade-up-2">

      {/* Heading */}
      <div className="bb-container mb-4">
        <h2 className="font-fraunces text-2xl sm:text-3xl text-bb-brown">
          BB vs the shelf
        </h2>
        <p className="mt-1 text-sm text-bb-brown/50">
          72-hour ferment. No additives. Made in someone's kitchen — not a factory.
        </p>
      </div>

      {/* Scrollable card row */}
      <div className="overflow-x-auto scrollbar-none -mb-2 pb-4">
        <div className="flex gap-3 px-4" style={{ width: 'max-content' }}>

          {/* ── BB Card (first, most prominent) ── */}
          <div className="w-44 rounded-2xl bg-bb-terra text-white p-4 flex-shrink-0
                          shadow-lg shadow-bb-terra/25 relative">
            {/* Image placeholder */}
            <div className="w-full h-24 rounded-xl bg-white/15 mb-3
                            flex flex-col items-center justify-center gap-1">
              <span className="font-fraunces text-3xl leading-none">BB</span>
              <span className="text-[10px] text-white/60 uppercase tracking-widest">Scarsdale</span>
            </div>

            {/* Handmade tag */}
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest
                             bg-white/20 rounded-full px-2.5 py-0.5 mb-2">
              🤲 handmade
            </span>

            <p className="font-fraunces text-base font-semibold leading-tight">
              {bake.breadName}
            </p>
            <p className="text-[11px] text-white/60 mt-0.5 mb-2 leading-snug">
              72hr cold ferment · live starter
            </p>

            {/* Price — big & proud */}
            <p className="font-fraunces text-3xl font-bold">{bbPrice}</p>
            {bake.isFree && (
              <p className="text-[10px] text-white/60 mt-0.5">this week only</p>
            )}
          </div>

          {/* ── Store comparison cards ── */}
          {bake.supermarketComparisons.map((item) => {
            const colour = STORE_COLOURS[item.store] ?? '#9B9189'
            return (
              <div
                key={item.store}
                className="w-36 rounded-2xl bg-bb-card ring-1 ring-bb-brown/8 p-4
                           flex-shrink-0 flex flex-col"
              >
                {/* Coloured store placeholder */}
                <div
                  className="w-full h-24 rounded-xl mb-3 flex items-center justify-center"
                  style={{ backgroundColor: colour }}
                >
                  <span className="text-white text-[11px] font-bold text-center px-2 leading-tight">
                    {item.store}
                  </span>
                </div>

                <p className="text-[11px] font-semibold text-bb-brown/40 uppercase tracking-wider">
                  {item.store}
                </p>
                <p className="text-sm text-bb-brown leading-snug mt-0.5 flex-1 line-clamp-2">
                  {item.product}
                </p>

                {/* Price — muted so BB's stands out by contrast */}
                <p className="font-fraunces text-2xl text-bb-brown/50 mt-2">
                  {item.price}
                </p>
                <p className="text-[10px] text-bb-brown/30 mt-0.5">mass produced</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 3 — Vote section
   ═══════════════════════════════════════════════════════════════════════════════ */
function VoteSection() {
  // phase: 'idle' | 'form' | 'submitting' | 'success' | 'out' | 'error'
  const [phase, setPhase]     = useState('idle')
  const [voteCount, setCount] = useState(null)
  const [errMsg, setErrMsg]   = useState('')
  const [form, setForm]       = useState({
    name:     '',
    phone:    '',
    quantity: 1,
    notes:    '',
  })

  /* Fetch today's vote count on mount — silently ignore errors */
  useEffect(() => {
    supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })
      .eq('bake_date', today)
      .then(({ count, error }) => {
        if (!error) setCount(count ?? 0)
        // If error: leave voteCount as null — count pill simply won't render
      })
  }, [])

  const field = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setPhase('submitting')
    setErrMsg('')

    const { error } = await supabase.from('votes').insert({
      name:      form.name.trim(),
      phone:     form.phone.trim(),
      quantity:  Number(form.quantity),
      notes:     form.notes.trim() || null,
      bake_date: today,
    })

    if (error) {
      console.error(error)
      setErrMsg('Something went sideways 😬 — try again or just text us.')
      setPhase('error')
      return
    }

    /* Optimistically bump the count */
    setCount((c) => (c ?? 0) + Number(form.quantity))
    setPhase('success')
  }

  /*
   * text-base = 16px — keeps iOS from auto-zooming the viewport on focus.
   * The base CSS also sets font-size: 16px on all inputs, but being explicit
   * here ensures Tailwind's purge doesn't strip the rule.
   */
  const inputCls =
    'w-full rounded-xl border border-bb-brown/12 bg-bb-card px-4 py-3 text-base ' +
    'text-bb-brown placeholder:text-bb-brown/30 ' +
    'focus:outline-none focus:ring-2 focus:ring-bb-terra/40 transition'

  return (
    <section className="bb-container py-10 fade-up-3">

      {/* Heading */}
      <h2 className="font-fraunces text-3xl sm:text-4xl text-bb-brown text-center leading-tight">
        Are you in for<br className="sm:hidden" /> today's bake?
      </h2>

      {/* Live count pill — hidden while loading or on error */}
      {voteCount !== null && (
        <p className="mt-2 text-sm text-bb-brown/45 text-center">
          {voteCount === 0
            ? 'Be the first — no pressure 👇'
            : `${voteCount} ${voteCount === 1 ? 'person is' : 'people are'} in today`}
        </p>
      )}

      {/* ── Success ── */}
      {phase === 'success' && (
        <div className="mt-6 rounded-3xl bg-bb-card ring-1 ring-bb-olive/25
                        p-8 text-center animate-slide-down">
          <p className="text-5xl mb-3">🍞</p>
          <p className="font-fraunces text-2xl text-bb-brown">You're in!</p>
          <p className="text-bb-brown/55 mt-1">
            We'll text you when it's ready.
          </p>
          {voteCount !== null && (
            <p className="text-xs text-bb-olive mt-3">
              You're one of {voteCount} — good call.
            </p>
          )}
        </div>
      )}

      {/* ── Opted out ── */}
      {phase === 'out' && (
        <div className="mt-6 rounded-3xl bg-bb-card ring-1 ring-bb-brown/10
                        p-8 text-center animate-slide-down">
          <p className="text-5xl mb-3">👋</p>
          <p className="font-fraunces text-2xl text-bb-brown">No worries!</p>
          <p className="text-bb-brown/55 mt-1">
            We bake most weeks — check back soon.
          </p>
          <button
            onClick={() => setPhase('idle')}
            className="mt-4 text-sm text-bb-terra underline underline-offset-2
                       hover:text-[#b34924] transition-colors"
          >
            Actually, I changed my mind
          </button>
        </div>
      )}

      {/* ── Voting UI ── */}
      {['idle', 'form', 'submitting', 'error'].includes(phase) && (
        <div className="mt-6">

          {/* CTA buttons — full-width, easy to tap on mobile */}
          <div className="flex gap-3">
            <button
              onClick={() => setPhase(phase === 'form' ? 'idle' : 'form')}
              className="flex-1 py-4 rounded-2xl text-lg font-semibold
                         bg-bb-terra text-white shadow-lg shadow-bb-terra/30
                         hover:bg-[#b34924] hover:scale-[1.01]
                         active:scale-[0.97] transition-all"
            >
              I'M IN 🙋
            </button>
            <button
              onClick={() => setPhase('out')}
              className="flex-1 py-4 rounded-2xl text-lg font-semibold
                         border-2 border-bb-brown/15 text-bb-brown/55
                         hover:border-bb-brown/30 hover:text-bb-brown hover:scale-[1.01]
                         active:scale-[0.97] transition-all"
            >
              I'M OUT ❌
            </button>
          </div>

          {/* ── Reveal form ── */}
          {['form', 'submitting', 'error'].includes(phase) && (
            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-3 animate-slide-down"
            >
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

              {/* Quantity stepper */}
              <div className="flex items-center gap-3 rounded-xl border border-bb-brown/12 bg-bb-card px-4 py-3">
                <span className="text-sm text-bb-brown/50 flex-1">
                  How many loaves?
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, quantity: Math.max(1, Number(f.quantity) - 1) }))}
                    className="w-8 h-8 rounded-full bg-bb-brown/8 text-bb-brown font-bold
                               flex items-center justify-center hover:bg-bb-brown/15 transition"
                  >
                    −
                  </button>
                  <span className="font-fraunces text-xl w-5 text-center text-bb-brown">
                    {form.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, quantity: Math.min(6, Number(f.quantity) + 1) }))}
                    className="w-8 h-8 rounded-full bg-bb-brown/8 text-bb-brown font-bold
                               flex items-center justify-center hover:bg-bb-brown/15 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <textarea
                rows={2}
                placeholder="sliced? allergies? just say hi"
                value={form.notes}
                onChange={field('notes')}
                className={inputCls + ' resize-none'}
              />

              {/* Error message */}
              {phase === 'error' && (
                <p className="text-sm text-bb-terra text-center">{errMsg}</p>
              )}

              <button
                type="submit"
                disabled={phase === 'submitting'}
                className="w-full py-4 rounded-2xl bg-bb-brown text-white text-base font-semibold
                           hover:bg-bb-brown/90 hover:scale-[1.01]
                           active:scale-[0.98] disabled:opacity-50
                           transition-all shadow-sm"
              >
                {phase === 'submitting' ? 'Saving… 🌀' : "Confirm — I want a loaf 🍞"}
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Page root — with empty state when no bake is posted today
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  // If bake.json hasn't been updated to today's date, show a friendly placeholder
  if (bake.date !== today) {
    return (
      <div className="bb-container pt-16 pb-20 flex flex-col items-center text-center fade-up">
        <span className="text-7xl mb-5">🍞</span>
        <h1 className="font-fraunces text-3xl text-bb-brown leading-tight">
          No bake posted yet today
        </h1>
        <p className="mt-3 text-bb-brown/55 text-[15px] leading-relaxed max-w-xs">
          Check back soon — we bake most weeks and post fresh here when the loaves are ready.
        </p>
        <p className="mt-6 text-xs text-bb-brown/30 uppercase tracking-widest">
          Last bake: {new Date(bake.date + 'T00:00:00').toLocaleDateString('en-US', {
            month: 'long', day: 'numeric'
          })}
        </p>
      </div>
    )
  }

  return (
    <div className="pb-16">
      <HeroCard />
      <ComparisonPanel />
      <div className="bb-container my-6 fade-up-2">
        <hr className="border-bb-brown/8" />
      </div>
      <VoteSection />
    </div>
  )
}
