import { useState, useMemo } from 'react'
import products from './data/products'
import FilterBar from './components/FilterBar'
import ProductCard from './components/ProductCard'
import NoResults from './components/NoResults'
import './App.css'

const MAX_PRICE = 5000

function App() {
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)

  // Filter products based on search and price
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchesPrice = p.price <= maxPrice
      return matchesSearch && matchesPrice
    })
  }, [search, maxPrice])

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="header">
        <h1 className="header-title">🛍️ Product Store</h1>
        <p className="header-subtitle">{filtered.length} products found</p>
      </header>

      <div className="main-layout">
        {/* Sidebar Filters */}
        <aside className="sidebar">
          <FilterBar
            search={search}
            setSearch={setSearch}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            absoluteMax={MAX_PRICE}
          />
        </aside>

        {/* Product Grid */}
        <main className="product-section">
          {filtered.length > 0 ? (
            <div className="product-grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <NoResults onReset={() => { setSearch(''); setMaxPrice(MAX_PRICE) }} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App