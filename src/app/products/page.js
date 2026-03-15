'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';

const categories = [
  { label: 'All', icon: '✦' },
  { label: 'Fruits & Vegetables', icon: '🥬' },
  { label: 'Dairy & Eggs', icon: '🥛' },
  { label: 'Bakery', icon: '🍞' },
  { label: 'Meat & Seafood', icon: '🐟' },
  { label: 'Beverages', icon: '🧃' },
  { label: 'Snacks', icon: '🍿' },
  { label: 'Pantry', icon: '🫙' },
  { label: 'Frozen Foods', icon: '❄️' },
];

const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Name A–Z', value: 'name_asc' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');
  const [error, setError] = useState('');
  const [addedIds, setAddedIds] = useState({});
  const [view, setView] = useState('grid'); // grid | list

  const { addToCart } = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) setCategory(categoryParam);
  }, [searchParams]);

  useEffect(() => { fetchProducts(); }, [search, category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category !== 'All') params.category = category;
      const response = await api.get('/products', { params });
      setProducts(response.data);
      setError('');
    } catch {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (product.stock === 0) return;
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product._id]: true }));
    setTimeout(() => setAddedIds((prev) => ({ ...prev, [product._id]: false })), 1500);
  };

  const sorted = [...products].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    if (sort === 'name_asc') return a.name.localeCompare(b.name);
    return 0;
  });

  const discount = (price) => Math.round(((price * 1.3 - price) / (price * 1.3)) * 100);

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

        .pp-page {
          font-family: 'Outfit', sans-serif;
          background: var(--cream);
          min-height: 100vh;
        }

        /* ── HERO BANNER ── */
        .pp-hero {
          background: linear-gradient(135deg, var(--g-deep) 0%, #1a3a2a 60%, #0f2d1f 100%);
          padding: 52px 40px 56px;
          position: relative;
          overflow: hidden;
        }
        .pp-hero-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(82,183,136,0.07) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
          pointer-events: none;
        }
        .pp-hero-glow {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(82,183,136,0.10), transparent 70%);
          top: -100px; right: -80px;
          pointer-events: none;
        }
        .pp-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1340px;
          margin: 0 auto;
        }
        .pp-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.04em;
          margin-bottom: 20px;
        }
        .pp-breadcrumb span { color: var(--g-vivid); }
        .pp-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 62px);
          font-weight: 700;
          color: white;
          line-height: 1.05;
          margin: 0 0 12px;
          letter-spacing: -0.5px;
        }
        .pp-hero-title em {
          font-style: normal;
          color: var(--g-vivid);
        }
        .pp-hero-sub {
          font-size: 15px;
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          max-width: 420px;
          line-height: 1.6;
        }

        /* ── MAIN LAYOUT ── */
        .pp-main {
          max-width: 1340px;
          margin: 0 auto;
          padding: 36px 40px 80px;
        }

        /* ── TOOLBAR ── */
        .pp-toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .pp-search-wrap {
          flex: 1;
          min-width: 200px;
          position: relative;
        }
        .pp-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          pointer-events: none;
        }
        .pp-search {
          width: 100%;
          padding: 12px 16px 12px 42px;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: var(--charcoal);
          background: white;
          outline: none;
          transition: var(--t);
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .pp-search:focus {
          border-color: var(--g-vivid);
          box-shadow: 0 0 0 3px rgba(82,183,136,0.12);
        }
        .pp-search::placeholder { color: var(--muted); }

        .pp-sort {
          padding: 12px 16px;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: var(--charcoal);
          background: white;
          outline: none;
          cursor: pointer;
          transition: var(--t);
          min-width: 180px;
        }
        .pp-sort:focus { border-color: var(--g-vivid); }

        .pp-view-btns {
          display: flex;
          gap: 4px;
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 4px;
        }
        .pp-view-btn {
          width: 36px; height: 36px;
          border-radius: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: var(--muted);
          transition: var(--t);
        }
        .pp-view-btn.active {
          background: var(--g-main);
          color: white;
        }

        /* ── CATEGORY PILLS ── */
        .pp-cats {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 32px;
        }
        .pp-cat {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: var(--t);
          background: white;
          color: var(--muted);
          border-color: rgba(0,0,0,0.07);
        }
        .pp-cat:hover {
          background: var(--g-soft);
          border-color: var(--g-vivid);
          color: var(--g-rich);
        }
        .pp-cat.active {
          background: linear-gradient(135deg, var(--g-main), var(--g-deep));
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 14px rgba(45,106,79,0.28);
        }

        /* ── RESULTS BAR ── */
        .pp-results-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pp-results-text {
          font-size: 14px;
          color: var(--muted);
          font-weight: 400;
        }
        .pp-results-text strong { color: var(--g-rich); font-weight: 600; }
        .pp-active-cat {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--g-main);
          background: var(--g-soft);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 4px 12px;
        }

        /* ── GRID ── */
        .pp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .pp-grid.list-view {
          grid-template-columns: 1fr;
          gap: 14px;
        }

        /* ── CARD (grid) ── */
        .pp-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border);
          transition: var(--t);
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .pp-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(13,43,31,0.11);
          border-color: rgba(82,183,136,0.28);
        }
        .pp-card.list-card {
          flex-direction: row;
          min-height: 140px;
        }
        .pp-card.list-card:hover { transform: translateY(-2px); }

        /* image */
        .pp-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: var(--g-soft);
          flex-shrink: 0;
        }
        .list-card .pp-img-wrap {
          width: 160px;
          height: auto;
          border-radius: 0;
        }
        .pp-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .pp-card:hover .pp-img-wrap img { transform: scale(1.06); }
        .list-card:hover .pp-img-wrap img { transform: scale(1.04); }

        .pp-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 55%, rgba(13,43,31,0.15) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .pp-card:hover .pp-img-overlay { opacity: 1; }

        .pp-out-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.50);
          backdrop-filter: blur(2px);
          display: flex; align-items: center; justify-content: center;
          z-index: 2;
        }
        .pp-out-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 20px;
          background: rgba(0,0,0,0.60);
          color: rgba(255,255,255,0.85);
          border: 1px solid rgba(255,255,255,0.20);
          backdrop-filter: blur(8px);
        }

        .pp-sale-badge {
          position: absolute;
          top: 12px; left: 12px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          background: linear-gradient(135deg, #e53e3e, #c53030);
          color: white;
          box-shadow: 0 3px 10px rgba(229,62,62,0.35);
          z-index: 1;
        }
        .pp-wish {
          position: absolute;
          top: 12px; right: 12px;
          width: 32px; height: 32px;
          background: white;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
          cursor: pointer;
          transition: var(--t);
          opacity: 0;
          z-index: 1;
          border: none;
        }
        .pp-card:hover .pp-wish { opacity: 1; }
        .pp-wish:hover { transform: scale(1.15); }

        /* body */
        .pp-body {
          padding: 18px 18px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .list-card .pp-body {
          padding: 20px 24px;
          justify-content: center;
        }
        .pp-cat-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--g-main);
          margin-bottom: 5px;
          display: flex; align-items: center; gap: 5px;
        }
        .cat-dot {
          width: 5px; height: 5px;
          background: var(--g-vivid);
          border-radius: 50%;
        }
        .pp-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0 0 4px;
          line-height: 1.3;
        }
        .pp-desc {
          font-size: 12px;
          color: var(--muted);
          font-weight: 400;
          line-height: 1.55;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pp-rating {
          display: flex; align-items: center; gap: 4px;
          margin-bottom: 12px;
        }
        .pp-stars { color: #f59e0b; font-size: 11px; letter-spacing: 1px; }
        .pp-rcount { font-size: 11px; color: var(--muted); }

        .pp-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 14px;
          margin-top: auto;
          flex-wrap: wrap;
        }
        .pp-price-orig {
          font-size: 12px; color: var(--muted);
          text-decoration: line-through; font-weight: 400;
        }
        .pp-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 700;
          color: var(--g-rich); line-height: 1;
        }
        .pp-unit {
          font-size: 11px; color: var(--muted); font-weight: 400;
        }
        .pp-disc {
          font-size: 11px; font-weight: 700;
          color: #e53e3e;
          background: rgba(229,62,62,0.08);
          padding: 2px 7px; border-radius: 20px;
        }
        .pp-stock-tag {
          font-size: 11px; font-weight: 500;
          color: var(--g-main);
          background: var(--g-soft);
          padding: 2px 8px; border-radius: 10px;
          margin-left: auto;
        }

        /* button */
        .pp-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 600;
          cursor: pointer; border: none;
          transition: var(--t);
          display: flex; align-items: center; justify-content: center;
          gap: 8px;
        }
        .pp-btn.avail {
          background: linear-gradient(135deg, var(--g-main), var(--g-deep));
          color: white;
          box-shadow: 0 4px 14px rgba(45,106,79,0.22);
        }
        .pp-btn.avail:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(45,106,79,0.35);
        }
        .pp-btn.done {
          background: linear-gradient(135deg, #38a169, #276749);
          color: white;
        }
        .pp-btn.disabled {
          background: #f3f4f6; color: #9ca3af; cursor: not-allowed;
        }
        .list-card .pp-btn { width: auto; padding: 11px 24px; }

        /* ── LOADING ── */
        .pp-loading {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 8px;
        }
        .pp-skeleton {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .skel-img {
          height: 200px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        .skel-body { padding: 18px; display: flex; flex-direction: column; gap: 10px; }
        .skel-line {
          border-radius: 6px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── EMPTY ── */
        .pp-empty {
          text-align: center;
          padding: 80px 20px;
          color: var(--muted);
        }
        .pp-empty-icon {
          font-size: 56px; margin-bottom: 16px; display: block;
          opacity: 0.5;
        }
        .pp-empty h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 700;
          color: var(--g-rich); margin: 0 0 8px;
        }
        .pp-empty p { font-size: 15px; }

        /* ── ERROR ── */
        .pp-error {
          display: flex; align-items: center; gap: 12px;
          background: #fff5f5;
          border: 1.5px solid rgba(229,62,62,0.25);
          border-radius: 14px;
          padding: 16px 20px;
          color: #c53030;
          font-size: 14px; font-weight: 500;
          margin-bottom: 24px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .pp-grid { grid-template-columns: repeat(3, 1fr); }
          .pp-loading { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .pp-hero { padding: 36px 20px 40px; }
          .pp-main { padding: 24px 20px 60px; }
          .pp-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .pp-loading { grid-template-columns: repeat(2, 1fr); }
          .pp-img-wrap { height: 160px; }
          .list-card { flex-direction: column; }
          .list-card .pp-img-wrap { width: 100%; height: 160px; }
        }
        @media (max-width: 480px) {
          .pp-grid { grid-template-columns: 1fr; }
          .pp-loading { grid-template-columns: 1fr; }
          .pp-toolbar { flex-direction: column; }
          .pp-search-wrap, .pp-sort { width: 100%; }
        }
      `}</style>

      <div className="pp-page">
        {/* Hero Banner */}
        <div className="pp-hero">
          <div className="pp-hero-dots" />
          <div className="pp-hero-glow" />
          <div className="pp-hero-inner">
            <div className="pp-breadcrumb">
              Home <span>›</span> <span>All Products</span>
            </div>
            <h1 className="pp-hero-title">
              Our <em>Fresh</em> Products
            </h1>
            <p className="pp-hero-sub">
              Handpicked from local farms daily. Search, filter, and find exactly what your kitchen needs.
            </p>
          </div>
        </div>

        <div className="pp-main">
          {/* Toolbar */}
          <div className="pp-toolbar">
            <div className="pp-search-wrap">
              <span className="pp-search-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pp-search"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="pp-sort"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <div className="pp-view-btns">
              <button
                className={`pp-view-btn ${view === 'grid' ? 'active' : ''}`}
                onClick={() => setView('grid')}
                title="Grid view"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              </button>
              <button
                className={`pp-view-btn ${view === 'list' ? 'active' : ''}`}
                onClick={() => setView('list')}
                title="List view"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                  <circle cx="3" cy="6" r="1.5" fill="currentColor"/><circle cx="3" cy="12" r="1.5" fill="currentColor"/><circle cx="3" cy="18" r="1.5" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="pp-cats">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setCategory(cat.label)}
                className={`pp-cat ${category === cat.label ? 'active' : ''}`}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="pp-error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Loading Skeletons */}
          {loading ? (
            <div className="pp-loading">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="pp-skeleton">
                  <div className="skel-img" style={{ animationDelay: `${i * 0.08}s` }} />
                  <div className="skel-body">
                    <div className="skel-line" style={{ height: 10, width: '45%', animationDelay: `${i * 0.08}s` }} />
                    <div className="skel-line" style={{ height: 14, width: '80%', animationDelay: `${i * 0.08 + 0.1}s` }} />
                    <div className="skel-line" style={{ height: 10, width: '60%', animationDelay: `${i * 0.08 + 0.2}s` }} />
                    <div className="skel-line" style={{ height: 42, width: '100%', marginTop: 6, animationDelay: `${i * 0.08 + 0.3}s` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div className="pp-empty">
              <span className="pp-empty-icon">🔍</span>
              <h3>No products found</h3>
              <p>Try a different search term or browse another category.</p>
            </div>
          ) : (
            <>
              {/* Results bar */}
              <div className="pp-results-bar">
                <p className="pp-results-text">
                  Showing <strong>{sorted.length}</strong> product{sorted.length !== 1 ? 's' : ''}
                </p>
                {category !== 'All' && (
                  <span className="pp-active-cat">
                    {categories.find(c => c.label === category)?.icon} {category}
                    <button
                      onClick={() => setCategory('All')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--g-main)', fontWeight: 700, fontSize: 13, padding: '0 0 0 4px' }}
                    >✕</button>
                  </span>
                )}
              </div>

              {/* Product Grid / List */}
              <div className={`pp-grid ${view === 'list' ? 'list-view' : ''}`}>
                {sorted.map((product) => {
                  const isAdded = addedIds[product._id];
                  const inStock = product.stock > 0;
                  const disc = discount(product.price);

                  return (
                    <div
                      key={product._id}
                      className={`pp-card ${view === 'list' ? 'list-card' : ''}`}
                    >
                      <div className="pp-img-wrap">
                        <img src={product.image} alt={product.name} />
                        <div className="pp-img-overlay" />
                        {inStock && <span className="pp-sale-badge">-{disc}%</span>}
                        {!inStock && (
                          <div className="pp-out-overlay">
                            <span className="pp-out-badge">Out of Stock</span>
                          </div>
                        )}
                        <button className="pp-wish">♡</button>
                      </div>

                      <div className="pp-body">
                        <span className="pp-cat-label">
                          <span className="cat-dot" />
                          {product.category || 'Fresh Produce'}
                        </span>
                        <h3 className="pp-name">{product.name}</h3>
                        {product.description && (
                          <p className="pp-desc">{product.description}</p>
                        )}
                        <div className="pp-rating">
                          <span className="pp-stars">★★★★★</span>
                          <span className="pp-rcount">(4.8)</span>
                        </div>
                        <div className="pp-price-row">
                          <span className="pp-price-orig">${(product.price * 1.3).toFixed(2)}</span>
                          <span className="pp-price">${product.price.toFixed(2)}</span>
                          <span className="pp-unit">/{product.unit}</span>
                          <span className="pp-disc">-{disc}%</span>
                          {inStock && (
                            <span className="pp-stock-tag">{product.stock} left</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!inStock}
                          className={`pp-btn ${isAdded ? 'done' : inStock ? 'avail' : 'disabled'}`}
                        >
                          {isAdded ? (
                            <>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                              Added to Cart
                            </>
                          ) : inStock ? (
                            <>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                              </svg>
                              Add to Cart
                            </>
                          ) : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}