import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts, fetchCategories } from '../store/slices/productsSlice'
import ProductCard from '../components/ui/ProductCard'
import PageHero from '../components/common/PageHero'
import FeaturesStrip from '../components/sections/FeaturesStrip'
import Pagination from '../components/common/Pagination'
import { FiFilter, FiGrid, FiList, FiSearch } from 'react-icons/fi'
import { formatEgp } from '../utils/formatEgp'

const categoryLabels = {
  living: 'Living',
  dining: 'Dining',
  bedroom: 'Bedroom',
  office: 'Office',
}

export default function Products() {
  const dispatch = useDispatch()
  const { items: products, categories, loading } = useSelector((state) => state.products)
  const [page, setPage] = useState(1)
  const [showCount, setShowCount] = useState(8)
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return products.filter((p) => {
      const byCategory = selectedCategory === 'all' || p.category === selectedCategory
      if (!byCategory) return false
      if (!q) return true
      return `${p.name || ''} ${p.description || ''}`.toLowerCase().includes(q)
    })
  }, [products, search, selectedCategory])

  const sorted = useMemo(() => {
    const list = [...filtered]
    if (sort === 'price-asc') list.sort((a, b) => (a.price || 0) - (b.price || 0))
    if (sort === 'price-desc') list.sort((a, b) => (b.price || 0) - (a.price || 0))
    if (sort === 'name-asc') list.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
    return list
  }, [filtered, sort])

  const total = sorted.length 
  const totalPages = Math.max(1, Math.ceil(total / showCount))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * showCount
  const end = Math.min(total, start + showCount)
  const paged = sorted.slice(start, end) // Get only the products for the current page

  return (
    <div>
      <PageHero title="Shop" crumbs={[{ label: 'Home', to: '/' }, { label: 'Shop' }]} />

      <div className="bg-[#F9F1E7] border-b border-[#E8DFD4]">
        <div className="container mx-auto px-4 py-5 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-4 md:gap-5">
            <button
              type="button"
              onClick={() => setShowFilterPanel((prev) => !prev)}
              className="inline-flex items-center gap-2 text-base font-medium text-[#3A3A3A]"
            >
              <FiFilter className="w-4 h-4" />
              Filter
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center transition-colors ${
                viewMode === 'grid' ? 'text-primary' : 'text-[#3A3A3A]'
              }`}
              aria-label="Grid view"
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center transition-colors ${
                viewMode === 'list' ? 'text-primary' : 'text-[#3A3A3A]'
              }`}
              aria-label="List view"
            >
              <FiList className="w-4 h-4" />
            </button>
            <div className="h-8 w-px bg-[#CFC6BB] hidden sm:block" />
            <p className="text-base text-[#3A3A3A]">
              Showing {total === 0 ? 0 : start + 1}–{end} of {total} results
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-5">
            <div className="flex items-center gap-3">
              <span className="text-[16px] leading-none text-[#3A3A3A]">Show</span>
              <select
                value={showCount}
                onChange={(e) => {
                  setShowCount(Number(e.target.value))
                  setPage(1)
                }}
                className="h-12 px-5 rounded-none border border-[#E7E7E7] bg-[#FFFFFF] text-[16px] leading-none text-[#9F9F9F] min-w-21 appearance-none"
              >
                <option value={8}>08</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[16px] leading-none text-[#3A3A3A]">Short by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-12 px-5 rounded-none border border-[#E7E7E7] bg-[#FFFFFF] text-[16px] leading-none text-[#9F9F9F] min-w-45 appearance-none"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {showFilterPanel && (
          <div className="container mx-auto px-4 pb-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative md:col-span-2">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                  placeholder="Search products..."
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  setPage(1)
                }}
                className="h-11 px-4 rounded-lg border border-border bg-background text-sm"
              >
                <option value="all">All categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {categoryLabels[cat] || cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-14">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-96 bg-surface-alt rounded-xl animate-pulse" />
            ))}
          </div>
        ) : paged.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paged.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paged.map((product) => (
                <Link
                  key={product.id}
                  to={`/shop/${product.id}`}
                  className="block border border-border rounded-xl bg-background p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="w-28 h-24 rounded-lg overflow-hidden bg-surface-alt shrink-0">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-muted font-bold">
                          {product.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-text">{product.name}</h3>
                      <p className="text-sm text-text-muted mt-1 line-clamp-2">{product.description}</p>
                      <p className="mt-2 font-semibold text-text">
                        {formatEgp(product.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : (
          <p className="text-text-muted">No products found.</p>
        )}

        <div className="mt-12">
          <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>

      <FeaturesStrip />
    </div>
  )
}
