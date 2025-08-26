import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopHeader from './components/TopHeader';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import LogoMarquee from './components/LogoMarquee';
import Storep from './components/Storep';
import BigSearchBar from './components/BigSearchBar';
import Admin from './components/Admin';
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Admin_Order from "./components/Admin_Order";
import './App.css';

function Home() {
  return (
    <>
      <TopHeader /> 
      <Navbar />
      <Carousel />
      <br />
      <br />
      <BigSearchBar />
      <br />
      <br />
      <LogoMarquee />
      <br />
      <br />
      <Storep />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      
    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin_order" element={<Admin_Order />} />
        <Route path="/products" element={<ProductList />} />
         <Route path="/products/:id" element={<ProductDetails />} />

      </Routes>
    </Router>
  );
}
