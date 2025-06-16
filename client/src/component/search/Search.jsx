import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:8000/api/product/search?q=${query}`)
        .then((res) => {
          console.log("API Response:", res.data);
          setResults(res.data.result);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Search Error:", err);
          setLoading(false);
        });
    }
  }, [query]);

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
          {results.map((item) => {
            console.log("Image Path:", item.image); 
            return (
              <div className="col-md-4 mb-4" key={item._id}>
                <div className="card h-100">
                  <img
                    src={`http://localhost:8000/uploads/image/${item.image}`}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: "250px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p>
                      <strong>Brand:</strong> {item.brand}
                    </p>
                    <p>
                      <strong>Price:</strong> ${item.price}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
