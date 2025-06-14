// src/components/Navbar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom"
const Navbar = () => {
  const cartCount = 1; // You can change this to a dynamic state later

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand d-flex align-items-center" to="/">
        <img
          src="https://img.icons8.com/color/48/000000/smartphone-tablet.png"
          alt="Mobile Shop Logo"
          height="40"
        />
        <span className="ms-2 fw-bold">MobileShop</span>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link d-flex align-items-center" to="/product">
              <i className="bi bi-plus-circle me-1" style={{ fontSize: '1.2rem' }}></i>
              Add Product
            </NavLink>
          </li>

          {/* 🛒 My Cart Link */}
          <li className="nav-item ms-3">
            <a className="nav-link position-relative d-flex align-items-center" href="/cart">
              <i className="bi bi-cart-fill me-1" style={{ fontSize: '1.2rem' }}></i>
              My Cart
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.6rem' }}
                >
                  {cartCount}
                </span>
              )}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
