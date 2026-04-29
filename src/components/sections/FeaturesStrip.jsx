import { FiAward, FiHeadphones, FiShield, FiTruck } from 'react-icons/fi'

const items = [
  {
    icon: FiAward,
    title: 'High Quality',
    subtitle: 'crafted from top materials',
  },
  {
    icon: FiShield,
    title: 'Warranty Protection',
    subtitle: 'Over 2 years',
  },
  {
    icon: FiTruck,
    title: 'Free Shipping',
    subtitle: 'Order over 150 $',
  },
  {
    icon: FiHeadphones,
    title: '24 / 7 Support',
    subtitle: 'Dedicated support',
  },
]

export default function FeaturesStrip() {
  return (
    <section className="bg-surface-alt">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => {
            const Icon = it.icon
            return (
              <div key={it.title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center">
                  <Icon className="w-6 h-6 text-text" />
                </div>
                <div>
                  <p className="font-semibold text-text">{it.title}</p>
                  <p className="text-sm text-text-muted">{it.subtitle}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

