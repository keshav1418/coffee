import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ItemModal from "../components/ItemModel";
import { useMenuItems } from "../hooks/useMenuItems";
import "./OurMenu.css";

const QUICK_TAGS = [
  "Caramel",
  "Matcha",
  "Croissant",
  "Cold Brew",
  "Panini",
  "Mocha",
];

export default function OurMenu() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const { items, loading, error } = useMenuItems();

  const currentPath = location.pathname;

  const isActive = (path) => {
    if (
      path === "/ourMenu" &&
      (currentPath === "/ourMenu" || currentPath === "/ourMenu/")
    ) {
      return true;
    }
    return currentPath === path;
  };

  let categoryFromUrl = "all";
  if (currentPath.includes("/drinks")) categoryFromUrl = "drinks";
  if (currentPath.includes("/food")) categoryFromUrl = "food";
  if (currentPath.includes("/new-drinks")) categoryFromUrl = "new-drinks";

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      categoryFromUrl === "all" ? true : item.category === categoryFromUrl;

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      selectedFilter === "all"
        ? true
        : selectedFilter === "popular"
        ? item.isPopular
        : selectedFilter === "vegan"
        ? item.dietary?.some(
            (d) =>
              d.toLowerCase().includes("vegan") ||
              d.toLowerCase().includes("dairy free")
          )
        : selectedFilter === "iced"
        ? item.tags.some((t) => t.toLowerCase().includes("iced"))
        : selectedFilter === "hot"
        ? item.tags.some((t) => t.toLowerCase().includes("hot"))
        : true;

    return matchesCategory && matchesSearch && matchesFilter;
  });

  return (
    <div className="our-menu-page">
      {/* 1. Header Banner */}
      <div
        className="our-menu-banner flex-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(26, 15, 10, 0.7) 0%, rgba(15, 8, 5, 0.88) 100%), url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        <div className="menu-banner-content text-center">
          <span className="banner-tag">
            ARTISANAL SINGLE-ORIGIN &amp; FRESH BAKERY
          </span>
          <h1 className="banner-title gold-gradient-text">Our Menu</h1>
          <p className="banner-desc">
            Explore our expanded selection of 20+ single-origin lattes, nitrogen
            brews, French butter croissants, and seasonal specialties.
          </p>
        </div>
      </div>

      {/* 2. Sub-Navbar Navigation */}
      <nav className="menu-navbar flex-center">
        <Link to="/ourMenu" className={isActive("/ourMenu") ? "active" : ""}>
          All Items ({items.length})
        </Link>
        <Link
          to="/ourMenu/drinks"
          className={isActive("/ourMenu/drinks") ? "active" : ""}
        >
          Drinks ({items.filter((i) => i.category === "drinks").length})
        </Link>
        <Link
          to="/ourMenu/food"
          className={isActive("/ourMenu/food") ? "active" : ""}
        >
          Food ({items.filter((i) => i.category === "food").length})
        </Link>
        <Link
          to="/ourMenu/new-drinks"
          className={isActive("/ourMenu/new-drinks") ? "active" : ""}
        >
          New Specials (
          {items.filter((i) => i.category === "new-drinks").length})
        </Link>
      </nav>

      {/* 3. Ultra-Redesigned Search & Filter Console */}
      <section className="search-console-section">
        <div className="search-console-card">
          {/* Main Search Bar Wrapper */}
          <div className="main-search-input-wrapper flex-between">
            <div className="search-left flex-center">
              <span className="search-icon-badge flex-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search coffee roast, flavor, croissant, matcha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hero-search-input"
              />
            </div>

            <div className="search-right flex-center">
              {searchQuery ? (
                <button
                  className="search-clear-btn flex-center"
                  onClick={() => setSearchQuery("")}
                >
                  ✕ Clear
                </button>
              ) : (
                <span className="search-shortcut-badge">⌘ Search</span>
              )}
            </div>
          </div>

          {/* Quick Search Tag Chips */}
          <div className="quick-tags-row flex-center">
            <span className="quick-tags-label">Popular Searches:</span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                className={`quick-tag-btn ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? "selected"
                    : ""
                }`}
                onClick={() => setSearchQuery(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Filter Pills */}
          <div className="filter-tabs-row flex-center">
            <button
              className={`tab-pill ${selectedFilter === "all" ? "active" : ""}`}
              onClick={() => setSelectedFilter("all")}
            >
              ✨ All ({filteredItems.length})
            </button>
            <button
              className={`tab-pill ${
                selectedFilter === "popular" ? "active" : ""
              }`}
              onClick={() => setSelectedFilter("popular")}
            >
              ⭐ Bestsellers
            </button>
            <button
              className={`tab-pill ${
                selectedFilter === "iced" ? "active" : ""
              }`}
              onClick={() => setSelectedFilter("iced")}
            >
              🧊 Iced Brews
            </button>
            <button
              className={`tab-pill ${selectedFilter === "hot" ? "active" : ""}`}
              onClick={() => setSelectedFilter("hot")}
            >
              🔥 Hot Roasts
            </button>
            <button
              className={`tab-pill ${
                selectedFilter === "vegan" ? "active" : ""
              }`}
              onClick={() => setSelectedFilter("vegan")}
            >
              🌱 Plant-Based
            </button>
          </div>
        </div>

        {/* Live Filter Counter Status */}
        <div className="live-search-status flex-between">
          <span className="status-text">
            Found <strong>{filteredItems.length}</strong> handcrafted items
            {categoryFromUrl !== "all" && ` in ${categoryFromUrl}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(searchQuery || selectedFilter !== "all") && (
            <button
              className="reset-all-link"
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
            >
              🔄 Reset Search &amp; Filters
            </button>
          )}
        </div>
      </section>

      {/* 4. Menu Cards Grid Section */}
      <section className="menu-section">
        <div className="section-title-wrap text-center">
          <h2 className="menu-section-title">
            {categoryFromUrl === "drinks"
              ? "Handcrafted Drinks & Roasts"
              : categoryFromUrl === "food"
              ? "Artisanal Bakery & Breakfast"
              : categoryFromUrl === "new-drinks"
              ? "New Seasonal Specials"
              : "Complete Menu Selection"}
          </h2>
          <div className="divider-line"></div>
        </div>

        {loading ? (
          <p className="no-results text-center" role="status">Loading menu...</p>
        ) : error ? (
          <p className="no-results text-center" role="alert">
            Unable to load menu: {error}
          </p>
        ) : filteredItems.length === 0 ? (
          <div className="no-results text-center">
            <div className="no-results-icon">☕</div>
            <h3>No coffee or bakery items matched "{searchQuery}"</h3>
            <p>
              Try searching for "macchiato", "matcha", "croissant", or click
              Reset below.
            </p>
            <button
              className="reset-btn"
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
            >
              Reset Search &amp; Filters
            </button>
          </div>
        ) : (
          <div className="card-group flex-center">
            {filteredItems.map((item) => (
              <div key={item.id} className="menu-card text-left">
                <div className="card-img-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-card-img"
                  />
                  {item.isPopular && (
                    <span className="bestseller-badge-tag">⭐ Bestseller</span>
                  )}
                  {item.isNew && <span className="new-badge-tag">✨ New</span>}
                </div>

                <div className="menu-card-body">
                  <h3 className="menu-card-title">{item.name}</h3>
                  <p className="menu-card-text">{item.description}</p>

                  <div className="card-footer-row flex-between">
                    <span className="menu-card-price">₹{item.price}</span>
                    <span className="dietary-pill">{item.dietary?.[0]}</span>
                  </div>

                  <button
                    className="menu-card-btn"
                    onClick={() => setSelectedItem(item)}
                  >
                    Customize &amp; Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Outlet />

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
