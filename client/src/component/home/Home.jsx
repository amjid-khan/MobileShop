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

  // Persist selected brand in localStorage
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

      {/* Product Cards */}
      <div className="container mt-4">
        <div className="row g-4 m-0">
          {filteredView.map((item, index) => {
            const bgColors = [
              "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
              "linear-gradient(135deg, #fefcea 0%, #f1da36 100%)",
              "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
              "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
              "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            ];

            return (
              <div key={item._id} className="col-12 col-lg-6">
                <div
                  className="card product-card flex-row rounded-4 overflow-hidden"
                  style={{
                    background: bgColors[index % bgColors.length],
                    height: "220px",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  <div
                    className="col-4 p-0 position-relative"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/viewpage", { state: item })}
                  >
                   <img
  src={`http://localhost:8000/uploads/image/${item.image}`}
  alt={item.title}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "8px 0 0 8px",
    display: "block",
  }}
/>


                    <span className="position-absolute top-0 end-0 m-2 badge bg-success">
                      ★ 4.5
                    </span>
                  </div>

                  <div className="col-8 p-3 d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="fw-semibold text-dark mb-1">
                        {item.brand}
                      </h5>
                      <p className="text-muted small mb-1">{item.title}</p>
                      <p className="text-secondary small clamp-description mb-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="btn-group shadow-sm">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleDecrease(item._id)}
                        >
                          −
                        </button>
                        <button
                          className="btn btn-light btn-sm fw-bold"
                          disabled
                        >
                          {quantity[item._id] || 1}
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleIncrease(item._id)}
                        >
                          +
                        </button>
                      </div>
                      <span className="fw-bold text-success">
                        ${item.price * (quantity[item._id] || 1)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCart(item)}
                      style={{
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        alignSelf: "flex-end",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#222")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#000")
                      }
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
