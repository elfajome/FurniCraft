import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi'
import { selectCartCount } from '../../store/slices/cartSlice'
import { selectWishlistCount } from '../../store/slices/wishlistSlice'

export default function Header() {
  const cartCount = useSelector(selectCartCount)
  const wishlistCount = useSelector(selectWishlistCount)
  const user = useSelector((state) => state.auth.user) ;
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group" aria-label="FurniCraft home">
          <img src="assets/images/logo.png" className="h-9 w-9 object-contain" alt="" aria-hidden />
          <span className="logo-wordmark">
            <span className="text-text group-hover:text-primary transition-colors">Furni</span>
            <span className="text-primary">Craft</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-12 text-sm font-medium">
          <Link to="/" className="text-text hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-text hover:text-primary transition-colors">
            Shop
          </Link>
          <Link to="/about" className="text-text hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-text hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/account"
            className="relative p-2 rounded-lg hover:bg-surface-alt text-text transition-colors"
            aria-label="Account"
          >
            <FiUser className="w-5 h-5" />
            {user && (
              <span
                className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full"
                aria-label="Logged in user"
                title="Logged in"
              />
            )}
          </Link>
          <Link
            to="/wishlist"
            className="relative p-2 rounded-lg hover:bg-surface-alt text-text transition-colors"
            aria-label="Wishlist"
          >
            <FiHeart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center text-xs font-bold text-white bg-primary rounded-full">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-surface-alt text-text transition-colors"
            aria-label="Cart"
          >
            <FiShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center text-xs font-bold text-white bg-primary rounded-full">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
