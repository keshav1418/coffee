import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "/Home" },
  { label: "Our Menu", href: "/ourMenu" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cartCount, cartTotal, setIsCartOpen } = useCart();

  const isActive = (path) => {
    if (
      path === "/Home" &&
      (location.pathname === "/" || location.pathname === "/Home")
    ) {
      return true;
    }
    if (path === "/ourMenu" && location.pathname.startsWith("/ourMenu")) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container flex-between">
        {/* Brand Logo & Icon */}
        <Link to="/Home" className="navbar-brand flex-center">
          <div className="brand-icon-wrapper flex-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="cup-icon"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6zM13 12.5a2 2 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5M2.64 13.825 1.123 7h11.754l-1.517 6.825A1.5 1.5 0 0 1 9.896 15H4.104a1.5 1.5 0 0 1-1.464-1.175"
              />
              <path d="m4.4.8-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 3.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 6.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 9.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8" />
            </svg>
          </div>
          <div className="brand-text-col">
            <span className="brand-name">Brew &amp; Bean</span>
            <span className="brand-sub">COFFEE HOUSE</span>
          </div>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="navbar-menu-desktop flex-center">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`nav-link ${active ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="navbar-actions flex-center">
          <button
            className="navbar-cart-trigger flex-center"
            onClick={() => setIsCartOpen(true)}
            aria-label="View shopping bag"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 13H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            <span className="cart-text-label">Bag</span>
            {cartCount > 0 && (
              <span className="cart-badge-chip">{cartCount}</span>
            )}
            {cartTotal > 0 && (
              <span className="cart-price-preview">₹{cartTotal}</span>
            )}
          </button>

          {/* Mobile Menu Toggler */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className={`navbar-toggler ${isOpen ? "open" : ""}`}
          >
            <span className="toggler-line" />
            <span className="toggler-line" />
            <span className="toggler-line" />
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {isOpen && (
        <div className="navbar-mobile-menu">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`mobile-nav-link ${active ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
