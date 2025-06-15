import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { NavLink, useLocation} from 'react-router-dom';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState('');
    const location = useLocation(); 

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cartItems.length);
  }, []);

  const brands = ["Apple", "Samsung", "Vivo", "Oppo", "Infinix", "Huawei"];

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm px-4 py-3 bg-white border-bottom sticky-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center fw-bold text-primary" to="/">
            <img
              src="https://img.icons8.com/color/48/000000/smartphone-tablet.png"
              alt="Logo"
              height="36"
              className="me-2"
            />
            MobileShop
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
            <ul className="navbar-nav align-items-center gap-3">
              <li className="nav-item">
                <NavLink className="nav-link text-dark fw-semibold d-flex align-items-center" to="/product">
                  <i className="bi bi-plus-circle me-1 text-primary"></i> Add Product
                </NavLink>
              </li>

              <li className="nav-item position-relative">
                <NavLink className="nav-link text-dark fw-semibold d-flex align-items-center" to="/cart">
                  <i className="bi bi-cart-fill me-1 text-primary"></i> My Cart
                  {cartCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: '0.65rem' }}
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
