import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartCount, setCartCount] = useState(0);
  const [query, setQuery] = useState("");
  const [prevPath, setPrevPath] = useState("/");

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cartItems.length);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const isSearchPage = location.pathname.startsWith("/search");

      if (query.trim()) {
        if (
          !isSearchPage &&
          !location.pathname.startsWith("/viewpage") &&
          location.pathname !== "/about" &&
          location.pathname !== "/contact" &&
          location.pathname !== "/product" &&
          location.pathname !== "/cart"
        ) {
          setPrevPath(location.pathname);
          navigate(`/search?q=${query}`);
        }
      } else {
        if (isSearchPage) {
          navigate(prevPath);
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, location.pathname]);

  useEffect(() => {
    const allowQueryPreserve = ["/search", "/viewpage"];
    const shouldClearQuery = !allowQueryPreserve.some((path) =>
      location.pathname.startsWith(path)
    );

    if (shouldClearQuery) {
      setQuery("");
    }
  }, [location.pathname]);

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm px-4 py-3 bg-black border-bottom sticky-top">
        <div className="container-fluid">
          {/* Modern Logo */}
          <NavLink
            className="navbar-brand d-flex align-items-center text-white fw-bold fs-4"
            to="/"
            style={{ letterSpacing: "1px" }}
          >
            <i className="bi bi-phone-flip fs-3 me-2 text-primary"></i>
            <span>
              Mobile<span className="text-primary">Shop</span>
            </span>
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
            {/* Search Bar - clean professional */}
            <form
              className="mx-auto position-relative w-50"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="search"
                className="form-control"
                placeholder="Search for mobiles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <i
                className="bi bi-search"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "gray",
                }}
              ></i>
            </form>

            {/* Nav Links */}
            <ul className="navbar-nav ms-auto align-items-center gap-3 mt-3 mt-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold d-flex align-items-center"
                  to="/about"
                >
                  <i className="bi bi-info-circle me-2 fs-5 text-primary"></i>
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold d-flex align-items-center"
                  to="/product"
                >
                  <i className="bi bi-plus-square me-2 fs-5 text-success"></i>
                  Add Product
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold d-flex align-items-center"
                  to="/contact"
                >
                  <i className="bi bi-envelope-fill me-2 fs-5 text-warning"></i>
                  Contact
                </NavLink>
              </li>

              <li className="nav-item position-relative">
                <NavLink
                  className="nav-link text-white fw-semibold d-flex align-items-center"
                  to="/cart"
                >
                  <i className="bi bi-bag-check-fill me-2 fs-5 text-danger"></i>
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
