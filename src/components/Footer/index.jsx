import React from "react";

const Footer = () => {
  return (
    <footer className="footer-section">

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
                <li>Valoria Online Shopping Store, Pakistan</li>
                <li><span>📞</span> +92 (300) 18-4567-29</li>
                <li><span>✉️</span> veloria@gmail.com</li>
                <li><span>⏰</span> Mon - Sat: 9:00 AM - 9:00 PM</li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom py-3">
        <div className="container">
          <div className="row text-center">
            <div className="col">
              <p className="copyright-text mb-0">
                &copy; {new Date().getFullYear()} <strong>VALORIA</strong>. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;