'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'recentlyViewed';
const MAX_ITEMS = 6;

export function saveRecentlyViewed(product) {
  if (!product?._id) return;
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filtered = stored.filter((p) => p._id !== product._id);
    const updated = [
      { _id: product._id, name: product.name, price: product.price, image: product.image },
      ...filtered,
    ].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

export default function RecentlyViewed({ excludeId, layout = 'horizontal' }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const filtered = excludeId ? stored.filter((p) => p._id !== excludeId) : stored;
      setProducts(filtered);
    } catch {}
  }, [excludeId]);

  if (products.length === 0) return null;

  const isVertical = layout === 'vertical';

  return (
    <div style={isVertical ? styles.verticalWrap : styles.horizontalWrap}>
      <h3 style={isVertical ? styles.verticalTitle : styles.horizontalTitle}>Recently Viewed</h3>
      <div style={isVertical ? styles.verticalGrid : styles.horizontalGrid}>
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={isVertical ? styles.verticalCard : styles.horizontalCard}>
              <div style={isVertical ? styles.verticalImgWrap : styles.horizontalImgWrap}>
                {product.image ? (
                  <img src={product.image} alt={product.name} style={styles.img} />
                ) : (
                  <span style={{ fontSize: 24 }}>🛒</span>
                )}
              </div>
              <div style={styles.info}>
                <span style={styles.name}>{product.name}</span>
                <span style={styles.price}>${product.price.toFixed(2)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  // Horizontal layout (homepage)
  horizontalWrap: {
    padding: '48px 40px 60px',
    maxWidth: 1340,
    margin: '0 auto',
  },
  horizontalTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 32,
    fontWeight: 700,
    color: '#0d2b1f',
    marginBottom: 24,
    textAlign: 'center',
  },
  horizontalGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 16,
  },
  horizontalCard: {
    background: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    border: '1px solid rgba(45,106,79,0.10)',
    transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
    cursor: 'pointer',
  },
  horizontalImgWrap: {
    height: 140,
    overflow: 'hidden',
    background: '#f0faf4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Vertical layout (sidebar)
  verticalWrap: {
    background: 'white',
    borderRadius: 20,
    border: '1px solid rgba(45,106,79,0.10)',
    padding: 20,
  },
  verticalTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 20,
    fontWeight: 700,
    color: '#0d2b1f',
    marginBottom: 16,
    marginTop: 0,
  },
  verticalGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  verticalCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
    padding: 8,
    borderRadius: 12,
    transition: 'all 0.2s',
    border: '1px solid transparent',
  },
  verticalImgWrap: {
    width: 52,
    height: 52,
    borderRadius: 10,
    overflow: 'hidden',
    background: '#f0faf4',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Shared
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  info: {
    padding: '10px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: 600,
    color: '#1c1c1e',
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: 160,
  },
  price: {
    fontSize: 15,
    fontWeight: 700,
    color: '#1a4731',
    fontFamily: "'Cormorant Garamond', serif",
  },
};
