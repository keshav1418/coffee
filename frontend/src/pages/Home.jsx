import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemModal from "../components/ItemModel";
import { useMenuItems } from "../hooks/useMenuItems";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const { items, loading, error } = useMenuItems();

  const popularItems = items.filter((item) => item.isPopular);
  const popularList = (popularItems.length ? popularItems : items).slice(0, 4);

  return (
    <div className="home-wrapper">
      {/* 1. Hero Banner */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(26, 15, 10, 0.75) 0%, rgba(15, 8, 5, 0.9) 100%), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        <div className="hero-container text-center">
          <div className="hero-tag-badge">
            <span className="badge-spark">✨</span> CRAFT ROASTED DAILY • EST.
            2004
          </div>
          <h1 className="hero-title gold-gradient-text">
            Welcome to Coffee World
          </h1>
          <p className="hero-subtitle">
            Enjoy the rich aroma and delicious taste of freshly brewed coffee.
            Start your day with energy, happiness, and a perfect cup of coffee.
            Explore handcrafted roast flavors from around the globe.
          </p>

          <div className="hero-actions flex-center">
            <button
              className="btn btn-hero-primary"
              onClick={() => navigate("/ourMenu")}
            >
              Explore Full Menu →
            </button>
            <button
              className="btn btn-hero-secondary"
              onClick={() => navigate("/contact")}
            >
              Contact &amp; Location
            </button>
          </div>
        </div>
      </section>

      {/* 2. Quick Category Bar */}
      <section className="quick-category-bar">
        <div className="quick-cat-container flex-between">
          <div className="cat-card" onClick={() => navigate("/ourMenu/drinks")}>
            <span className="cat-icon">☕</span>
            <div className="cat-text">
              <h3>Signature Drinks</h3>
              <p>Espresso, Nitro &amp; Matcha</p>
            </div>
          </div>
          <div className="cat-card" onClick={() => navigate("/ourMenu/food")}>
            <span className="cat-icon">🥐</span>
            <div className="cat-text">
              <h3>Fresh Bakery</h3>
              <p>Croissants &amp; Sourdough</p>
            </div>
          </div>
          <div
            className="cat-card"
            onClick={() => navigate("/ourMenu/new-drinks")}
          >
            <span className="cat-icon">✨</span>
            <div className="cat-text">
              <h3>New Specials</h3>
              <p>Seasonal Cold Brews &amp; Lattes</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Popular Bestsellers Section */}
      <section className="featured-section text-center">
        <div className="section-header">
          <span className="section-subtitle">CURATED HOUSE FAVORITES</span>
          <h2 className="section-title">Popular House Bestsellers</h2>
          <div className="divider-accent"></div>
        </div>

        <div className="card-group flex-center">
          {loading ? (
            <p role="status">Loading menu...</p>
          ) : error ? (
            <p role="alert">Unable to load menu: {error}</p>
          ) : popularList.map((item) => (
            <div key={item.id} className="menu-card text-left">
              <div className="card-img-container">
                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-card-img"
                />
                {item.tags[0] && <span className="card-badge">{item.tags[0]}</span>}
              </div>
              <div className="menu-card-body">
                <h3 className="menu-card-title">{item.name}</h3>
                <p className="menu-card-text">{item.description}</p>
                <div className="card-footer-row flex-between">
                  <span className="menu-card-price">₹{item.price}</span>
                  <button
                    className="menu-card-btn"
                    onClick={() => setSelectedItem(item)}
                  >
                    Customize &amp; Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Features Alignment Grid */}
      <section className="features-grid-section">
        <div className="feature-box text-center">
          <div className="feature-icon">🌱</div>
          <h3>Ethical Single-Origin</h3>
          <p>
            Hand-picked highland beans sourced from shade-grown sustainable
            small farms.
          </p>
        </div>

        <div className="feature-box text-center">
          <div className="feature-icon">🔥</div>
          <h3>Daily Batch Roasting</h3>
          <p>
            Small-batch roasted every morning for optimal floral notes and zero
            bitterness.
          </p>
        </div>

        <div className="feature-box text-center">
          <div className="feature-icon">🥐</div>
          <h3>Fresh Daily Bakery</h3>
          <p>
            Artisanal butter croissants, poached sourdough egg toasts, and
            cinnamon rolls.
          </p>
        </div>
      </section>

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
