import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import OurMenu from "./pages/OurMenu";
import Contact from "./pages/Contact";
import "./App.css";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />

              {/* Menu and sub-menu routes */}
              <Route path="/ourMenu" element={<OurMenu />} />
              <Route path="/ourMenu/*" element={<OurMenu />} />

              <Route path="/contact" element={<Contact />} />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/Home" replace />} />
            </Routes>
          </main>

          <CartDrawer />
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
