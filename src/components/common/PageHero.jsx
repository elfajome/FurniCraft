import { Link } from 'react-router-dom'

const defaultBg =
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2400&q=70'

export default function PageHero({ title, crumbs = [], backgroundImage = defaultBg }) {
  const items = Array.isArray(crumbs) && crumbs.length > 0 ? crumbs : [{ label: 'Home', to: '/' }, { label: title }]

  return (
    <section className="relative">
      <div
        className="h-79 bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-white/60" />
        <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-text">{title}</h1>
          <nav className="mt-3 text-sm text-text">
            <ol className="flex items-center gap-2">
              {items.map((c, idx) => (
                <li key={`${c.label}-${idx}`} className="flex items-center gap-2">
                  {c.to ? (
                    <Link to={c.to} className="font-medium hover:text-primary transition-colors">
                      {c.label}
                    </Link>
                  ) : (
                    <span className={idx === items.length - 1 ? 'font-light text-text' : 'font-medium'}>
                      {c.label}
                    </span>
                  )}
                  {idx !== items.length - 1 && <span className="text-text-muted">{'>'}</span>}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  )
}

