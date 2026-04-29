import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiHeart, FiShare2 } from 'react-icons/fi'
import { addItem } from '../../store/slices/cartSlice'
import { selectIsWishlisted, toggleWishlistItem } from '../../store/slices/wishlistSlice'
import Button from './Button'
import { formatEgpAmount } from '../../utils/formatEgp'

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const { id, name, price, image, category, description } = product
  const isLiked = useSelector(selectIsWishlisted(id))
  const badge = getBadge(product)
  const originalPrice = getOriginalPrice(product)

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addItem({
      id,
      name,
      price,
      quantity: 1,
      image: image || null,
    }))
  }

  const handleToggleLike = (e) => {
    e.preventDefault()
    dispatch(
      toggleWishlistItem({
        id,
        name,
        price,
        image: image || null,
        description: description || (category ? categoryLabelsFallback(category) : 'Furniture'),
      })
    )
  }

  const handleShare = async (e) => {
    e.preventDefault()
    const productUrl = `${window.location.origin}/shop/${id}`

    try {
      if (navigator.share) {
        await navigator.share({
          title: name,
          text: description || `Check this product: ${name}`,
          url: productUrl,
        })
        return
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(productUrl)
        window.alert('Product link copied to clipboard')
        return
      }

      window.prompt('Copy this link', productUrl)
    } catch {
      window.alert('Failed to share product')
    }
  }

  return (
    <Link
      to={`/shop/${id}`}
      className="group block bg-[#F4F5F7] overflow-hidden transition-all"
    >
      <div className="relative aspect-[4/4.4] bg-[#F4F5F7] overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-text-muted text-4xl font-bold"
            aria-hidden
          >
            {name.charAt(0)}
          </div>
        )}

        {badge && (
          <span
            className={`absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full text-xs font-medium text-white ${
              badge.type === 'discount' ? 'bg-[#E97171]' : 'bg-[#2EC1AC]'
            }`}
          >
            {badge.label}
          </span>
        )}

        <div className="absolute inset-0 bg-[#3A3A3A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-6 p-4">
          <Button
            size="md"
            className="text-primary cursor-pointer px-11 rounded-none font-semibold"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
          <div className="flex items-center gap-5 text-sm font-semibold text-white">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1 hover:text-primary-light transition-colors"
            >
              <FiShare2 className="h-4 w-4" />
              Share
            </button>
            <button
              type="button"
              onClick={handleToggleLike}
              className={`inline-flex items-center gap-1 transition-colors ${
                isLiked ? 'text-primary-light' : 'hover:text-primary-light'
              }`}
            >
              <FiHeart className="h-4 w-4" style={{ fill: isLiked ? 'currentColor' : 'none' }} />
              {isLiked ? 'Liked' : 'Like'}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#F4F5F7] px-4 pt-4 pb-5">
        <h3 className="font-semibold text-2xl text-[#3A3A3A] leading-tight line-clamp-1">
          {name}
        </h3>
        <p className="mt-2 text-base text-text-muted line-clamp-1">
          {description || (category ? categoryLabelsFallback(category) : 'Furniture')}
        </p>
        <div className="mt-2 flex items-center gap-4">
          <p className="text-xl font-semibold text-[#3A3A3A]">
            {formatEgpAmount(price)} EGP
          </p>
          {originalPrice ? (
            <p className="text-base text-[#B0B0B0] line-through">
              {formatEgpAmount(originalPrice)} EGP
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

function categoryLabelsFallback(category) {
  const map = { living: 'Living', dining: 'Dining', bedroom: 'Bedroom', office: 'Office' }
  return map[category] || category
}

function getBadge(product) {
  const badgeByName = {
    Syltherine: { type: 'discount', label: '-30%' },
    Lolito: { type: 'discount', label: '-50%' },
    Muggo: { type: 'new', label: 'New' },
    Pingky: { type: 'discount', label: '-50%' },
    Potty: { type: 'new', label: 'New' },
    Respira: { type: 'new', label: 'New' },
  }

  return badgeByName[product?.name] || null
}

function getOriginalPrice(product) {
  const oldPriceByName = {
    Syltherine: 9800,
    Lolito: 78000,
    Pingky: 85000,
  }

  return oldPriceByName[product?.name] || null
}
