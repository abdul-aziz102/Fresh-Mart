'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    pendingOrders: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;
    if (!user) { router.push('/adminlogin'); return; }
    if (user.role !== 'admin') { router.push('/adminlogin'); return; }
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, productsRes] = await Promise.all([
        api.get('/orders'),
        api.get('/products'),
      ]);
      const orders = ordersRes.data;
      const products = productsRes.data;
      setStats({
        totalOrders: orders.length,
        totalProducts: products.length,
        pendingOrders: orders.filter((o) => o.status === 'Pending').length,
        recentOrders: orders.slice(0, 5),
      });
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
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

        /* ── HERO ── */
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
        .ad-hero-right {
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }
        .ad-hero-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 600;
          padding: 10px 20px; border-radius: 10px; cursor: pointer;
          text-decoration: none; transition: var(--t); border: none;
        }
        .ad-btn-products {
          background: linear-gradient(135deg, var(--g-vivid), var(--g-main));
          color: white; box-shadow: 0 4px 14px rgba(82,183,136,0.30);
        }
        .ad-btn-products:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(82,183,136,0.40); }
        .ad-btn-orders {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.20) !important;
          color: rgba(255,255,255,0.80);
        }
        .ad-btn-orders:hover { background: rgba(255,255,255,0.18); }

        /* ── MAIN ── */
        .ad-main {
          max-width: 1300px; margin: 0 auto;
          padding: 32px 40px 80px;
        }

        /* ── STATS ── */
        .ad-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-bottom: 28px; }
        .ad-stat-card {
          border-radius: 22px; padding: 28px 24px;
          position: relative; overflow: hidden;
          transition: var(--t);
          box-shadow: 0 8px 28px rgba(0,0,0,0.18);
        }
        .ad-stat-card:hover { transform: translateY(-5px); box-shadow: 0 18px 44px rgba(0,0,0,0.26); }
        .ad-stat-decor {
          position: absolute; top: -16px; right: -16px;
          width: 80px; height: 80px; border-radius: 50%;
          background: rgba(255,255,255,0.06); pointer-events: none;
        }
        .ad-stat-decor2 {
          position: absolute; bottom: -24px; left: -16px;
          width: 100px; height: 100px; border-radius: 50%;
          background: rgba(255,255,255,0.04); pointer-events: none;
        }
        .ad-stat-icon {
          width: 46px; height: 46px; border-radius: 13px;
          background: rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px; color: white;
        }
        .ad-stat-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,255,255,0.55);
          display: block; margin-bottom: 8px;
        }
        .ad-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px; font-weight: 700; color: white;
          line-height: 1; display: block;
        }
        .ad-stat-trend {
          font-size: 12px; font-weight: 500; margin-top: 8px; display: block;
          color: rgba(255,255,255,0.45);
        }

        /* ── QUICK ACTIONS ── */
        .ad-actions { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; margin-bottom: 28px; }
        .ad-action-card {
          border-radius: 22px; padding: 28px 28px 24px;
          position: relative; overflow: hidden;
          text-decoration: none; display: block;
          transition: var(--t);
          box-shadow: 0 8px 28px rgba(0,0,0,0.14);
        }
        .ad-action-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(0,0,0,0.22); }
        .ad-action-decor {
          position: absolute; top: -20px; right: -20px;
          width: 110px; height: 110px; border-radius: 50%;
          background: rgba(255,255,255,0.06); pointer-events: none;
        }
        .ad-action-tag {
          font-size: 10px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 4px 10px;
          border-radius: 20px; display: inline-block; margin-bottom: 14px;
        }
        .ad-action-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 700; color: white;
          margin: 0 0 8px; line-height: 1.1;
        }
        .ad-action-sub {
          font-size: 13px; font-weight: 300;
          color: rgba(255,255,255,0.55); margin: 0 0 20px;
        }
        .ad-action-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; transition: gap 0.2s;
        }
        .ad-action-card:hover .ad-action-link { gap: 10px; }

        /* ── RECENT ORDERS ── */
        .ad-orders-card {
          background: white; border-radius: 24px;
          border: 1.5px solid var(--border);
          box-shadow: 0 4px 24px rgba(13,43,31,0.06);
          overflow: hidden;
        }
        .ad-orders-header {
          padding: 24px 28px 20px;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .ad-orders-header-left { display: flex; align-items: flex-start; gap: 14px; }
        .ad-orders-icon {
          width: 42px; height: 42px; border-radius: 12px;
          background: var(--g-soft); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--g-main); flex-shrink: 0;
        }
        .ad-orders-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700; color: var(--g-deep); margin: 0 0 2px;
        }
        .ad-orders-sub { font-size: 12px; font-weight: 300; color: var(--muted); margin: 0; }
        .ad-view-all {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 600; color: var(--g-main);
          text-decoration: none; transition: var(--t);
          background: var(--g-soft); border: 1px solid var(--border);
          border-radius: 8px; padding: 7px 14px;
        }
        .ad-view-all:hover { background: var(--g-pale); }

        .ad-empty {
          padding: 56px 20px; text-align: center; color: var(--muted);
        }
        .ad-empty-icon { font-size: 48px; opacity: 0.4; display: block; margin-bottom: 14px; }
        .ad-empty-text { font-size: 15px; }

        .ad-order-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 28px; border-bottom: 1px solid var(--border);
          gap: 16px; flex-wrap: wrap; transition: var(--t);
        }
        .ad-order-row:last-child { border-bottom: none; }
        .ad-order-row:hover { background: var(--g-soft); }

        .ad-order-id {
          font-size: 13px; font-weight: 700; color: var(--charcoal);
          display: block; margin-bottom: 3px;
          font-family: 'Outfit', monospace;
        }
        .ad-order-meta { font-size: 12px; color: var(--muted); font-weight: 400; }
        .ad-order-meta strong { color: var(--g-rich); font-weight: 600; }

        .ad-order-amount {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700; color: var(--g-rich);
          white-space: nowrap;
        }

        .ad-status-badge {
          font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; padding: 5px 12px;
          border-radius: 20px; white-space: nowrap;
        }

        /* ── LOADING ── */
        .ad-loading {
          min-height: 100vh; background: var(--cream);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Outfit', sans-serif;
        }
        .ad-loading-inner { text-align: center; }
        .ad-loading-spinner {
          width: 40px; height: 40px;
          border: 3px solid var(--g-pale);
          border-top-color: var(--g-main);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 16px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ad-loading-text {
          font-size: 15px; font-weight: 400; color: var(--muted);
        }

        @media (max-width: 1024px) {
          .ad-stats { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .ad-hero { padding: 36px 20px 40px; }
          .ad-main { padding: 24px 20px 60px; }
          .ad-stats { grid-template-columns: 1fr; }
          .ad-actions { grid-template-columns: 1fr; }
          .ad-hero-inner { flex-direction: column; align-items: flex-start; }
          .ad-order-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="ad-page">

        {/* ── HERO ── */}
        <div className="ad-hero">
          <div className="ad-hero-dots" />
          <div className="ad-hero-glow" />
          <div className="ad-hero-inner">
            <div>
              <div className="ad-hero-tag">
                <span className="ad-tag-dash" /> Admin Portal <span className="ad-tag-dash" />
              </div>
              <h1 className="ad-hero-title">
                <em>Admin</em> Dashboard
              </h1>
              <p className="ad-hero-sub">Welcome back, {user.name} — here's what's happening today.</p>
            </div>
            <div className="ad-hero-right">
              <Link href="/admin/products" className="ad-hero-btn ad-btn-products">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add Product
              </Link>
              <Link href="/admin/orders" className="ad-hero-btn ad-btn-orders">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
                View Orders
              </Link>
            </div>
          </div>
        </div>

        <div className="ad-main">

          {loading ? (
            <div style={{textAlign:'center', padding:'60px 0'}}>
              <div className="ad-loading-spinner" style={{margin:'0 auto 16px'}} />
              <p className="ad-loading-text">Loading dashboard data...</p>
            </div>
          ) : (
            <>
              {/* ── STATS ── */}
              <div className="ad-stats">
                {[
                  {
                    label: 'Total Orders',
                    num: stats.totalOrders,
                    trend: 'All time orders',
                    bg: 'linear-gradient(145deg, #0d2b1f, #1a4731)',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'Total Products',
                    num: stats.totalProducts,
                    trend: 'In your catalog',
                    bg: 'linear-gradient(145deg, #0f2744, #1a3a5c)',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'Pending Orders',
                    num: stats.pendingOrders,
                    trend: 'Awaiting confirmation',
                    bg: 'linear-gradient(145deg, #3d2000, #6b3a0f)',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    ),
                  },
                ].map((s, i) => (
                  <div key={i} className="ad-stat-card" style={{background: s.bg}}>
                    <div className="ad-stat-decor" />
                    <div className="ad-stat-decor2" />
                    <div className="ad-stat-icon">{s.icon}</div>
                    <span className="ad-stat-label">{s.label}</span>
                    <span className="ad-stat-num">{s.num}</span>
                    <span className="ad-stat-trend">{s.trend}</span>
                  </div>
                ))}
              </div>

              {/* ── QUICK ACTIONS ── */}
              <div className="ad-actions">
                <Link href="/admin/products" className="ad-action-card" style={{background:'linear-gradient(145deg, #0d2b1f, #1a4731)'}}>
                  <div className="ad-action-decor" />
                  <span className="ad-action-tag" style={{background:'rgba(82,183,136,0.18)', color:'#52b788'}}>Products</span>
                  <div className="ad-action-title">Manage<br />Products</div>
                  <p className="ad-action-sub">Add, edit, or remove products from your store catalog.</p>
                  <span className="ad-action-link" style={{color:'#52b788'}}>
                    Open Manager
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </Link>

                <Link href="/admin/orders" className="ad-action-card" style={{background:'linear-gradient(145deg, #0f2744, #1a3a5c)'}}>
                  <div className="ad-action-decor" />
                  <span className="ad-action-tag" style={{background:'rgba(144,205,244,0.15)', color:'#90cdf4'}}>Orders</span>
                  <div className="ad-action-title">Manage<br />Orders</div>
                  <p className="ad-action-sub">View all customer orders and update their delivery status.</p>
                  <span className="ad-action-link" style={{color:'#90cdf4'}}>
                    Open Orders
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </Link>
              </div>

              {/* ── RECENT ORDERS ── */}
              <div className="ad-orders-card">
                <div className="ad-orders-header">
                  <div className="ad-orders-header-left">
                    <div className="ad-orders-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                        <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="ad-orders-title">Recent Orders</h2>
                      <p className="ad-orders-sub">Last {stats.recentOrders.length} orders placed</p>
                    </div>
                  </div>
                  <Link href="/admin/orders" className="ad-view-all">
                    View All
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>

                {stats.recentOrders.length === 0 ? (
                  <div className="ad-empty">
                    <span className="ad-empty-icon">📦</span>
                    <p className="ad-empty-text">No orders yet — they'll show up here.</p>
                  </div>
                ) : (
                  stats.recentOrders.map((order) => {
                    const sc = statusColors[order.status] || { bg: 'rgba(107,114,128,0.10)', color: '#6b7280' };
                    return (
                      <div key={order._id} className="ad-order-row">
                        <div>
                          <span className="ad-order-id">#{order._id.slice(-8).toUpperCase()}</span>
                          <span className="ad-order-meta">
                            <strong>{order.user?.name || 'Customer'}</strong> &nbsp;·&nbsp; {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div style={{display:'flex', alignItems:'center', gap:16, flexWrap:'wrap'}}>
                          <span className="ad-order-amount">${order.totalAmount.toFixed(2)}</span>
                          <span
                            className="ad-status-badge"
                            style={{ background: sc.bg, color: sc.color }}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}