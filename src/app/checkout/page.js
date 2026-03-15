'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    phone: user?.phone || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: address, 2: review

  const handleChange = (e) => {
    setDeliveryAddress({ ...deliveryAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!user) { router.push('/login'); return; }
    if (cart.length === 0) { setError('Your cart is empty'); setLoading(false); return; }
    try {
      const orderData = {
        items: cart.map((item) => ({ product: item._id, quantity: item.quantity })),
        deliveryAddress,
      };
      const response = await api.post('/orders', orderData);
      clearCart();
      router.push(`/orders/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const deliveryFee = 0;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee;

  // ── NOT LOGGED IN ──
  if (!user) return (
    <>
      <style>{`${baseStyles}`}</style>
      <div className="co-empty-page">
        <div className="co-empty-dots" />
        <div className="co-empty-card">
          <div className="co-empty-icon-wrap" style={{background:'linear-gradient(135deg,#1a4731,#0d2b1f)'}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 className="co-empty-title">Login Required</h2>
          <p className="co-empty-sub">Please sign in to your account to proceed with checkout.</p>
          <button className="co-primary-btn" onClick={() => router.push('/login')}>
            Sign In to Continue
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </>
  );

  // ── EMPTY CART ──
  if (cart.length === 0) return (
    <>
      <style>{`${baseStyles}`}</style>
      <div className="co-empty-page">
        <div className="co-empty-dots" />
        <div className="co-empty-card">
          <div className="co-empty-icon-wrap" style={{background:'linear-gradient(135deg,#2d6a4f,#0d2b1f)'}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <h2 className="co-empty-title">Your Cart is Empty</h2>
          <p className="co-empty-sub">Add some fresh products to your cart before checking out.</p>
          <button className="co-primary-btn" onClick={() => router.push('/products')}>
            Browse Products
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{`${baseStyles}`}</style>

      <div className="co-page">
        {/* ── HERO BAR ── */}
        <div className="co-hero">
          <div className="co-hero-dots" />
          <div className="co-hero-inner">
            <div className="co-breadcrumb">
              <span onClick={() => router.push('/')} style={{cursor:'pointer'}}>Home</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              <span onClick={() => router.push('/cart')} style={{cursor:'pointer'}}>Cart</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              <span className="bc-active">Checkout</span>
            </div>
            <h1 className="co-hero-title">Secure <em>Checkout</em></h1>
            {/* Progress steps */}
            <div className="co-steps">
              {['Delivery Details', 'Payment', 'Confirmation'].map((s, i) => (
                <div key={i} className={`co-step ${i === 0 ? 'active' : i < step ? 'done' : ''}`}>
                  <div className="co-step-num">{i < step ? '✓' : i + 1}</div>
                  <span className="co-step-label">{s}</span>
                  {i < 2 && <div className="co-step-line" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="co-main">
          {error && (
            <div className="co-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <div className="co-grid">
            {/* ── FORM ── */}
            <div className="co-form-col">
              <div className="co-card">
                <div className="co-card-header">
                  <div className="co-card-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="co-card-title">Delivery Information</h2>
                    <p className="co-card-sub">Where should we deliver your order?</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="co-form">
                  {/* Street */}
                  <div className="co-field">
                    <label className="co-label">Street Address *</label>
                    <div className="co-input-wrap">
                      <span className="co-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                      </span>
                      <input className="co-input" type="text" name="street" value={deliveryAddress.street} onChange={handleChange} required placeholder="123 Main Street, Apt 4B" />
                    </div>
                  </div>

                  {/* City + State */}
                  <div className="co-row">
                    <div className="co-field">
                      <label className="co-label">City *</label>
                      <div className="co-input-wrap">
                        <span className="co-input-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><path d="M3 7h18M3 12h18"/>
                          </svg>
                        </span>
                        <input className="co-input" type="text" name="city" value={deliveryAddress.city} onChange={handleChange} required placeholder="New York" />
                      </div>
                    </div>
                    <div className="co-field">
                      <label className="co-label">State *</label>
                      <div className="co-input-wrap">
                        <span className="co-input-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                          </svg>
                        </span>
                        <input className="co-input" type="text" name="state" value={deliveryAddress.state} onChange={handleChange} required placeholder="NY" />
                      </div>
                    </div>
                  </div>

                  {/* Zip + Phone */}
                  <div className="co-row">
                    <div className="co-field">
                      <label className="co-label">Zip Code *</label>
                      <div className="co-input-wrap">
                        <span className="co-input-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          </svg>
                        </span>
                        <input className="co-input" type="text" name="zipCode" value={deliveryAddress.zipCode} onChange={handleChange} required placeholder="10001" />
                      </div>
                    </div>
                    <div className="co-field">
                      <label className="co-label">Phone Number *</label>
                      <div className="co-input-wrap">
                        <span className="co-input-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                          </svg>
                        </span>
                        <input className="co-input" type="tel" name="phone" value={deliveryAddress.phone} onChange={handleChange} required placeholder="(555) 123-4567" />
                      </div>
                    </div>
                  </div>

                  {/* Payment method */}
                  <div className="co-payment-box">
                    <div className="co-payment-left">
                      <div className="co-payment-icon">💵</div>
                      <div>
                        <span className="co-payment-title">Cash on Delivery</span>
                        <span className="co-payment-sub">Pay when your order arrives at your door</span>
                      </div>
                    </div>
                    <div className="co-payment-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                  </div>

                  {/* Delivery promise */}
                  <div className="co-promise-row">
                    {[
                      { icon: '🚚', text: 'Free delivery on this order' },
                      { icon: '⏱️', text: 'Arrives within 2 hours' },
                      { icon: '🌿', text: '100% fresh guaranteed' },
                    ].map((p, i) => (
                      <div key={i} className="co-promise-item">
                        <span>{p.icon}</span> {p.text}
                      </div>
                    ))}
                  </div>

                  <button type="submit" className="co-submit-btn" disabled={loading}>
                    {loading
                      ? <><span className="co-spinner" /> Placing Order...</>
                      : <>
                          Place Order — ${total.toFixed(2)}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </>
                    }
                  </button>
                </form>
              </div>
            </div>

            {/* ── ORDER SUMMARY ── */}
            <div className="co-summary-col">
              <div className="co-card co-sticky">
                <div className="co-card-header">
                  <div className="co-card-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="co-card-title">Order Summary</h2>
                    <p className="co-card-sub">{cart.length} item{cart.length !== 1 ? 's' : ''} in cart</p>
                  </div>
                </div>

                {/* items */}
                <div className="co-items">
                  {cart.map((item) => (
                    <div key={item._id} className="co-item">
                      <div className="co-item-img">
                        {item.image
                          ? <img src={item.image} alt={item.name} />
                          : <span style={{fontSize:18}}>🛒</span>
                        }
                      </div>
                      <div className="co-item-info">
                        <span className="co-item-name">{item.name}</span>
                        <span className="co-item-qty">Qty: {item.quantity} × ${item.price.toFixed(2)}</span>
                      </div>
                      <span className="co-item-total">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* totals */}
                <div className="co-totals">
                  <div className="co-total-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="co-total-row">
                    <span>Delivery Fee</span>
                    <span className="co-free">FREE</span>
                  </div>
                  <div className="co-total-row co-total-final">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* savings badge */}
                <div className="co-savings">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  You're saving on delivery — free on every order!
                </div>

                {/* security badges */}
                <div className="co-trust">
                  {['🔒 Secure', '✓ Verified', '↩ Easy Returns'].map((t, i) => (
                    <span key={i} className="co-trust-badge">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const baseStyles = `
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
    --border:  rgba(45,106,79,0.11);
    --t: all 0.28s cubic-bezier(0.4,0,0.2,1);
  }

  /* ── EMPTY STATES ── */
  .co-empty-page {
    font-family: 'Outfit', sans-serif;
    min-height: 100vh; background: var(--cream);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden; padding: 40px 20px;
  }
  .co-empty-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(45,106,79,0.05) 1.5px, transparent 1.5px);
    background-size: 28px 28px; pointer-events: none;
  }
  .co-empty-card {
    background: white; border-radius: 28px;
    border: 1.5px solid var(--border);
    padding: 52px 44px; text-align: center;
    max-width: 420px; width: 100%;
    box-shadow: 0 16px 52px rgba(13,43,31,0.10);
    position: relative; z-index: 1;
  }
  .co-empty-icon-wrap {
    width: 72px; height: 72px; border-radius: 22px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px;
    box-shadow: 0 8px 24px rgba(13,43,31,0.22);
  }
  .co-empty-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px; font-weight: 700; color: var(--g-deep);
    margin: 0 0 12px;
  }
  .co-empty-sub {
    font-size: 14px; font-weight: 300; color: var(--muted);
    line-height: 1.65; margin: 0 0 32px;
  }
  .co-primary-btn {
    display: inline-flex; align-items: center; gap: 10px;
    background: linear-gradient(135deg, var(--g-main), var(--g-deep));
    color: white; font-family: 'Outfit', sans-serif;
    font-size: 15px; font-weight: 600; border: none;
    padding: 14px 28px; border-radius: 12px; cursor: pointer;
    transition: var(--t); box-shadow: 0 4px 16px rgba(45,106,79,0.28);
  }
  .co-primary-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(45,106,79,0.38); }

  /* ── PAGE ── */
  .co-page {
    font-family: 'Outfit', sans-serif;
    background: var(--cream); min-height: 100vh;
  }

  /* ── HERO ── */
  .co-hero {
    background: linear-gradient(140deg, var(--g-deep), #1a3a2a 55%, #0f2d1f);
    padding: 48px 40px 52px; position: relative; overflow: hidden;
  }
  .co-hero-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(82,183,136,0.07) 1.5px, transparent 1.5px);
    background-size: 24px 24px; pointer-events: none;
  }
  .co-hero-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }
  .co-breadcrumb {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.40);
    margin-bottom: 16px;
  }
  .bc-active { color: var(--g-vivid); font-weight: 600; }
  .co-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(34px, 5vw, 56px); font-weight: 700;
    color: white; margin: 0 0 28px; line-height: 1.05; letter-spacing: -0.5px;
  }
  .co-hero-title em { font-style: normal; color: var(--g-vivid); }

  /* steps */
  .co-steps {
    display: flex; align-items: center; gap: 0;
    max-width: 460px;
  }
  .co-step {
    display: flex; align-items: center; gap: 10px; flex: 1;
  }
  .co-step-num {
    width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700;
    background: rgba(255,255,255,0.10);
    border: 1.5px solid rgba(255,255,255,0.20);
    color: rgba(255,255,255,0.50);
    transition: var(--t);
  }
  .co-step.active .co-step-num {
    background: var(--g-vivid); border-color: var(--g-vivid); color: white;
    box-shadow: 0 0 0 4px rgba(82,183,136,0.20);
  }
  .co-step.done .co-step-num { background: var(--g-main); border-color: var(--g-main); color: white; }
  .co-step-label {
    font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.40);
    white-space: nowrap;
  }
  .co-step.active .co-step-label { color: white; font-weight: 600; }
  .co-step-line {
    flex: 1; height: 1.5px;
    background: rgba(255,255,255,0.12);
    margin: 0 8px;
  }

  /* ── MAIN ── */
  .co-main {
    max-width: 1200px; margin: 0 auto;
    padding: 36px 40px 80px;
  }
  .co-error {
    display: flex; align-items: center; gap: 10px;
    background: #fff5f5; border: 1.5px solid rgba(229,62,62,0.22);
    border-radius: 14px; padding: 14px 18px;
    color: #c53030; font-size: 13px; font-weight: 500;
    margin-bottom: 24px;
  }
  .co-grid {
    display: grid; grid-template-columns: 1.35fr 1fr;
    gap: 28px; align-items: start;
  }

  /* ── CARD ── */
  .co-card {
    background: white; border-radius: 24px;
    border: 1.5px solid var(--border);
    padding: 32px 32px 36px;
    box-shadow: 0 4px 24px rgba(13,43,31,0.06);
  }
  .co-sticky { position: sticky; top: 20px; }
  .co-card-header {
    display: flex; align-items: flex-start; gap: 14px;
    margin-bottom: 28px;
    padding-bottom: 22px;
    border-bottom: 1px solid var(--border);
  }
  .co-card-icon {
    width: 44px; height: 44px; border-radius: 13px;
    background: var(--g-soft);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--g-main); flex-shrink: 0;
  }
  .co-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px; font-weight: 700; color: var(--g-deep);
    margin: 0 0 3px;
  }
  .co-card-sub { font-size: 13px; font-weight: 300; color: var(--muted); margin: 0; }

  /* ── FORM ── */
  .co-form { display: flex; flex-direction: column; gap: 18px; }
  .co-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .co-field { display: flex; flex-direction: column; gap: 7px; }
  .co-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--charcoal);
  }
  .co-input-wrap { position: relative; }
  .co-input-icon {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    color: var(--muted); pointer-events: none;
  }
  .co-input {
    width: 100%; padding: 12px 16px 12px 38px;
    border: 1.5px solid var(--border); border-radius: 12px;
    font-family: 'Outfit', sans-serif; font-size: 14px;
    color: var(--charcoal); background: var(--cream); outline: none;
    transition: var(--t); box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
  }
  .co-input:focus {
    border-color: var(--g-vivid); background: white;
    box-shadow: 0 0 0 3px rgba(82,183,136,0.12);
  }
  .co-input::placeholder { color: #b8c0cc; }

  /* payment box */
  .co-payment-box {
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; padding: 18px 20px;
    background: var(--g-soft);
    border: 1.5px solid rgba(82,183,136,0.22);
    border-radius: 14px; margin-top: 4px;
  }
  .co-payment-left { display: flex; align-items: center; gap: 14px; }
  .co-payment-icon { font-size: 24px; }
  .co-payment-title {
    font-size: 15px; font-weight: 600; color: var(--g-rich); display: block; margin-bottom: 2px;
  }
  .co-payment-sub { font-size: 12px; font-weight: 300; color: var(--muted); }
  .co-payment-check {
    width: 26px; height: 26px; border-radius: 50%;
    background: var(--g-main); color: white;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    box-shadow: 0 3px 10px rgba(45,106,79,0.30);
  }

  /* promise row */
  .co-promise-row {
    display: flex; gap: 8px; flex-wrap: wrap;
  }
  .co-promise-item {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 12px; font-weight: 500; color: var(--g-main);
    background: var(--g-soft); border: 1px solid var(--border);
    border-radius: 20px; padding: 5px 12px;
  }

  /* submit */
  .co-submit-btn {
    width: 100%; padding: 16px;
    background: linear-gradient(135deg, var(--g-main), var(--g-deep));
    color: white; border: none; border-radius: 14px;
    font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 600;
    cursor: pointer; transition: var(--t);
    display: flex; align-items: center; justify-content: center; gap: 12px;
    box-shadow: 0 6px 20px rgba(45,106,79,0.30); letter-spacing: 0.02em;
    margin-top: 8px;
  }
  .co-submit-btn:hover:not(:disabled) {
    transform: translateY(-2px); box-shadow: 0 12px 32px rgba(45,106,79,0.40);
  }
  .co-submit-btn:disabled { opacity: 0.70; cursor: not-allowed; transform: none; }
  .co-spinner {
    width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white; border-radius: 50%;
    animation: cospin 0.7s linear infinite;
  }
  @keyframes cospin { to { transform: rotate(360deg); } }

  /* ── SUMMARY ── */
  .co-items { display: flex; flex-direction: column; gap: 12px; margin-bottom: 22px; max-height: 280px; overflow-y: auto; }
  .co-item {
    display: flex; align-items: center; gap: 12px;
    padding-bottom: 12px; border-bottom: 1px solid var(--border);
  }
  .co-item:last-child { border-bottom: none; padding-bottom: 0; }
  .co-item-img {
    width: 44px; height: 44px; border-radius: 10px;
    overflow: hidden; background: var(--g-soft); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--border);
  }
  .co-item-img img { width: 100%; height: 100%; object-fit: cover; }
  .co-item-info { flex: 1; }
  .co-item-name { font-size: 13px; font-weight: 600; color: var(--charcoal); display: block; margin-bottom: 2px; }
  .co-item-qty { font-size: 11px; font-weight: 400; color: var(--muted); }
  .co-item-total { font-size: 14px; font-weight: 700; color: var(--g-rich); flex-shrink: 0; }

  .co-totals {
    border-top: 1px solid var(--border); padding-top: 18px;
    display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px;
  }
  .co-total-row {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 14px; color: var(--muted); font-weight: 400;
  }
  .co-free { color: var(--g-main); font-weight: 600; }
  .co-total-final {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 700; color: var(--g-deep);
    border-top: 1px solid var(--border); padding-top: 12px; margin-top: 4px;
  }
  .co-total-final span:last-child { color: var(--g-main); }

  .co-savings {
    display: flex; align-items: center; gap: 8px;
    background: var(--g-soft); border: 1px solid rgba(82,183,136,0.20);
    border-radius: 12px; padding: 12px 14px;
    font-size: 12px; font-weight: 500; color: var(--g-main);
    margin-bottom: 16px;
  }

  .co-trust {
    display: flex; gap: 6px; flex-wrap: wrap;
  }
  .co-trust-badge {
    font-size: 11px; font-weight: 500; color: var(--muted);
    background: white; border: 1px solid var(--border);
    border-radius: 20px; padding: 4px 10px;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .co-grid { grid-template-columns: 1fr; }
    .co-sticky { position: static; }
  }
  @media (max-width: 768px) {
    .co-hero { padding: 36px 20px 40px; }
    .co-main { padding: 24px 20px 60px; }
    .co-card { padding: 24px 20px; }
    .co-row { grid-template-columns: 1fr; }
    .co-steps { max-width: 100%; }
    .co-step-label { display: none; }
  }
`;