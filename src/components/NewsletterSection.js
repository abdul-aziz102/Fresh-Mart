'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        .newsletter-section {
          font-family: 'Outfit', sans-serif;
          background: linear-gradient(145deg, #0d2b1f, #1a4731);
          position: relative;
          overflow: hidden;
          padding: 80px 0;
        }

        .newsletter-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(82,183,136,0.08) 1.5px, transparent 1.5px);
          background-size: 30px 30px;
          pointer-events: none;
        }

        .newsletter-container {
          position: relative;
          z-index: 1;
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .newsletter-left {
          color: white;
        }

        .newsletter-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #52b788;
          margin-bottom: 16px;
        }

        .newsletter-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 700;
          line-height: 1.1;
          color: white;
          margin: 0 0 16px;
          letter-spacing: -0.5px;
        }

        .newsletter-subtext {
          font-size: 16px;
          font-weight: 300;
          color: rgba(255,255,255,0.70);
          line-height: 1.7;
          margin: 0 0 32px;
          max-width: 480px;
        }

        .newsletter-form {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .newsletter-input {
          flex: 1;
          padding: 14px 20px;
          background: #faf8f3;
          border: 2px solid transparent;
          border-radius: 50px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: #1c1c1e;
          outline: none;
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          border-color: #52b788;
          box-shadow: 0 0 0 3px rgba(82,183,136,0.15);
        }

        .newsletter-input::placeholder {
          color: #6b7280;
        }

        .newsletter-btn {
          padding: 14px 28px;
          background: linear-gradient(135deg, #2d6a4f, #52b788);
          color: white;
          border: none;
          border-radius: 50px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(82,183,136,0.30);
        }

        .newsletter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(82,183,136,0.40);
        }

        .newsletter-disclaimer {
          font-size: 12px;
          color: rgba(255,255,255,0.50);
          font-weight: 300;
        }

        .newsletter-success {
          background: rgba(82,183,136,0.15);
          border: 1px solid rgba(82,183,136,0.30);
          border-radius: 12px;
          padding: 12px 16px;
          color: #52b788;
          font-size: 13px;
          font-weight: 500;
          margin-top: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .newsletter-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .benefit-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: all 0.3s ease;
        }

        .benefit-card:hover {
          background: rgba(255,255,255,0.12);
          transform: translateX(8px);
        }

        .benefit-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .benefit-text {
          color: white;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .newsletter-section {
            padding: 60px 0;
          }
          .newsletter-container {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 0 24px;
          }
          .newsletter-form {
            flex-direction: column;
          }
        }
      `}</style>

      <section className="newsletter-section">
        <div className="newsletter-dots" />

        <div className="newsletter-container">
          <div className="newsletter-left">
            <div className="newsletter-eyebrow">
              ✦ Stay Fresh
            </div>

            <h2 className="newsletter-heading">
              Get fresh deals delivered to your inbox
            </h2>

            <p className="newsletter-subtext">
              Join 10,000+ subscribers for weekly deals, recipes, and farm news
            </p>

            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>

            {status === 'success' && (
              <div className="newsletter-success">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Thanks for subscribing! Check your inbox.
              </div>
            )}

            <p className="newsletter-disclaimer">
              No spam, unsubscribe anytime
            </p>
          </div>

          <div className="newsletter-right">
            <div className="benefit-card">
              <div className="benefit-icon">🎁</div>
              <div className="benefit-text">
                Weekly exclusive deals for subscribers
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🌿</div>
              <div className="benefit-text">
                Fresh recipes from our farm partners
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">🚚</div>
              <div className="benefit-text">
                Early access to new products
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
