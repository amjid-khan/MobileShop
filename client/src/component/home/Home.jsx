import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();
  const [view, setView] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [selectedBrand, setSelectedBrand] = useState(
    localStorage.getItem("selectedBrand") || ""
  );

  const brands = ["Apple", "Samsung", "Vivo", "Oppo", "Infinix", "Huawei"];
  
useEffect(() => {
  axios
    .get("http://localhost:8000/api/product/view")
    .then((res) => setView(res.data.viewData))
    .catch((err) => console.log("Error:", err));
}, []);


  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    localStorage.setItem("selectedBrand", brand);
  };

  const handleCart = (item) => {
    const qty = quantity[item._id] || 1;
    const cartItem = {
      title: item.title,
      brand: item.brand,
      description: item.description,
      image: item.image,
      quantity: qty,
      price: item.price * qty,
    };

    axios
      .post("http://localhost:8000/api/product/addcart", cartItem)
      .then(() => toast.success("Item Added Successfully"))
      .catch((err) => console.error("Error saving to DB:", err));
  };

  const handleIncrease = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  const filteredView = selectedBrand
    ? view.filter((item) => item.brand === selectedBrand)
    : view;

  return (
    <>
      {/* Brand Filter Section */}
      <div className="container mt-4">
        <div
          className="d-flex flex-wrap justify-content-between gap-3 p-3 rounded-3 bg-white shadow-sm"
          style={{ rowGap: "1rem" }}
        >
          {brands.map((brand) => (
            <div className="form-check" key={brand}>
              <input
                className="form-check-input"
                type="radio"
                name="brand"
                id={`brand-${brand}`}
                value={brand}
                checked={selectedBrand === brand}
                onChange={() => handleBrandChange(brand)}
              />
              <label
                className="form-check-label fw-semibold text-secondary"
                htmlFor={`brand-${brand}`}
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
      {selectedBrand && (
        <div
          className="d-flex justify-content-center align-items-center shadow-sm rounded-3"
          style={{
            backgroundColor: "#fff",
            width: "50vh",
            marginTop: "2rem",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
            marginLeft: "auto",
            marginRight: "auto",
            padding : "10px 10px"
          }}
        >
          <h4 className="fw-bold text-primary text-center m-0">
            {selectedBrand} Mobiles
          </h4>
        </div>
      )}

      {/* Product Cards */}
      <div className="container mt-4">
        <div className="row">
          {filteredView.map((item) => {
            const qty = quantity[item._id] || 1;
            const discountPercent = item.discount || 10; // 👈 use real data if available
            const originalPrice = item.price * qty;
            const discountAmount = (originalPrice * discountPercent) / 100;
            const finalPrice = originalPrice - discountAmount;

            return (
              <div key={item._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card h-100 shadow border-0 rounded-4 overflow-hidden">
                  <div
                    onClick={() => navigate("/viewpage", { state: item })}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={`http://localhost:8000/uploads/image/${item.image}`}
                      alt={item.title}
                      className="card-img-top p-3 bg-white"
                      style={{
                        height: "230px",
                        objectFit: "contain",
                        borderRadius: "1rem",
                      }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h6 className="text-secondary fw-semibold mb-1">
                      {item.brand}
                    </h6>
                    <h5 className="text-dark fw-bold">{item.title}</h5>
                    <p className="text-muted small clamp-description mb-2">
                      {item.description}
                    </p>

                    {/* Price section */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="text-start">
                        <span className="fw-bold text-success me-2">
                          ${finalPrice.toFixed(2)}
                        </span>
                        <small className="text-muted text-decoration-line-through">
                          ${originalPrice.toFixed(2)}
                        </small>
                      </div>
                      <span className="badge bg-danger">
                        {discountPercent}% OFF
                      </span>
                    </div>

                    {/* Quantity control */}
                    <div className="btn-group btn-group-sm mb-3 shadow-sm">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleDecrease(item._id)}
                      >
                        −
                      </button>
                      <button className="btn btn-light fw-bold" disabled>
                        {qty}
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleIncrease(item._id)}
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                      className="btn btn-dark w-100 mt-auto fw-semibold"
                      style={{
                        borderRadius: "12px",
                        padding: "10px 16px",
                        fontSize: "15px",
                        letterSpacing: "0.5px",
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => handleCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;