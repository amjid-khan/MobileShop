// src/App.js
import './App.css';
import ProductAdd from './component/AddProduct/Product';
import Cart from './component/Cart/Cart';
import Home from './component/home/Home';
import Navbar from './component/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import View from './component/viewpage/View';
import Payment from './component/paymet/Payment';
import Footer from './component/footer/Footer';
import ContactForm from './component/contact/Contact';
import SearchResults from './component/search/Search';
import About from './component/About/About';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='product' element={<ProductAdd />} /> 
        <Route path='/cart' element={<Cart />} />
        <Route path='/viewpage' element={<View />} />
        <Route path='/payment' element={<Payment />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
