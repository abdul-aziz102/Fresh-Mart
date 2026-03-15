'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

const statusOptions = ['Pending', 'Confirmed', 'Out for Delivery', 'Delivered'];

const statusStyles = {
  Pending:           { bg: 'rgba(217,119,6,0.12)',  color: '#b45309', border: 'rgba(217,119,6,0.25)' },
  Confirmed:         { bg: 'rgba(37,99,235,0.10)',  color: '#1d4ed8', border: 'rgba(37,99,235,0.22)' },
  'Out for Delivery':{ bg: 'rgba(124,58,237,0.10)', color: '#6d28d9', border: 'rgba(124,58,237,0.22)' },
  Delivered:         { bg: 'rgba(45,106,79,0.12)',  color: '#1a4731', border: 'rgba(45,106,79,0.25)' },
  Cancelled:         { bg: 'rgba(220,38,38,0.10)',  color: '#b91c1c', border: 'rgba(220,38,38,0.22)' },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;
    if (!user) { router.push('/adminlogin'); return; }
    if (user.role !== 'admin') { router.push('/adminlogin'); return; }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingOrder(orderId);
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdatingOrder(null);
    }
  };

  if (user === undefined) return null;
  if (!user || user.role !== 'admin') return null;

  const allStatuses = ['All', ...statusOptions, 'Cancelled'];
  const filtered = filterStatus === 'All' ? orders : orders.filter(o => o.status === filterStatus);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');
        :root {
          --g-deep:#0d2b1f; --g-rich:#1a4731; --g-main:#2d6a4f;
          --g-vivid:#52b788; --g-pale:#d8f3dc; --g-soft:#f0faf4;
          --cream:#faf8f3; --charcoal:#1c1c1e; --muted:#6b7280;
          --border:rgba(45,106,79,0.11);
          --t:all 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .ao-page { font-family:'Outfit',sans-serif; background:var(--cream); min-height:100vh; }

        .ao-hero { background:linear-gradient(140deg,var(--g-deep),#1a3a2a 55%,#0f2d1f); padding:44px 40px 52px; position:relative; overflow:hidden; }
        .ao-hero-dots { position:absolute; inset:0; background-image:radial-gradient(rgba(82,183,136,0.07) 1.5px,transparent 1.5px); background-size:24px 24px; pointer-events:none; }
        .ao-hero-glow { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(82,183,136,0.08),transparent 70%); top:-150px; right:-100px; pointer-events:none; }
        .ao-hero-inner { position:relative; z-index:1; max-width:1300px; margin:0 auto; display:flex; align-items:flex-end; justify-content:space-between; flex-wrap:wrap; gap:20px; }
        .ao-hero-tag { display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--g-vivid); margin-bottom:14px; }
        .ao-tag-dash { width:20px; height:1.5px; background:var(--g-vivid); border-radius:2px; }
        .ao-hero-title { font-family:'Cormorant Garamond',serif; font-size:clamp(32px,4.5vw,54px); font-weight:700; color:white; margin:0 0 6px; line-height:1.05; letter-spacing:-0.5px; }
        .ao-hero-title em { font-style:normal; color:var(--g-vivid); }
        .ao-hero-sub { font-size:14px; font-weight:300; color:rgba(255,255,255,0.45); margin:0; }
        .ao-back-btn { display:inline-flex; align-items:center; gap:8px; font-family:'Outfit',sans-serif; font-size:13px; font-weight:600; padding:10px 20px; border-radius:10px; cursor:pointer; text-decoration:none; transition:var(--t); background:rgba(255,255,255,0.10); border:1px solid rgba(255,255,255,0.20); color:rgba(255,255,255,0.80); }
        .ao-back-btn:hover { background:rgba(255,255,255,0.18); }

        .ao-main { max-width:1300px; margin:0 auto; padding:32px 40px 80px; }

        .ao-error { display:flex; align-items:center; gap:10px; background:#fff5f5; border:1.5px solid rgba(229,62,62,0.22); border-radius:14px; padding:14px 18px; color:#c53030; font-size:13px; font-weight:500; margin-bottom:24px; }

        .ao-filters { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:28px; }
        .ao-filter-btn { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; border-radius:50px; font-size:13px; font-weight:500; cursor:pointer; border:1.5px solid rgba(0,0,0,0.07); transition:var(--t); background:white; color:var(--muted); font-family:'Outfit',sans-serif; }
        .ao-filter-btn:hover { background:var(--g-soft); border-color:var(--g-vivid); color:var(--g-rich); }
        .ao-filter-btn.active { background:linear-gradient(135deg,var(--g-main),var(--g-deep)); color:white; border-color:transparent; box-shadow:0 4px 14px rgba(45,106,79,0.28); }
        .ao-filter-count { width:18px; height:18px; border-radius:50%; background:rgba(45,106,79,0.10); color:var(--g-main); font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; }
        .ao-filter-btn.active .ao-filter-count { background:rgba(255,255,255,0.22); color:white; }

        .ao-results { font-size:13px; color:var(--muted); margin-bottom:20px; }
        .ao-results strong { color:var(--g-rich); font-weight:600; }

        .ao-orders-list { display:flex; flex-direction:column; gap:18px; }
        .ao-order-card { background:white; border-radius:22px; border:1.5px solid var(--border); box-shadow:0 4px 20px rgba(13,43,31,0.06); overflow:hidden; transition:var(--t); }
        .ao-order-card:hover { transform:translateY(-3px); box-shadow:0 14px 40px rgba(13,43,31,0.11); border-color:rgba(82,183,136,0.25); }

        .ao-card-top { display:flex; align-items:center; justify-content:space-between; padding:14px 24px; border-bottom:1px solid var(--border); background:var(--g-soft); flex-wrap:wrap; gap:10px; }
        .ao-order-id { font-family:'Outfit',monospace; font-size:13px; font-weight:700; color:var(--charcoal); display:flex; align-items:center; gap:8px; }
        .ao-order-id-label { font-size:10px; font-weight:600; letter-spacing:0.10em; text-transform:uppercase; color:var(--muted); }
        .ao-card-top-right { display:flex; align-items:center; gap:12px; }
        .ao-order-date { font-size:12px; color:var(--muted); }
        .ao-status-badge { font-size:11px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; padding:5px 12px; border-radius:20px; border:1px solid; white-space:nowrap; }

        .ao-card-body { padding:20px 24px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px; }
        .ao-info-label { font-size:10px; font-weight:600; letter-spacing:0.10em; text-transform:uppercase; color:var(--muted); display:block; margin-bottom:5px; }
        .ao-info-name { font-size:14px; font-weight:600; color:var(--charcoal); display:block; margin-bottom:2px; }
        .ao-info-email { font-size:12px; color:var(--muted); }
        .ao-info-address { font-size:13px; color:var(--charcoal); line-height:1.55; }
        .ao-info-phone { font-size:12px; color:var(--muted); margin-top:4px; display:block; }
        .ao-amount { font-family:'Cormorant Garamond',serif; font-size:32px; font-weight:700; color:var(--g-rich); display:block; line-height:1; }
        .ao-amount-label { font-size:11px; color:var(--muted); margin-top:4px; display:block; }

        .ao-items-section { padding:0 24px 18px; border-top:1px solid var(--border); }
        .ao-items-label { font-size:10px; font-weight:600; letter-spacing:0.10em; text-transform:uppercase; color:var(--muted); display:block; margin:14px 0 10px; }
        .ao-items-tags { display:flex; flex-wrap:wrap; gap:7px; }
        .ao-item-tag { font-size:12px; font-weight:500; color:var(--g-rich); background:var(--g-soft); border:1px solid var(--border); border-radius:8px; padding:5px 12px; }

        .ao-status-section { padding:14px 24px; border-top:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; background:rgba(250,248,243,0.5); }
        .ao-status-left { display:flex; align-items:center; gap:10px; }
        .ao-status-key { font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); }
        .ao-status-select { padding:9px 14px; border:1.5px solid var(--border); border-radius:10px; font-family:'Outfit',sans-serif; font-size:13px; font-weight:600; color:var(--charcoal); background:white; outline:none; cursor:pointer; transition:var(--t); }
        .ao-status-select:focus { border-color:var(--g-vivid); box-shadow:0 0 0 3px rgba(82,183,136,0.12); }
        .ao-updating { display:inline-flex; align-items:center; gap:7px; font-size:12px; color:var(--g-main); font-weight:500; }
        .ao-upd-spinner { width:14px; height:14px; border:2px solid var(--g-pale); border-top-color:var(--g-main); border-radius:50%; animation:spin 0.7s linear infinite; }
        @keyframes spin { to{transform:rotate(360deg);} }

        .ao-empty { background:white; border-radius:22px; border:1.5px solid var(--border); padding:72px 20px; text-align:center; }
        .ao-empty-icon { font-size:52px; opacity:0.35; display:block; margin-bottom:16px; }
        .ao-empty-title { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:700; color:var(--g-deep); margin:0 0 8px; }
        .ao-empty-sub { font-size:14px; color:var(--muted); }

        .ao-skeleton { background:white; border-radius:22px; border:1.5px solid var(--border); overflow:hidden; margin-bottom:18px; }
        .ao-skel-top { height:52px; background:linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.4s infinite; }
        .ao-skel-body { padding:20px 24px; display:flex; flex-direction:column; gap:10px; }
        .ao-skel-line { border-radius:6px; background:linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.4s infinite; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        @media (max-width:900px) { .ao-card-body { grid-template-columns:1fr 1fr; } }
        @media (max-width:640px) {
          .ao-hero { padding:36px 20px 40px; }
          .ao-main { padding:24px 20px 60px; }
          .ao-card-body { grid-template-columns:1fr; }
          .ao-hero-inner { flex-direction:column; align-items:flex-start; }
        }
      `}</style>

      <div className="ao-page">
        {/* HERO */}
        <div className="ao-hero">
          <div className="ao-hero-dots" />
          <div className="ao-hero-glow" />
          <div className="ao-hero-inner">
            <div>
              <div className="ao-hero-tag"><span className="ao-tag-dash" /> Admin Portal <span className="ao-tag-dash" /></div>
              <h1 className="ao-hero-title">Manage <em>Orders</em></h1>
              <p className="ao-hero-sub">{orders.length} total order{orders.length !== 1 ? 's' : ''} in your store</p>
            </div>
            <Link href="/admin/dashboard" className="ao-back-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="ao-main">
          {error && (
            <div className="ao-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          {loading ? (
            [1,2,3].map(i => (
              <div key={i} className="ao-skeleton">
                <div className="ao-skel-top" style={{animationDelay:`${i*0.1}s`}} />
                <div className="ao-skel-body">
                  <div className="ao-skel-line" style={{height:11,width:'30%'}} />
                  <div className="ao-skel-line" style={{height:11,width:'55%'}} />
                  <div className="ao-skel-line" style={{height:11,width:'40%'}} />
                </div>
              </div>
            ))
          ) : orders.length === 0 ? (
            <div className="ao-empty">
              <span className="ao-empty-icon">📦</span>
              <h3 className="ao-empty-title">No orders yet</h3>
              <p className="ao-empty-sub">When customers place orders, they'll appear here.</p>
            </div>
          ) : (
            <>
              {/* Filter pills */}
              <div className="ao-filters">
                {allStatuses.map(s => {
                  const count = s === 'All' ? orders.length : orders.filter(o => o.status === s).length;
                  return (
                    <button key={s} onClick={() => setFilterStatus(s)} className={`ao-filter-btn ${filterStatus === s ? 'active' : ''}`}>
                      {s} <span className="ao-filter-count">{count}</span>
                    </button>
                  );
                })}
              </div>

              <p className="ao-results">
                Showing <strong>{filtered.length}</strong> order{filtered.length !== 1 ? 's' : ''}
                {filterStatus !== 'All' && <> · <strong>{filterStatus}</strong></>}
              </p>

              <div className="ao-orders-list">
                {filtered.map((order) => {
                  const sc = statusStyles[order.status] || { bg: 'rgba(107,114,128,0.10)', color: '#6b7280', border: 'rgba(107,114,128,0.22)' };
                  const isDone = order.status === 'Cancelled' || order.status === 'Delivered';
                  return (
                    <div key={order._id} className="ao-order-card">
                      {/* Top */}
                      <div className="ao-card-top">
                        <div className="ao-order-id">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
                          <span className="ao-order-id-label">Order</span>
                          #{order._id.slice(-8).toUpperCase()}
                        </div>
                        <div className="ao-card-top-right">
                          <span className="ao-order-date">
                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="ao-status-badge" style={{background:sc.bg, color:sc.color, borderColor:sc.border}}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="ao-card-body">
                        <div>
                          <span className="ao-info-label">Customer</span>
                          <span className="ao-info-name">{order.user?.name || 'Unknown'}</span>
                          <span className="ao-info-email">{order.user?.email}</span>
                        </div>
                        <div>
                          <span className="ao-info-label">Delivery Address</span>
                          <span className="ao-info-address">
                            {order.deliveryAddress.street},<br/>
                            {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                          </span>
                          <span className="ao-info-phone">📞 {order.deliveryAddress.phone}</span>
                        </div>
                        <div>
                          <span className="ao-info-label">Total Amount</span>
                          <span className="ao-amount">${order.totalAmount.toFixed(2)}</span>
                          <span className="ao-amount-label">Cash on Delivery</span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="ao-items-section">
                        <span className="ao-items-label">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                        <div className="ao-items-tags">
                          {order.items.map((item, idx) => (
                            <span key={idx} className="ao-item-tag">
                              {item.name} <span style={{opacity:0.5}}>×{item.quantity}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Status update */}
                      <div className="ao-status-section">
                        <div className="ao-status-left">
                          <span className="ao-status-key">Update Status</span>
                          {isDone ? (
                            <span className="ao-status-badge" style={{background:sc.bg, color:sc.color, borderColor:sc.border}}>{order.status}</span>
                          ) : (
                            <select value={order.status} onChange={(e) => handleStatusUpdate(order._id, e.target.value)} disabled={updatingOrder === order._id} className="ao-status-select">
                              {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          )}
                        </div>
                        {updatingOrder === order._id && (
                          <span className="ao-updating"><span className="ao-upd-spinner" /> Updating...</span>
                        )}
                        {isDone && (
                          <span style={{fontSize:12,color:'var(--muted)'}}>
                            {order.status === 'Delivered' ? '✓ Completed' : '✕ Cancelled'}
                          </span>
                        )}
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