import React from 'react'
import { useState, useEffect } from "react";
import { Truck, ShieldCheck, RefreshCw, Headset, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {

  const saleTextList = [
    "MEGA SALE — UP TO 50% OFF",
    "LIMITED TIME DEALS — SAVE BIG",
    "FLAT 50% DISCOUNT TODAY ONLY",
    "SPECIAL OFFER — FREE SHIPPING"
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = saleTextList[textIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2000); // 2 second pause
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % saleTextList.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  const features = [
    { icon: <Truck size={32} />, title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: <ShieldCheck size={32} />, title: 'Secure Payment', desc: '100% protected checkout' },
    { icon: <RefreshCw size={32} />, title: 'Easy Returns', desc: '7 days return policy' },
    { icon: <Headset size={32} />, title: '24/7 Support', desc: 'Dedicated customer care' },
  ]

  const categories = [
    {
      id: 1,
      title: "Men's Clothing",
      itemCount: '50+ Items',
      image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/products?category=men-clothing'
    },
    {
      id: 2,
      title: "Women's Clothing",
      itemCount: '50+ Items',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600',
      link: '/products?category=women-clothing'
    },
    {
      id: 3,
      title: "Men's Shoes",
      itemCount: '50+ Items',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
      link: '/products?category=men-shoes'
    },
    {
      id: 4,
      title: "Women's Shoes",
      itemCount: '50+ Items',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600',
      link: '/products?category=women-shoes'
    },
    {
      id: 5,
      title: 'Luxury Watches',
      itemCount: '50+ Items',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
      link: '/products?category=watches'
    },
    {
      id: 6,
      title: 'Handbags & Purses',
      itemCount: '50+ Items',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
      link: '/products?category=handbags'
    },
    {
      id: 7,
      title: 'Sunglasses',
      itemCount: '50+ Items',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
      link: '/products?category=sunglasses'
    },
    {
      id: 8,
      title: 'Jewelry & Accessories',
      itemCount: '50+ Items',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600',
      link: '/products?category=jewelry'
    }
  ]

  return (
    <main className='home'>
      <div className="hero">
        <div className="hero-content">
          <div className="sale-badge">
            <span className="badge-pulse"></span>
            <span className="sale-animated-text">
              {saleTextList[textIndex].substring(0, charIndex)}
            </span>
            <span className="cursor">|</span>
          </div>

          <h1 className="hero-heading">Big Brands, Bigger Savings Every Day</h1>

          <p>
            Explore thousands of everyday essentials, fashion, and lifestyle products at Valoria. Shop smart with daily deals, hassle-free returns, and free delivery on featured items!
          </p>
          <button className="btn-primary">Shop Now</button>
        </div>
      </div>

      {/* Featues Section  */}
      <section className="features-bar">
        <div className="container">
          <div className="row g-3 g-md-4">
            {features.map((item, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-3">
                <div className="feature-card">
                  <div className="feature-icon">{item.icon}</div>
                  <div className="feature-info">
                    <h6 className="feature-title">{item.title}</h6>
                    <p className="feature-desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section  */}
      <section className="categories-section py-5">
        <div className="container">
          <div className="section-header text-center mb-4 mb-md-5">
            <span className="subtitle">Explore Collections</span>
            <h2 className="title">Shop by Category</h2>
            <div className="title-line"></div>
          </div>

          {/* Categories Grid */}
          <div className="row g-4">
            {categories.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-lg-3">
                <Link to='/products' className="category-card">
                  <div className="category-img-wrapper">
                    <img src={product.image} alt={product.title} className="category-img" />
                    <div className="category-overlay"></div>
                  </div>

                  <div className="category-content">
                    <span className="item-badge">{product.itemCount}</span>
                    <h4 className="category-name">{product.title}</h4>
                    <div className="explore-btn">
                      <span>Explore Now</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonial-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Trusted by over 10,000+ satisfied shoppers worldwide</p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="testimonial-card">
                <div className="card-content">
                  <div className="stars mb-3">★★★★★</div>
                  <p className="review-text">
                    "The product quality exceeded my expectations! Delivery was right on time and the packaging was extremely secure. I will definitely be ordering again."
                  </p>
                </div>
                <div className="customer-info d-flex align-items-center">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Ayesha Khan" className="avatar me-3" />
                  <div>
                    <h5 className="customer-name mb-0">Ayesha Khan</h5>
                    <span className="verified-tag">✓ Verified Buyer</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="testimonial-card">
                <div className="card-content">
                  <div className="stars mb-3">★★★★★</div>
                  <p className="review-text">
                    "I was a bit hesitant to order at first, but the customer support team guided me through everything seamlessly. Absolute value for money!"
                  </p>
                </div>
                <div className="customer-info d-flex align-items-center">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Ali Raza" className="avatar me-3" />
                  <div>
                    <h5 className="customer-name mb-0">Ali Raza</h5>
                    <span className="verified-tag">✓ Verified Buyer</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="testimonial-card">
                <div className="card-content">
                  <div className="stars mb-3">★★★★★</div>
                  <p className="review-text">
                    "The website experience was super smooth and checkout took less than two minutes. The item arrived exactly as pictured on the site."
                  </p>
                </div>
                <div className="customer-info d-flex align-items-center">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" alt="Sana Ahmed" className="avatar me-3" />
                  <div>
                    <h5 className="customer-name mb-0">Sana Ahmed</h5>
                    <span className="verified-tag">✓ Verified Buyer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="testimonial-card">
                <div className="card-content">
                  <div className="stars mb-3">★★★★★</div>
                  <p className="review-text">
                    "This product quality exceeded my expectations! Delivery was right on time and the packaging was extremely secure. I will definitely be ordering again."
                  </p>
                </div>
                <div className="customer-info d-flex align-items-center">
                  <img src='https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Sana Ahmed" className="avatar me-3" />
                  <div>
                    <h5 className="customer-name mb-0">Sohail Ahmed</h5>
                    <span className="verified-tag">✓ Verified Buyer</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}

export default Home