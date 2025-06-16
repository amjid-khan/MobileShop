import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cartItems.length);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm px-4 py-3 bg-black border-bottom sticky-top">
        <div className="container-fluid">
          <NavLink
            className="navbar-brand d-flex align-items-center fw-bold text-primary"
            to="/"
          >
            <i className="bi bi-phone-fill fs-4 me-2 text-primary"></i>
            MobileShop
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <form
              className="mx-auto position-relative w-50"
            >
              <input
                type="search"
                className="form-control"
                id="search"
                placeholder="Search for mobiles..."
              />
              <i className="bi bi-search search-icon"></i>
            </form>

            {/* Nav Links */}
            <ul className="navbar-nav ms-auto align-items-center gap-3 mt-3 mt-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold d-flex align-items-center"
                  to="/product"
                >
                  <i className="bi bi-plus-square me-1 text-white"></i>
                  Add Product
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold d-flex align-items-center"
                  to="/contact"
                >
                  <i className="bi bi-envelope me-1 text-white"></i>
                  Contact
                </NavLink>
              </li>

              <li className="nav-item position-relative">
                <NavLink
                  className="nav-link text-white fw-semibold d-flex align-items-center"
                  to="/cart"
                >
                  <i className="bi bi-bag-check-fill me-1 text-white"></i>
                  My Cart
                  {cartCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.65rem" }}
                    >
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ToastContainer />
    </>
  );
};

export default Navbar;
