import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

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

    axios
      .post("http://localhost:8000/api/product/addcart", cartItem)
      .then((res) => {
        toast.success("Item Added Successfully");
      })
      .catch((err) => {
        console.error("Error saving to DB:", err);
      });
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-start py-5 px-3"
      style={{
        background: "linear-gradient(135deg, #f0f2f5 0%, #dfe9f3 100%)",
      }}
    >
      <div
        className="shadow-lg p-4 rounded-4 bg-white"
        style={{
          maxWidth: "650px",
          width: "100%",
          borderRadius: "20px",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img
          src={`http://localhost:8000/uploads/image/${item.image}`}
          alt={item.title}
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
            borderRadius: "16px",
            marginBottom: "24px",
          }}
        />

        <h2 className="fw-bold text-dark mb-2">{item.title}</h2>
        <h5 className="text-secondary mb-1">Brand: <strong>{item.brand}</strong></h5>

        <p className="fs-5 text-success fw-semibold mb-2">
          Price: Rs. {item.price}
        </p>

        <p className="text-muted mb-3" style={{ lineHeight: "1.6" }}>
          {item.description}
        </p>

        <p className="text-secondary small fst-italic mb-4">
          This premium phone blends style and performance — perfect for gaming, photography,
          and daily use with its top-tier specs and sleek body.
        </p>

        <button
          className="w-100 fw-semibold"
          onClick={() => handleCart(item)}
          style={{
            backgroundColor: "#111",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "30px",
            border: "none",
            fontSize: "16px",
            transition: "background 0.3s",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
            letterSpacing: "0.5px",
          }}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default View;
