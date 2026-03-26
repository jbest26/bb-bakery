import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',        label: "Today's Bake", short: 'Today'   },
  { to: '/archive', label: 'Past Bakes',   short: 'Archive' },
  { to: '/about',   label: 'About',        short: 'About'   },
]

/* ─── Top navigation ──────────────────────────────────────── */
function Nav() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-bb-bg/95 backdrop-blur-sm border-b border-bb-brown/10">
      <div className="bb-container flex h-14 items-center justify-between">

        {/* Wordmark */}
        <Link
          to="/"
          className="font-fraunces text-2xl font-semibold tracking-tight text-bb-brown
                     hover:text-bb-terra transition-colors flex-shrink-0"
        >
          BB
        </Link>

        {/* Nav links — short labels on mobile, full labels from sm up */}
        <nav className="flex items-center gap-3 sm:gap-6 text-[13px] sm:text-sm font-medium">
          {NAV_LINKS.map(({ to, label, short }) => (
            <Link
              key={to}
              to={to}
              className={`transition-colors hover:text-bb-terra whitespace-nowrap
                ${pathname === to
                  ? 'text-bb-terra'
                  : 'text-bb-brown/60'}`}
            >
              {/* Short label on mobile, full label on sm+ */}
              <span className="sm:hidden">{short}</span>
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>

      </div>
    </header>
  )
}

/* ─── Footer ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-bb-brown/10 bg-bb-card">
      <div className="bb-container py-8 flex flex-col items-center gap-4 text-center">

        {/* Tagline */}
        <p className="text-sm text-bb-brown/50 tracking-wide">
          Scarsdale, NY · Baked with love · @bb_bakery
        </p>

        {/* Signup CTA */}
        <Link to="/about" className="btn-terra">
          Get bake notifications →
        </Link>

        {/* Tiny legal / attribution */}
        <p className="text-xs text-bb-brown/30 mt-2">
          © {new Date().getFullYear()} BB · Scarsdale, NY 10583
        </p>

      </div>
    </footer>
  )
}

/* ─── Layout wrapper ──────────────────────────────────────── */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-bb-bg text-bb-brown">
      <Nav />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
