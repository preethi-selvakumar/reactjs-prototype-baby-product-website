import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// the useAppContext hook
import { useAppContext } from './context/AppContext';

// Import Modal Components
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

// Import Page Components
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Forum from './pages/Forum';
import ParentingClass from './pages/ParentingClass';
import Chat from './pages/Chat';
import BabyFashion from './pages/BabyFashion';
import ProductDescription from './pages/ProductDescription';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Toys from './pages/Toys';
import Footwear from './pages/Footwear';
import MomsBabyCare from './pages/MomsBabyCare';
import FurnitureBedding from './pages/FurnitureBedding';
import TrackOrder from './pages/TrackOrder';
import RentalService from './pages/RentalService';

// Layout Component (Holds Routes and Modals)
const AppContent = () => {
  // Get Modal states from Context
  const { isLoginModalOpen, isRegisterModalOpen } = useAppContext(); // isRegisterModalOpen added

  return (
    <>
      {/* Login Modal is rendered globally, above all content when open */}
      {isLoginModalOpen && <LoginModal />}

      {/* Register Modal is rendered globally, above all content when open */}
      {isRegisterModalOpen && <RegisterModal />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/parenting-classes" element={<ParentingClass />} />
          <Route path="/forum/chat" element={<Chat />} />
          <Route path="/baby-fashion-link" element={<BabyFashion />} />
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/toys-link" element={<Toys />} />
          <Route path="/footwear-accessories-link" element={<Footwear />} />
          <Route path="/moms-baby-care" element={<MomsBabyCare />} />
          <Route path="/furniture-bedding" element={<FurnitureBedding />} />
          <Route path="/track-order/:orderId" element={<TrackOrder />} />
          <Route path="/rental-services-link" element={<RentalService />} />
        </Routes>
      </main>
    </>
  );
};

// Main App Component (Wraps AppContent with Router)
function App() {
  return (
    // BrowserRouter is required to use Routes and Link components
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
