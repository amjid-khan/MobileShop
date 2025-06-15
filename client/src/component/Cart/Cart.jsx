import React from 'react'
import { useLocation } from "react-router-dom"

function Cart() {
  const location = useLocation()
  const item = location.state

  return (
    <div className='container mt-5'>
      <img 
        src={`http://localhost:8000/uploads/image/${item.image}`} 
        style={{ width: '300px', height: '300px', objectFit: 'cover' }}
      />
      <h3>{item.title}</h3>
      <p><strong>Brand:</strong> {item.brand}</p>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Price:</strong> Rs. {item.price}</p>
      <div className="quntity">
        <button> + </button>
        <p>0</p>
        <button>-</button>
      </div>
    </div>
  )
}

export default Cart
