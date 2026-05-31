function ProductCard({ product }) {
  const { name, category, price, rating, image } = product

  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) return '★'
    if (i < rating) return '½'
    return '☆'
  })

  return (
    <div className="product-card">
      <div className="product-image">{image}</div>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-name">{name}</h3>
        <div className="product-rating">
          <span className="stars">{stars.join('')}</span>
          <span className="rating-value">{rating}</span>
        </div>
        <div className="product-footer">
          <span className="product-price">₹{price.toLocaleString()}</span>
          <button className="add-btn">Add to Cart 🛒</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard