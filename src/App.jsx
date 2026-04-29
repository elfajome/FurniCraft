import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Comparison from './pages/Comparison'
import About from './pages/About'
import Wishlist from './pages/Wishlist'

export default function App() {
  let location = useLocation();
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Products />} />
        <Route path="shop/:id" element={<ProductDetail />} key={location.pathname} />
        {/* Backward compatible */}
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<Blog />} />
        <Route path="compare" element={<Comparison />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="about" element={<About />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  )
}
