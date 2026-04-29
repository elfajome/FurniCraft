import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal,
  removeItem,
  updateQuantity,
} from '../store/slices/cartSlice'
import Button from '../components/ui/Button'
import PageHero from '../components/common/PageHero'
import FeaturesStrip from '../components/sections/FeaturesStrip'
import { FiTrash2 } from 'react-icons/fi'
import { formatEgp } from '../utils/formatEgp'

export default function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  if (items.length === 0) {
    return (
      <div>
        <PageHero title="Cart" crumbs={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold text-text mb-4">Your cart is empty</h2>
          <p className="text-text-muted mb-6">Browse products and add something you love.</p>
          <Link to="/shop">
            <Button size="lg" className="px-10">Go to Shop</Button>
          </Link>
        </div>
        <FeaturesStrip />
      </div>
    )
  }

  return (
    <div>
      <PageHero title="Cart" crumbs={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />

      <div className="container mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 overflow-x-auto">
            <table className="min-w-[720px] w-full">
              <thead>
                <tr className="bg-surface-alt text-left text-sm">
                  <th className="px-6 py-4 font-medium text-text">Product</th>
                  <th className="px-6 py-4 font-medium text-text">Price</th>
                  <th className="px-6 py-4 font-medium text-text">Quantity</th>
                  <th className="px-6 py-4 font-medium text-text">Subtotal</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-border">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-primary-light border border-border">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-text-muted">
                              {item.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-text-muted">{item.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm text-text-muted">
                      {formatEgp(item.price)}
                    </td>
                    <td className="px-6 py-6">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => {
                          const q = parseInt(e.target.value, 10)
                          dispatch(updateQuantity({ id: item.id, quantity: isNaN(q) ? 1 : q }))
                        }}
                        className="w-16 h-10 px-2 border border-border rounded-lg text-center text-sm"
                      />
                    </td>
                    <td className="px-6 py-6 text-sm text-text">
                      {formatEgp(item.price * item.quantity)}
                    </td>
                    <td className="px-6 py-6">
                      <button
                        type="button"
                        onClick={() => dispatch(removeItem(item.id))}
                        className="p-2 rounded-lg hover:bg-surface-alt text-primary transition-colors"
                        aria-label="Remove"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-surface-alt rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-text text-center">Cart Totals</h2>
              <div className="mt-8 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-text">Subtotal</span>
                  <span className="text-text-muted">{formatEgp(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text font-medium">Total</span>
                  <span className="text-primary font-semibold">{formatEgp(total)}</span>
                </div>
              </div>
              <Link to="/checkout" className="block mt-8">
                <Button size="lg" className="w-full bg-transparent text-text border border-text hover:bg-background">
                  Check Out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <FeaturesStrip />
    </div>
  )
}
