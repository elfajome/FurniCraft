import PageHero from '../components/common/PageHero'
import { formatEgp } from '../utils/formatEgp'
import FeaturesStrip from '../components/sections/FeaturesStrip'
import Button from '../components/ui/Button'

const sample = {
  left: {
    name: 'Asgaard Sofa',
    price: 42900,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=70',
  },
  right: {
    name: 'Outdoor Sofa Set',
    price: 36800,
    rating: 4.2,
    image:
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=900&q=70',
  },
}

const rows = [
  { section: 'General' },
  { label: 'Sales Package', left: '1 sectional sofa', right: '1 Three Seater, 2 Single Seater' },
  { label: 'Model Number', left: 'TFCBLIGRBL6SRHS', right: 'DTUBLIGRBL568' },
  { label: 'Secondary Material', left: 'Solid Wood', right: 'Solid Wood' },
  { label: 'Configuration', left: 'L-shaped', right: 'L-shaped' },
  { label: 'Upholstery Material', left: 'Fabric + Cotton', right: 'Fabric + Cotton' },
  { label: 'Upholstery Color', left: 'Bright Grey & Lion', right: 'Bright Grey & Lion' },
  { section: 'Product' },
  { label: 'Filling Material', left: 'Foam', right: 'Foam' },
  { label: 'Finish Type', left: 'Bright Grey & Lion', right: 'Bright Grey & Lion' },
  { label: 'Adjustable Headrest', left: 'No', right: 'Yes' },
  { label: 'Maximum Load Capacity', left: '280 KG', right: '300 KG' },
  { label: 'Origin of Manufacture', left: 'India', right: 'India' },
  { section: 'Dimensions' },
  { label: 'Width', left: '265.32 cm', right: '265.32 cm' },
  { label: 'Height', left: '76 cm', right: '76 cm' },
  { label: 'Depth', left: '167.76 cm', right: '167.76 cm' },
  { label: 'Weight', left: '45 KG', right: '65 KG' },
  { label: 'Seat Height', left: '41.52 cm', right: '41.52 cm' },
  { label: 'Leg Height', left: '5.46 cm', right: '5.46 cm' },
  { section: 'Warranty' },
  { label: 'Warranty Summary', left: '1 Year Manufacturing Warranty', right: '1.2 Year Manufacturing Warranty' },
  { label: 'Warranty Service Type', left: 'For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com', right: 'For Warranty Claims or Any Product Related Issues Please Email at support@trevifurniture.com' },
  { label: 'Covered in Warranty', left: 'Warranty of the product is limited to manufacturing defects only.', right: 'Warranty of the product is limited to manufacturing defects only.' },
  { label: 'Not Covered in Warranty', left: 'The Warranty does not cover damages due to usage of the product beyond its intended use and wear & tear in the natural course of product usage.', right: 'The Warranty does not cover damages due to usage of the product beyond its intended use and wear & tear in the natural course of product usage.' },
  { label: 'Domestic Warranty', left: '1 Year', right: '3 Months' },
]

export default function Comparison() {
  return (
    <div>
      <PageHero
        title="Product Comparison"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Comparison' }]}
      />

      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="text-sm text-text-muted">Go to Product page for more Products</p>
            <p className="mt-2 font-semibold text-text">View More</p>
          </div>
          <div className="lg:col-span-4">
            <div className="flex gap-4 items-center">
              <img className="w-24 h-20 object-cover rounded-lg border border-border" src={sample.left.image} alt={sample.left.name} />
              <div>
                <p className="font-semibold text-text">{sample.left.name}</p>
                <p className="text-sm text-text-muted mt-1">{formatEgp(sample.left.price)}</p>
                <p className="text-xs text-text-muted mt-1">{sample.left.rating} Rating</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="flex gap-4 items-center">
              <img className="w-24 h-20 object-cover rounded-lg border border-border" src={sample.right.image} alt={sample.right.name} />
              <div>
                <p className="font-semibold text-text">{sample.right.name}</p>
                <p className="text-sm text-text-muted mt-1">{formatEgp(sample.right.price)}</p>
                <p className="text-xs text-text-muted mt-1">{sample.right.rating} Rating</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 flex items-start justify-end">
            <div className="w-full">
              <p className="text-sm text-text-muted">Add A Product</p>
              <select className="mt-2 w-full border border-border rounded-lg px-3 py-2 text-sm bg-background">
                <option>Choose a Product</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-x-auto border border-border rounded-xl bg-background">
          <table className="min-w-[900px] w-full text-sm">
            <tbody>
              {rows.map((r, idx) => {
                if (r.section) {
                  return (
                    <tr key={`section-${r.section}-${idx}`} className="bg-surface-alt">
                      <td className="px-6 py-4 font-semibold text-text" colSpan={3}>
                        {r.section}
                      </td>
                    </tr>
                  )
                }
                return (
                  <tr key={`${r.label}-${idx}`} className="border-t border-border">
                    <td className="px-6 py-4 w-[26%] text-text-muted">{r.label}</td>
                    <td className="px-6 py-4 w-[37%] text-text">{r.left}</td>
                    <td className="px-6 py-4 w-[37%] text-text">{r.right}</td>
                  </tr>
                )
              })}
              <tr className="border-t border-border">
                <td className="px-6 py-6" />
                <td className="px-6 py-6">
                  <Button className="w-full">Add To Cart</Button>
                </td>
                <td className="px-6 py-6">
                  <Button className="w-full">Add To Cart</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <FeaturesStrip />
    </div>
  )
}

