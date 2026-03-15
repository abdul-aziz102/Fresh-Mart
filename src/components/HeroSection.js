import Link from 'next/link';

const products = [
  {
    label: 'Artisanal',
    name: 'Free Range Eggs',
    image: 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=200&q=80',
    price: '$4.49',
    original: '$5.99',
  },
  {
    label: 'Artisanal',
    name: 'Raw Milk',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&q=80',
    price: '$6.99',
    original: '$8.49',
  },
  {
    label: 'Organic',
    name: 'Fresh Herbs',
    image: 'https://images.unsplash.com/photo-1466193498542-bebb4be9a6b5?w=200&q=80',
    price: '$2.99',
    original: '$3.99',
  },
  {
    label: 'Raw',
    name: 'Organic Honey',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&q=80',
    price: '$8.99',
    original: '$11.99',
  },
];

export default function HeroSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Outfit:wght@300;400;500;600;700&display=swap');

        :root {
          --g-deep:  #0d2b1f;
          --g-rich:  #1a4731;
          --g-main:  #2d6a4f;
          --g-vivid: #52b788;
          --g-glow:  #95d5b2;
          --cream:   #faf8f3;
          --muted:   #6b7280;
        }

        /* ── WRAP ── */
        .hs-wrap {
          font-family: 'Outfit', sans-serif;
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* ── BG IMAGE ── */
        .hs-bg {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1800&q=90');
          background-size: cover;
          background-position: center 40%;
          z-index: 0;
          animation: slowZoom 20s ease-in-out infinite alternate;
        }
        @keyframes slowZoom {
          from { transform: scale(1.0); }
          to   { transform: scale(1.08); }
        }

        /* ── OVERLAYS ── */
        .hs-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            108deg,
            rgba(8,22,14,0.97) 0%,
            rgba(13,43,31,0.90) 35%,
            rgba(13,43,31,0.55) 60%,
            rgba(13,43,31,0.12) 100%
          );
        }
        .hs-dots {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background-image: radial-gradient(rgba(82,183,136,0.055) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
        }

        /* ── INNER ── */
        .hs-inner {
          position: relative; z-index: 3;
          width: 100%; max-width: 1440px;
          margin: 0 auto;
          padding: 100px 64px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* ══ LEFT ══ */
        .hs-left { display: flex; flex-direction: column; }

        .hs-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, var(--g-rich), var(--g-main));
          color: white; font-size: 11px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          padding: 7px 18px; border-radius: 30px;
          box-shadow: 0 4px 16px rgba(45,106,79,0.40);
          width: fit-content; margin-bottom: 28px;
          animation: fadeUp 0.6s 0.1s both;
        }
        .hs-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--g-glow);
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.35;transform:scale(0.6);} }

        .hs-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(50px, 6.2vw, 90px);
          font-weight: 700; line-height: 1.03;
          color: white; margin: 0 0 24px;
          letter-spacing: -1.5px;
          animation: fadeUp 0.7s 0.18s both;
        }
        .hs-h1 .hs-green { color: var(--g-vivid); }
        .hs-h1 .hs-italic { font-style: italic; }

        .hs-sub {
          font-size: 16px; font-weight: 300;
          color: rgba(255,255,255,0.56);
          line-height: 1.75; max-width: 420px;
          margin: 0 0 32px;
          animation: fadeUp 0.7s 0.25s both;
        }

        .hs-price-row {
          display: flex; align-items: baseline; gap: 10px;
          margin-bottom: 36px;
          animation: fadeUp 0.7s 0.32s both;
        }
        .hs-price-label {
          font-size: 12px; font-weight: 500;
          color: rgba(255,255,255,0.42);
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .hs-price-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px; font-weight: 700;
          color: white; line-height: 1;
        }
        .hs-price-per { font-size: 14px; color: rgba(255,255,255,0.42); }

        .hs-btns {
          display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
          margin-bottom: 48px;
          animation: fadeUp 0.7s 0.38s both;
        }
        .hs-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, var(--g-vivid), var(--g-main));
          color: white; font-size: 15px; font-weight: 600;
          letter-spacing: 0.02em; padding: 16px 32px;
          border-radius: 50px; text-decoration: none;
          box-shadow: 0 6px 24px rgba(82,183,136,0.42);
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          position: relative; overflow: hidden;
        }
        .hs-btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.14), transparent);
          opacity: 0; transition: opacity 0.25s;
        }
        .hs-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(82,183,136,0.55); }
        .hs-btn-primary:hover::before { opacity: 1; }
        .hs-btn-arrow {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(255,255,255,0.20);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.25s;
        }
        .hs-btn-primary:hover .hs-btn-arrow { transform: translateX(4px); }

        .hs-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.80); font-size: 15px; font-weight: 500;
          text-decoration: none; padding: 16px 26px;
          border-radius: 50px; border: 1.5px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(8px);
          background: rgba(255,255,255,0.06);
          transition: all 0.3s;
        }
        .hs-btn-ghost:hover { background: rgba(255,255,255,0.13); border-color: rgba(255,255,255,0.42); color: white; }

        .hs-trust {
          display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
          padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.10);
          animation: fadeUp 0.7s 0.44s both;
        }
        .hs-stat { text-align: center; }
        .hs-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 700;
          color: white; display: block; line-height: 1;
        }
        .hs-stat-label {
          font-size: 10px; color: rgba(255,255,255,0.40);
          letter-spacing: 0.09em; text-transform: uppercase;
          margin-top: 3px; display: block;
        }
        .hs-divider { width: 1px; height: 34px; background: rgba(255,255,255,0.12); }

        /* ══ RIGHT ══ */
        .hs-right {
          position: relative;
          animation: floatPanel 5s ease-in-out infinite;
        }
        @keyframes floatPanel {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }

        /* glass panel */
        .hs-panel {
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 28px; padding: 26px;
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          box-shadow:
            0 28px 72px rgba(0,0,0,0.40),
            inset 0 1px 0 rgba(255,255,255,0.14);
        }

        .hs-panel-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 18px;
        }
        .hs-panel-title {
          font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.55);
          display: flex; align-items: center; gap: 8px;
        }
        .hs-panel-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--g-vivid); }
        .hs-panel-count {
          font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.38);
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px; padding: 3px 10px;
        }

        /* product grid */
        .hs-products { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }

        .hs-product-card {
          background: rgba(255,255,255,0.97);
          border-radius: 18px; padding: 14px;
          transition: all 0.28s cubic-bezier(0.4,0,0.2,1);
          cursor: pointer; position: relative; overflow: hidden;
        }
        .hs-product-card:hover {
          transform: scale(1.03) translateY(-4px);
          box-shadow: 0 16px 44px rgba(0,0,0,0.22);
        }
        .hs-product-img {
          width: 100%; height: 100px; object-fit: cover;
          border-radius: 12px; margin-bottom: 10px; display: block;
          transition: transform 0.4s;
        }
        .hs-product-card:hover .hs-product-img { transform: scale(1.05); }

        .hs-product-label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--g-main);
          display: block; margin-bottom: 3px;
        }
        .hs-product-name {
          font-size: 13px; font-weight: 700; color: #1c1c1e;
          display: block; margin-bottom: 8px; line-height: 1.25;
        }
        .hs-product-footer { display: flex; align-items: center; justify-content: space-between; }
        .hs-price-group { display: flex; align-items: baseline; gap: 5px; }
        .hs-price-current {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 700; color: var(--g-rich); line-height: 1;
        }
        .hs-price-orig { font-size: 11px; color: #9ca3af; text-decoration: line-through; }

        .hs-add-btn {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, var(--g-vivid), var(--g-main));
          color: white; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; font-weight: 300; line-height: 1;
          box-shadow: 0 3px 10px rgba(45,106,79,0.35);
          transition: all 0.22s; flex-shrink: 0;
        }
        .hs-add-btn:hover { transform: scale(1.18) rotate(90deg); box-shadow: 0 5px 16px rgba(45,106,79,0.52); }

        /* view all */
        .hs-view-all {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, var(--g-main), var(--g-deep));
          color: white; text-decoration: none;
          border-radius: 14px; font-size: 14px; font-weight: 600;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 16px rgba(13,43,31,0.45);
          transition: all 0.28s;
        }
        .hs-view-all:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(13,43,31,0.60); }

        /* floating badges */
        .hs-badge-organic {
          position: absolute; top: -18px; right: 20px;
          background: white; border-radius: 14px; padding: 10px 16px;
          box-shadow: 0 8px 28px rgba(0,0,0,0.18);
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; color: var(--g-rich);
          white-space: nowrap; z-index: 10;
        }
        .hs-badge-organic-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--g-vivid);
          box-shadow: 0 0 0 3px rgba(82,183,136,0.22);
        }

        .hs-badge-deal {
          position: absolute; bottom: 56px; left: -22px;
          background: linear-gradient(135deg, var(--g-deep), var(--g-rich));
          border: 1px solid rgba(82,183,136,0.28);
          border-radius: 16px; padding: 14px 18px;
          box-shadow: 0 8px 28px rgba(13,43,31,0.50);
          z-index: 10;
        }
        .hs-badge-deal-label {
          font-size: 9px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.48);
          display: block; margin-bottom: 2px;
        }
        .hs-badge-deal-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 700; color: white;
          display: block; line-height: 1;
        }
        .hs-badge-deal-sub { font-size: 11px; color: var(--g-glow); font-weight: 500; display: block; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .hs-inner { padding: 80px 40px 60px; gap: 40px; }
          .hs-h1 { font-size: 60px; }
        }
        @media (max-width: 860px) {
          .hs-inner { grid-template-columns: 1fr; padding: 60px 24px 48px; gap: 48px; }
          .hs-right { animation: none; }
          .hs-badge-deal { left: 8px; bottom: 36px; }
          .hs-badge-organic { top: -14px; right: 12px; }
        }
        @media (max-width: 520px) {
          .hs-h1 { font-size: 44px; }
          .hs-inner { padding: 48px 20px 40px; }
          .hs-product-img { height: 75px; }
        }
      `}</style>

      <section className="hs-wrap">
        <div className="hs-bg" />
        <div className="hs-overlay" />
        <div className="hs-dots" />

        <div className="hs-inner">

          {/* ══ LEFT ══ */}
          <div className="hs-left">
            <div className="hs-eyebrow">
              <span className="hs-dot" />
              Weekly Fresh Deal
            </div>

            <h1 className="hs-h1">
              Taste the <span className="hs-green hs-italic">Purest</span><br />
              Green: Sourced<br />
              Fresh, Delivered<br />
              <span className="hs-green">PURE</span>
            </h1>

            <p className="hs-sub">
              Handpicked from local farms every morning. Taste the difference that genuine freshness makes on your table.
            </p>

            <div className="hs-price-row">
              <span className="hs-price-label">Starting from</span>
              <span className="hs-price-num">$25</span>
              <span className="hs-price-per">/ basket</span>
            </div>

            <div className="hs-btns">
              <Link href="/products" className="hs-btn-primary">
                Shop Fresh Now
                <span className="hs-btn-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </Link>
              <Link href="/about" className="hs-btn-ghost">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10 8 16 12 10 16 10 8"/>
                </svg>
                Our Story
              </Link>
            </div>

            <div className="hs-trust">
              {[['12K+','Customers'],['98%','Organic'],['2hr','Delivery'],['50+','Varieties']].map(([num, label], i, arr) => (
                <div key={label} style={{display:'contents'}}>
                  <div className="hs-stat">
                    <span className="hs-stat-num">{num}</span>
                    <span className="hs-stat-label">{label}</span>
                  </div>
                  {i < arr.length - 1 && <div className="hs-divider" />}
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT ══ */}
          <div className="hs-right">
            <div className="hs-badge-organic">
              <span className="hs-badge-organic-dot" />
              🌿 100% Organic &nbsp;·&nbsp; Certified Fresh
            </div>

            <div className="hs-panel">
              <div className="hs-panel-header">
                <span className="hs-panel-title">
                  <span className="hs-panel-dot" />
                  Curated Collection
                </span>
                <span className="hs-panel-count">4 items</span>
              </div>

              <div className="hs-products">
                {products.map((p) => (
                  <div key={p.name} className="hs-product-card">
                    <img src={p.image} alt={p.name} className="hs-product-img" />
                    <span className="hs-product-label">{p.label}</span>
                    <span className="hs-product-name">{p.name}</span>
                    <div className="hs-product-footer">
                      <div className="hs-price-group">
                        <span className="hs-price-current">{p.price}</span>
                        <span className="hs-price-orig">{p.original}</span>
                      </div>
                      <button className="hs-add-btn" aria-label={`Add ${p.name}`}>+</button>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/products" className="hs-view-all">
                View All Products
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            <div className="hs-badge-deal">
              <span className="hs-badge-deal-label">Today's Deal</span>
              <span className="hs-badge-deal-value">30% OFF</span>
              <span className="hs-badge-deal-sub">Seasonal Bundle</span>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}