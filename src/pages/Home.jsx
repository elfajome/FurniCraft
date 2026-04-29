import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/slices/productsSlice'
import ProductCard from '../components/ui/ProductCard'
import Button from '../components/ui/Button'


const rangeCards = [
  {
    title: 'Dining',
    image: '../assets/images/dining.png',
  },
  {
    title: 'Living',
    image: '../assets/images/living.png',
  },
  {
    title: 'Bedroom',
    image: '../assets/images/bedroom.png',
  },
]

const inspirationImages = [
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=70',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=70',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=70',
]

const furniCraftGallery = [
  'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=900&q=70',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=70',
  'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=900&q=70',
  'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=70',
  'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=900&q=70',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=70',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=70',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=70',
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=70',
]

export default function Home() {
  const dispatch = useDispatch() // Dispatch the action to fetch products when the component mounts 
  const { items: products, loading } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const featured = products.slice(0, 8)

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div
          className="h-[70vh] min-h-140 bg-center bg-cover"
          style={{ backgroundImage: 'url(/assets/images/heroImage.jpg)' }}
        >
          <div className="absolute inset-0 bg-white/15" />
          <div className="relative container mx-auto px-4 h-full flex items-center justify-end">
            <div className="max-w-xl w-full bg-primary-light/85 backdrop-blur p-8 md:p-10 rounded-xl shadow-xl border border-border">
              <p className="text-sm tracking-[0.2em] text-text-muted uppercase mb-2">
                New Arrival
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary leading-tight">
                Discover Our<br />New Collection
              </h1>
              <p className="mt-4 text-text-muted">
                Crafted pieces designed to bring comfort and timeless style to your home.
              </p>
              <div className="mt-6">
                <Link to="/shop">
                  <Button size="lg" className="px-8 rounded-none">
                    BUY NOW
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse The Range */}
      <section className="py-14 md:py-18">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-text">Browse The Range</h2>
            <p className="mt-3 text-text-muted">
              Explore our diverse collection of furniture, from modern to classic styles.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rangeCards.map((card) => (
              <div key={card.title} className="text-center">
                <div className="rounded-xl overflow-hidden border border-border bg-surface-alt">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-80 object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 font-semibold text-text">{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="py-14 md:py-18 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-text text-center">Our Products</h2>
          <div className="mt-10">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="h-96 bg-surface-alt rounded-xl animate-pulse" />
                ))}
              </div>
            ) : featured.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featured.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-text-muted">No products found</p>
            )}
          </div>
          {!loading && products.length > 0 && (
            <div className="mt-10 text-center">
              <Link to="/shop">
                <Button variant="outline" size="lg" className="px-10">
                  Show More
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Inspiration */}
      <section id="inspiration" className="py-14 md:py-18 bg-surface-alt">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text leading-tight">
                50+ Beautiful rooms inspiration
              </h2>
              <p className="mt-4 text-text-muted max-w-md">
                Our designer already made a lot of beautiful prototipe of rooms that inspire you
              </p>
              <div className="mt-6">
                <Link to="/shop">
                  <Button size="lg" className="px-10">
                    Explore More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7 rounded-xl overflow-hidden border border-border bg-background shadow-sm">
                <img
                  src={inspirationImages[0]}
                  alt="Inspiration 1"
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="text-text-muted text-sm">01 — Bed Room</p>
                  <p className="font-bold text-text">Inner Peace</p>
                </div>
              </div>
              <div className="col-span-5 space-y-4">
                <div className="rounded-xl overflow-hidden border border-border bg-background shadow-sm">
                  <img
                    src={inspirationImages[1]}
                    alt="Inspiration 2"
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-border bg-background shadow-sm">
                  <img
                    src={inspirationImages[2]}
                    alt="Inspiration 3"
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FurniCraft gallery */}
      <section className="py-14 md:py-18 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-text-muted">Share your setup with</p>
            <h2 className="text-3xl font-extrabold text-text mt-2">#FurniCraft Furniture</h2>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {furniCraftGallery.map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                className={`rounded-xl overflow-hidden border border-border bg-surface-alt ${
                  idx % 7 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
