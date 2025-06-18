import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function View() {
  const location = useLocation();
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
        className="container bg-white rounded-4 shadow-lg"
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "30px" }}
      >
        {/* Flexbox Layout: Image Left, Content Right */}
        <div className="d-flex flex-column flex-md-row gap-4 align-items-start">
          {/* Left: Image Section */}
          <div
            style={{
              flex: 1,
              height: "100%",
              border: "4px solid #e1e8ed",
              borderRadius: "20px",
              overflow: "hidden",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
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

          {/* Right: Content Section */}
          <div style={{ flex: 1 }}>
            <h2 className="fw-bold text-dark mb-2">{item.title}</h2>
            <h5 className="text-secondary mb-1">
              Brand: <strong>{item.brand}</strong>
            </h5>
            <p className="fs-5 text-success fw-semibold mb-2">
              Price: Rs. {item.price}
            </p>
            <p className="text-muted mb-3" style={{ lineHeight: "1.6" }}>
              {item.description}
            </p>
            <p className="text-secondary small fst-italic mb-4">
              This premium phone blends style and performance — perfect for
              gaming, photography, and daily use with its top-tier specs and
              sleek body.
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
            <p
              className="mt-4 text-muted"
              style={{ lineHeight: "1.7", fontSize: "15px" }}
            >
              Enjoy the latest technology with confidence. Every product is
              thoroughly tested and certified for quality before dispatch. With
              our no-questions-asked 7-day return policy, you can shop
              stress-free. Whether you’re upgrading your daily driver or gifting
              a loved one, this phone offers unbeatable value and performance.
              Fast delivery and customer support ensure your experience stays
              smooth from cart to doorstep.
            </p>

             <p
              className="mt-4 text-muted"
              style={{ lineHeight: "1.7", fontSize: "15px" }}
            >
              Enjoy the latest technology with confidence. Every product is
              thoroughly tested and certified for quality before dispatch. With
              our no-questions-asked 7-day return policy, you can shop
              stress-free. Whether you’re upgrading your daily driver or gifting
              a loved one, this phone offers unbeatable value and performance.
              Fast delivery and customer support ensure your experience stays
              smooth from cart to doorstep.
            </p>
          </div>
        </div>

        {/* Long Paragraph Below */}
        <p
          className="mt-5 text-muted"
          style={{ lineHeight: "1.7", fontSize: "15px" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
          scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices
          nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut
          aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim
          ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec
          vitae dui eget tellus gravida venenatis. Integer fringilla congue eros
          non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo
          purus. Mauris quis diam velit.
        </p>
      </div>
    </div>
  );
}

export default View;
