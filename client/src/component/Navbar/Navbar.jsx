import React, { useEffect, useState } from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartCount, setCartCount] = useState(0);
  const [query, setQuery] = useState("");
  const [prevPath, setPrevPath] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo */}
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

          {/* Menu Icon (visible below 1050px) */}
          <div className="menu d-block d-lg-none">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-transparent border-0 text-white fs-3"
            >
              <RiMenu3Line />
            </button>
          </div>

          {/* Desktop Search */}
          <form
            className="position-relative d-none d-lg-block mx-3"
            style={{ width: "35%" }}
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

          {/* Nav + Mobile Search */}
          <div
            className={`nav-links-container ${
              isMenuOpen ? "d-block" : "d-none"
            } d-lg-block`}
          >
            {/* Mobile Search */}
            <form
              className="position-relative d-block d-lg-none my-3"
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
                  right: "40px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "gray",
                }}
              ></i>
            </form>

            {/* Nav Links */}
            <ul className="navbar-nav ms-auto align-items-lg-center gap-3 mt-3 mt-lg-0">
              {/* About */}
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold d-flex align-items-center"
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="bi bi-info-circle fs-5 text-primary me-2"></i>
                  About
                </NavLink>
              </li>

              {/* Add Product */}
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold d-flex align-items-center"
                  to="/product"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="bi bi-plus-square fs-5 text-success me-2"></i>
                  Add Product
                </NavLink>
              </li>

              {/* Contact */}
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white fw-semibold d-flex align-items-center"
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="bi bi-envelope-fill fs-5 text-warning me-2"></i>
                  Contact
                </NavLink>
              </li>

              {/* My Cart */}
              <li className="nav-item position-relative">
                <NavLink
                  className="nav-link text-white fw-semibold d-flex align-items-center"
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="bi bi-bag-check-fill fs-5 text-danger me-2"></i>
                  My Cart
                  {cartCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.65rem", marginTop: "-8px" }}
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
