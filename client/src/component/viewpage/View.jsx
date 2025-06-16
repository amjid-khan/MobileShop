import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function View() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;

  const [zoomStyle, setZoomStyle] = useState({
    transform: "scale(1)",
    transformOrigin: "center",
    transition: "transform 0.3s ease",
  });

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomStyle({
      transform: "scale(2.2)",
      transformOrigin: `${x}% ${y}%`,
      transition: "transform 0s",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center",
      transition: "transform 0.3s ease",
    });
  };

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
      .then(() => {
        toast.success("Item Added Successfully");
      })
      .catch((err) => {
        console.error("Error saving to DB:", err);
      });
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f0f2f5 0%, #dfe9f3 100%)",
        padding: "40px 20px",
      }}
    >
      <div
        className="container bg-white rounded-4 shadow-lg overflow-hidden"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        {/* Image Section with Zoom */}
        <div
          style={{
            height: "450px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={`http://localhost:8000/uploads/image/${item.image}`}
            alt={item.title}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              cursor: "zoom-in",
              ...zoomStyle,
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h2 className="fw-bold text-dark mb-2">{item.title}</h2>
          <h5 className="text-secondary mb-1">
            Brand: <strong>{item.brand}</strong>
          </h5>
          <p className="fs-5 text-success fw-semibold mb-2">Price: Rs. {item.price}</p>
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

          {/* Long Paragraph */}
          <p className="mt-4 text-muted" style={{ lineHeight: "1.7", fontSize: "15px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum
            interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas
            nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut
            aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc
            venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer
            fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus.
            Mauris quis diam velit.
          </p>
        </div>
      </div>
    </div>
  );
}

export default View;
