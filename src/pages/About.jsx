import PageHero from '../components/common/PageHero'
import FeaturesStrip from '../components/sections/FeaturesStrip'

export default function About() {
  return (
    <div>
      <PageHero title="About" crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
      <div className="container mx-auto px-4 py-14 max-w-3xl">
        <h2 className="text-2xl font-semibold text-text">About FurniCraft</h2>
        <p className="mt-4 text-text-muted leading-relaxed">
          This page is a placeholder matching the design navigation. You can replace it with your real
          company story, mission, and values.
        </p>
      </div>
      <FeaturesStrip />
    </div>
  )
}

