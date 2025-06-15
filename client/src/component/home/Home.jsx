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
      navigate("/cart" , {state : item})
      toast.success("Item Added Successfully")
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
      <h2 className="mb-4 fw-bold text-center text-primary">Latest Products</h2>
      <div className="row g-4">
        {view.map((item) => (
          <div key={item._id} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 border-0 shadow rounded-4 hover-shadow transition-all">
              <img
                src={`http://localhost:8000/uploads/image/${item.image}`}
                className="card-img-top rounded-top-4"
                alt={item.title}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0 text-dark fw-semibold">
                      {item.brand}
                    </h5>
                    <span className="badge bg-success text-light">★ 4.5</span>
                  </div>
                  <p className="text-secondary mb-1 small">{item.title}</p>
                  <p className="text-muted small">{item.description}</p>
                </div>

                <div className="mt-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn"
                        onClick={() => handleIncrease(item._id)}
                      >
                        +
                      </button>
                      <span className="fw-bold">{quantity[item._id] || 1}</span>
                      <button
                        className="btn"
                        onClick={() => handleDecrease(item._id)}
                      >
                        -
                      </button>
                    </div>
                    <p className="mb-0 fw-bold text-success">
                      Rs. {item.price * (quantity[item._id] || 1)}
                    </p>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
