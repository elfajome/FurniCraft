import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import PageHero from '../components/common/PageHero'
import FeaturesStrip from '../components/sections/FeaturesStrip'
import Button from '../components/ui/Button'
import { addItem } from '../store/slices/cartSlice'
import { removeWishlistItem, selectWishlistItems } from '../store/slices/wishlistSlice'
import { formatEgp } from '../utils/formatEgp'

export default function Wishlist() {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(selectWishlistItems)

  const handleAddToCart = (item) => {
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image || null,
      })
    )
  }

  if (wishlistItems.length === 0) {
    return (
      <div>
        <PageHero title="Wishlist" crumbs={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold text-text mb-4">Your wishlist is empty</h2>
          <p className="text-text-muted mb-6">Tap the like icon on products to save them here.</p>
          <Link to="/shop">
            <Button size="lg" className="px-10">
              Browse Products
            </Button>
          </Link>
        </div>
        <FeaturesStrip />
      </div>
    )
  }

  return (
    <div>
      <PageHero title="Wishlist" crumbs={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="border border-border rounded-xl bg-background overflow-hidden">
              <Link to={`/shop/${item.id}`} className="block">
                <div className="aspect-[4/3] bg-surface-alt">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted text-3xl font-bold">
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <Link to={`/shop/${item.id}`} className="block">
                  <h3 className="text-lg font-semibold text-text">{item.name}</h3>
                  <p className="mt-1 text-sm text-text-muted">{item.description || 'Furniture'}</p>
                  <p className="mt-2 font-semibold text-text">
                    {formatEgp(item.price)}
                  </p>
                </Link>

                <div className="mt-4 flex items-center gap-3">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAddToCart(item)}
                  >
                    <FiShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <button
                    type="button"
                    onClick={() => dispatch(removeWishlistItem(item.id))}
                    className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border text-primary hover:bg-surface-alt transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FeaturesStrip />
    </div>
  )
}
