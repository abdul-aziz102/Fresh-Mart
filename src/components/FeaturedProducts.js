'use client';

import { useState } from 'react';
import Link from 'next/link';

const tabs = [
  { label: 'All', icon: '✦' },
  { label: 'Vegetables', icon: '🥦' },
  { label: 'Fruits', icon: '🍊' },
  { label: 'Dairy', icon: '🥛' },
  { label: 'Bakery', icon: '🍞' },
  { label: 'Beverages', icon: '🧃' },
];

export default function FeaturedProducts({ products, onAddToCart }) {
  const [activeTab, setActiveTab] = useState('All');
  const [addedIds, setAddedIds] = useState({});

  const handleAdd = (product) => {
    onAddToCart(product);
    setAddedIds((prev) => ({ ...prev, [product._id]: true }));
    setTimeout(() => setAddedIds((prev) => ({ ...prev, [product._id]: false })), 1400);
  };

  const filtered =
    activeTab === 'All'
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeTab).slice(0, 8);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        :root {
          --g-deep:   #0d2b1f;
          --g-rich:   #1a4731;
          --g-main:   #2d6a4f;
          --g-vivid:  #52b788;
          --g-pale:   #d8f3dc;
          --g-soft:   #f0faf4;
          --gold:     #c8963e;
          --cream:    #faf8f3;
          --charcoal: #1c1c1e;
          --muted:    #6b7280;
          --border:   rgba(45,106,79,0.10);
          --t: all 0.28s cubic-bezier(0.4,0,0.2,1);
        }

        .fp-section {
          font-family: 'Outfit', sans-serif;
          background: var(--cream);
          padding: 80px 0 100px;
          position: relative;
          overflow: hidden;
        }
        .fp-bg-dot {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(45,106,79,0.06) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .fp-bg-glow {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(82,183,136,0.08), transparent 70%);
          top: -100px; right: -100px;
          pointer-events: none;
        }

        .fp-inner {
          position: relative;
          z-index: 1;
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── HEADER ── */
        .fp-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .fp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--g-main);
          background: var(--g-soft);
          border: 1px solid var(--border);
          border-radius: 30px;
          padding: 6px 16px;
          margin-bottom: 16px;
        }
        .fp-eyebrow-line {
          width: 24px; height: 1.5px;
          background: var(--g-vivid);
          border-radius: 2px;
        }
        .fp-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 700;
          color: var(--g-deep);
          line-height: 1.05;
          letter-spacing: -0.5px;
          margin: 0 0 14px;
        }
        .fp-title em {
          color: var(--g-main);
          font-style: normal;
          position: relative;
        }
        .fp-title em::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 0; right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, var(--g-vivid), transparent);
          border-radius: 2px;
        }
        .fp-subtitle {
          font-size: 16px;
          font-weight: 300;
          color: var(--muted);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── TABS ── */
        .fp-tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 52px;
        }
        .fp-tab {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 20px;
          border-radius: 50px;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: var(--t);
          background: white;
          color: var(--muted);
          border-color: rgba(0,0,0,0.08);
        }
        .fp-tab:hover {
          background: var(--g-soft);
          border-color: var(--g-vivid);
          color: var(--g-rich);
        }
        .fp-tab.active {
          background: linear-gradient(135deg, var(--g-main), var(--g-deep));
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 16px rgba(45,106,79,0.30);
        }
        .tab-icon { font-size: 14px; line-height: 1; }

        /* ── GRID ── */
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        /* ── CARD ── */
        .fp-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border);
          transition: var(--t);
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .fp-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(13,43,31,0.12);
          border-color: rgba(82,183,136,0.30);
        }

        /* image area */
        .fp-card-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: var(--g-soft);
        }
        .fp-card-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .fp-card:hover .fp-card-img-wrap img { transform: scale(1.07); }

        .fp-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(13,43,31,0.18) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .fp-card:hover .fp-card-overlay { opacity: 1; }

        /* badges */
        .fp-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .badge-sale {
          background: linear-gradient(135deg, #e53e3e, #c53030);
          color: white;
          box-shadow: 0 3px 10px rgba(229,62,62,0.35);
        }
        .badge-out {
          background: rgba(0,0,0,0.55);
          color: rgba(255,255,255,0.8);
          backdrop-filter: blur(6px);
        }

        .fp-wishlist {
          position: absolute;
          top: 12px; right: 12px;
          width: 32px; height: 32px;
          background: white;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
          cursor: pointer;
          transition: var(--t);
          opacity: 0;
        }
        .fp-card:hover .fp-wishlist { opacity: 1; }
        .fp-wishlist:hover { transform: scale(1.15); }

        /* card body */
        .fp-card-body {
          padding: 18px 18px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 0;
        }
        .fp-card-category {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--g-main);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .category-dot {
          width: 5px; height: 5px;
          background: var(--g-vivid);
          border-radius: 50%;
          display: inline-block;
        }
        .fp-card-name {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0 0 4px;
          line-height: 1.3;
        }
        .fp-card-unit {
          font-size: 12px;
          color: var(--muted);
          font-weight: 400;
          margin-bottom: 14px;
        }

        /* rating */
        .fp-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 14px;
        }
        .stars { color: #f59e0b; font-size: 12px; letter-spacing: 1px; }
        .rating-count { font-size: 11px; color: var(--muted); }

        /* price */
        .fp-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 16px;
          margin-top: auto;
        }
        .price-original {
          font-size: 12px;
          color: var(--muted);
          text-decoration: line-through;
          font-weight: 400;
        }
        .price-current {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 700;
          color: var(--g-rich);
          line-height: 1;
        }
        .price-discount {
          font-size: 11px;
          font-weight: 700;
          color: #e53e3e;
          background: rgba(229,62,62,0.08);
          padding: 2px 7px;
          border-radius: 20px;
        }

        /* add to cart btn */
        .fp-add-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: var(--t);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          overflow: hidden;
        }
        .fp-add-btn.available {
          background: linear-gradient(135deg, var(--g-main), var(--g-deep));
          color: white;
          box-shadow: 0 4px 14px rgba(45,106,79,0.25);
        }
        .fp-add-btn.available:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(45,106,79,0.38);
        }
        .fp-add-btn.added {
          background: linear-gradient(135deg, #38a169, #276749);
          color: white;
        }
        .fp-add-btn.unavailable {
          background: #f3f4f6;
          color: #9ca3af;
          cursor: not-allowed;
        }
        .btn-cart-icon { font-size: 16px; }

        /* ── FOOTER ── */
        .fp-footer {
          text-align: center;
          margin-top: 56px;
        }
        .fp-view-all {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: 2px solid var(--g-main);
          color: var(--g-rich);
          font-size: 15px;
          font-weight: 600;
          padding: 14px 36px;
          border-radius: 50px;
          text-decoration: none;
          transition: var(--t);
          letter-spacing: 0.02em;
        }
        .fp-view-all:hover {
          background: var(--g-main);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(45,106,79,0.30);
        }
        .view-all-arrow {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: var(--g-pale);
          display: flex; align-items: center; justify-content: center;
          transition: var(--t);
        }
        .fp-view-all:hover .view-all-arrow {
          background: rgba(255,255,255,0.22);
          transform: translateX(4px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .fp-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .fp-section { padding: 56px 0 72px; }
          .fp-inner { padding: 0 20px; }
          .fp-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .fp-card-img-wrap { height: 160px; }
        }
        @media (max-width: 460px) {
          .fp-grid { grid-template-columns: 1fr; }
          .fp-tab { padding: 8px 14px; font-size: 13px; }
        }
      `}</style>

      <section className="fp-section">
        <div className="fp-bg-dot" />
        <div className="fp-bg-glow" />

        <div className="fp-inner">
          {/* Header */}
          <div className="fp-header">
            <div className="fp-eyebrow">
              <span className="fp-eyebrow-line" />
              Handpicked For You
              <span className="fp-eyebrow-line" />
            </div>
            <h2 className="fp-title">
              <em>Featured</em> Products
            </h2>
            <p className="fp-subtitle">
              Fresh from local farms, curated daily. Only the finest quality makes it to your cart.
            </p>
          </div>

          {/* Tabs */}
          <div className="fp-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`fp-tab ${activeTab === tab.label ? 'active' : ''}`}
              >
                <span className="tab-icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="fp-grid">
            {filtered.map((product) => {
              const isAdded = addedIds[product._id];
              const inStock = product.stock > 0;
              const discount = Math.round(((product.price * 1.3 - product.price) / (product.price * 1.3)) * 100);

              return (
                <div key={product._id} className="fp-card">
                  <div className="fp-card-img-wrap">
                    <img src={product.image} alt={product.name} />
                    <div className="fp-card-overlay" />

                    {inStock ? (
                      <span className="fp-badge badge-sale">{discount}% OFF</span>
                    ) : (
                      <span className="fp-badge badge-out">Out of Stock</span>
                    )}

                    <button className="fp-wishlist" aria-label="Wishlist">♡</button>
                  </div>

                  <div className="fp-card-body">
                    <span className="fp-card-category">
                      <span className="category-dot" />
                      {product.category || 'Fresh Produce'}
                    </span>

                    <h3 className="fp-card-name">{product.name}</h3>
                    <p className="fp-card-unit">{product.unit || 'per kg'}</p>

                    <div className="fp-rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating-count">(4.8)</span>
                    </div>

                    <div className="fp-price-row">
                      <span className="price-original">${(product.price * 1.3).toFixed(2)}</span>
                      <span className="price-current">${product.price.toFixed(2)}</span>
                      <span className="price-discount">-{discount}%</span>
                    </div>

                    <button
                      onClick={() => inStock && handleAdd(product)}
                      className={`fp-add-btn ${isAdded ? 'added' : inStock ? 'available' : 'unavailable'}`}
                    >
                      {isAdded ? (
                        <>✓ Added to Cart</>
                      ) : inStock ? (
                        <>
                          <span className="btn-cart-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                              <line x1="3" y1="6" x2="21" y2="6"/>
                              <path d="M16 10a4 4 0 01-8 0"/>
                            </svg>
                          </span>
                          Add to Cart
                        </>
                      ) : (
                        'Out of Stock'
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="fp-footer">
            <Link href="/products" className="fp-view-all">
              Explore All Products
              <span className="view-all-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}