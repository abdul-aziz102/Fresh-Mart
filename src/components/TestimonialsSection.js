export default function TestimonialsSection() {
  const reviews = [
    {
      name: 'Sara K.',
      initial: 'S',
      text: 'The freshest vegetables I\'ve ever had delivered. FreshMart is now part of my weekly routine!',
      role: 'Verified Customer'
    },
    {
      name: 'Ahmed R.',
      initial: 'A',
      text: 'Amazing quality and super fast delivery. The organic fruits taste incredible.',
      role: 'Verified Customer'
    },
    {
      name: 'Fatima M.',
      initial: 'F',
      text: 'Best grocery service in the city. Prices are fair and everything arrives fresh.',
      role: 'Verified Customer'
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        .testimonials-section {
          font-family: 'Outfit', sans-serif;
          background: #faf8f3;
          position: relative;
          padding: 80px 0;
          overflow: hidden;
        }

        .testimonials-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(45,106,79,0.04) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
        }

        .testimonials-container {
          position: relative;
          z-index: 1;
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .testimonials-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2d6a4f;
          margin-bottom: 12px;
        }

        .testimonials-eyebrow-dot {
          width: 6px;
          height: 6px;
          background: #52b788;
          border-radius: 50%;
        }

        .testimonials-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 700;
          color: #0d2b1f;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.5px;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-bottom: 50px;
        }

        .review-card {
          background: white;
          border: 1px solid rgba(45,106,79,0.12);
          border-radius: 24px;
          padding: 32px 28px;
          transition: all 0.35s ease;
          position: relative;
        }

        .review-card:hover {
          transform: translateY(-6px);
          border-color: #52b788;
          box-shadow: 0 12px 40px rgba(45,106,79,0.15);
        }

        .review-quote {
          font-size: 48px;
          font-family: 'Cormorant Garamond', serif;
          color: #52b788;
          line-height: 1;
          margin: 0 0 16px;
          opacity: 0.8;
        }

        .review-text {
          font-size: 15px;
          font-weight: 400;
          color: #1c1c1e;
          line-height: 1.7;
          margin: 0 0 24px;
        }

        .review-footer {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid rgba(45,106,79,0.08);
        }

        .review-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2d6a4f, #52b788);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        .review-info {
          flex: 1;
        }

        .review-name {
          font-size: 14px;
          font-weight: 600;
          color: #0d2b1f;
          display: block;
          margin-bottom: 2px;
        }

        .review-role {
          font-size: 12px;
          font-weight: 400;
          color: #6b7280;
        }

        .review-stars {
          color: #f59e0b;
          font-size: 14px;
          letter-spacing: 2px;
        }

        .trust-bar {
          background: white;
          border: 1px solid rgba(45,106,79,0.12);
          border-radius: 20px;
          padding: 24px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #1c1c1e;
        }

        .trust-star {
          color: #f59e0b;
          font-size: 18px;
        }

        .trust-divider {
          width: 1px;
          height: 24px;
          background: rgba(45,106,79,0.12);
        }

        @media (max-width: 1000px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .testimonials-section {
            padding: 60px 0;
          }
          .testimonials-container {
            padding: 0 24px;
          }
          .trust-bar {
            flex-direction: column;
            gap: 16px;
            padding: 20px 24px;
          }
          .trust-divider {
            display: none;
          }
        }
      `}</style>

      <section className="testimonials-section">
        <div className="testimonials-dots" />

        <div className="testimonials-container">
          <div className="testimonials-header">
            <div className="testimonials-eyebrow">
              <span className="testimonials-eyebrow-dot" />
              Customer Reviews
            </div>
            <h2 className="testimonials-title">What Our Customers Say</h2>
          </div>

          <div className="testimonials-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-quote">"</div>
                <p className="review-text">{review.text}</p>
                <div className="review-footer">
                  <div className="review-avatar">{review.initial}</div>
                  <div className="review-info">
                    <span className="review-name">{review.name}</span>
                    <span className="review-role">{review.role}</span>
                  </div>
                  <div className="review-stars">★★★★★</div>
                </div>
              </div>
            ))}
          </div>

          <div className="trust-bar">
            <div className="trust-item">
              <span className="trust-star">★</span>
              4.9 Average Rating
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              2,400+ Reviews
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              98% Recommend
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
