import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:8000/api/product/search?q=${query}`)
        .then((res) => {
          setResults(res.data.result);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Search Error:", err);
          setLoading(false);
        });
    }
  }, [query]);

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
      .then(() => toast.success("Item added to cart!"))
      .catch((err) => {
        console.error("Add to cart error:", err);
        toast.error("Failed to add to cart");
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">
        Search Results for: <span className="text-primary">"{query}"</span>
      </h3>

      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div className="row">
          {results.map((item) => (
            <div className="col-md-4 mb-4" key={item._id}>
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <img
                  src={`http://localhost:8000/uploads/image/${item.image}`}
                  className="card-img-top p-3"
                  alt={item.title}
                  onClick={() => navigate("/viewpage", { state: item })}
                  style={{
                    height: "250px",
                    objectFit: "contain",
                    borderRadius: "1rem",
                    cursor: "pointer",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">{item.title}</h5>
                  <p className="text-muted small">{item.description}</p>
                  <p className="mb-1">
                    <strong>Brand:</strong> {item.brand}
                  </p>
                  <p className="mb-2">
                    <strong>Price:</strong> ${item.price}
                  </p>

                  <button
                    onClick={() => handleCart(item)}
                    className="btn btn-dark mt-auto w-100"
                    style={{
                      borderRadius: "10px",
                      fontWeight: "600",
                      padding: "10px",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
