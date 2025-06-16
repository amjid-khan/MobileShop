import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const getCartData = () => {
    axios
      .get("http://localhost:8000/api/product/addcartview")
      .then((res) => {
        setCart(res.data.viewCartData || []);
      })
      .catch((err) => {
        console.log("Error while fetching cart data", err);
      });
  };

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:8000/api/product/deletecart/${id}`)
      .then(() => {
        setCart((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  useEffect(() => {
    getCartData();
  }, []);

  const totalPrice = () => {
    return cart.reduce((sum, item) => sum + Number(item.price), 0);
  };


  const colorPalette = [
    "#fefcea", "#f0f8ff", "#f0fff0", "#fffaf0", "#fff0f5", "#f9f9f9", "#e6f7ff",
  ];

  const getBackgroundColor = (key) => {
    const hash = key
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colorPalette[hash % colorPalette.length];
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-muted text-center">Your cart is empty.</p>
      ) : (
        <div className="row">
          {/* LEFT SIDE - CART ITEMS */}
          <div className="col-md-8">
            {cart.map((item) => {
              const bgColor = getBackgroundColor(item._id || item.title || "x");
              return (
                <div
                  key={item._id}
                  className="d-flex align-items-center justify-content-between border rounded-4 p-3 mb-3 shadow-sm"
                  style={{ backgroundColor: bgColor }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={`http://localhost:8000/uploads/image/${item.image}`}
                      onClick={()=> navigate("/viewpage" , {state : item})}
                      alt={item.title}
                      className="img-fluid"
                      style={{
                        height: "100px",
                        width: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        cursor : "pointer"
                      }}
                    />
                    <div>
                      <h5 className="mb-1">{item.title}</h5>
                      <p className="mb-1 text-muted">Brand: {item.brand}</p>
                      <p className="mb-1">Qty: {item.quantity}</p>
                      <p className="fw-bold text-success mb-0">${item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="btn btn-outline-danger"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE - PAYMENT SUMMARY */}
          <div className="col-md-4">
            <div className="card shadow p-4 rounded-4">
              <h5 className="fw-bold mb-3">Payment Summary</h5>
              <p className="d-flex justify-content-between">
                <span>Total Items:</span> <span>{cart.length}</span>
              </p>
              <p className="d-flex justify-content-between fw-semibold">
                <span>Total Price:</span>
                <span className="text-success">${totalPrice()}</span>
              </p>
              <hr />
              <h6 className="mt-3">Select Payment Method</h6>
              <select className="form-select mt-2 mb-3">
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="easypaisa">Easypaisa / JazzCash</option>
              </select>
              <button
                onClick={() => navigate("/payment")}
                className="btn btn-primary w-100 rounded-pill mt-2"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
