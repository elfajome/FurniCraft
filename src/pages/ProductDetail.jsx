import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById, clearSelectedProduct, fetchProducts } from '../store/slices/productsSlice'
import { addItem } from '../store/slices/cartSlice'
import Button from '../components/ui/Button'
import FeaturesStrip from '../components/sections/FeaturesStrip'
import { FiStar } from 'react-icons/fi'
import { formatEgp } from '../utils/formatEgp'

export default function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedProduct, loading, error, items } = useSelector((state) => state.products)
  const [quantity, setQuantity] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [tab, setTab] = useState('description')
  const [size, setSize] = useState('L')
  const [color, setColor] = useState('black')

  useEffect(() => {
    if (id) dispatch(fetchProductById(id))
    if (!items?.length) dispatch(fetchProducts())
    return () => dispatch(clearSelectedProduct())
  }, [id, dispatch, items?.length])

  // useEffect(() => {
  //   setActiveImg(0)
  //   setQuantity(1)
  // }, [id])

  const handleAddToCart = () => {
    if (!selectedProduct) return
    dispatch(
      addItem({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity,
        image: selectedProduct.image || null,
      })
    )
  }

  const gallery = selectedProduct?.gallery?.length
    ? selectedProduct.gallery
    : selectedProduct?.image
      ? [selectedProduct.image]
      : []

  const related = useMemo(() => {
    const list = (items || []).filter((p) => p.id !== Number(id)).slice(0, 4)
    return list
  }, [items, id])

  if (loading && !selectedProduct) {
    return (
      <div className="container mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="aspect-4/3 max-h-100 bg-surface-alt rounded-xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-10 bg-surface-alt rounded w-2/3 animate-pulse" />
            <div className="h-7 bg-surface-alt rounded w-1/3 animate-pulse" />
            <div className="h-28 bg-surface-alt rounded animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !selectedProduct) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-text-muted mb-4">Product not found.</p>
        <Link to="/shop">
          <Button>Back to shop</Button>
        </Link>
      </div>
    )
  }

  const { name, price, description, sku, tags } = selectedProduct

  return (
    <div>
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-3 py-4 text-sm text-text-muted">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link> {'>'}{' '}
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link> {'>'}{' '}
          <span className="text-text">{name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Gallery */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2 space-y-3">
              {gallery.slice(0, 4).map((src, idx) => (
                <button
                  key={`${src}-${idx}`}
                  type="button"
                  onClick={() => setActiveImg(idx)}
                  className={`w-full aspect-square rounded-lg overflow-hidden border ${
                    idx === activeImg ? 'border-primary' : 'border-border'
                  } bg-surface-alt`}
                >
                  <img src={src} alt={`${name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="col-span-10 rounded-xl overflow-hidden bg-primary-light border border-border">
              {gallery[activeImg] ? (
                <img src={gallery[activeImg]} alt={name} className="w-full h-95 md:h-100 object-cover" />
              ) : (
                <div className="w-full h-95 md:h-100 flex items-center justify-center text-6xl font-bold text-text-muted">
                  {name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-medium text-text">{name}</h1>
            <p className="mt-2 text-2xl text-text-muted">{formatEgp(price)}</p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#FFC700]">
                {[1, 2, 3, 4].map((n) => (
                  <FiStar key={n} className="w-4 h-4 fill-current" />
                ))}
                <FiStar className="w-4 h-4" />
              </div>
              <div className="h-5 w-px bg-border" />
              <p className="text-sm text-text-muted">5 Customer Review</p>
            </div>

            <p className="mt-5 text-sm text-text leading-relaxed max-w-xl">
              {description || 'Setting the bar as one of the loudest speakers in its class.'}
            </p>

            <div className="mt-6">
              <p className="text-sm text-text-muted">Size</p>
              <div className="mt-3 flex items-center gap-3">
                {['L', 'XL', 'XS'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`w-10 h-10 rounded-lg text-sm border ${
                      size === s ? 'bg-primary-light border-primary text-text' : 'bg-surface-alt border-border text-text'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-text-muted">Color</p>
              <div className="mt-3 flex items-center gap-3">
                {[
                  { key: 'purple', cls: 'bg-[#816DFA]' },
                  { key: 'black', cls: 'bg-[#000000]' },
                  { key: 'gold', cls: 'bg-primary' },
                ].map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setColor(c.key)}
                    className={`w-8 h-8 rounded-full ${c.cls} border ${color === c.key ? 'ring-2 ring-primary ring-offset-2' : 'border-border'}`}
                    aria-label={c.key}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="h-12 inline-flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-full hover:bg-surface-alt transition-colors"
                >
                  -
                </button>
                <div className="w-14 text-center text-sm font-medium">{quantity}</div>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-full hover:bg-surface-alt transition-colors"
                >
                  +
                </button>
              </div>
              <Button size="lg" className="px-10" onClick={handleAddToCart}>
                Add To Cart
              </Button>
            </div>

            <div className="mt-10 pt-8 border-t border-border space-y-2 text-sm text-text-muted">
              <p><span className="inline-block w-24">SKU</span>: {sku || 'SS001'}</p>
              <p><span className="inline-block w-24">Category</span>: Sofas</p>
              <p><span className="inline-block w-24">Tags</span>: {(tags || ['Sofa', 'Chair', 'Shop']).join(', ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <button
              type="button"
              onClick={() => setTab('description')}
              className={tab === 'description' ? 'font-semibold text-text' : 'text-text-muted hover:text-text'}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setTab('additional')}
              className={tab === 'additional' ? 'font-semibold text-text' : 'text-text-muted hover:text-text'}
            >
              Additional Information
            </button>
            <button
              type="button"
              onClick={() => setTab('reviews')}
              className={tab === 'reviews' ? 'font-semibold text-text' : 'text-text-muted hover:text-text'}
            >
              Reviews [5]
            </button>
          </div>

          <div className="mt-8 max-w-5xl mx-auto text-sm text-text-muted leading-relaxed space-y-4">
            {tab === 'description' && (
              <>
                <p>
                  Embodying the raw, wayward spirit of rock ’n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
                </p>
                <p>
                  Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced.
                </p>
              </>
            )}
            {tab === 'additional' && (
              <p>
                Materials, care instructions, and other product details will appear here. This is a placeholder to match the design tabs.
              </p>
            )}
            {tab === 'reviews' && (
              <p>
                Reviews UI can be added later (backend-ready). For now this section is a placeholder to match the design.
              </p>
            )}
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="rounded-xl overflow-hidden bg-primary-light border border-border">
              <img
                src={gallery[0]}
                alt="detail"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-xl overflow-hidden bg-primary-light border border-border">
              <img
                src={gallery[1] || gallery[0]}
                alt="detail 2"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-14">
          <h2 className="text-3xl font-semibold text-text text-center">Related Products</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <Link key={p.id} to={`/shop/${p.id}`}>
                <div className="group bg-[#F4F5F7] rounded-xl overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-4/3 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-text">{p.name}</p>
                    <p className="text-sm text-text-muted mt-1">{p.description}</p>
                    <p className="mt-2 font-semibold text-text">{formatEgp(p.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg" className="px-10">
                Show More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FeaturesStrip />
    </div>
  )
}
