'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;
    if (!user) { router.push('/adminlogin'); return; }
    if (user.role !== 'admin') { router.push('/adminlogin'); return; }
    fetchCustomers();
  }, [user]);

  const fetchCustomers = async (q) => {
    try {
      const params = q ? { search: q } : {};
      const res = await api.get('/auth/customers', { params });
      setCustomers(res.data);
    } catch (err) {
      console.error('Failed to load customers', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchCustomers(search);
  };

  const viewCustomer = async (id) => {
    setDetailLoading(true);
    try {
      const res = await api.get(`/auth/customers/${id}`);
      setSelected(res.data);
    } catch (err) {
      console.error('Failed to load customer', err);
    } finally {
      setDetailLoading(false);
    }
  };

  if (user === undefined || (!user && loading)) return null;
  if (!user || user.role !== 'admin') return null;

  const statusColors = {
    Pending: { bg: 'rgba(217,119,6,0.12)', color: '#b45309' },
    Confirmed: { bg: 'rgba(37,99,235,0.10)', color: '#1d4ed8' },
    'Out for Delivery': { bg: 'rgba(124,58,237,0.10)', color: '#6d28d9' },
    Delivered: { bg: 'rgba(45,106,79,0.12)', color: '#1a4731' },
    Cancelled: { bg: 'rgba(220,38,38,0.10)', color: '#b91c1c' },
  };

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
          --border:  rgba(45,106,79,0.11);
          --t: all 0.28s cubic-bezier(0.4,0,0.2,1);
        }

        .ad-page {
          font-family: 'Outfit', sans-serif;
          background: var(--cream);
          min-height: 100vh;
        }

        .ad-hero {
          background: linear-gradient(140deg, var(--g-deep), #1a3a2a 55%, #0f2d1f);
          padding: 44px 40px 52px;
          position: relative; overflow: hidden;
        }
        .ad-hero-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(82,183,136,0.07) 1.5px, transparent 1.5px);
          background-size: 24px 24px; pointer-events: none;
        }
        .ad-hero-glow {
          position: absolute; width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(82,183,136,0.08), transparent 70%);
          top: -150px; right: -100px; pointer-events: none;
        }
        .ad-hero-inner {
          position: relative; z-index: 1;
          max-width: 1300px; margin: 0 auto;
          display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 20px;
        }
        .ad-hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--g-vivid); margin-bottom: 14px;
        }
        .ad-tag-dash { width: 20px; height: 1.5px; background: var(--g-vivid); border-radius: 2px; }
        .ad-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 4.5vw, 54px); font-weight: 700;
          color: white; margin: 0 0 6px; line-height: 1.05; letter-spacing: -0.5px;
        }
        .ad-hero-title em { font-style: normal; color: var(--g-vivid); }
        .ad-hero-sub { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.45); margin: 0; }
        .ad-hero-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 600;
          padding: 10px 20px; border-radius: 10px; cursor: pointer;
          text-decoration: none; transition: var(--t); border: none;
        }
        .ad-btn-back {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.20) !important;
          color: rgba(255,255,255,0.80);
        }
        .ad-btn-back:hover { background: rgba(255,255,255,0.18); }

        .ad-main {
          max-width: 1300px; margin: 0 auto;
          padding: 32px 40px 80px;
        }

        /* Search bar */
        .ad-search-bar {
          display: flex; gap: 10px; margin-bottom: 24px;
        }
        .ad-search-input {
          flex: 1; padding: 12px 18px; border-radius: 12px;
          border: 1.5px solid var(--border); background: white;
          font-family: 'Outfit', sans-serif; font-size: 14px;
          outline: none; transition: var(--t);
        }
        .ad-search-input:focus { border-color: var(--g-vivid); box-shadow: 0 0 0 3px rgba(82,183,136,0.12); }
        .ad-search-btn {
          padding: 12px 24px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, var(--g-vivid), var(--g-main));
          color: white; font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 600; cursor: pointer;
          transition: var(--t);
        }
        .ad-search-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(82,183,136,0.3); }

        /* Customer table card */
        .ad-card {
          background: white; border-radius: 24px;
          border: 1.5px solid var(--border);
          box-shadow: 0 4px 24px rgba(13,43,31,0.06);
          overflow: hidden;
        }
        .ad-card-header {
          padding: 24px 28px 20px;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; gap: 14px;
        }
        .ad-card-icon {
          width: 42px; height: 42px; border-radius: 12px;
          background: var(--g-soft); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--g-main); flex-shrink: 0;
        }
        .ad-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700; color: var(--g-deep); margin: 0 0 2px;
        }
        .ad-card-sub { font-size: 12px; font-weight: 300; color: var(--muted); margin: 0; }

        /* Table rows */
        .ad-cust-row {
          display: grid; grid-template-columns: 2fr 2fr 1fr 1fr 1fr auto;
          align-items: center; padding: 16px 28px;
          border-bottom: 1px solid var(--border); gap: 12px;
          transition: var(--t); cursor: pointer;
        }
        .ad-cust-row:last-child { border-bottom: none; }
        .ad-cust-row:hover { background: var(--g-soft); }

        .ad-cust-name { font-size: 14px; font-weight: 600; color: var(--charcoal); }
        .ad-cust-email { font-size: 13px; color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ad-cust-phone { font-size: 13px; color: var(--charcoal); }
        .ad-cust-orders {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700; color: var(--g-rich);
          text-align: center;
        }
        .ad-cust-spent {
          font-size: 14px; font-weight: 600; color: var(--g-main);
        }
        .ad-cust-view {
          font-size: 12px; font-weight: 600; color: var(--g-main);
          background: var(--g-soft); border: 1px solid var(--border);
          border-radius: 8px; padding: 6px 14px;
          cursor: pointer; transition: var(--t);
          white-space: nowrap;
        }
        .ad-cust-view:hover { background: var(--g-pale); }

        .ad-cust-head {
          display: grid; grid-template-columns: 2fr 2fr 1fr 1fr 1fr auto;
          padding: 12px 28px; gap: 12px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--muted);
          border-bottom: 1px solid var(--border); background: var(--g-soft);
        }

        /* Detail modal/panel */
        .ad-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .ad-detail {
          background: white; border-radius: 24px;
          max-width: 700px; width: 100%; max-height: 85vh;
          overflow-y: auto; position: relative;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        .ad-detail-header {
          padding: 28px 28px 20px;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: flex-start; justify-content: space-between;
        }
        .ad-detail-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 700; color: var(--g-deep); margin: 0 0 4px;
        }
        .ad-detail-meta { font-size: 13px; color: var(--muted); }
        .ad-detail-meta strong { color: var(--charcoal); font-weight: 600; }
        .ad-detail-close {
          width: 36px; height: 36px; border-radius: 10px;
          border: 1px solid var(--border); background: var(--g-soft);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: var(--t); color: var(--muted);
          flex-shrink: 0;
        }
        .ad-detail-close:hover { background: var(--g-pale); color: var(--charcoal); }

        .ad-detail-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
          padding: 20px 28px;
        }
        .ad-detail-stat {
          text-align: center; padding: 16px;
          background: var(--g-soft); border-radius: 14px;
          border: 1px solid var(--border);
        }
        .ad-detail-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 700; color: var(--g-rich);
          display: block;
        }
        .ad-detail-stat-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--muted);
        }

        .ad-detail-section {
          padding: 20px 28px;
          border-top: 1px solid var(--border);
        }
        .ad-detail-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 700; color: var(--g-deep);
          margin: 0 0 14px;
        }

        .ad-detail-order {
          padding: 14px 16px; border-radius: 12px;
          border: 1px solid var(--border); margin-bottom: 10px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 10px;
        }
        .ad-detail-order-id {
          font-size: 13px; font-weight: 700; color: var(--charcoal);
          font-family: 'Outfit', monospace;
        }
        .ad-detail-order-date { font-size: 12px; color: var(--muted); }
        .ad-detail-order-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 700; color: var(--g-rich);
        }
        .ad-status-badge {
          font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; padding: 5px 12px;
          border-radius: 20px; white-space: nowrap;
        }

        .ad-empty {
          padding: 56px 20px; text-align: center; color: var(--muted);
        }
        .ad-empty-icon { font-size: 48px; opacity: 0.4; display: block; margin-bottom: 14px; }
        .ad-empty-text { font-size: 15px; }

        .ad-loading-spinner {
          width: 40px; height: 40px;
          border: 3px solid var(--g-pale);
          border-top-color: var(--g-main);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 16px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 1024px) {
          .ad-cust-row, .ad-cust-head { grid-template-columns: 2fr 2fr 1fr auto; }
          .ad-cust-row > :nth-child(3), .ad-cust-head > :nth-child(3),
          .ad-cust-row > :nth-child(5), .ad-cust-head > :nth-child(5) { display: none; }
        }
        @media (max-width: 768px) {
          .ad-hero { padding: 36px 20px 40px; }
          .ad-main { padding: 24px 20px 60px; }
          .ad-hero-inner { flex-direction: column; align-items: flex-start; }
          .ad-cust-row, .ad-cust-head { grid-template-columns: 1fr auto; }
          .ad-cust-row > :nth-child(2), .ad-cust-head > :nth-child(2),
          .ad-cust-row > :nth-child(3), .ad-cust-head > :nth-child(3),
          .ad-cust-row > :nth-child(4), .ad-cust-head > :nth-child(4),
          .ad-cust-row > :nth-child(5), .ad-cust-head > :nth-child(5) { display: none; }
          .ad-detail-stats { grid-template-columns: 1fr; }
          .ad-detail { max-height: 90vh; }
        }
      `}</style>

      <div className="ad-page">
        <div className="ad-hero">
          <div className="ad-hero-dots" />
          <div className="ad-hero-glow" />
          <div className="ad-hero-inner">
            <div>
              <div className="ad-hero-tag">
                <span className="ad-tag-dash" /> Customers <span className="ad-tag-dash" />
              </div>
              <h1 className="ad-hero-title">
                Customer <em>Management</em>
              </h1>
              <p className="ad-hero-sub">{customers.length} registered customer{customers.length !== 1 ? 's' : ''}</p>
            </div>
            <div>
              <Link href="/admin/dashboard" className="ad-hero-btn ad-btn-back">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="ad-main">
          {/* Search */}
          <form className="ad-search-bar" onSubmit={handleSearch}>
            <input
              className="ad-search-input"
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="ad-search-btn" type="submit">Search</button>
          </form>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div className="ad-loading-spinner" />
              <p style={{ fontSize: 15, color: 'var(--muted)' }}>Loading customers...</p>
            </div>
          ) : (
            <div className="ad-card">
              <div className="ad-card-header">
                <div className="ad-card-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <div>
                  <h2 className="ad-card-title">All Customers</h2>
                  <p className="ad-card-sub">{customers.length} customer{customers.length !== 1 ? 's' : ''} found</p>
                </div>
              </div>

              {customers.length === 0 ? (
                <div className="ad-empty">
                  <span className="ad-empty-icon">👤</span>
                  <p className="ad-empty-text">No customers found.</p>
                </div>
              ) : (
                <>
                  <div className="ad-cust-head">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Phone</span>
                    <span style={{ textAlign: 'center' }}>Orders</span>
                    <span>Total Spent</span>
                    <span></span>
                  </div>
                  {customers.map((c) => (
                    <div key={c._id} className="ad-cust-row" onClick={() => viewCustomer(c._id)}>
                      <span className="ad-cust-name">{c.name}</span>
                      <span className="ad-cust-email">{c.email}</span>
                      <span className="ad-cust-phone">{c.phone}</span>
                      <span className="ad-cust-orders">{c.orderCount}</span>
                      <span className="ad-cust-spent">${c.totalSpent.toFixed(2)}</span>
                      <button className="ad-cust-view" onClick={(e) => { e.stopPropagation(); viewCustomer(c._id); }}>
                        View
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {(selected || detailLoading) && (
          <div className="ad-overlay" onClick={() => { if (!detailLoading) setSelected(null); }}>
            <div className="ad-detail" onClick={(e) => e.stopPropagation()}>
              {detailLoading ? (
                <div style={{ padding: '60px 0', textAlign: 'center' }}>
                  <div className="ad-loading-spinner" />
                  <p style={{ fontSize: 15, color: 'var(--muted)' }}>Loading customer...</p>
                </div>
              ) : selected && (
                <>
                  <div className="ad-detail-header">
                    <div>
                      <h2 className="ad-detail-name">{selected.name}</h2>
                      <div className="ad-detail-meta">
                        <strong>{selected.email}</strong> &nbsp;·&nbsp; {selected.phone}
                      </div>
                      {selected.address && (selected.address.street || selected.address.city) && (
                        <div className="ad-detail-meta" style={{ marginTop: 4 }}>
                          {[selected.address.street, selected.address.city, selected.address.state, selected.address.zipCode].filter(Boolean).join(', ')}
                        </div>
                      )}
                      <div className="ad-detail-meta" style={{ marginTop: 4 }}>
                        Joined {new Date(selected.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    <button className="ad-detail-close" onClick={() => setSelected(null)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>

                  <div className="ad-detail-stats">
                    <div className="ad-detail-stat">
                      <span className="ad-detail-stat-num">{selected.orderCount}</span>
                      <span className="ad-detail-stat-label">Orders</span>
                    </div>
                    <div className="ad-detail-stat">
                      <span className="ad-detail-stat-num">${selected.totalSpent.toFixed(2)}</span>
                      <span className="ad-detail-stat-label">Total Spent</span>
                    </div>
                    <div className="ad-detail-stat">
                      <span className="ad-detail-stat-num">
                        ${selected.orderCount > 0 ? (selected.totalSpent / selected.orderCount).toFixed(2) : '0.00'}
                      </span>
                      <span className="ad-detail-stat-label">Avg Order</span>
                    </div>
                  </div>

                  <div className="ad-detail-section">
                    <h3 className="ad-detail-section-title">Order History</h3>
                    {selected.orders && selected.orders.length > 0 ? (
                      selected.orders.map((order) => {
                        const sc = statusColors[order.status] || { bg: 'rgba(107,114,128,0.10)', color: '#6b7280' };
                        return (
                          <div key={order._id} className="ad-detail-order">
                            <div>
                              <div className="ad-detail-order-id">#{order._id.slice(-8).toUpperCase()}</div>
                              <div className="ad-detail-order-date">
                                {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                &nbsp;·&nbsp;{order.items.length} item{order.items.length !== 1 ? 's' : ''}
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                              <span className="ad-detail-order-amount">${order.totalAmount.toFixed(2)}</span>
                              <span className="ad-status-badge" style={{ background: sc.bg, color: sc.color }}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p style={{ color: 'var(--muted)', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>
                        No orders yet.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
