import React from 'react';
import './Payment.css';

function Payment() {
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="payment-white-card">
        <h3 className="text-center text-dark mb-4">Payment Details</h3>

        <form>
          <div className="form-group mb-3">
            <label htmlFor="name">Cardholder Name</label>
            <input type="text" id="name" className="form-control" placeholder="John Doe" required />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" className="form-control" placeholder="1234 5678 9012 3456" required />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="expiry">Expiry</label>
              <input type="text" id="expiry" className="form-control" placeholder="MM/YY" required />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="cvv">CVV</label>
              <input type="password" id="cvv" className="form-control" placeholder="123" required />
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="address">Billing Address</label>
            <input type="text" id="address" className="form-control" placeholder="123 Main Street" />
          </div>

          <button type="submit" className="btn btn-dark w-100 py-2 rounded-pill fw-semibold">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
