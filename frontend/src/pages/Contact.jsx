import { useState } from "react";
import { submitContactMessage } from "../api/client";
import "./Contact.css";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Order & Catering Inquiry",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        message: `Subject: ${formData.subject}\n\n${formData.message}`,
      });
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "Order & Catering Inquiry",
        message: "",
      });
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Brew &amp; Bean</h1>
          <p>
            Have a question about our single-origin roasts, artisanal bakery, or
            catering? We are here to make your coffee experience extraordinary.
          </p>
        </div>
      </section>

      <div className="contact-container">
        {/* Left Column: Info & Locations */}
        <div className="contact-info-col">
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Flagship Coffee House</h3>
            <p>742 Evergreen Terrace, Coffee District</p>
            <p className="sub-text">Includes Outdoor Espresso Garden</p>
          </div>

          <div className="info-card">
            <div className="info-icon">⏰</div>
            <h3>Operating Hours</h3>
            <p>
              <strong>Monday – Friday:</strong> 6:00 AM – 8:00 PM
            </p>
            <p>
              <strong>Saturday – Sunday:</strong> 7:00 AM – 9:00 PM
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Direct Hotline &amp; Support</h3>
            <p>
              <strong>Desk:</strong> (555) 019-BREW
            </p>
            <p>
              <strong>Email:</strong> hello@brewandbean.coffee
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="contact-form-col">
          <div className="form-card">
            <h2>Send Us a Message</h2>
            <p>
              Fill out the form below and our head barista team will reply
              within 24 hours.
            </p>

            {formSubmitted ? (
              <div className="success-alert">
                ✨ Thank you! Your message has been sent to our barista team.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="main-contact-form">
                {submitError && <p className="error-alert" role="alert">{submitError}</p>}
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  >
                    <option value="Order & Catering Inquiry">
                      Order &amp; Catering Inquiry
                    </option>
                    <option value="Catering & Events">
                      Catering &amp; Events
                    </option>
                    <option value="Whole Bean Coffee Wholesale">
                      Whole Bean Coffee Wholesale
                    </option>
                    <option value="Feedback / Suggestion">
                      Feedback / Suggestion
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows="5"
                    required
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  ></textarea>
                </div>

                <button type="submit" className="contact-submit-btn" disabled={submitting}>
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
