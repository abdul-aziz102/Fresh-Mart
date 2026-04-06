'use client';

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState({});

  const handleAddToCart = (product) => {
    if (product.stock === 0) return;
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product._id]: true }));
    setTimeout(() => setAddedIds((prev) => ({ ...prev, [product._id]: false })), 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        :root {
          --g-deep: #0d2b1f; --g-rich: #1a4731; --g-main: #2d6a4f; --g-vivid: #52b788;
          --g-pale: #d8f3dc; --g-soft: #f0faf4; --cream: #faf8f3; --charcoal: #1c1c1e;
          --muted: #6b7280; --border: rgba(45,106,79,0.10);
          --t: all 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .wl-page { font-family: 'Outfit', sans-serif; background: var(--cream); min-height: 100vh; }
        .wl-hero { background: linear-gradient(135deg, var(--g-deep) 0%, #1a3a2a 60%, #0f2d1f 100%); padding: 52px 40px 56px; position: relative; overflow: hidden; }
        .wl-hero-dots { position: absolute; inset: 0; background-image: radial-gradient(rgba(82,183,136,0.07) 1.5px, transparent 1.5px); background-size: 24px 24px; pointer-events: none; }
        .wl-hero-inner { position: relative; z-index: 1; max-width: 1340px; margin: 0 auto; }
        .wl-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.45); letter-spacing: 0.04em; margin-bottom: 20px; }
        .wl-breadcrumb span { color: var(--g-vivid); }
        .wl-hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 5vw, 62px); font-weight: 700; color: white; line-height: 1.05; margin: 0 0 12px; }
        .wl-hero-title em { font-style: normal; color: var(--g-vivid); }
        .wl-hero-sub { font-size: 15px; font-weight: 300; color: rgba(255,255,255,0.55); max-width: 420px; line-height: 1.6; }

        .wl-main { max-width: 1340px; margin: 0 auto; padding: 36px 40px 80px; }
        .wl-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .wl-card { background: white; border-radius: 20px; overflow: hidden; border: 1px solid var(--border); transition: var(--t); display: flex; flex-direction: column; position: relative; }
        .wl-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(13,43,31,0.11); border-color: rgba(82,183,136,0.28); }
        .wl-img-wrap { position: relative; height: 200px; overflow: hidden; background: var(--g-soft); }
        .wl-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(0.4,0,0.2,1); }
        .wl-card:hover .wl-img-wrap img { transform: scale(1.06); }
        .wl-remove { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.12); cursor: pointer; transition: var(--t); border: none; color: #e53e3e; }
        .wl-remove:hover { transform: scale(1.15); background: #fff5f5; }
        .wl-body { padding: 18px 18px 20px; display: flex; flex-direction: column; flex: 1; }
        .wl-cat-label { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--g-main); margin-bottom: 5px; display: flex; align-items: center; gap: 5px; }
        .wl-cat-dot { width: 5px; height: 5px; background: var(--g-vivid); border-radius: 50%; }
        .wl-name { font-size: 15px; font-weight: 600; color: var(--charcoal); margin: 0 0 4px; line-height: 1.3; }
        .wl-price-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 14px; margin-top: auto; }
        .wl-price { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700; color: var(--g-rich); line-height: 1; }
        .wl-unit { font-size: 11px; color: var(--muted); }
        .wl-btn { width: 100%; padding: 12px; border-radius: 12px; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; border: none; transition: var(--t); display: flex; align-items: center; justify-content: center; gap: 8px; }
        .wl-btn.avail { background: linear-gradient(135deg, var(--g-main), var(--g-deep)); color: white; box-shadow: 0 4px 14px rgba(45,106,79,0.22); }
        .wl-btn.avail:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(45,106,79,0.35); }
        .wl-btn.done { background: linear-gradient(135deg, #38a169, #276749); color: white; }
        .wl-btn.disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }

        .wl-empty { text-align: center; padding: 80px 20px; }
        .wl-empty-icon { font-size: 64px; margin-bottom: 20px; display: block; opacity: 0.5; }
        .wl-empty h3 { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 700; color: var(--g-rich); margin: 0 0 12px; }
        .wl-empty p { font-size: 15px; color: var(--muted); margin: 0 0 28px; }
        .wl-browse-btn { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, var(--g-main), var(--g-deep)); color: white; font-size: 15px; font-weight: 600; padding: 14px 32px; border-radius: 50px; text-decoration: none; transition: var(--t); box-shadow: 0 4px 14px rgba(45,106,79,0.25); }
        .wl-browse-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(45,106,79,0.38); }

        @media (max-width: 1100px) { .wl-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .wl-hero { padding: 36px 20px 40px; } .wl-main { padding: 24px 20px 60px; } .wl-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } .wl-img-wrap { height: 160px; } }
        @media (max-width: 480px) { .wl-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="wl-page">
        <div className="wl-hero">
          <div className="wl-hero-dots" />
          <div className="wl-hero-inner">
            <div className="wl-breadcrumb">
              Home <span>›</span> <span>Wishlist</span>
            </div>
            <h1 className="wl-hero-title">
              My <em>Wishlist</em>
            </h1>
            <p className="wl-hero-sub">
              Your saved favorites, ready to add to cart whenever you are.
            </p>
          </div>
        </div>

        <div className="wl-main">
          {wishlist.length === 0 ? (
            <div className="wl-empty">
              <span className="wl-empty-icon">♡</span>
              <h3>Your wishlist is empty</h3>
              <p>Browse our products and save your favorites for later.</p>
              <Link href="/products" className="wl-browse-btn">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="wl-grid">
              {wishlist.map((product) => {
                const isAdded = addedIds[product._id];
                const inStock = product.stock > 0;

                return (
                  <div key={product._id} className="wl-card">
                    <div className="wl-img-wrap">
                      <Link href={`/products/${product._id}`}>
                        <img src={product.image} alt={product.name} />
                      </Link>
                      <button
                        className="wl-remove"
                        onClick={() => removeFromWishlist(product._id)}
                        aria-label="Remove from wishlist"
                      >✕</button>
                    </div>

                    <div className="wl-body">
                      <span className="wl-cat-label">
                        <span className="wl-cat-dot" />
                        {product.category || 'Fresh Produce'}
                      </span>
                      <Link href={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h3 className="wl-name">{product.name}</h3>
                      </Link>
                      <div className="wl-price-row">
                        <span className="wl-price">${product.price.toFixed(2)}</span>
                        <span className="wl-unit">/{product.unit || 'each'}</span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!inStock}
                        className={`wl-btn ${isAdded ? 'done' : inStock ? 'avail' : 'disabled'}`}
                      >
                        {isAdded ? '✓ Added to Cart' : inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
