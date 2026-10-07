import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./CartDrawer.css";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    orderType,
    setOrderType,
    placeOrder,
    orders,
    orderError,
    reorderItems,
    clearOrderHistory,
  } = useCart();

  const [activeTab, setActiveTab] = useState("cart"); // 'cart' | 'history'
  const [checkoutStep, setCheckoutStep] = useState("cart"); // 'cart' | 'details' | 'success'
  const [lastOrder, setLastOrder] = useState(null);

  // Customer form state
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState({});

  if (!isCartOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!customerInfo.name.trim()) {
      errors.name = "Customer Name is required";
    }
    if (!customerInfo.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(customerInfo.phone.replace(/[\s-]/g, ""))) {
      errors.phone = "Enter a valid 10-digit phone number";
    }
    if (orderType === "delivery" && !customerInfo.address.trim()) {
      errors.address = "Delivery address is required";
    }
    return errors;
  };

  const handleProceedToDetails = () => {
    if (cart.length === 0) return;
    setCheckoutStep("details");
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const order = await placeOrder(customerInfo);
      setLastOrder(order);
      setCheckoutStep("success");
    } catch (error) {
      setFormErrors((prev) => ({ ...prev, submit: error.message }));
    }
  };

  const handleResetDrawer = () => {
    setCheckoutStep("cart");
    setActiveTab("cart");
    setLastOrder(null);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    if (checkoutStep === "success") {
      setTimeout(() => setCheckoutStep("cart"), 300);
    }
  };

  return (
    <div className="cart-backdrop" onClick={handleClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title-row">
            <h2>Brew &amp; Bean</h2>
            <span className="cart-count-chip">
              {activeTab === "cart"
              ? `${cart?.length || 0} items`
              : `${orders?.length || 0} orders`}
            </span>
          </div>
          <button className="cart-close" onClick={handleClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="cart-tabs-header">
          <button
            className={`cart-tab-btn ${activeTab === "cart" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("cart");
              if (checkoutStep === "success") setCheckoutStep("cart");
            }}
          >
            🛒 Your Bag ({cart.length})
          </button>
           <button
               className={`cart-tab-btn ${activeTab === "history" ? "active" : ""}`}
                onClick={() => setActiveTab("history")}
              >
                📜 Order History ({orders?.length || 0})
            </button>
        </div>

        {/* TAB 1: CART & CHECKOUT FLOW */}
        {activeTab === "cart" && (
          <>
            {/* STEP 1: CART ITEMS */}
            {checkoutStep === "cart" && (
              <>
                <div className="order-mode-selector">
                  <button
                    className={`mode-btn ${orderType === "in-store" ? "active" : ""}`}
                    onClick={() => setOrderType("in-store")}
                  >
                    ☕ In-Store Pickup
                  </button>
                  <button
                    className={`mode-btn ${orderType === "delivery" ? "active" : ""}`}
                    onClick={() => setOrderType("delivery")}
                  >
                    🛵 Delivery
                  </button>
                </div>

                <div className="cart-items-container">
                  {cart.length === 0 ? (
                    <div className="empty-cart">
                     <div className="empty-icon">☕</div>
                        <h3>Your coffee bag is empty</h3>
                        <p>Explore our single-origin lattes, nitrogen brews, and butter croissants!</p>
                          {(orders?.length || 0) > 0 && (
                          <button
                             className="view-history-shortcut-btn"
                             onClick={() => setActiveTab("history")}
                          >
                            View Previous Orders ({orders?.length || 0})
                           </button>
                      )}
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.cartKey} className="cart-item-card">
                        <img src={item.image} alt={item.name} className="cart-item-img" />
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <div className="cart-item-meta">
                            {item.selectedSize} • {item.selectedMilk}
                            {item.hasExtraShot && " • +Shot"}
                          </div>
                          <div className="cart-item-price">₹{Number(item.lineTotal ?? item.finalPrice ?? item.price ?? 0) * item.qty}</div>
                        </div>

                        <div className="cart-item-controls">
                          <div className="qty-controls">
                            <button onClick={() => updateQuantity(item.cartKey, -1)}>-</button>
                            <span>{item.qty}</span>
                            <button onClick={() => updateQuantity(item.cartKey, 1)}>+</button>
                          </div>
                          <button
                            className="remove-btn"
                            onClick={() => removeFromCart(item.cartKey)}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="cart-footer">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <div className="summary-row total-row">
                      <span>Total</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <button className="btn-checkout" onClick={handleProceedToDetails}>
                      Proceed to Details • ₹{cartTotal}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CUSTOMER & ADDRESS DETAILS */}
            {checkoutStep === "details" && (
              <div className="checkout-details-step">
                <div className="step-header">
                  <button className="back-link-btn" onClick={() => setCheckoutStep("cart")}>
                    ← Back to Items
                  </button>
                  <h3>Customer &amp; Delivery Details</h3>
                  <p>Please enter your information to complete the order.</p>
                </div>

                <form className="customer-form" onSubmit={handleConfirmOrder}>
                  <div className="form-group">
                    <label className="form-label">Customer Name <span className="required-star">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`form-input ${formErrors.name ? "input-error" : ""}`}
                    />
                    {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number <span className="required-star">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      className={`form-input ${formErrors.phone ? "input-error" : ""}`}
                    />
                    {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
                  </div>

                  {orderType === "delivery" ? (
                    <div className="form-group">
                      <label className="form-label">Delivery Address <span className="required-star">*</span></label>
                      <textarea
                        name="address"
                        rows="3"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        placeholder="House / Flat No., Building, Street, Landmark, City"
                        className={`form-textarea ${formErrors.address ? "input-error" : ""}`}
                      />
                      {formErrors.address && <span className="error-text">{formErrors.address}</span>}
                    </div>
                  ) : (
                    <div className="form-group">
                      <label className="form-label">Table No. or Pickup Note (Optional)</label>
                      <input
                        type="text"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        placeholder="e.g. Table #4 or Pickup at counter in 15 mins"
                        className="form-input"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Special Preparation Notes (Optional)</label>
                    <input
                      type="text"
                      name="notes"
                      value={customerInfo.notes}
                      onChange={handleInputChange}
                      placeholder="e.g. Less ice, extra hot milk"
                      className="form-input"
                    />
                  </div>

                  {orderError && <span className="error-text">{orderError}</span>}
                  <button type="submit" className="btn-confirm-order">
                    Confirm &amp; Pay • ₹{cartTotal}
                  </button>
                </form>
              </div>
            )}

            {/* STEP 3: GREEN DONE ANIMATION & SUCCESS */}
            {checkoutStep === "success" && lastOrder && (
              <div className="order-success-container">
                <div className="success-animation-wrapper">
                  <div className="checkmark-circle-wrapper">
                    <svg className="checkmark-svg" viewBox="0 0 52 52">
                      <circle className="checkmark-circle" cx="26" cy="26" r="23" fill="none" />
                      <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                  </div>
                  <div className="pulse-ring" />
                </div>

                <h3 className="success-title">Order Placed Successfully!</h3>
                <span className="order-id-badge">Order #{lastOrder.orderId}</span>

                <div className="order-details-card">
                  <div className="detail-item">
                    <span className="detail-label">Customer</span>
                    <span className="detail-val">{lastOrder.customerName} ({lastOrder.phone})</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Mode</span>
                    <span className="detail-val highlight">{lastOrder.orderType === "delivery" ? "🛵 Delivery" : "☕ Pickup"}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Address</span>
                    <span className="detail-val">{lastOrder.address}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Est. Time</span>
                    <span className="detail-val time-highlight">
                      {lastOrder.orderType === "delivery" ? "🛵 20 - 30 Mins" : "☕ 10 Mins"}
                    </span>
                  </div>
                </div>

                <div className="success-action-buttons">
                  <button className="btn-history" onClick={() => { setActiveTab("history"); setCheckoutStep("cart"); }}>
                    📜 View Order History
                  </button>
                  <button className="btn-order-more" onClick={handleResetDrawer}>
                    ☕ Order More Coffee
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* TAB 2: PREVIOUS ORDER HISTORY RECORD */}
        {activeTab === "history" && (
          <div className="order-history-view">
            <div className="history-top-bar">
            <h3>Your Past Orders</h3>
                 {(orders?.length || 0) > 0 && (
                 <button className="clear-history-btn" onClick={clearOrderHistory}>Clear History</button>
               )}
            </div>

            {(orders?.length || 0) === 0 ? (
              <div className="empty-history">
                <div className="empty-icon">📜</div>
                <h3>No previous orders yet</h3>
                <p>Once you place an order, your coffee history will appear right here!</p>
              </div>
            ) : (
              <div className="orders-list-container">
                {orders.map((ord) => (
                  <div key={ord.orderId} className="history-order-card">
                    <div className="history-card-header">
                      <div>
                        <span className="history-order-id">#{ord.orderId}</span>
                        <div className="history-order-time">{ord.timestamp}</div>
                      </div>
                      <span className="history-status-chip">{ord.status || "Completed ✅"}</span>
                    </div>
                    <div className="history-customer-info">
                      <div><strong>👤 {ord.customerName}</strong> • 📞 {ord.phone}</div>
                      <div className="history-address">{ord.address}</div>
                    </div>
                    <div className="history-card-footer">
                      <div className="history-total">Total: <strong>₹{ord.total}</strong></div>
                      <button className="btn-reorder" onClick={() => { reorderItems(ord.items); setActiveTab("cart"); setCheckoutStep("cart"); }}>
                        🔄 Reorder Items
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}