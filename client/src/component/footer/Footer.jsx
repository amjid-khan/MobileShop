// Footer.js
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row gy-4">
          {/* About Section */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">MobileStore</h5>
            <p className="text-secondary small">
              Your trusted destination for the latest smartphones at the best prices. We deliver quality and satisfaction.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h6 className="fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled text-secondary small">
              <li><a href="#" className="text-decoration-none text-light">Home</a></li>
              <li><a href="#" className="text-decoration-none text-light">About</a></li>
              <li><a href="#" className="text-decoration-none text-light">Contact</a></li>
              <li><a href="/cart" className="text-decoration-none text-light">Cart</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4">
            <h6 className="fw-semibold mb-3">Contact</h6>
            <p className="small mb-1">
              📞 <span className="text-secondary">+92 311 9091924</span>
            </p>
            <p className="small mb-1">
              ✉️ <span className="text-secondary">amjidkurrmywal@gmail.com</span>
            </p>
            <p className="small">
              📍 <span className="text-secondary">Kohat, Pakistan</span>
            </p>
          </div>
        </div>

        <hr className="border-secondary mt-4" />
        <p className="text-center text-secondary small m-0">
          &copy; {new Date().getFullYear()} MobileStore. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
