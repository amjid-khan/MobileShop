// src/App.js
import './App.css';
import ProductAdd from './component/AddProduct/Product';
import Cart from './component/Cart/Cart';
import Home from './component/home/Home';
import Navbar from './component/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='product' element={<ProductAdd />} /> 
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
