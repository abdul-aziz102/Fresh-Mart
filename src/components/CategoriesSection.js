import Link from 'next/link';

const categories = [
  {
    name: 'Fruits & Vegetables',
    slug: 'Fruits & Vegetables',
    emoji: '🥬',
    desc: 'Farm-fresh daily',
    count: '120+ items',
    color: '#1a4731',
    accent: '#52b788',
    bg: 'linear-gradient(145deg, #0d2b1f, #1a4731)',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80',
  },
  {
    name: 'Dairy & Eggs',
    slug: 'Dairy',
    emoji: '🥛',
    desc: 'Pure & organic',
    count: '45+ items',
    color: '#1a3a5c',
    accent: '#90cdf4',
    bg: 'linear-gradient(145deg, #0f2744, #1a3a5c)',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&q=80',
  },
  {
    name: 'Bakery',
    slug: 'Bakery',
    emoji: '🍞',
    desc: 'Baked every morning',
    count: '60+ items',
    color: '#5c3a1a',
    accent: '#f0c97a',
    bg: 'linear-gradient(145deg, #3d2000, #6b3a0f)',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
  },
  {
    name: 'Meat & Seafood',
    slug: 'Meat & Seafood',
    emoji: '🐟',
    desc: 'Premium cuts & catch',
    count: '80+ items',
    color: '#5c1a1a',
    accent: '#fc8181',
    bg: 'linear-gradient(145deg, #3d0000, #6b0f0f)',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&q=80',
  },
  {
    name: 'Beverages',
    slug: 'Beverages',
    emoji: '🧃',
    desc: 'Refreshing sips',
    count: '95+ items',
    color: '#1a3a5c',
    accent: '#76e4f7',
    bg: 'linear-gradient(145deg, #0a2540, #1a4a6b)',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80',
  },
];

