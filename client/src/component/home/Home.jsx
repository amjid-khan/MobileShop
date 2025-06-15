import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();
  const [view, setView] = useState([]);
  const [quantity, setQuantity] = useState({});

  const getAllData = () => {
    axios
      .get("http://localhost:8000/api/product/view")
      .then((res) => {
        setView(res.data.viewData);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
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
      .then((res) => {
        console.log("Saved to DB:", res.data);
        toast.success("Item Added Successfully");
      })
      .catch((err) => {
        console.error("Error saving to DB:", err);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleIncrease = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) - 1,
    }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold text-center text-primary">Apple Products</h2>
      <div className="row g-4">
        {view.map((item) => (
          <div key={item._id} className="col-12 col-lg-6">
            <div className="card product-card flex-row border rounded-4 overflow-hidden shadow-sm">
              {/* Left: Image */}
              <div
                className="col-4 p-0 position-relative"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/viewpage", { state: item })}
              >
                <img
                  src={`http://localhost:8000/uploads/image/${item.image}`}
                  alt={item.title}
                  className="img-fluid h-100 object-fit-cover"
                  style={{ height: "100%", objectFit: "cover" }}
                />
                <span className="position-absolute top-0 end-0 m-2 badge bg-success">
                  ★ 4.5
                </span>
              </div>

              {/* Right: Content */}
              <div className="col-8 p-3 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="fw-semibold text-dark mb-1">{item.brand}</h5>
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
                    <button className="btn btn-light btn-sm fw-bold" disabled>
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
                  className="btn btn-primary w-100 rounded-pill fw-semibold"
                  onClick={() => handleCart(item)}
                >
                   Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
