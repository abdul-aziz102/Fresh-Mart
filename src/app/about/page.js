'use client';

const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Fresh Quality',
    desc: 'Sourced only from trusted farms — handpicked every morning for peak freshness.',
    color: '#1a4731',
    bg: 'linear-gradient(145deg, #0d2b1f, #1a4731)',
    accent: '#52b788',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Customer First',
    desc: 'Your satisfaction drives every decision we make — from packaging to delivery.',
    color: '#1a3a5c',
    bg: 'linear-gradient(145deg, #0f2744, #1a3a5c)',
    accent: '#90cdf4',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Fast Delivery',
    desc: 'Same-day delivery in under 2 hours. Fresh groceries at your door, always on time.',
    color: '#5c3a1a',
    bg: 'linear-gradient(145deg, #3d2000, #6b3a0f)',
    accent: '#f0c97a',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Fair Prices',
    desc: 'We work directly with farmers to cut middlemen — passing savings right to you.',
    color: '#3a1a5c',
    bg: 'linear-gradient(145deg, #240d40, #3a1a5c)',
    accent: '#b794f4',
  },
];

const whyItems = [
  {
    num: '01',
    title: 'Quality Assurance',
    desc: 'Every product passes our multi-point inspection before it reaches your cart. No compromises.',
    icon: '🛡️',
  },
  {
    num: '02',
    title: 'Easy Returns',
    desc: 'Not happy? Get a hassle-free refund or replacement within 24 hours — no questions asked.',
    icon: '↩️',
  },
  {
    num: '03',
    title: 'Secure Shopping',
    desc: 'Bank-grade encryption and data protection on every order. Shop with complete peace of mind.',
    icon: '🔒',
  },
  {
    num: '04',
    title: 'Supports Local',
    desc: 'Every purchase supports a local farmer. We partner with 50+ regional suppliers in your area.',
    icon: '🤝',
  },
];

