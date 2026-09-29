import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Rate, Spin, Tag } from 'antd'
import axios from 'axios'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useCartContext } from '@/hooks/CartContext'

const Product = () => {

  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCartContext();

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showAllProducts = () => {

    const token = localStorage.getItem('jwtToken')

    axios.get(`${VITE_API_BASE_URL}/products/show/all/products`, { headers: { Authorization: `Bearer ${token}` } })

      .then((res) => {
        // setProducts(res.data.allProducts || [])
        sessionStorage.setItem("AllProducts", JSON.stringify(res.data.allProducts))
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
        setLoading(false)
      })

  }

  // Fetch Products
  useEffect(() => {
    showAllProducts();
    const sessionProducts = JSON.parse(sessionStorage.getItem("AllProducts"))
    setProducts(sessionProducts)
  }, [])

  // Modal Handlers
  const handleOpenDetails = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <main className="product-page-wrapper py-4 py-lg-5">
      <div className="container">

        {/* --- Hero Section --- */}
        <section className="product-hero p-4 p-md-5 mb-5 rounded-4 bg-white shadow-sm">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <h1 className="hero-heading display-6 fw-bold text-dark mb-3">
                Discover Quality Products Designed for Your Lifestyle
              </h1>
              <p className="hero-description text-secondary fs-6 mb-4">
                Explore our curated collection of high-quality items built for daily comfort, style, and long-lasting value. Shop today with secure checkout and fast doorstep delivery.
              </p>

              {/* Trust Badges */}
              <div className="trust-badges d-flex flex-wrap gap-2 gap-sm-3">
                <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
                  <i className="bi bi-truck me-1 text-primary"></i> ✓ Free Shipping
                </span>
                <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
                  <i className="bi bi-shield-check me-1 text-success"></i> ✓ 100% Genuine
                </span>
                <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
                  <i className="bi bi-credit-card me-1 text-info"></i> ✓ Secure Payment
                </span>
              </div>
            </div>

            <div className="col-lg-5 text-lg-end">
              <a href="#product-grid" className="btn btn-primary btn-lg rounded-pill px-4 me-2 mb-2 mb-sm-0">
                Explore Products
              </a>
            </div>
          </div>
        </section>

        {/* --- Product Grid --- */}
        <section id="product-grid">
          <div className="d-flex justify-content-center align-items-center mb-4">
            <h2 className="fw-bold fs-1 text-dark mb-0">Our Products</h2>
            {/* <span className="text-muted fs-6">{products.length} Products Available</span> */}
          </div>

          <div className="row g-3 g-md-4">
            {products.map((product) => {
              const productId = product._id || product.id
              const pImage = product.imageURL || product.image

              return (
                <div key={productId} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                  <div className="card product-card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">

                    {/* Category Badge */}
                    {product.category && (
                      <span className="badge bg-secondary position-absolute top-0 start-0 m-3 text-capitalize">
                        {product.category}
                      </span>
                    )}

                    {/* Image Container */}
                    <div className="card-img-wrapper d-flex align-items-center justify-content-center p-4 bg-white" style={{ height: '220px' }}>
                      <img
                        loading='lazy'
                        src={pImage}
                        alt={product.title}
                        className="card-img-top img-fluid h-100"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    {/* Card Content */}
                    <div className="card-body d-flex flex-column p-3">
                      <h5 className="card-title text-truncate fw-semibold text-dark fs-6 mb-2" title={product.title}>
                        {product.title}
                      </h5>

                      <p className="card-text text-secondary small text-truncate-2 flex-grow-1 mb-1">
                        {product.description}
                      </p>

                      <div className='mb-1 d-flex justify-content-between'>
                        <span className="fs-5 fw-bold text-primary">
                          ${product.price}
                        </span>

                      </div>

                      {/* Price & Modal Trigger */}
                      <div className="d-flex justify-content-between align-items-center mt-auto py-2">
                        <span className="text-light postion-relative mb-4">
                          <span className='bg-secondary position-absolute px-2 rounded opacity-75'>{product.stock}+items</span>
                        </span>

                        <span
                          onClick={() => handleOpenDetails(product)}
                          className="detail-link px-3"
                        >
                          View Details
                        </span>
                      </div>

                      {/* Button Add to Cart */}
                      <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                        <button className="btn btn-primary btn rounded px-3 w-100" onClick={() => { addToCart(product) }}> <ShoppingCartOutlined /> Add to Cart</button>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>

        </section>

        {/* --- Product Details Modal --- */}
        <Modal
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={null}
          centered
          width={750}
          style={{ top: 20, bottom: 20 }}
          styles={{
            body: {
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
              padding: '24px'
            }
          }}
        >
          {selectedProduct && (
            <div className="row gy-4 align-items-center">
              {/* Product Image */}
              <div className="col-12 col-md-5 text-center">
                <div className="p-3 bg-light rounded-4 d-flex align-items-center justify-content-center" style={{ minHeight: '260px' }}>
                  <img
                    src={selectedProduct.imageURL || selectedProduct.image}
                    alt={selectedProduct.title}
                    className="img-fluid"
                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="col-12 col-md-7">
                {selectedProduct.category && (
                  <Tag color="blue" className="text-capitalize mb-2 px-3 py-1 rounded-pill">
                    {selectedProduct.category}
                  </Tag>
                )}

                <h3 className="fw-bold text-dark fs-4 mb-2">
                  {selectedProduct.title}
                </h3>

                {/* Price */}
                <div className="mb-3">
                  <span className="fs-3 fw-bold text-primary">${selectedProduct.price}</span>
                </div>

                {/* Description */}
                <p className="text-secondary small mb-4" style={{ lineHeight: '1.6' }}>
                  {selectedProduct.description}
                </p>

                {/* Actions */}
                <div className="d-flex gap-2">
                  <Button type="primary" size="large" shape="round" className="px-4">
                    Add to Cart
                  </Button>
                  <Button size="large" shape="round" onClick={handleCloseModal}>
                    Close
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