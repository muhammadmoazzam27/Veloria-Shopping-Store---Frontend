import React from "react";

const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Newsletter Strip */}
      <div className="newsletter-box">
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-12 col-lg-6 text-center text-lg-start">
              <h4 className="newsletter-title mb-1">Join Our Newsletter</h4>
              <p className="newsletter-desc mb-0">Get 10% off your first order & stay updated on exclusive deals.</p>
            </div>
            <div className="col-12 col-lg-6">
              <form className="newsletter-form d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email address..." 
                  required 
                />
                <button type="submit" className="btn-subscribe">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="footer-main py-5">
        <div className="container">
          <div className="row g-4">
            
            {/* Col 1: Brand Info */}
            <div className="col-12 col-md-6 col-lg-4">
              <h3 className="footer-brand">VALORIA</h3>
              <p className="brand-desc">
                Your one-stop destination for daily essentials, fashion, and lifestyle products with top brands and big savings every day.
              </p>
              <div className="social-links d-flex gap-3">
                <a href="#facebook" aria-label="Facebook">FB</a>
                <a href="#instagram" aria-label="Instagram">IG</a>
                <a href="#twitter" aria-label="Twitter">TW</a>
                <a href="#youtube" aria-label="YouTube">YT</a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="col-6 col-md-3 col-lg-2">
              <h5 className="footer-heading">Quick Links</h5>
              <ul className="footer-links list-unstyled">
                <li><a href="#about">About Us</a></li>
                <li><a href="#shop">Shop Products</a></li>
                <li><a href="#offers">Featured Offers</a></li>
                <li><a href="#blogs">Blog Posts</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>

            {/* Col 3: Customer Care */}
            <div className="col-6 col-md-3 col-lg-2">
              <h5 className="footer-heading">Customer Care</h5>
              <ul className="footer-links list-unstyled">
                <li><a href="#track">Track Order</a></li>
                <li><a href="#returns">Returns & Refunds</a></li>
                <li><a href="#shipping">Shipping Policy</a></li>
                <li><a href="#faqs">FAQs</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Col 4: Contact Info */}
            <div className="col-12 col-md-6 col-lg-4">
              <h5 className="footer-heading">Contact Us</h5>
              <ul className="contact-info list-unstyled">
                <li><span>📍</span> 123 Valoria Tower, Main Boulevard, Pakistan</li>
                <li><span>📞</span> +92 (300) 123-4567</li>
                <li><span>✉️</span> support@valoria.com</li>
                <li><span>⏰</span> Mon - Sat: 9:00 AM - 9:00 PM</li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom py-3">
        <div className="container">
          <div className="row align-items-center g-2 text-center text-md-start">
            <div className="col-12 col-md-6">
              <p className="copyright-text mb-0">
                © {new Date().getFullYear()} <strong>VALORIA</strong>. All Rights Reserved.
              </p>
            </div>
            <div className="col-12 col-md-6 text-md-end">
              <div className="payment-badges">
                <span className="badge-item">Visa</span>
                <span className="badge-item">MasterCard</span>
                <span className="badge-item">PayPal</span>
                <span className="badge-item">COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;