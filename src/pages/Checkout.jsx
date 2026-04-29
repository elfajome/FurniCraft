import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from '../store/slices/cartSlice'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import PageHero from '../components/common/PageHero'
import FeaturesStrip from '../components/sections/FeaturesStrip'
import { formatEgp } from '../utils/formatEgp'

export default function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const [payment, setPayment] = useState('bank')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    dispatch(clearCart())
    navigate('/')
  }

  if (items.length === 0 && !submitted) {
    return (
      <div>
        <PageHero title="Checkout" crumbs={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold text-text mb-4">Your cart is empty</h2>
          <p className="text-text-muted mb-6">Add products before proceeding to checkout.</p>
          <Link to="/shop">
            <Button size="lg" className="px-10">Go to Shop</Button>
          </Link>
        </div>
        <FeaturesStrip />
      </div>
    )
  }

  if (submitted) {
    return (
      <div>
        <PageHero title="Checkout" crumbs={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold text-primary mb-4">Order placed successfully</h2>
          <p className="text-text-muted mb-6">This is a UI demo. Hook it to your backend to place real orders.</p>
          <Link to="/shop">
            <Button size="lg" className="px-10">Back to Shop</Button>
          </Link>
        </div>
        <FeaturesStrip />
      </div>
    )
  }

  return (
    <div>
      <PageHero title="Checkout" crumbs={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]} />

      <div className="container mx-auto px-4 py-14">
        <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold text-text mb-8">Billing details</h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <Input label="First Name" placeholder="John" />
              <Input label="Last Name" placeholder="Doe" />
            </div>

            <div className="mt-6 space-y-6">
              <Input label="Company Name (Optional)" placeholder="" />
              <div>
                <label className="block text-sm font-medium text-text mb-1">Country / Region</label>
                <select className="w-full h-12 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary">
                  <option>Egypt</option>
                  <option>United Arab Emirates</option>
                  <option>Saudi Arabia</option>
                </select>
              </div>
              <Input label="Street address" placeholder="" />
              <Input label="Town / City" placeholder="" />
              <div>
                <label className="block text-sm font-medium text-text mb-1">Province</label>
                <select className="w-full h-12 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary">
                  <option>Cairo</option>
                  <option>Giza</option>
                  <option>Alexandria</option>
                </select>
              </div>
              <Input label="ZIP code" placeholder="" />
              <Input label="Phone" placeholder="" />
              <Input type="email" label="Email address" placeholder="" />
              <div>
                <textarea
                  rows={3}
                  placeholder="Additional information"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-border rounded-xl p-8 bg-background">
              <div className="flex items-center justify-between font-medium text-text">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between text-text-muted">
                    <span className="truncate max-w-[70%]">
                      {it.name} <span className="text-text">x {it.quantity}</span>
                    </span>
                    <span className="text-text">
                      {formatEgp(it.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text">Subtotal</span>
                  <span className="text-text">{formatEgp(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text font-medium">Total</span>
                  <span className="text-primary font-semibold text-lg">
                    {formatEgp(total)}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-4 text-sm">
                <label className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === 'bank'}
                    onChange={() => setPayment('bank')}
                    className="mt-1"
                  />
                  <span>
                    <span className="font-medium text-text">Direct Bank Transfer</span>
                    <p className="text-text-muted mt-1">
                      Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                    </p>
                  </span>
                </label>

                <label className="flex items-center gap-3 text-text-muted">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === 'cod'}
                    onChange={() => setPayment('cod')}
                  />
                  Direct Bank Transfer
                </label>

                <label className="flex items-center gap-3 text-text-muted">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === 'cod2'}
                    onChange={() => setPayment('cod2')}
                  />
                  Cash On Delivery
                </label>
              </div>

              <p className="mt-6 text-xs text-text-muted">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className="text-text font-medium">privacy policy</span>.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <Button type="submit" size="lg" className="w-full bg-transparent text-text border border-text hover:bg-surface-alt">
                  Place order
                </Button>
                <Link to="/cart" className="hidden">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>

      <FeaturesStrip />
    </div>
  )
}