const team = [
  { name: 'Ayesha Khan', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
  { name: 'Bilal Rauf', role: 'Head of Sourcing', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
  { name: 'Sara Malik', role: 'Operations Lead', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80' },
];

export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

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
          --t: all 0.30s cubic-bezier(0.4,0,0.2,1);
        }

        .ab-page {
          font-family: 'Outfit', sans-serif;
          background: var(--cream);
        }

        /* ── HERO ── */
        .ab-hero {
          background: linear-gradient(140deg, var(--g-deep) 0%, #1a3a2a 55%, #0f2d1f 100%);
          padding: 80px 40px 90px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .ab-hero-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(82,183,136,0.07) 1.5px, transparent 1.5px);
          background-size: 26px 26px;
          pointer-events: none;
        }
        .ab-hero-glow {
          position: absolute;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(82,183,136,0.09), transparent 70%);
          top: -180px; left: 50%; transform: translateX(-50%);
          pointer-events: none;
        }
        .ab-hero-inner { position: relative; z-index: 1; }
        .ab-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--g-vivid);
          margin-bottom: 20px;
        }
        .ab-eyebrow-dash { width: 24px; height: 1.5px; background: var(--g-vivid); border-radius: 2px; }
        .ab-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(44px, 7vw, 88px);
          font-weight: 700; color: white;
          line-height: 1.02; margin: 0 0 20px;
          letter-spacing: -1px;
        }
        .ab-hero h1 em { font-style: normal; color: var(--g-vivid); }
        .ab-hero-sub {
          font-size: 17px; font-weight: 300;
          color: rgba(255,255,255,0.55);
          max-width: 500px; margin: 0 auto 44px;
          line-height: 1.65;
        }
        .ab-hero-stats {
          display: flex; justify-content: center;
          gap: 0; flex-wrap: wrap;
          border: 1px solid rgba(82,183,136,0.18);
          border-radius: 20px;
          overflow: hidden;
          max-width: 700px;
          margin: 0 auto;
          backdrop-filter: blur(10px);
          background: rgba(255,255,255,0.04);
        }
        .ab-hero-stat {
          flex: 1; min-width: 140px;
          padding: 24px 20px;
          border-right: 1px solid rgba(82,183,136,0.14);
          text-align: center;
        }
        .ab-hero-stat:last-child { border-right: none; }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px; font-weight: 700;
          color: white; display: block; line-height: 1;
        }
        .stat-label {
          font-size: 11px; font-weight: 500;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.10em; text-transform: uppercase;
          margin-top: 5px; display: block;
        }
        .stat-green { color: var(--g-vivid) !important; }

        /* ── SECTION BASE ── */
        .ab-section { padding: 80px 40px; }
        .ab-section-alt { background: white; }
        .ab-inner { max-width: 1200px; margin: 0 auto; }
        .ab-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--g-main);
          margin-bottom: 14px;
        }
        .ab-dash { width: 22px; height: 1.5px; background: var(--g-vivid); border-radius: 2px; }
        .ab-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 700; color: var(--g-deep);
          line-height: 1.07; letter-spacing: -0.5px;
          margin: 0 0 16px;
        }
        .ab-h2 em { font-style: normal; color: var(--g-main); }
        .ab-lead {
          font-size: 16px; font-weight: 300;
          color: var(--muted); line-height: 1.70;
          max-width: 560px;
        }

        /* ── STORY ── */
        .ab-story-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center;
        }
        .ab-story-text p {
          font-size: 15px; font-weight: 400;
          color: var(--muted); line-height: 1.80;
          margin: 0 0 18px;
        }
        .ab-story-text p:last-child { margin-bottom: 0; }
        .ab-story-img {
          position: relative; border-radius: 28px; overflow: hidden;
          box-shadow: 0 24px 60px rgba(13,43,31,0.18);
          aspect-ratio: 4/3;
        }
        .ab-story-img img {
          width: 100%; height: 100%; object-fit: cover;
          display: block;
        }
        .ab-story-img-badge {
          position: absolute; bottom: 20px; left: 20px;
          background: rgba(13,43,31,0.85);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(82,183,136,0.25);
          border-radius: 16px;
          padding: 14px 20px;
        }
        .ab-badge-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px; font-weight: 700;
          color: white; display: block; line-height: 1;
        }
        .ab-badge-label {
          font-size: 11px; font-weight: 500;
          color: var(--g-vivid);
          letter-spacing: 0.08em; text-transform: uppercase;
          display: block; margin-top: 3px;
        }
        .ab-mission {
          background: linear-gradient(145deg, var(--g-deep), #1a3a2a);
          border-radius: 24px; padding: 40px 36px;
          margin-top: 32px;
          position: relative; overflow: hidden;
        }
        .ab-mission-dot {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(82,183,136,0.07) 1.5px, transparent 1.5px);
          background-size: 18px 18px;
          pointer-events: none;
        }
        .ab-mission-inner { position: relative; z-index: 1; }
        .ab-mission-tag {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--g-vivid); display: block; margin-bottom: 10px;
        }
        .ab-mission h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 700;
          color: white; margin: 0 0 12px;
        }
        .ab-mission p {
          font-size: 14px; font-weight: 300;
          color: rgba(255,255,255,0.60);
          line-height: 1.70; margin: 0;
        }

        /* ── VALUES ── */
        .ab-values-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 16px; margin-top: 48px;
        }
        .ab-val-card {
          border-radius: 22px; overflow: hidden;
          position: relative; padding: 32px 24px 28px;
          transition: var(--t);
          box-shadow: 0 8px 28px rgba(0,0,0,0.18);
        }
        .ab-val-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.28);
        }
        .ab-val-decor {
          position: absolute; top: -20px; right: -20px;
          width: 90px; height: 90px; border-radius: 50%;
          opacity: 0.07; pointer-events: none;
        }
        .ab-val-icon {
          width: 54px; height: 54px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          background: rgba(255,255,255,0.12);
          color: white;
        }
        .ab-val-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700;
          color: white; margin: 0 0 10px;
        }
        .ab-val-card p {
          font-size: 13px; font-weight: 300;
          color: rgba(255,255,255,0.62);
          line-height: 1.65; margin: 0;
        }
        .ab-val-num {
          position: absolute; bottom: 20px; right: 20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px; font-weight: 700;
          color: rgba(255,255,255,0.05); line-height: 1;
          pointer-events: none;
        }

        /* ── WHY ── */
        .ab-why-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 16px; margin-top: 0;
        }
        .ab-why-card {
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 28px 28px 28px 24px;
          display: flex; gap: 20px; align-items: flex-start;
          transition: var(--t);
          position: relative; overflow: hidden;
        }
        .ab-why-card::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, var(--g-vivid), var(--g-main));
          border-radius: 0 2px 2px 0;
          opacity: 0;
          transition: opacity 0.25s;
        }
        .ab-why-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(13,43,31,0.09);
          border-color: rgba(82,183,136,0.28);
        }
        .ab-why-card:hover::before { opacity: 1; }
        .ab-why-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px; font-weight: 700;
          color: var(--g-pale); line-height: 1;
          flex-shrink: 0; min-width: 44px;
          transition: color 0.25s;
        }
        .ab-why-card:hover .ab-why-num { color: var(--g-vivid); }
        .ab-why-content h3 {
          font-size: 17px; font-weight: 600;
          color: var(--charcoal); margin: 0 0 8px; line-height: 1.3;
        }
        .ab-why-content p {
          font-size: 14px; font-weight: 300;
          color: var(--muted); line-height: 1.65; margin: 0;
        }

        /* ── TEAM ── */
        .ab-team-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 24px; margin-top: 48px;
        }
        .ab-team-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 24px; overflow: hidden;
          text-align: center;
          transition: var(--t);
        }
        .ab-team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 48px rgba(13,43,31,0.11);
          border-color: rgba(82,183,136,0.25);
        }
        .ab-team-img {
          width: 100%; aspect-ratio: 1;
          overflow: hidden;
        }
        .ab-team-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .ab-team-card:hover .ab-team-img img { transform: scale(1.06); }
        .ab-team-info { padding: 22px 20px 24px; }
        .ab-team-info h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700;
          color: var(--g-deep); margin: 0 0 4px;
        }
        .ab-team-role {
          font-size: 12px; font-weight: 500;
          color: var(--g-main);
          letter-spacing: 0.08em; text-transform: uppercase;
          display: block;
        }

        /* ── CTA BANNER ── */
        .ab-cta {
          background: linear-gradient(135deg, var(--g-deep), #1a3a2a);
          padding: 64px 40px;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .ab-cta-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(82,183,136,0.06) 1.5px, transparent 1.5px);
          background-size: 20px 20px;
          pointer-events: none;
        }
        .ab-cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
        .ab-cta h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 4vw, 52px); font-weight: 700;
          color: white; margin: 0 0 14px; line-height: 1.08;
        }
        .ab-cta h2 em { font-style: normal; color: var(--g-vivid); }
        .ab-cta p {
          font-size: 15px; font-weight: 300;
          color: rgba(255,255,255,0.55);
          line-height: 1.65; margin: 0 0 36px;
        }
        .ab-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, var(--g-vivid), var(--g-main));
          color: white; font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 600;
          padding: 15px 32px; border-radius: 50px;
          text-decoration: none;
          box-shadow: 0 6px 22px rgba(82,183,136,0.35);
          transition: var(--t);
        }
        .ab-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(82,183,136,0.48);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ab-values-grid { grid-template-columns: repeat(2, 1fr); }
          .ab-team-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .ab-hero { padding: 60px 20px 70px; }
          .ab-section { padding: 56px 20px; }
          .ab-cta { padding: 56px 20px; }
          .ab-story-grid { grid-template-columns: 1fr; gap: 36px; }
          .ab-why-grid { grid-template-columns: 1fr; }
          .ab-values-grid { grid-template-columns: 1fr; }
          .ab-team-grid { grid-template-columns: 1fr; }
          .ab-hero-stats { flex-direction: column; max-width: 280px; }
          .ab-hero-stat { border-right: none; border-bottom: 1px solid rgba(82,183,136,0.14); }
          .ab-hero-stat:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="ab-page">

        {/* ── HERO ── */}
        <div className="ab-hero">
          <div className="ab-hero-dots" />
          <div className="ab-hero-glow" />
          <div className="ab-hero-inner">
            <div className="ab-hero-eyebrow">
              <span className="ab-eyebrow-dash" />
              Our Story
              <span className="ab-eyebrow-dash" />
            </div>
            <h1>About <em>FreshMart</em></h1>
            <p className="ab-hero-sub">
              Your trusted partner for farm-fresh groceries — grown with care, delivered with love, every single day.
            </p>
            <div className="ab-hero-stats">
              {[['1,000+','Happy Customers'],['500+','Products'],['50+','Local Farms'],['24/7','Support']].map(([n,l]) => (
                <div key={l} className="ab-hero-stat">
                  <span className="stat-num stat-green">{n}</span>
                  <span className="stat-label">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── STORY ── */}
        <div className="ab-section ab-section-alt">
          <div className="ab-inner">
            <div className="ab-story-grid">
              <div className="ab-story-text">
                <div className="ab-eyebrow"><span className="ab-dash" /> Who We Are</div>
                <h2 className="ab-h2">Built on a <em>passion</em><br />for freshness</h2>
                <p>Founded with a simple belief — everyone deserves access to fresh, quality food at fair prices. We started as a small stall at the local market and have grown into a trusted online destination for thousands of families.</p>
                <p>We work hand-in-hand with over 50 local farmers and suppliers, cutting out the middlemen so you get the freshest produce at the best prices. From field to your table in under 24 hours.</p>
                <div className="ab-mission">
                  <div className="ab-mission-dot" />
                  <div className="ab-mission-inner">
                    <span className="ab-mission-tag">✦ Our Mission</span>
                    <h3>Fresh food for every home</h3>
                    <p>To make premium, organic groceries accessible to every household through convenient online shopping, transparent sourcing, and same-day delivery.</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="ab-story-img">
                  <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=85" alt="Fresh produce at market" />
                  <div className="ab-story-img-badge">
                    <span className="ab-badge-num">12+</span>
                    <span className="ab-badge-label">Years of Freshness</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── VALUES ── */}
        <div className="ab-section">
          <div className="ab-inner">
            <div style={{textAlign:'center'}}>
              <div className="ab-eyebrow" style={{justifyContent:'center'}}><span className="ab-dash" /> What We Stand For <span className="ab-dash" /></div>
              <h2 className="ab-h2" style={{textAlign:'center', maxWidth:520, margin:'0 auto 12px'}}>Our core <em>values</em></h2>
              <p className="ab-lead" style={{margin:'0 auto', textAlign:'center'}}>
                Four principles that shape every decision we make — from farm partnerships to your front door.
              </p>
            </div>
            <div className="ab-values-grid">
              {values.map((v, i) => (
                <div key={i} className="ab-val-card" style={{background: v.bg}}>
                  <div className="ab-val-decor" style={{background: v.accent}} />
                  <div className="ab-val-icon" style={{background: `rgba(255,255,255,0.12)`}}>
                    <span style={{color: v.accent}}>{v.icon}</span>
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                  <span className="ab-val-num">{String(i+1).padStart(2,'0')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── WHY CHOOSE US ── */}
        <div className="ab-section ab-section-alt">
          <div className="ab-inner">
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'start'}}>
              <div>
                <div className="ab-eyebrow"><span className="ab-dash" /> Why FreshMart</div>
                <h2 className="ab-h2">The difference<br />you can <em>taste</em></h2>
                <p className="ab-lead">We don't just deliver groceries. We deliver trust, transparency, and a commitment to quality that you'll notice in every bite.</p>
                <div style={{marginTop:32}}>
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80"
                    alt="Fresh vegetables"
                    style={{width:'100%', borderRadius:24, objectFit:'cover', height:220, boxShadow:'0 16px 48px rgba(13,43,31,0.14)'}}
                  />
                </div>
              </div>
              <div className="ab-why-grid" style={{marginTop:8}}>
                {whyItems.map((item, i) => (
                  <div key={i} className="ab-why-card">
                    <span className="ab-why-num">{item.num}</span>
                    <div className="ab-why-content">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── TEAM ── */}
        <div className="ab-section">
          <div className="ab-inner">
            <div style={{textAlign:'center'}}>
              <div className="ab-eyebrow" style={{justifyContent:'center'}}><span className="ab-dash" /> The People <span className="ab-dash" /></div>
              <h2 className="ab-h2" style={{textAlign:'center', margin:'0 auto 12px'}}>Meet our <em>team</em></h2>
              <p className="ab-lead" style={{margin:'0 auto', textAlign:'center'}}>
                Passionate people behind every fresh delivery.
              </p>
            </div>
            <div className="ab-team-grid">
              {team.map((member, i) => (
                <div key={i} className="ab-team-card">
                  <div className="ab-team-img">
                    <img src={member.img} alt={member.name} />
                  </div>
                  <div className="ab-team-info">
                    <h3>{member.name}</h3>
                    <span className="ab-team-role">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="ab-cta">
          <div className="ab-cta-dots" />
          <div className="ab-cta-inner">
            <h2>Start shopping <em>fresh</em><br />today</h2>
            <p>Join thousands of happy customers who trust FreshMart for their daily grocery needs. Free delivery on your first order.</p>
            <a href="/products" className="ab-cta-btn">
              Explore Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </>
  );
}