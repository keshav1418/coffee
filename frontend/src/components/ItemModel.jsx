import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./ItemModel.css";

export default function ItemModal({ item, onClose }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState("Medium");
  const [milk, setMilk] = useState("Whole Milk");
  const [sweetness, setSweetness] = useState("100% Sweet");
  const [extraShot, setExtraShot] = useState(false);

  if (!item) return null;

  const isDrink = item.category === "drinks" || item.category === "new-drinks";

  let computedPrice = item.price;
  if (isDrink) {
    if (size === "Large") computedPrice += 40;
    if (size === "Small") computedPrice -= 20;
    if (milk === "Oat Milk" || milk === "Almond Milk") computedPrice += 30;
    if (extraShot) computedPrice += 40;
  }

  const handleAdd = () => {
    addToCart(item, {
      size: isDrink ? size : "Standard",
      milk: isDrink ? milk : "None",
      sweetness: isDrink ? sweetness : "Standard",
      extraShot: isDrink ? extraShot : false,
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="item-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-grid">
          <div className="modal-img-container">
            <img src={item.image} alt={item.name} className="modal-img" />
            <div className="modal-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="modal-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-content">
            <h2>{item.name}</h2>
            <p className="modal-desc">{item.description}</p>
            <div className="modal-price-chip">₹{computedPrice}</div>

            {isDrink && (
              <div className="modal-options">
                <div className="option-group">
                  <label className="option-label">Select Cup Size</label>
                  <div className="option-buttons">
                    {["Small (-₹20)", "Medium", "Large (+₹40)"].map((s) => {
                      const val = s.split(" ")[0];
                      return (
                        <button
                          key={val}
                          type="button"
                          className={`opt-btn ${
                            size === val ? "selected" : ""
                          }`}
                          onClick={() => setSize(val)}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="option-group">
                  <label className="option-label">Milk / Dairy Base</label>
                  <div className="option-buttons">
                    {[
                      "Whole Milk",
                      "Oat Milk (+₹30)",
                      "Almond Milk (+₹30)",
                      "Skim Milk",
                    ].map((m) => {
                      const val = m.split(" (")[0];
                      return (
                        <button
                          key={val}
                          type="button"
                          className={`opt-btn ${
                            milk === val ? "selected" : ""
                          }`}
                          onClick={() => setMilk(val)}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="option-group">
                  <label className="option-label">Sweetness Level</label>
                  <div className="option-buttons">
                    {[
                      "100% Sweet",
                      "75% Sweet",
                      "50% Sweet",
                      "Unsweetened",
                    ].map((sw) => (
                      <button
                        key={sw}
                        type="button"
                        className={`opt-btn ${
                          sweetness === sw ? "selected" : ""
                        }`}
                        onClick={() => setSweetness(sw)}
                      >
                        {sw}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="option-checkbox">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={extraShot}
                      onChange={(e) => setExtraShot(e.target.checked)}
                    />
                    <span>Add Extra Shot of Double Espresso (+₹40)</span>
                  </label>
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button
                type="button"
                className="btn-add-cart"
                onClick={handleAdd}
              >
                🛒 Add to Order • ₹{computedPrice}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