export default function CategoriesSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        :root {
          --g-deep:  #0d2b1f;
          --g-main:  #2d6a4f;
          --g-vivid: #52b788;
          --g-pale:  #d8f3dc;
          --g-soft:  #f0faf4;
          --cream:   #faf8f3;
          --muted:   #6b7280;
          --t: all 0.32s cubic-bezier(0.4,0,0.2,1);
        }

        .cat-section {
          font-family: 'Outfit', sans-serif;
          background: var(--cream);
          padding: 80px 0 100px;
          position: relative;
          overflow: hidden;
        }

        .cat-noise {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(45,106,79,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,106,79,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .cat-glow-1 {
          position: absolute;
          width: 560px; height: 560px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(82,183,136,0.07), transparent 70%);
          bottom: -120px; left: -120px;
          pointer-events: none;
        }

        .cat-inner {
          position: relative;
          z-index: 1;
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── HEADER ── */
        .cat-header {
          text-align: center;
          margin-bottom: 52px;
        }
        .cat-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--g-main);
          margin-bottom: 16px;
        }
        .eyebrow-dash {
          width: 28px; height: 1.5px;
          background: var(--g-vivid);
          border-radius: 2px;
        }
        .cat-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(34px, 4.5vw, 58px);
          font-weight: 700;
          color: var(--g-deep);
          line-height: 1.07;
          letter-spacing: -0.5px;
          margin: 0 0 14px;
        }
        .cat-title span {
          color: var(--g-main);
          position: relative;
        }
        .cat-title span::after {
          content: '';
          position: absolute;
          bottom: 3px; left: 0; right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, var(--g-vivid), transparent);
          border-radius: 2px;
        }
        .cat-sub {
          font-size: 15px;
          font-weight: 300;
          color: var(--muted);
          max-width: 440px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── GRID ── */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        /* ── CARD ── */
        .cat-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 300px;
          transition: var(--t);
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        }
        .cat-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 60px rgba(0,0,0,0.28);
        }

        /* background image */
        .cat-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.55s cubic-bezier(0.4,0,0.2,1);
          z-index: 0;
        }
        .cat-card:hover .cat-card-bg { transform: scale(1.08); }

        /* gradient overlay */
        .cat-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0.08) 0%,
            rgba(0,0,0,0.25) 40%,
            rgba(0,0,0,0.75) 100%
          );
          z-index: 1;
          transition: var(--t);
        }
        .cat-card:hover .cat-card-overlay {
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0.10) 0%,
            rgba(0,0,0,0.30) 40%,
            rgba(0,0,0,0.82) 100%
          );
        }

        /* top accent */
        .cat-card-top {
          position: absolute;
          top: 16px; left: 16px;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .cat-count-badge {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 20px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          color: rgba(255,255,255,0.90);
          border: 1px solid rgba(255,255,255,0.20);
        }

        /* emoji bubble */
        .cat-emoji-wrap {
          position: absolute;
          top: 16px; right: 16px;
          z-index: 3;
          width: 48px; height: 48px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          transition: var(--t);
        }
        .cat-card:hover .cat-emoji-wrap {
          background: rgba(255,255,255,0.25);
          transform: rotate(-6deg) scale(1.1);
        }

        /* content */
        .cat-card-content {
          position: relative;
          z-index: 2;
          padding: 20px 20px 22px;
          transform: translateY(6px);
          transition: transform 0.32s cubic-bezier(0.4,0,0.2,1);
        }
        .cat-card:hover .cat-card-content { transform: translateY(0); }

        .cat-card-desc {
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.60);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 5px;
          display: block;
          opacity: 0;
          transform: translateY(6px);
          transition: var(--t);
        }
        .cat-card:hover .cat-card-desc {
          opacity: 1;
          transform: translateY(0);
        }

        .cat-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: white;
          line-height: 1.2;
          margin-bottom: 14px;
          display: block;
        }

        .cat-card-arrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.80);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateX(-8px);
          transition: var(--t);
        }
        .cat-card:hover .cat-card-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .arrow-circle {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center;
        }

        /* color tint per card */
        .cat-card-tint {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.35;
          transition: opacity 0.3s;
        }
        .cat-card:hover .cat-card-tint { opacity: 0.45; }

        /* ── BOTTOM BANNER ── */
        .cat-banner {
          margin-top: 20px;
          border-radius: 24px;
          overflow: hidden;
          background: linear-gradient(135deg, var(--g-deep), #1a3a2a);
          padding: 36px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          position: relative;
        }
        .cat-banner-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(82,183,136,0.08) 1.5px, transparent 1.5px);
          background-size: 22px 22px;
        }
        .cat-banner-left {
          position: relative;
          z-index: 1;
        }
        .banner-tag {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--g-vivid);
          margin-bottom: 8px;
          display: block;
        }
        .banner-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 700;
          color: white;
          line-height: 1.1;
          margin: 0;
        }
        .banner-title em {
          font-style: normal;
          color: var(--g-vivid);
        }
        .cat-banner-right {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }
        .banner-stat {
          text-align: center;
          padding: 0 16px;
          border-right: 1px solid rgba(82,183,136,0.20);
        }
        .banner-stat:last-of-type { border-right: none; }
        .banner-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          color: white;
          display: block;
          line-height: 1;
        }
        .banner-label {
          font-size: 10px;
          font-weight: 500;
          color: rgba(255,255,255,0.50);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 3px;
          display: block;
        }
        .banner-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--g-vivid), var(--g-main));
          color: white;
          font-size: 14px;
          font-weight: 600;
          padding: 13px 26px;
          border-radius: 50px;
          text-decoration: none;
          transition: var(--t);
          box-shadow: 0 4px 16px rgba(82,183,136,0.30);
          white-space: nowrap;
        }
        .banner-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(82,183,136,0.45);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .cat-grid { grid-template-columns: repeat(3, 1fr); }
          .cat-card { min-height: 260px; }
        }
        @media (max-width: 768px) {
          .cat-section { padding: 56px 0 72px; }
          .cat-inner { padding: 0 20px; }
          .cat-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .cat-card { min-height: 220px; }
          .cat-card-name { font-size: 18px; }
          .cat-banner { flex-direction: column; padding: 28px 24px; text-align: center; }
          .cat-banner-right { flex-wrap: wrap; justify-content: center; }
          .banner-stat { border-right: none; border-bottom: 1px solid rgba(82,183,136,0.20); padding: 10px 20px; }
        }
        @media (max-width: 460px) {
          .cat-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="cat-section">
        <div className="cat-noise" />
        <div className="cat-glow-1" />

        <div className="cat-inner">
          {/* Header */}
          <div className="cat-header">
            <div className="cat-eyebrow">
              <span className="eyebrow-dash" />
              Browse By Category
              <span className="eyebrow-dash" />
            </div>
            <h2 className="cat-title">
              Explore Your <span>Favorites</span>
            </h2>
            <p className="cat-sub">
              From crisp greens to warm bakes — find everything your kitchen needs in one place.
            </p>
          </div>

          {/* Grid */}
          <div className="cat-grid">
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={`/products?category=${encodeURIComponent(cat.slug)}`}
                className="cat-card"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* bg image */}
                <div
                  className="cat-card-bg"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />

                {/* color tint */}
                <div
                  className="cat-card-tint"
                  style={{ background: cat.bg }}
                />

                {/* gradient overlay */}
                <div className="cat-card-overlay" />

                {/* top left badge */}
                <div className="cat-card-top">
                  <span className="cat-count-badge">{cat.count}</span>
                </div>

                {/* emoji */}
                <div className="cat-emoji-wrap">{cat.emoji}</div>

                {/* bottom content */}
                <div className="cat-card-content">
                  <span className="cat-card-desc">{cat.desc}</span>
                  <span className="cat-card-name">{cat.name}</span>
                  <span className="cat-card-arrow">
                    Shop Now
                    <span className="arrow-circle">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="cat-banner">
            <div className="cat-banner-bg" />
            <div className="cat-banner-left">
              <span className="banner-tag">✦ Free Delivery Today</span>
              <h3 className="banner-title">
                Fresh groceries,<br />
                <em>delivered in 2 hours</em>
              </h3>
            </div>
            <div className="cat-banner-right">
              <div className="banner-stat">
                <span className="banner-num">500+</span>
                <span className="banner-label">Products</span>
              </div>
              <div className="banner-stat">
                <span className="banner-num">12K+</span>
                <span className="banner-label">Customers</span>
              </div>
              <div className="banner-stat">
                <span className="banner-num">4.9★</span>
                <span className="banner-label">Rating</span>
              </div>
              <Link href="/products" className="banner-cta">
                Shop All
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}