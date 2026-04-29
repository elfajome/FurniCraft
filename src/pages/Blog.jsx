import PageHero from '../components/common/PageHero'
import FeaturesStrip from '../components/sections/FeaturesStrip'
import Pagination from '../components/common/Pagination'

const posts = [
  {
    id: 1,
    title: 'Going all-in with millennial design',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet...',
    image:
      'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1400&q=70',
  },
  {
    id: 2,
    title: 'Exploring new ways of decorating',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet...',
    image:
      'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1400&q=70',
  },
  {
    id: 3,
    title: 'Handmade pieces that took time to make',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet...',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=70',
  },
]

export default function Blog() {
  return (
    <div>
      <PageHero title="Blog" crumbs={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />

      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-10">
            {posts.map((p) => (
              <article key={p.id} className="bg-background">
                <div className="rounded-xl overflow-hidden border border-border">
                  <img src={p.image} alt={p.title} className="w-full h-80 object-cover" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold text-text">{p.title}</h2>
                <p className="mt-3 text-text-muted leading-relaxed">{p.excerpt}</p>
                <button type="button" className="mt-4 text-sm font-medium text-text hover:text-primary transition-colors">
                  Read more
                </button>
              </article>
            ))}

            <div className="pt-4">
              <Pagination page={1} totalPages={3} />
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="p-6 border border-border rounded-xl bg-background">
              <input
                placeholder="Search"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-primary"
              />
            </div>

            <div className="mt-8 p-6 border border-border rounded-xl bg-background">
              <h3 className="font-semibold text-text">Categories</h3>
              <ul className="mt-4 space-y-3 text-sm text-text-muted">
                <li className="flex justify-between"><span>Crafts</span><span>2</span></li>
                <li className="flex justify-between"><span>Design</span><span>8</span></li>
                <li className="flex justify-between"><span>Handmade</span><span>7</span></li>
                <li className="flex justify-between"><span>Interior</span><span>1</span></li>
                <li className="flex justify-between"><span>Wood</span><span>6</span></li>
              </ul>
            </div>

            <div className="mt-8 p-6 border border-border rounded-xl bg-background">
              <h3 className="font-semibold text-text">Recent Posts</h3>
              <div className="mt-4 space-y-4">
                {posts.slice(0, 3).map((p) => (
                  <div key={`recent-${p.id}`} className="flex gap-4">
                    <img src={p.image} alt={p.title} className="w-20 h-16 object-cover rounded-lg border border-border" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text line-clamp-2">{p.title}</p>
                      <p className="text-xs text-text-muted mt-1">03 Aug 2023</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <FeaturesStrip />
    </div>
  )
}

