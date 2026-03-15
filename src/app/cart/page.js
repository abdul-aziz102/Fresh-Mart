'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  const subtotal = getCartTotal();
  const total = subtotal;

  if (cart.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="ca-empty-page">
          <div className="ca-empty-dots" />
          <div className="ca-empty-glow" />
          <div className="ca-empty-card">
            <div className="ca-empty-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <h2 className="ca-empty-title">Your cart is empty</h2>
            <p className="ca-empty-sub">Looks like you haven't added any fresh products yet. Let's change that!</p>
            <Link href="/products" className="ca-cta-btn">
              Browse Fresh Products
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>

      <div className="ca-page">
        {/* Hero */}
        <div className="ca-hero">
          <div className="ca-hero-dots" />
          <div className="ca-hero-inner">
            <div className="ca-breadcrumb">
              <span onClick={() => router.push('/')} style={{cursor:'pointer'}}>Home</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              <span className="ca-bc-active">Shopping Cart</span>
            </div>
            <div className="ca-hero-content">
              <div>
                <h1 className="ca-hero-title">Shopping <em>Cart</em></h1>
                <p className="ca-hero-sub">{cart.length} item{cart.length !== 1 ? 's' : ''} ready for checkout</p>
              </div>
              <button onClick={clearCart} className="ca-clear-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                </svg>
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        <div className="ca-main">
          <div className="ca-grid">

            {/* ── CART ITEMS ── */}
            <div className="ca-items-col">
              <div className="ca-card">
                <div className="ca-card-header">
                  <div className="ca-card-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="ca-card-title">Cart Items</h2>
                    <p className="ca-card-sub">{cart.length} product{cart.length !== 1 ? 's' : ''} selected</p>
                  </div>
                </div>

                <div className="ca-items-list">
                  {cart.map((item, i) => (
                    <div key={item._id} className="ca-item" style={{animationDelay:`${i*0.06}s`}}>
                      <div className="ca-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className="ca-item-info">
                        <div className="ca-item-cat">Fresh Produce</div>
                        <h3 className="ca-item-name">{item.name}</h3>
                        <div className="ca-item-price-unit">${item.price.toFixed(2)} / {item.unit}</div>
                      </div>

                      <div className="ca-item-right">
                        <div className="ca-qty-ctrl">
                          <button
                            className="ca-qty-btn"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          </button>
                          <span className="ca-qty-val">{item.quantity}</span>
                          <button
                            className="ca-qty-btn"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          </button>
                        </div>

                        <div className="ca-item-subtotal">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <button
                          className="ca-remove-btn"
                          onClick={() => removeFromCart(item._id)}
                          title="Remove item"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* continue shopping */}
                <div className="ca-continue">
                  <Link href="/products" className="ca-continue-link">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* ── ORDER SUMMARY ── */}
            <div className="ca-summary-col">
              <div className="ca-summary-card ca-sticky">

                <div className="ca-card-header">
                  <div className="ca-card-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="ca-card-title">Order Summary</h2>
                    <p className="ca-card-sub">Review before checkout</p>
                  </div>
                </div>

                {/* mini item list */}
                <div className="ca-mini-items">
                  {cart.map(item => (
                    <div key={item._id} className="ca-mini-item">
                      <span className="ca-mini-name">{item.name} <span className="ca-mini-qty">×{item.quantity}</span></span>
                      <span className="ca-mini-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* totals */}
                <div className="ca-totals">
                  <div className="ca-total-row">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="ca-total-row">
                    <span>Delivery Fee</span>
                    <span className="ca-free">FREE</span>
                  </div>
                  <div className="ca-total-final">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* savings */}
                <div className="ca-savings">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  You're saving on delivery — always free!
                </div>

                {/* checkout btn */}
                <button onClick={() => router.push('/checkout')} className="ca-checkout-btn">
                  Proceed to Checkout
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>

                {/* payment */}
                <div className="ca-payment">
                  <div className="ca-payment-icon">💵</div>
                  <div>
                    <span className="ca-payment-title">Cash on Delivery</span>
                    <span className="ca-payment-sub">Pay when your order arrives</span>
                  </div>
                </div>

                {/* trust */}
                <div className="ca-trust">
                  {['🔒 Secure', '✓ Verified', '↩ Free Returns'].map((t, i) => (
                    <span key={i} className="ca-trust-badge">{t}</span>
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

const styles = `
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

  /* EMPTY */
  .ca-empty-page {
    font-family:'Outfit',sans-serif; min-height:100vh;
    background:var(--cream); display:flex; align-items:center;
    justify-content:center; position:relative; overflow:hidden; padding:40px 20px;
  }
  .ca-empty-dots {
    position:absolute; inset:0;
    background-image:radial-gradient(rgba(45,106,79,0.05) 1.5px,transparent 1.5px);
    background-size:28px 28px; pointer-events:none;
  }
  .ca-empty-glow {
    position:absolute; width:500px; height:500px; border-radius:50%;
    background:radial-gradient(circle,rgba(82,183,136,0.07),transparent 70%);
    top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none;
  }
  .ca-empty-card {
    background:white; border-radius:28px; border:1.5px solid var(--border);
    padding:56px 48px; text-align:center; max-width:420px; width:100%;
    box-shadow:0 16px 52px rgba(13,43,31,0.10); position:relative; z-index:1;
  }
  .ca-empty-icon {
    width:72px; height:72px; border-radius:22px;
    background:linear-gradient(135deg,var(--g-main),var(--g-deep));
    display:flex; align-items:center; justify-content:center;
    margin:0 auto 24px; box-shadow:0 8px 24px rgba(13,43,31,0.22);
  }
  .ca-empty-title {
    font-family:'Cormorant Garamond',serif;
    font-size:32px; font-weight:700; color:var(--g-deep); margin:0 0 12px;
  }
  .ca-empty-sub {
    font-size:14px; font-weight:300; color:var(--muted);
    line-height:1.65; margin:0 0 32px;
  }
  .ca-cta-btn {
    display:inline-flex; align-items:center; gap:10px;
    background:linear-gradient(135deg,var(--g-main),var(--g-deep));
    color:white; font-family:'Outfit',sans-serif; font-size:15px; font-weight:600;
    padding:14px 28px; border-radius:12px; text-decoration:none;
    transition:var(--t); box-shadow:0 4px 16px rgba(45,106,79,0.28);
  }
  .ca-cta-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(45,106,79,0.38); }

  /* PAGE */
  .ca-page { font-family:'Outfit',sans-serif; background:var(--cream); min-height:100vh; }

  /* HERO */
  .ca-hero {
    background:linear-gradient(140deg,var(--g-deep),#1a3a2a 55%,#0f2d1f);
    padding:44px 40px 48px; position:relative; overflow:hidden;
  }
  .ca-hero-dots {
    position:absolute; inset:0;
    background-image:radial-gradient(rgba(82,183,136,0.07) 1.5px,transparent 1.5px);
    background-size:24px 24px; pointer-events:none;
  }
  .ca-hero-inner { position:relative; z-index:1; max-width:1200px; margin:0 auto; }
  .ca-breadcrumb {
    display:flex; align-items:center; gap:6px;
    font-size:12px; font-weight:500; color:rgba(255,255,255,0.40); margin-bottom:18px;
  }
  .ca-bc-active { color:var(--g-vivid); font-weight:600; }
  .ca-hero-content {
    display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap;
  }
  .ca-hero-title {
    font-family:'Cormorant Garamond',serif;
    font-size:clamp(34px,5vw,56px); font-weight:700; color:white;
    margin:0 0 8px; line-height:1.05; letter-spacing:-0.5px;
  }
  .ca-hero-title em { font-style:normal; color:var(--g-vivid); }
  .ca-hero-sub { font-size:14px; font-weight:300; color:rgba(255,255,255,0.50); margin:0; }
  .ca-clear-btn {
    display:inline-flex; align-items:center; gap:7px;
    font-family:'Outfit',sans-serif; font-size:13px; font-weight:500;
    color:rgba(255,255,255,0.55); background:rgba(255,255,255,0.08);
    border:1px solid rgba(255,255,255,0.14); border-radius:10px;
    padding:10px 16px; cursor:pointer; transition:var(--t);
  }
  .ca-clear-btn:hover { background:rgba(229,62,62,0.18); border-color:rgba(229,62,62,0.35); color:#fc8181; }

  /* MAIN */
  .ca-main { max-width:1200px; margin:0 auto; padding:32px 40px 80px; }
  .ca-grid { display:grid; grid-template-columns:1.4fr 1fr; gap:28px; align-items:start; }

  /* CARD BASE */
  .ca-card, .ca-summary-card {
    background:white; border-radius:24px; border:1.5px solid var(--border);
    padding:28px 28px 30px; box-shadow:0 4px 24px rgba(13,43,31,0.06);
  }
  .ca-sticky { position:sticky; top:20px; }
  .ca-card-header {
    display:flex; align-items:flex-start; gap:14px;
    margin-bottom:24px; padding-bottom:20px; border-bottom:1px solid var(--border);
  }
  .ca-card-icon {
    width:42px; height:42px; border-radius:12px;
    background:var(--g-soft); border:1px solid var(--border);
    display:flex; align-items:center; justify-content:center;
    color:var(--g-main); flex-shrink:0;
  }
  .ca-card-title {
    font-family:'Cormorant Garamond',serif;
    font-size:22px; font-weight:700; color:var(--g-deep); margin:0 0 2px;
  }
  .ca-card-sub { font-size:12px; font-weight:300; color:var(--muted); margin:0; }

  /* ITEMS LIST */
  .ca-items-list { display:flex; flex-direction:column; gap:0; }
  .ca-item {
    display:flex; align-items:center; gap:16px;
    padding:16px 0; border-bottom:1px solid var(--border);
    transition:var(--t); animation:fadeUp 0.4s ease both;
  }
  .ca-item:last-child { border-bottom:none; }
  .ca-item:hover { background:rgba(240,250,244,0.4); margin:0 -12px; padding:16px 12px; border-radius:12px; border-bottom-color:transparent; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:translateY(0);} }

  .ca-item-img {
    width:72px; height:72px; border-radius:14px; overflow:hidden;
    flex-shrink:0; border:1px solid var(--border);
  }
  .ca-item-img img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s; }
  .ca-item:hover .ca-item-img img { transform:scale(1.06); }

  .ca-item-info { flex:1; min-width:0; }
  .ca-item-cat {
    font-size:10px; font-weight:600; letter-spacing:0.10em;
    text-transform:uppercase; color:var(--g-main); margin-bottom:4px;
    display:flex; align-items:center; gap:4px;
  }
  .ca-item-cat::before { content:''; width:5px; height:5px; background:var(--g-vivid); border-radius:50%; display:inline-block; }
  .ca-item-name {
    font-size:15px; font-weight:600; color:var(--charcoal);
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:3px;
  }
  .ca-item-price-unit { font-size:12px; font-weight:400; color:var(--muted); }

  .ca-item-right {
    display:flex; align-items:center; gap:14px; flex-shrink:0;
  }

  .ca-qty-ctrl {
    display:flex; align-items:center; gap:0;
    background:var(--cream); border:1.5px solid var(--border);
    border-radius:12px; overflow:hidden;
  }
  .ca-qty-btn {
    width:34px; height:34px; border:none; background:transparent;
    cursor:pointer; display:flex; align-items:center; justify-content:center;
    color:var(--g-main); transition:var(--t);
  }
  .ca-qty-btn:hover { background:var(--g-soft); }
  .ca-qty-val {
    width:32px; text-align:center; font-size:14px; font-weight:600;
    color:var(--charcoal); border-left:1px solid var(--border); border-right:1px solid var(--border);
    line-height:34px;
  }

  .ca-item-subtotal {
    font-family:'Cormorant Garamond',serif;
    font-size:22px; font-weight:700; color:var(--g-rich);
    min-width:72px; text-align:right;
  }

  .ca-remove-btn {
    width:30px; height:30px; border-radius:8px; border:none;
    background:rgba(229,62,62,0.07); color:#e53e3e;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; transition:var(--t); flex-shrink:0;
  }
  .ca-remove-btn:hover { background:rgba(229,62,62,0.15); transform:scale(1.10); }

  .ca-continue {
    margin-top:20px; padding-top:18px; border-top:1px solid var(--border);
  }
  .ca-continue-link {
    display:inline-flex; align-items:center; gap:7px;
    font-size:13px; font-weight:500; color:var(--g-main); text-decoration:none;
    transition:var(--t);
  }
  .ca-continue-link:hover { color:var(--g-rich); gap:10px; }

  /* SUMMARY */
  .ca-mini-items {
    display:flex; flex-direction:column; gap:8px;
    margin-bottom:20px; max-height:160px; overflow-y:auto;
  }
  .ca-mini-item {
    display:flex; justify-content:space-between; align-items:center;
    font-size:13px; color:var(--muted);
  }
  .ca-mini-name { font-weight:400; }
  .ca-mini-qty { font-size:11px; color:var(--muted); margin-left:4px; }
  .ca-mini-price { font-weight:600; color:var(--charcoal); flex-shrink:0; }

  .ca-totals {
    border-top:1px solid var(--border); padding-top:16px;
    display:flex; flex-direction:column; gap:10px; margin-bottom:16px;
  }
  .ca-total-row {
    display:flex; justify-content:space-between;
    font-size:14px; color:var(--muted); font-weight:400;
  }
  .ca-free { color:var(--g-main); font-weight:600; }
  .ca-total-final {
    display:flex; justify-content:space-between; align-items:baseline;
    font-family:'Cormorant Garamond',serif;
    font-size:24px; font-weight:700; color:var(--g-deep);
    border-top:1px solid var(--border); padding-top:14px; margin-top:4px;
  }
  .ca-total-final span:last-child { color:var(--g-main); }

  .ca-savings {
    display:flex; align-items:center; gap:8px;
    background:var(--g-soft); border:1px solid rgba(82,183,136,0.20);
    border-radius:12px; padding:11px 14px;
    font-size:12px; font-weight:500; color:var(--g-main); margin-bottom:18px;
  }

  .ca-checkout-btn {
    width:100%; padding:15px;
    background:linear-gradient(135deg,var(--g-main),var(--g-deep));
    color:white; border:none; border-radius:14px;
    font-family:'Outfit',sans-serif; font-size:15px; font-weight:600;
    cursor:pointer; transition:var(--t);
    display:flex; align-items:center; justify-content:center; gap:10px;
    box-shadow:0 4px 16px rgba(45,106,79,0.28); margin-bottom:14px;
  }
  .ca-checkout-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(45,106,79,0.38); }

  .ca-payment {
    display:flex; align-items:center; gap:12px;
    background:var(--g-soft); border:1px solid var(--border);
    border-radius:12px; padding:14px 16px; margin-bottom:14px;
  }
  .ca-payment-icon { font-size:22px; }
  .ca-payment-title {
    font-size:13px; font-weight:600; color:var(--g-rich); display:block; margin-bottom:2px;
  }
  .ca-payment-sub { font-size:11px; font-weight:300; color:var(--muted); }

  .ca-trust { display:flex; gap:6px; flex-wrap:wrap; }
  .ca-trust-badge {
    font-size:11px; font-weight:500; color:var(--muted);
    background:white; border:1px solid var(--border);
    border-radius:20px; padding:4px 10px;
  }

  @media (max-width:1024px) {
    .ca-grid { grid-template-columns:1fr; }
    .ca-sticky { position:static; }
  }
  @media (max-width:768px) {
    .ca-hero { padding:36px 20px 40px; }
    .ca-main { padding:24px 20px 60px; }
    .ca-card, .ca-summary-card { padding:20px 18px; }
    .ca-item { flex-wrap:wrap; }
    .ca-item-right { width:100%; justify-content:space-between; margin-top:4px; }
  }
`;