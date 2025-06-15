import React from 'react';

function Payment() {
  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-sm rounded-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="mb-4 text-center text-primary fw-bold">Payment Details</h3>

        <form>
          <div className="mb-3">
            <label className="form-label">Cardholder Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Card Number</label>
            <input type="text" className="form-control" placeholder="1234 5678 9012 3456" required />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Expiry Date</label>
              <input type="text" className="form-control" placeholder="MM/YY" required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">CVV</label>
              <input type="password" className="form-control" placeholder="123" required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Billing Address</label>
            <input type="text" className="form-control" placeholder="123 Main Street" />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            <i className="bi bi-lock-fill me-2"></i>Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
