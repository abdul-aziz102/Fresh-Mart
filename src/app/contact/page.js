'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'What are your delivery hours?',
    a: 'We deliver Monday through Saturday from 8am to 10pm, and Sundays from 9am to 8pm. Same-day slots fill up fast — order early!',
  },
  {
    q: 'Do you offer same-day delivery?',
    a: 'Yes! Orders placed before 2pm are eligible for same-day delivery, subject to availability in your area.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We currently accept Cash on Delivery (COD) for all orders. Online payment options are coming soon.',
  },
  {
    q: 'Can I cancel or modify my order?',
    a: 'Yes — you can cancel or modify your order before it goes out for delivery. Reach out to us immediately and we\'ll take care of it.',
  },
  {
    q: 'How fresh are the products?',
    a: 'All products are sourced from local farms daily. We guarantee freshness or offer a free replacement — no questions asked.',
  },
];

const contactCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    ),
    label: 'Call Us',
    value: '+1 (555) 123-4567',
    sub: 'Mon–Fri, 9am–6pm',
    color: '#1a4731',
    accent: '#52b788',
    bg: 'linear-gradient(145deg, #0d2b1f, #1a4731)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email Us',
    value: 'support@grocery.com',
    sub: '24/7 Support',
    color: '#1a3a5c',
    accent: '#90cdf4',
    bg: 'linear-gradient(145deg, #0f2744, #1a3a5c)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Visit Us',
    value: '123 Grocery Street',
    sub: 'City, State 12345',
    color: '#5c3a1a',
    accent: '#f0c97a',
    bg: 'linear-gradient(145deg, #3d2000, #6b3a0f)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Open Hours',
    value: 'Mon–Sat: 8am–10pm',
    sub: 'Sun: 9am–8pm',
    color: '#3a1a5c',
    accent: '#b794f4',
    bg: 'linear-gradient(145deg, #240d40, #3a1a5c)',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 4000);
    }, 1200);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        :root {
          --g-deep:  #0d2b1f;
          --g-rich:  #1a4731;
          --g-main:  #2d6a4f;
          --g-vivid: #52b788;
          --g-pale:  #d8f3dc;
          --g-soft:  #f0faf4;
          --cream:   #faf8f3;
          --charcoal:#1c1c1e;
          --muted:   #6b7280;
          --border:  rgba(45,106,79,0.10);
          --t: all 0.28s cubic-bezier(0.4,0,0.2,1);
        }

        .ct-page {
          font-family: 'Outfit', sans-serif;
          background: var(--cream);
          min-height: 100vh;
        }

        /* ── HERO ── */
        .ct-hero {
          background: linear-gradient(140deg, var(--g-deep), #1a3a2a 55%, #0f2d1f);
          padding: 80px 40px 90px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .ct-hero-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(82,183,136,0.07) 1.5px, transparent 1.5px);
          background-size: 26px 26px; pointer-events: none;
        }
        .ct-hero-glow {
          position: absolute; width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(82,183,136,0.09), transparent 70%);
          top: -160px; left: 50%; transform: translateX(-50%);
          pointer-events: none;
        }
        .ct-hero-inner { position: relative; z-index: 1; }
        .ct-eyebrow-hero {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--g-vivid); margin-bottom: 18px;
        }
        .ct-dash { width: 22px; height: 1.5px; background: var(--g-vivid); border-radius: 2px; }
        .ct-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 6.5vw, 80px);
          font-weight: 700; color: white;
          line-height: 1.04; margin: 0 0 18px; letter-spacing: -1px;
        }
        .ct-hero h1 em { font-style: normal; color: var(--g-vivid); }
        .ct-hero p {
          font-size: 16px; font-weight: 300;
          color: rgba(255,255,255,0.52);
          max-width: 460px; margin: 0 auto; line-height: 1.65;
        }

        /* ── CONTACT CARDS ── */
        .ct-cards-wrap {
          max-width: 1200px; margin: 0 auto;
          padding: 0 40px;
          transform: translateY(-40px);
          position: relative; z-index: 10;
        }
        .ct-cards {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .ct-card {
          border-radius: 22px; padding: 28px 22px 26px;
          position: relative; overflow: hidden;
          transition: var(--t);
          box-shadow: 0 10px 36px rgba(0,0,0,0.22);
        }
        .ct-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 52px rgba(0,0,0,0.30);
        }
        .ct-card-decor {
          position: absolute; top: -18px; right: -18px;
          width: 80px; height: 80px; border-radius: 50%;
          opacity: 0.07; background: white;
          pointer-events: none;
        }
        .ct-card-icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: rgba(255,255,255,0.13);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px; color: white;
        }
        .ct-card-label {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          margin-bottom: 6px; display: block;
        }
        .ct-card-value {
          font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 600;
          color: white; display: block; margin-bottom: 4px;
        }
        .ct-card-sub {
          font-size: 12px; font-weight: 400;
          color: rgba(255,255,255,0.50); display: block;
        }

        /* ── MAIN CONTENT ── */
        .ct-main {
          max-width: 1200px; margin: 0 auto;
          padding: 0 40px 80px;
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: 48px; align-items: start;
        }

        /* ── FORM ── */
        .ct-form-wrap {
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 28px; padding: 44px 40px;
          box-shadow: 0 8px 32px rgba(13,43,31,0.07);
        }
        .ct-form-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--g-main); margin-bottom: 12px;
        }
        .ct-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px; font-weight: 700;
          color: var(--g-deep); margin: 0 0 8px;
          line-height: 1.1;
        }
        .ct-form-title em { font-style: normal; color: var(--g-main); }
        .ct-form-sub {
          font-size: 14px; font-weight: 300;
          color: var(--muted); margin: 0 0 32px; line-height: 1.6;
        }

        .ct-success {
          display: flex; align-items: center; gap: 12px;
          background: var(--g-soft);
          border: 1.5px solid rgba(82,183,136,0.30);
          border-radius: 14px; padding: 16px 20px;
          margin-bottom: 24px;
          color: var(--g-rich); font-size: 14px; font-weight: 500;
          animation: fadeIn 0.4s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .ct-success-icon {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--g-main); color: white;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 14px;
        }

        .ct-form { display: flex; flex-direction: column; gap: 18px; }
        .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ct-field { display: flex; flex-direction: column; gap: 7px; }
        .ct-label {
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--charcoal);
        }
        .ct-input, .ct-textarea {
          padding: 12px 16px;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; color: var(--charcoal);
          background: var(--cream);
          outline: none; transition: var(--t);
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }
        .ct-input:focus, .ct-textarea:focus {
          border-color: var(--g-vivid);
          background: white;
          box-shadow: 0 0 0 3px rgba(82,183,136,0.13);
        }
        .ct-input::placeholder, .ct-textarea::placeholder { color: #b0b8c1; }
        .ct-textarea { resize: none; line-height: 1.6; }

        .ct-submit {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, var(--g-main), var(--g-deep));
          color: white; border: none;
          border-radius: 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 600;
          cursor: pointer; transition: var(--t);
          display: flex; align-items: center; justify-content: center; gap: 10px;
          box-shadow: 0 4px 16px rgba(45,106,79,0.28);
          letter-spacing: 0.02em;
          position: relative; overflow: hidden;
        }
        .ct-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(45,106,79,0.38);
        }
        .ct-submit:disabled { opacity: 0.75; cursor: not-allowed; transform: none; }
        .ct-spinner {
          width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── RIGHT SIDE ── */
        .ct-right { display: flex; flex-direction: column; gap: 28px; }

        /* map placeholder */
        .ct-map {
          border-radius: 24px; overflow: hidden;
          height: 220px; position: relative;
          background: linear-gradient(145deg, var(--g-deep), #1a3a2a);
          box-shadow: 0 10px 36px rgba(13,43,31,0.16);
        }
        .ct-map-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.65; }
        .ct-map-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(13,43,31,0.70) 100%);
          display: flex; align-items: flex-end; padding: 20px;
        }
        .ct-map-label {
          font-size: 13px; font-weight: 600; color: white;
          display: flex; align-items: center; gap: 8px;
        }
        .ct-map-pin {
          width: 28px; height: 28px; border-radius: 50%;
          background: var(--g-vivid);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
        }

        /* FAQ */
        .ct-faq-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 700;
          color: var(--g-deep); margin: 0 0 16px;
        }
        .ct-faq-title em { font-style: normal; color: var(--g-main); }
        .ct-faqs { display: flex; flex-direction: column; gap: 10px; }
        .ct-faq-item {
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 16px; overflow: hidden;
          transition: var(--t);
        }
        .ct-faq-item.open { border-color: rgba(82,183,136,0.28); box-shadow: 0 4px 18px rgba(13,43,31,0.07); }
        .ct-faq-q {
          width: 100%; text-align: left;
          padding: 16px 20px;
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 600;
          color: var(--charcoal); transition: var(--t);
        }
        .ct-faq-q:hover { color: var(--g-rich); }
        .ct-faq-item.open .ct-faq-q { color: var(--g-main); }
        .ct-faq-icon {
          width: 24px; height: 24px; border-radius: 50%;
          background: var(--g-soft);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: var(--t);
          color: var(--g-main);
        }
        .ct-faq-item.open .ct-faq-icon {
          background: var(--g-main); color: white;
          transform: rotate(45deg);
        }
        .ct-faq-a {
          padding: 0 20px 16px;
          font-size: 13px; font-weight: 300;
          color: var(--muted); line-height: 1.70;
        }

        /* ── SOCIAL STRIP ── */
        .ct-social {
          background: linear-gradient(135deg, var(--g-deep), #1a3a2a);
          padding: 36px 40px;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 20px;
          position: relative; overflow: hidden;
        }
        .ct-social-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(82,183,136,0.06) 1.5px, transparent 1.5px);
          background-size: 20px 20px; pointer-events: none;
        }
        .ct-social-left { position: relative; z-index: 1; }
        .ct-social-left h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 700; color: white; margin: 0 0 4px;
        }
        .ct-social-left h3 em { font-style: normal; color: var(--g-vivid); }
        .ct-social-left p { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.45); margin: 0; }
        .ct-social-icons { display: flex; gap: 10px; position: relative; z-index: 1; }
        .ct-soc-btn {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 18px; cursor: pointer;
          transition: var(--t); text-decoration: none;
        }
        .ct-soc-btn:hover { background: var(--g-main); border-color: var(--g-vivid); transform: translateY(-2px); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ct-main { grid-template-columns: 1fr; gap: 32px; }
          .ct-cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .ct-hero { padding: 60px 20px 70px; }
          .ct-cards-wrap { padding: 0 20px; transform: translateY(-28px); }
          .ct-main { padding: 0 20px 60px; }
          .ct-form-wrap { padding: 28px 22px; }
          .ct-row { grid-template-columns: 1fr; }
          .ct-social { padding: 28px 20px; flex-direction: column; text-align: center; }
          .ct-social-icons { justify-content: center; }
        }
        @media (max-width: 480px) {
          .ct-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ct-page">

        {/* ── HERO ── */}
        <div className="ct-hero">
          <div className="ct-hero-dots" />
          <div className="ct-hero-glow" />
          <div className="ct-hero-inner">
            <div className="ct-eyebrow-hero">
              <span className="ct-dash" /> Get In Touch <span className="ct-dash" />
            </div>
            <h1>We're here to <em>help</em></h1>
            <p>Questions, feedback, or just want to say hello? Our team is ready to respond within 24 hours.</p>
          </div>
        </div>

        {/* ── CONTACT CARDS ── */}
        <div className="ct-cards-wrap">
          <div className="ct-cards">
            {contactCards.map((card, i) => (
              <div key={i} className="ct-card" style={{ background: card.bg }}>
                <div className="ct-card-decor" />
                <div className="ct-card-icon">{card.icon}</div>
                <span className="ct-card-label" style={{ color: card.accent }}>{card.label}</span>
                <span className="ct-card-value">{card.value}</span>
                <span className="ct-card-sub">{card.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN: FORM + RIGHT ── */}
        <div className="ct-main">

          {/* Form */}
          <div className="ct-form-wrap">
            <div className="ct-form-eyebrow">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="var(--g-vivid)"><circle cx="6" cy="6" r="6"/></svg>
              Send a Message
            </div>
            <h2 className="ct-form-title">Let's <em>talk</em></h2>
            <p className="ct-form-sub">Fill out the form and we'll get back to you within one business day.</p>

            {submitted && (
              <div className="ct-success">
                <span className="ct-success-icon">✓</span>
                <div>
                  <strong>Message sent!</strong> — We'll get back to you shortly.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="ct-form">
              <div className="ct-row">
                <div className="ct-field">
                  <label className="ct-label">Your Name *</label>
                  <input className="ct-input" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Sara Khan" />
                </div>
                <div className="ct-field">
                  <label className="ct-label">Email Address *</label>
                  <input className="ct-input" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="sara@example.com" />
                </div>
              </div>
              <div className="ct-row">
                <div className="ct-field">
                  <label className="ct-label">Phone Number</label>
                  <input className="ct-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                </div>
                <div className="ct-field">
                  <label className="ct-label">Subject *</label>
                  <input className="ct-input" type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help?" />
                </div>
              </div>
              <div className="ct-field">
                <label className="ct-label">Your Message *</label>
                <textarea className="ct-textarea" name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Tell us more about your inquiry..." />
              </div>
              <button type="submit" className="ct-submit" disabled={loading || submitted}>
                {loading ? (
                  <><span className="ct-spinner" /> Sending...</>
                ) : submitted ? (
                  <>✓ Sent Successfully</>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Side */}
          <div className="ct-right">
            {/* Map */}
            <div className="ct-map">
              <img className="ct-map-img" src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80" alt="Location map" />
              <div className="ct-map-overlay">
                <span className="ct-map-label">
                  <span className="ct-map-pin">📍</span>
                  123 Grocery Street, City, State 12345
                </span>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="ct-faq-title">Common <em>Questions</em></h3>
              <div className="ct-faqs">
                {faqs.map((faq, i) => (
                  <div key={i} className={`ct-faq-item ${openFaq === i ? 'open' : ''}`}>
                    <button className="ct-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      {faq.q}
                      <span className="ct-faq-icon">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                      </span>
                    </button>
                    {openFaq === i && <p className="ct-faq-a">{faq.a}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SOCIAL STRIP ── */}
        <div className="ct-social">
          <div className="ct-social-dots" />
          <div className="ct-social-left">
            <h3>Follow us for <em>daily deals</em></h3>
            <p>Stay updated with fresh arrivals, offers, and farm stories.</p>
          </div>
          <div className="ct-social-icons">
            {['📘','📷','🐦','▶️'].map((icon, i) => (
              <a key={i} href="#" className="ct-soc-btn">{icon}</a>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}