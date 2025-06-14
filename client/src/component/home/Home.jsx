import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // 🔥 Import custom CSS

function Home() {
  const [view, setView] = useState([]);

  const getAllData = () => {
    axios.get("http://localhost:8000/api/product/view")
      .then((res) => {
        setView(res.data.viewData);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {view.map((item) => (
          <div key={item._id} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <img
                src={`http://localhost:8000/uploads/image/${item.image}`}
                className="card-img-top"
                alt={item.title}
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{item.brand}</h5>
                    <span className="badge bg-warning text-dark">★ 4.5</span>
                  </div>
                  <p className="card-text text-muted mb-1">{item.title}</p>
                  <p className="card-text">{item.description}</p>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <p className="card-text fw-bold text-success mb-0">Rs. {item.price}</p>
                  <button className="btn btn-sm btn-primary btn-animated">
                    <span>Add to Cart</span>
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
