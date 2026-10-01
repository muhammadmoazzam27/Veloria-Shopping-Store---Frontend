import { useEffect, useState } from 'react'
import { Button, Modal, Spin, Tag, message } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useCartContext } from '@/hooks/CartContext'
import axios from 'axios'

const Product = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const { addToCart, checkoutOrder } = useCartContext()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('jwtToken')
      const res = await axios.get(`${API_BASE_URL}/products/show/all/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const allProducts = res.data?.allProducts || []
      setProducts(allProducts)
      sessionStorage.setItem('AllProducts', JSON.stringify(allProducts))
    } catch (error) {
      console.error('Error fetching products:', error)
      const cachedProducts = sessionStorage.getItem('AllProducts')
      if (cachedProducts) {
        try {
          setProducts(JSON.parse(cachedProducts))
        } catch (parseError) {
          setProducts([])
        }
      } else {
        setProducts([])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleOpenDetails = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  // Handle Cart Addition
  const handleAddToCart = (product) => {
    addToCart(product)
    message.success('Order successfully created')
  }

  // Direct Order Place (Agar direct Buy/Place order chahain)
  const handlePlaceOrder = async (product) => {
    await checkoutOrder(product)
  }

  return (
    <main className="product-page-wrapper py-4 py-lg-5">
      <div className="container">
        {/* Hero Section */}
        <section className="product-hero p-4 p-md-5 mb-5 rounded-4 bg-white shadow-sm">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <h1 className="hero-heading display-6 fw-bold text-dark mb-3">
                Discover Quality Products Designed for Your Lifestyle
              </h1>
              <p className="hero-description text-secondary fs-6 mb-4">
                Explore our curated collection of high-quality items built for daily comfort, style, and long-lasting value.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section id="product-grid">
          {loading && (
            <div className="d-flex justify-content-center py-5">
              <Spin size="large" />
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted mb-0">No products available.</p>
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="row g-3 g-md-4">
              {products.map((product) => {
                const productId = product._id || product.id
                const productImage = product.imageURL || product.image

                return (
                  <div key={productId} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                    <div className="card product-card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                      {product.category && (
                        <span className="badge bg-secondary position-absolute top-0 start-0 m-3 text-capitalize">
                          {product.category}
                        </span>
                      )}

                      <div className="card-img-wrapper d-flex align-items-center justify-content-center p-4 bg-white" style={{ height: '220px' }}>
                        <img
                          src={productImage}
                          alt={product.title || 'Product'}
                          loading="lazy"
                          className="card-img-top img-fluid h-100"
                          style={{ objectFit: 'contain', borderRadius: 8 }}
                        />
                      </div>

                      <div className="card-body d-flex flex-column p-3">
                        <h5 className="card-title text-truncate fw-semibold text-dark fs-6 mb-2" title={product.title}>
                          {product.title}
                        </h5>
                        <p className="card-text text-secondary small text-truncate-2 flex-grow-1 mb-2">
                          {product.description}
                        </p>
                        <div className="mb-2">
                          <span className="fs-5 fw-bold text-primary">${product.price}</span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center py-2">
                          <span className="small text-secondary">{product.stock ?? 0} items</span>
                          <button type="button" onClick={() => handleOpenDetails(product)} className="btn btn-link p-0 text-decoration-none">
                            View Details
                          </button>
                        </div>

                        <div className="pt-2 border-top d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-primary rounded flex-grow-1"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCartOutlined className="me-1" /> Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* Modal Fixes */}
        <Modal open={isModalOpen} onCancel={handleCloseModal} footer={null} centered width={750}>
          {selectedProduct && (
            <div className="row gy-4 align-items-center p-3">
              <div className="col-12 col-md-5 text-center">
                <img
                  src={selectedProduct.imageURL || selectedProduct.image}
                  alt={selectedProduct.title}
                  className="img-fluid"
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
              </div>

              <div className="col-12 col-md-7">
                {selectedProduct.category && <Tag color="blue">{selectedProduct.category}</Tag>}
                <h3 className="fw-bold text-dark fs-4 my-2">{selectedProduct.title}</h3>
                <div className="mb-3">
                  <span className="fs-3 fw-bold text-primary">${selectedProduct.price}</span>
                </div>
                <p className="text-secondary small mb-3">{selectedProduct.description}</p>
                <div className="d-flex gap-2">
                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => {
                      handleAddToCart(selectedProduct)
                      handleCloseModal()
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    type="default"
                    size="large"
                    shape="round"
                    onClick={() => {
                      handlePlaceOrder(selectedProduct)
                      handleCloseModal()
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </main>
  )
}

export default Product