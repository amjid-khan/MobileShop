import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./View.css";

function View() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;

  const handleCart = (item) => {
    const cartItem = {
      title: item.title,
      brand: item.brand,
      description: item.description,
      image: item.image,
      quantity: 1,
      price: item.price,
    };

    axios.post("http://localhost:8000/api/product/addcart", cartItem)
      .then((res) => {
        navigate("/cart", { state: item });
        toast.success("Item Added Successfully");
      })
      .catch((err) => {
        console.error("Error saving to DB:", err);
      });
  };

  return (
    <div className="bg-white min-vh-100 py-5 d-flex justify-content-center align-items-start">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "600px", width: "100%" }}>
        <img
          src={`http://localhost:8000/uploads/image/${item.image}`}
          className="img-fluid rounded-3 mb-3"
          alt={item.title}
          style={{ height: "320px", objectFit: "cover", width: "100%" }}
        />
        <h2 className="fw-bold text-dark">{item.title}</h2>
        <h5 className="text-secondary mb-2">Brand: {item.brand}</h5>
        <p className="fs-5 fw-semibold text-success">Price : Rs. {item.price}</p>
        <p className="text-muted">{item.description}</p>
        <p className="text-body-secondary small">
          This phone combines elegance and high performance. Whether you’re into gaming or photography,
          this device is built to impress with a sleek body and top-tier internals.
        </p>
        <button className="btn btn-primary mt-3 w-100" onClick={() => handleCart(item)}>
          <i className="bi bi-cart-plus me-2"></i>Add to Cart
        </button>
      </div>
    </div>
  );
}

export default View;
