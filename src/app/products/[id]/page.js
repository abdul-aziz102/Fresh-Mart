'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { saveRecentlyViewed } from '@/components/RecentlyViewed';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [added, setAdded] = useState(false);
  const [user, setUser] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try { setUser(JSON.parse(userData)); } catch {}
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchReviews();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      setMainImage(res.data.image);
      saveRecentlyViewed(res.data);
    } catch {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/products/${id}/reviews`);
      setReviews(res.data);
    } catch {}
  };

  const handleAddToCart = () => {
    if (!product || product.stock === 0) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0) { setReviewError('Please select a rating'); return; }
    if (!comment.trim()) { setReviewError('Please write a comment'); return; }

    try {
      setSubmitting(true);
      setReviewError('');
      await api.post(`/products/${id}/reviews`, { rating, comment });
      setReviewSuccess('Review submitted!');
      setRating(0);
      setComment('');
      fetchReviews();
      fetchProduct();
      setTimeout(() => setReviewSuccess(''), 3000);
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const userHasReviewed = user && reviews.some((r) => r.user?._id === user._id || r.user === user._id);

  const renderStars = (value) => (
    [1,2,3,4,5].map(s => (
      <span key={s} style={{ opacity: s <= Math.round(value) ? 1 : 0.3 }}>★</span>
    ))
  );

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#1a4731' }}>Product not found</h2>
          <Link href="/products" style={{ color: '#2d6a4f' }}>Back to Products</Link>
        </div>
      </div>
    );
  }

  const inStock = product.stock > 0;
  const discount = Math.round(((product.price * 1.3 - product.price) / (product.price * 1.3)) * 100);
  const thumbnails = [product.image, product.image, product.image, product.image];

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
        .pd-page { font-family: 'Outfit', sans-serif; background: var(--cream); min-height: 100vh; }
        .pd-hero { background: linear-gradient(135deg, var(--g-deep) 0%, #1a3a2a 60%, #0f2d1f 100%); padding: 40px 40px 44px; position: relative; overflow: hidden; }
        .pd-hero-dots { position: absolute; inset: 0; background-image: radial-gradient(rgba(82,183,136,0.07) 1.5px, transparent 1.5px); background-size: 24px 24px; pointer-events: none; }
        .pd-hero-inner { position: relative; z-index: 1; max-width: 1340px; margin: 0 auto; }
        .pd-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.45); letter-spacing: 0.04em; }
        .pd-breadcrumb a { color: rgba(255,255,255,0.45); text-decoration: none; }
        .pd-breadcrumb a:hover { color: var(--g-vivid); }
        .pd-breadcrumb .current { color: var(--g-vivid); }

        .pd-main { max-width: 1340px; margin: 0 auto; padding: 40px 40px 80px; }
        .pd-content { display: grid; grid-template-columns: 3fr 2fr; gap: 48px; margin-bottom: 60px; }

        /* Gallery */
        .pd-gallery { display: flex; flex-direction: column; gap: 12px; }
        .pd-img-wrap { border-radius: 20px; overflow: hidden; background: var(--g-soft); position: relative; }
        .pd-img-wrap img { width: 100%; height: 420px; object-fit: cover; display: block; }
        .pd-thumb-strip { display: flex; gap: 10px; }
        .pd-thumb { width: 80px; height: 80px; border-radius: 12px; overflow: hidden; cursor: pointer; border: 2.5px solid transparent; transition: var(--t); flex-shrink: 0; }
        .pd-thumb:hover { border-color: var(--g-vivid); opacity: 0.85; }
        .pd-thumb.active { border-color: var(--g-vivid); box-shadow: 0 0 0 2px rgba(82,183,136,0.25); }
        .pd-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .pd-info { display: flex; flex-direction: column; gap: 16px; }
        .pd-category { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--g-main); display: flex; align-items: center; gap: 6px; }
        .pd-cat-dot { width: 6px; height: 6px; background: var(--g-vivid); border-radius: 50%; }
        .pd-name { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; color: var(--g-deep); margin: 0; line-height: 1.15; }
        .pd-rating-summary { display: flex; align-items: center; gap: 8px; }
        .pd-stars { color: #f59e0b; font-size: 18px; letter-spacing: 2px; }
        .pd-rtext { font-size: 14px; color: var(--muted); }
        .pd-price-row { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
        .pd-price-orig { font-size: 16px; color: var(--muted); text-decoration: line-through; }
        .pd-price { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 700; color: var(--g-rich); line-height: 1; }
        .pd-unit { font-size: 14px; color: var(--muted); }
        .pd-disc { font-size: 12px; font-weight: 700; color: #e53e3e; background: rgba(229,62,62,0.08); padding: 4px 10px; border-radius: 20px; }
        .pd-stock { font-size: 13px; font-weight: 500; color: var(--g-main); background: var(--g-soft); padding: 4px 12px; border-radius: 10px; }

        /* Quantity selector */
        .pd-qty { display: flex; align-items: center; gap: 0; border: 1.5px solid var(--border); border-radius: 12px; overflow: hidden; background: white; width: fit-content; }
        .pd-qty-btn { width: 42px; height: 42px; border: none; background: transparent; font-size: 20px; font-weight: 600; color: var(--g-main); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: var(--t); }
        .pd-qty-btn:hover { background: var(--g-soft); }
        .pd-qty-btn:disabled { color: #d1d5db; cursor: not-allowed; }
        .pd-qty-btn:disabled:hover { background: transparent; }
        .pd-qty-val { width: 48px; text-align: center; font-size: 16px; font-weight: 600; color: var(--charcoal); border-left: 1.5px solid var(--border); border-right: 1.5px solid var(--border); height: 42px; display: flex; align-items: center; justify-content: center; }

        .pd-add-btn { padding: 14px 32px; border-radius: 12px; font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; border: none; transition: var(--t); display: inline-flex; align-items: center; gap: 8px; width: 100%; justify-content: center; }
        .pd-add-btn.avail { background: linear-gradient(135deg, var(--g-main), var(--g-deep)); color: white; box-shadow: 0 4px 14px rgba(45,106,79,0.22); }
        .pd-add-btn.avail:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(45,106,79,0.35); }
        .pd-add-btn.done { background: linear-gradient(135deg, #38a169, #276749); color: white; }
        .pd-add-btn.disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; }

        /* Tabs */
        .pd-tabs { display: flex; gap: 0; border-bottom: 2px solid var(--border); margin-bottom: 24px; }
        .pd-tab-btn { padding: 12px 24px; font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 500; color: var(--muted); background: none; border: none; cursor: pointer; border-bottom: 2.5px solid transparent; margin-bottom: -2px; transition: var(--t); }
        .pd-tab-btn:hover { color: var(--g-main); }
        .pd-tab-btn.active { color: var(--g-main); border-bottom-color: var(--g-vivid); font-weight: 600; }
        .pd-tab-content { min-height: 100px; }
        .pd-desc { font-size: 15px; color: var(--muted); line-height: 1.7; }

        .pd-review-form { background: white; border-radius: 16px; border: 1px solid var(--border); padding: 28px; margin-bottom: 32px; }
        .pd-form-title { font-size: 16px; font-weight: 600; color: var(--charcoal); margin: 0 0 16px; }
        .pd-star-select { display: flex; gap: 4px; margin-bottom: 16px; }
        .pd-star-btn { background: none; border: none; font-size: 28px; cursor: pointer; color: #d1d5db; transition: color 0.15s; padding: 0 2px; }
        .pd-star-btn.active { color: #f59e0b; }
        .pd-star-btn:hover { color: #f59e0b; }
        .pd-textarea { width: 100%; min-height: 100px; padding: 12px 16px; border: 1.5px solid var(--border); border-radius: 12px; font-family: 'Outfit', sans-serif; font-size: 14px; color: var(--charcoal); resize: vertical; outline: none; transition: var(--t); box-sizing: border-box; }
        .pd-textarea:focus { border-color: var(--g-vivid); box-shadow: 0 0 0 3px rgba(82,183,136,0.12); }
        .pd-submit-btn { margin-top: 12px; padding: 11px 28px; border-radius: 10px; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; border: none; background: linear-gradient(135deg, var(--g-main), var(--g-deep)); color: white; transition: var(--t); }
        .pd-submit-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(45,106,79,0.25); }
        .pd-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .pd-form-error { color: #e53e3e; font-size: 13px; margin-top: 8px; }
        .pd-form-success { color: #38a169; font-size: 13px; margin-top: 8px; }

        .pd-review-list { display: flex; flex-direction: column; gap: 16px; }
        .pd-review-card { background: white; border-radius: 14px; border: 1px solid var(--border); padding: 20px 24px; }
        .pd-review-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .pd-review-user { font-size: 14px; font-weight: 600; color: var(--charcoal); }
        .pd-review-date { font-size: 12px; color: var(--muted); }
        .pd-review-stars { color: #f59e0b; font-size: 13px; letter-spacing: 1px; margin-bottom: 8px; }
        .pd-review-comment { font-size: 14px; color: #374151; line-height: 1.6; }
        .pd-no-reviews { text-align: center; padding: 40px; color: var(--muted); font-size: 15px; }
        .pd-login-prompt { background: var(--g-soft); border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 32px; font-size: 14px; color: var(--muted); }
        .pd-login-prompt a { color: var(--g-main); font-weight: 600; }

        @media (max-width: 768px) {
          .pd-content { grid-template-columns: 1fr; gap: 24px; }
          .pd-hero { padding: 28px 20px 32px; }
          .pd-main { padding: 24px 20px 60px; }
          .pd-img-wrap img { height: 280px; }
          .pd-thumb { width: 60px; height: 60px; }
        }
      `}</style>

      <div className="pd-page">
        <div className="pd-hero">
          <div className="pd-hero-dots" />
          <div className="pd-hero-inner">
            <div className="pd-breadcrumb">
              <Link href="/">Home</Link> <span>›</span> <Link href="/products">Products</Link> <span>›</span> <span className="current">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="pd-main">
          <div className="pd-content">
            {/* Left: Gallery */}
            <div className="pd-gallery">
              <div className="pd-img-wrap">
                <img src={mainImage} alt={product.name} />
              </div>
              <div className="pd-thumb-strip">
                {thumbnails.map((img, i) => (
                  <div
                    key={i}
                    className={`pd-thumb ${mainImage === img && i === thumbnails.indexOf(mainImage) ? 'active' : ''}`}
                    onClick={() => setMainImage(img)}
                    style={i === 0 && mainImage === product.image ? { borderColor: 'var(--g-vivid)', boxShadow: '0 0 0 2px rgba(82,183,136,0.25)' } : {}}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div className="pd-info">
              <span className="pd-category"><span className="pd-cat-dot" />{product.category}</span>
              <h1 className="pd-name">{product.name}</h1>

              <div className="pd-rating-summary">
                <span className="pd-stars">{renderStars(product.averageRating || 0)}</span>
                <span className="pd-rtext">
                  {product.reviewCount > 0
                    ? `${product.averageRating} (${product.reviewCount} review${product.reviewCount !== 1 ? 's' : ''})`
                    : 'No reviews yet'}
                </span>
              </div>

              <div className="pd-price-row">
                <span className="pd-price-orig">${(product.price * 1.3).toFixed(2)}</span>
                <span className="pd-price">${product.price.toFixed(2)}</span>
                <span className="pd-unit">/{product.unit}</span>
                <span className="pd-disc">-{discount}%</span>
              </div>

              {inStock && <span className="pd-stock" style={{ alignSelf: 'flex-start' }}>{product.stock} in stock</span>}

              {/* Quantity selector */}
              {inStock && (
                <div className="pd-qty">
                  <button
                    className="pd-qty-btn"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >−</button>
                  <div className="pd-qty-val">{quantity}</div>
                  <button
                    className="pd-qty-btn"
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                  >+</button>
                </div>
              )}

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`pd-add-btn ${added ? 'done' : inStock ? 'avail' : 'disabled'}`}
              >
                {added ? `✓ Added ${quantity} to Cart` : inStock ? `Add to Cart — $${(product.price * quantity).toFixed(2)}` : 'Out of Stock'}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                style={{ padding: '12px 20px', borderRadius: 12, border: '1.5px solid var(--border)', background: isInWishlist(product._id) ? 'rgba(229,62,62,0.08)' : 'white', color: isInWishlist(product._id) ? '#e53e3e' : 'var(--muted)', fontSize: 18, cursor: 'pointer', transition: 'var(--t)', display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start' }}
              >
                {isInWishlist(product._id) ? '♥' : '♡'}
                <span style={{ fontSize: 14, fontWeight: 500 }}>{isInWishlist(product._id) ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>

              {/* Tabs */}
              <div>
                <div className="pd-tabs">
                  <button className={`pd-tab-btn ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>Description</button>
                  <button className={`pd-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews ({reviews.length})</button>
                </div>
                <div className="pd-tab-content">
                  {activeTab === 'description' ? (
                    <p className="pd-desc">{product.description || 'No description available for this product.'}</p>
                  ) : (
                    <>
                      {!user ? (
                        <div className="pd-login-prompt">
                          <Link href="/login">Log in</Link> to leave a review
                        </div>
                      ) : userHasReviewed ? (
                        <div className="pd-login-prompt">You have already reviewed this product</div>
                      ) : (
                        <form className="pd-review-form" onSubmit={handleSubmitReview}>
                          <h3 className="pd-form-title">Write a Review</h3>
                          <div className="pd-star-select">
                            {[1,2,3,4,5].map(s => (
                              <button
                                type="button"
                                key={s}
                                className={`pd-star-btn ${s <= (hoverRating || rating) ? 'active' : ''}`}
                                onClick={() => setRating(s)}
                                onMouseEnter={() => setHoverRating(s)}
                                onMouseLeave={() => setHoverRating(0)}
                              >★</button>
                            ))}
                          </div>
                          <textarea
                            className="pd-textarea"
                            placeholder="Share your experience with this product..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <button type="submit" className="pd-submit-btn" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Review'}
                          </button>
                          {reviewError && <p className="pd-form-error">{reviewError}</p>}
                          {reviewSuccess && <p className="pd-form-success">{reviewSuccess}</p>}
                        </form>
                      )}

                      {reviews.length > 0 ? (
                        <div className="pd-review-list">
                          {reviews.map((review) => (
                            <div key={review._id} className="pd-review-card">
                              <div className="pd-review-header">
                                <span className="pd-review-user">{review.user?.name || 'Anonymous'}</span>
                                <span className="pd-review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="pd-review-stars">{renderStars(review.rating)}</div>
                              <p className="pd-review-comment">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="pd-no-reviews">No reviews yet. Be the first to review this product!</div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
