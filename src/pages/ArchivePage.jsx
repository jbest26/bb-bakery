// ─── Static sample bakes (will eventually come from Supabase) ─────────────────
const PAST_BAKES = [
  {
    id: 1,
    breadName: 'Country Sourdough',
    date: '2026-03-18',
    description: '72hr cold ferment, open crumb, crackly crust. Our house loaf.',
    isFree: true,
    label: 'Free — test bake',
    gradient: 'from-[#D4B896] via-[#C49A6C] to-[#8B6340]',
  },
  {
    id: 2,
    breadName: 'Dark Rye',
    date: '2026-03-11',
    description: '60% rye, 40% bread flour. Dense, moist, slightly tangy. Incredible with butter.',
    isFree: false,
    label: '$9',
    gradient: 'from-[#6B4226] via-[#4A2E16] to-[#2E1A0A]',
  },
  {
    id: 3,
    breadName: 'Seeded Batard',
    date: '2026-03-04',
    description: 'Sesame, poppy, and sunflower seeds crusted on the outside. Light crumb inside.',
    isFree: false,
    label: '$10',
    gradient: 'from-[#C8A96E] via-[#A8853E] to-[#7A6030]',
  },
  {
    id: 4,
    breadName: 'Einkorn Loaf',
    date: '2026-02-25',
    description: 'Ancient grain, slightly sweet, nutty flavour. Lower gluten than modern wheat.',
    isFree: true,
    label: 'Free — test bake',
    gradient: 'from-[#E8D5A0] via-[#C4A85A] to-[#9A7A30]',
  },
  {
    id: 5,
    breadName: 'Olive & Rosemary',
    date: '2026-02-18',
    description: 'Kalamata olives folded through a mild sourdough. Rosemary throughout.',
    isFree: false,
    label: '$11',
    gradient: 'from-[#7A8B4A] via-[#5C6B3A] to-[#3A4A22]',
  },
  {
    id: 6,
    breadName: 'Porridge Loaf',
    date: '2026-02-11',
    description: 'Rolled oats cooked and folded into the dough. Incredibly soft, stays fresh longer.',
    isFree: true,
    label: 'Free — test bake',
    gradient: 'from-[#D4C4A0] via-[#B8A07A] to-[#8A7254]',
  },
]

function BakeCard({ bake }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-bb-card ring-1 ring-bb-brown/8 shadow-sm
                    hover:shadow-md hover:ring-bb-brown/15 transition-all duration-200">

      {/* Gradient placeholder — will be swapped for a real photo */}
      <div className={`w-full aspect-[4/3] bg-gradient-to-br ${bake.gradient}
                       flex flex-col items-center justify-center gap-1`}>
        <span className="text-4xl">🍞</span>
      </div>

      {/* Card body */}
      <div className="px-4 pt-3 pb-4">

        {/* Label badge */}
        <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-widest
                          px-2.5 py-0.5 rounded-full mb-2
                          ${bake.isFree
                            ? 'bg-bb-olive/15 text-bb-olive'
                            : 'bg-bb-terra/10 text-bb-terra'}`}>
          {bake.label}
        </span>

        <h3 className="font-fraunces text-lg text-bb-brown leading-tight">
          {bake.breadName}
        </h3>

        <p className="text-[12px] text-bb-brown/45 uppercase tracking-wider mt-0.5 mb-1.5">
          {new Date(bake.date + 'T00:00:00').toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
          })}
        </p>

        <p className="text-sm text-bb-brown/65 leading-snug line-clamp-2">
          {bake.description}
        </p>
      </div>
    </div>
  )
}

export default function ArchivePage() {
  return (
    <div className="bb-container pt-8 pb-16">

      {/* Header */}
      <h1 className="font-fraunces text-3xl sm:text-4xl text-bb-brown leading-tight fade-up-1">
        Past Bakes
      </h1>

      {/* Coming soon note */}
      <div className="mt-3 mb-6 inline-flex items-center gap-2 bg-bb-card ring-1 ring-bb-brown/10
                      rounded-full px-4 py-2">
        <span className="text-sm">📬</span>
        <p className="text-sm text-bb-brown/55">
          More bakes coming soon — follow along
        </p>
      </div>

      <hr className="border-bb-brown/8 mb-8" />

      {/* Card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 fade-up-2">
        {PAST_BAKES.map((bake) => (
          <BakeCard key={bake.id} bake={bake} />
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-bb-brown/35 tracking-wider uppercase">
        Every loaf baked in Scarsdale, NY · Photos coming soon
      </p>
    </div>
  )
}
