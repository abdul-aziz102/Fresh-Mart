'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, RadialBarChart, RadialBar
} from 'recharts';

const STATUS_COLORS = {
  Pending: '#f59e0b',
  Confirmed: '#3b82f6',
  'Out for Delivery': '#8b5cf6',
  Delivered: '#10b981',
  Cancelled: '#ef4444',
};

const CustomTooltip = ({ active, payload, label, prefix = '$' }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(13,43,31,0.95)', border: '1px solid rgba(82,183,136,0.3)',
        borderRadius: 12, padding: '10px 16px', backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      }}>
        {label && <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>}
        {payload.map((p, i) => (
          <p key={i} style={{ color: '#52b788', fontSize: 15, fontWeight: 700, margin: 0 }}>
            {prefix}{typeof p.value === 'number' ? p.value.toFixed(2) : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(13,43,31,0.95)', border: '1px solid rgba(82,183,136,0.3)',
        borderRadius: 12, padding: '10px 16px',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, margin: '0 0 4px' }}>{payload[0].name}</p>
        <p style={{ color: '#52b788', fontSize: 15, fontWeight: 700, margin: 0 }}>{payload[0].value} orders</p>
      </div>
    );
  }
  return null;
};

export default function AdminAnalytics() {
  const [stats, setStats] = useState(null);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;
    if (!user) { router.push('/adminlogin'); return; }
    if (user.role !== 'admin') { router.push('/adminlogin'); return; }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [statsRes, lowStockRes] = await Promise.all([
        api.get('/orders/stats'),
        api.get('/products/low-stock'),
      ]);
      setStats(statsRes.data);
      setLowStock(lowStockRes.data);
    } catch (err) {
      console.error('Failed to load analytics', err);
    } finally {
      setLoading(false);
    }
  };

  if (user === undefined || (!user && loading)) return null;
  if (!user || user.role !== 'admin') return null;

  const pieData = stats?.ordersByStatus?.map(s => ({
    name: s.status, value: s.count, color: STATUS_COLORS[s.status] || '#6b7280'
  })) || [];

  const areaData = stats?.dailyRevenue?.map(d => ({
    day: d.day, revenue: d.revenue
  })) || [];

  const barData = stats?.topProducts?.map(p => ({
    name: p.name.length > 14 ? p.name.slice(0, 14) + '…' : p.name,
    qty: p.quantity
  })) || [];

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

        .ad-page { font-family:'Outfit',sans-serif; background:var(--cream); min-height:100vh; }

        /* HERO */
        .ad-hero {
          background: linear-gradient(140deg, #060f0b, #0d2b1f 40%, #0a2218);
          padding: 48px 48px 56px; position:relative; overflow:hidden;
        }
        .ad-hero::before {
          content:''; position:absolute; inset:0;
          background-image: radial-gradient(rgba(82,183,136,0.06) 1.5px, transparent 1.5px);
          background-size:26px 26px; pointer-events:none;
        }
        .ad-hero-glow {
          position:absolute; width:600px; height:600px; border-radius:50%;
          background: radial-gradient(circle, rgba(82,183,136,0.10), transparent 65%);
          top:-200px; right:-100px; pointer-events:none;
        }
        .ad-hero-glow2 {
          position:absolute; width:400px; height:400px; border-radius:50%;
          background: radial-gradient(circle, rgba(52,211,153,0.06), transparent 65%);
          bottom:-150px; left:-80px; pointer-events:none;
        }
        .ad-hero-inner {
          position:relative; z-index:1; max-width:1360px; margin:0 auto;
          display:flex; align-items:flex-end; justify-content:space-between;
          flex-wrap:wrap; gap:20px;
        }
        .ad-hero-tag {
          display:inline-flex; align-items:center; gap:10px;
          font-size:10px; font-weight:700; letter-spacing:0.2em;
          text-transform:uppercase; color:var(--g-vivid); margin-bottom:16px;
        }
        .ad-tag-line { width:24px; height:1.5px; background:var(--g-vivid); border-radius:2px; }
        .ad-hero-title {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(36px,5vw,62px); font-weight:700;
          color:white; margin:0 0 8px; line-height:1.02; letter-spacing:-1px;
        }
        .ad-hero-title em { font-style:normal; color:var(--g-vivid); }
        .ad-hero-sub { font-size:14px; font-weight:300; color:rgba(255,255,255,0.40); margin:0; }
        .ad-back-btn {
          display:inline-flex; align-items:center; gap:8px;
          font-family:'Outfit',sans-serif; font-size:13px; font-weight:600;
          padding:11px 22px; border-radius:12px; cursor:pointer;
          text-decoration:none; transition:var(--t);
          background:rgba(255,255,255,0.08);
          border:1px solid rgba(255,255,255,0.16);
          color:rgba(255,255,255,0.75);
        }
        .ad-back-btn:hover { background:rgba(255,255,255,0.16); color:white; }

        /* MAIN */
        .ad-main { max-width:1360px; margin:0 auto; padding:36px 48px 80px; }

        /* STAT CARDS */
        .ad-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-bottom:28px; }
        .ad-stat {
          border-radius:24px; padding:30px 26px; position:relative; overflow:hidden;
          transition:var(--t); box-shadow:0 10px 32px rgba(0,0,0,0.22);
        }
        .ad-stat:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(0,0,0,0.30); }
        .ad-stat-ring {
          position:absolute; top:-30px; right:-30px;
          width:110px; height:110px; border-radius:50%;
          border:1.5px solid rgba(255,255,255,0.07); pointer-events:none;
        }
        .ad-stat-ring2 {
          position:absolute; top:-50px; right:-50px;
          width:160px; height:160px; border-radius:50%;
          border:1px solid rgba(255,255,255,0.04); pointer-events:none;
        }
        .ad-stat-icon {
          width:48px; height:48px; border-radius:14px;
          background:rgba(255,255,255,0.13);
          display:flex; align-items:center; justify-content:center;
          margin-bottom:20px; color:white;
        }
        .ad-stat-label {
          font-size:10px; font-weight:700; letter-spacing:0.15em;
          text-transform:uppercase; color:rgba(255,255,255,0.45);
          display:block; margin-bottom:10px;
        }
        .ad-stat-val {
          font-family:'Cormorant Garamond',serif;
          font-size:44px; font-weight:700; color:white;
          line-height:1; display:block;
        }
        .ad-stat-sub {
          font-size:12px; color:rgba(255,255,255,0.35);
          margin-top:8px; display:block;
        }

        /* SECTION */
        .ad-card {
          background:white; border-radius:26px;
          border:1.5px solid var(--border);
          box-shadow:0 4px 28px rgba(13,43,31,0.07);
          padding:32px; margin-bottom:24px;
          transition:var(--t);
        }
        .ad-card:hover { box-shadow:0 8px 40px rgba(13,43,31,0.11); }
        .ad-card-header {
          display:flex; align-items:center; justify-content:space-between;
          margin-bottom:28px;
        }
        .ad-card-title {
          font-family:'Cormorant Garamond',serif;
          font-size:24px; font-weight:700; color:var(--g-deep); margin:0;
        }
        .ad-card-badge {
          font-size:11px; font-weight:600; letter-spacing:0.08em;
          text-transform:uppercase; color:var(--g-main);
          background:var(--g-soft); border:1px solid var(--border);
          padding:5px 12px; border-radius:20px;
        }

        /* GRID */
        .ad-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:24px; }

        /* TOP PRODUCTS TABLE */
        .ad-prod-row {
          display:flex; align-items:center; gap:16px;
          padding:14px 0; border-bottom:1px solid rgba(45,106,79,0.07);
        }
        .ad-prod-row:last-child { border-bottom:none; padding-bottom:0; }
        .ad-prod-rank {
          width:32px; height:32px; border-radius:10px;
          background:var(--g-soft); border:1.5px solid var(--border);
          display:flex; align-items:center; justify-content:center;
          font-size:13px; font-weight:800; color:var(--g-main); flex-shrink:0;
        }
        .ad-prod-rank.gold { background:linear-gradient(135deg,#fbbf24,#d97706); color:white; border:none; }
        .ad-prod-rank.silver { background:linear-gradient(135deg,#9ca3af,#6b7280); color:white; border:none; }
        .ad-prod-rank.bronze { background:linear-gradient(135deg,#d97706,#92400e); color:white; border:none; }
        .ad-prod-name { font-size:14px; font-weight:600; color:var(--charcoal); width:180px; flex-shrink:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .ad-prod-bar-wrap { flex:1; height:10px; background:var(--g-soft); border-radius:6px; overflow:hidden; }
        .ad-prod-bar { height:100%; border-radius:6px; background:linear-gradient(90deg,var(--g-vivid),var(--g-main)); transition:width 1s ease; }
        .ad-prod-qty { font-size:14px; font-weight:700; color:var(--g-rich); width:48px; text-align:right; flex-shrink:0; }

        /* LOW STOCK */
        .ad-low-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:16px; }
        .ad-low-card {
          border-radius:18px; padding:22px 20px;
          border:1.5px solid; transition:var(--t); position:relative; overflow:hidden;
        }
        .ad-low-card:hover { transform:translateY(-4px); }
        .ad-low-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          border-radius:18px 18px 0 0;
        }
        .ad-low-card.critical::before { background:linear-gradient(90deg,#ef4444,#dc2626); }
        .ad-low-card.warning::before { background:linear-gradient(90deg,#f59e0b,#d97706); }
        .ad-low-icon { font-size:28px; margin-bottom:10px; display:block; }
        .ad-low-name { font-size:14px; font-weight:700; color:var(--charcoal); margin:0 0 8px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .ad-low-num { font-family:'Cormorant Garamond',serif; font-size:36px; font-weight:700; line-height:1; margin-bottom:4px; }
        .ad-low-tag { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.12em; padding:3px 10px; border-radius:20px; display:inline-block; }
        .ad-low-empty { text-align:center; padding:48px 20px; }
        .ad-low-empty-icon { font-size:48px; margin-bottom:12px; display:block; }
        .ad-low-empty-text { font-size:15px; color:var(--muted); }

        /* LOADING */
        .ad-loader { text-align:center; padding:80px 0; }
        .ad-spinner {
          width:44px; height:44px; border:3px solid var(--g-pale);
          border-top-color:var(--g-main); border-radius:50%;
          animation:spin 0.8s linear infinite; margin:0 auto 16px;
        }
        @keyframes spin { to { transform:rotate(360deg); } }

        /* RESPONSIVE */
        @media (max-width:1100px) {
          .ad-stats { grid-template-columns:repeat(2,1fr); }
          .ad-grid-2 { grid-template-columns:1fr; }
        }
        @media (max-width:768px) {
          .ad-hero { padding:36px 20px 44px; }
          .ad-main { padding:24px 20px 60px; }
          .ad-stats { grid-template-columns:1fr; }
          .ad-hero-inner { flex-direction:column; align-items:flex-start; }
          .ad-card { padding:22px 18px; }
          .ad-prod-name { width:120px; }
        }
      `}</style>

      <div className="ad-page">

        {/* HERO */}
        <div className="ad-hero">
          <div className="ad-hero-glow" />
          <div className="ad-hero-glow2" />
          <div className="ad-hero-inner">
            <div>
              <div className="ad-hero-tag">
                <span className="ad-tag-line" /> Store Analytics <span className="ad-tag-line" />
              </div>
              <h1 className="ad-hero-title">Sales <em>Analytics</em></h1>
              <p className="ad-hero-sub">Real-time revenue insights, order trends & inventory alerts.</p>
            </div>
            <Link href="/admin/dashboard" className="ad-back-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Dashboard
            </Link>
          </div>
        </div>

        <div className="ad-main">
          {loading ? (
            <div className="ad-loader">
              <div className="ad-spinner" />
              <p style={{ color:'var(--muted)', fontSize:15 }}>Loading analytics...</p>
            </div>
          ) : stats ? (
            <>
              {/* STAT CARDS */}
              <div className="ad-stats">
                {[
                  {
                    label:'Total Revenue', val:`$${stats.totalRevenue.toFixed(2)}`,
                    sub:'All time earnings',
                    bg:'linear-gradient(145deg,#071a12,#0d2b1f,#1a4731)',
                    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                  },
                  {
                    label:'Monthly Revenue', val:`$${stats.monthlyRevenue.toFixed(2)}`,
                    sub:'This month',
                    bg:'linear-gradient(145deg,#07102a,#0f2744,#1a3a5c)',
                    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  },
                  {
                    label:"Today's Revenue", val:`$${stats.todayRevenue.toFixed(2)}`,
                    sub:'Last 24 hours',
                    bg:'linear-gradient(145deg,#150b2a,#2d1b4e,#3d2466)',
                    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  },
                  {
                    label:'Total Orders', val:stats.totalOrders,
                    sub:'All orders placed',
                    bg:'linear-gradient(145deg,#1a0a00,#3d2000,#5c3010)',
                    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                  },
                ].map((s, i) => (
                  <div key={i} className="ad-stat" style={{ background:s.bg }}>
                    <div className="ad-stat-ring" />
                    <div className="ad-stat-ring2" />
                    <div className="ad-stat-icon">{s.icon}</div>
                    <span className="ad-stat-label">{s.label}</span>
                    <span className="ad-stat-val">{s.val}</span>
                    <span className="ad-stat-sub">{s.sub}</span>
                  </div>
                ))}
              </div>

              {/* CHARTS ROW */}
              <div className="ad-grid-2">

                {/* AREA CHART — Daily Revenue */}
                <div className="ad-card">
                  <div className="ad-card-header">
                    <h2 className="ad-card-title">Revenue Trend</h2>
                    <span className="ad-card-badge">Last 7 Days</span>
                  </div>
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={areaData} margin={{ top:5, right:10, left:0, bottom:5 }}>
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#52b788" stopOpacity={0.35}/>
                          <stop offset="95%" stopColor="#52b788" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,106,79,0.08)" />
                      <XAxis dataKey="day" tick={{ fontSize:12, fill:'#6b7280' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize:11, fill:'#6b7280' }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone" dataKey="revenue"
                        stroke="#52b788" strokeWidth={2.5}
                        fill="url(#revenueGrad)"
                        dot={{ fill:'#2d6a4f', strokeWidth:2, r:4 }}
                        activeDot={{ r:6, fill:'#52b788', stroke:'white', strokeWidth:2 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* PIE CHART — Orders by Status */}
                <div className="ad-card">
                  <div className="ad-card-header">
                    <h2 className="ad-card-title">Order Status</h2>
                    <span className="ad-card-badge">Distribution</span>
                  </div>
                  {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={pieData} cx="50%" cy="50%"
                          innerRadius={60} outerRadius={95}
                          paddingAngle={3} dataKey="value"
                          animationBegin={0} animationDuration={800}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} stroke="white" strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip content={<PieTooltip />} />
                        <Legend
                          iconType="circle" iconSize={8}
                          formatter={(value) => <span style={{ fontSize:12, color:'#4b5563', fontWeight:500 }}>{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ textAlign:'center', padding:'60px 0', color:'var(--muted)', fontSize:14 }}>No orders yet</div>
                  )}
                </div>
              </div>

              {/* TOP PRODUCTS */}
              <div className="ad-card">
                <div className="ad-card-header">
                  <h2 className="ad-card-title">Top Products</h2>
                  <span className="ad-card-badge">By Sales Volume</span>
                </div>
                {barData.length === 0 ? (
                  <p style={{ color:'var(--muted)', fontSize:14, textAlign:'center', padding:'32px 0' }}>No sales data yet</p>
                ) : (
                  <>
                    {/* Bar Chart */}
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={barData} margin={{ top:5, right:10, left:0, bottom:5 }} barCategoryGap="30%">
                        <defs>
                          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#52b788"/>
                            <stop offset="100%" stopColor="#1a4731"/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,106,79,0.08)" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize:11, fill:'#6b7280' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize:11, fill:'#6b7280' }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip prefix="" />} />
                        <Bar dataKey="qty" fill="url(#barGrad)" radius={[8,8,0,0]} animationDuration={800} />
                      </BarChart>
                    </ResponsiveContainer>

                    {/* Ranked List */}
                    <div style={{ marginTop:16 }}>
                      {stats.topProducts.map((p, i) => {
                        const maxQty = Math.max(...stats.topProducts.map(x => x.quantity), 1);
                        const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
                        return (
                          <div key={p.name} className="ad-prod-row">
                            <span className={`ad-prod-rank ${rankClass}`}>{i + 1}</span>
                            <span className="ad-prod-name">{p.name}</span>
                            <div className="ad-prod-bar-wrap">
                              <div className="ad-prod-bar" style={{ width:`${(p.quantity / maxQty) * 100}%` }} />
                            </div>
                            <span className="ad-prod-qty">{p.quantity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* LOW STOCK */}
              <div className="ad-card">
                <div className="ad-card-header">
                  <h2 className="ad-card-title">Low Stock Alerts</h2>
                  <span className="ad-card-badge" style={{ color:'#ef4444', background:'rgba(239,68,68,0.08)', borderColor:'rgba(239,68,68,0.2)' }}>
                    {lowStock.length} Items
                  </span>
                </div>
                {lowStock.length === 0 ? (
                  <div className="ad-low-empty">
                    <span className="ad-low-empty-icon">✅</span>
                    <p className="ad-low-empty-text">All products are well-stocked!</p>
                  </div>
                ) : (
                  <div className="ad-low-grid">
                    {lowStock.map((p) => {
                      const critical = p.stock <= 2;
                      return (
                        <div
                          key={p._id}
                          className={`ad-low-card ${critical ? 'critical' : 'warning'}`}
                          style={{
                            borderColor: critical ? 'rgba(239,68,68,0.25)' : 'rgba(245,158,11,0.25)',
                            background: critical ? 'rgba(239,68,68,0.03)' : 'rgba(245,158,11,0.03)',
                          }}
                        >
                          <span className="ad-low-icon">{critical ? '🚨' : '⚠️'}</span>
                          <p className="ad-low-name">{p.name}</p>
                          <div className="ad-low-num" style={{ color: critical ? '#ef4444' : '#f59e0b' }}>
                            {p.stock}
                          </div>
                          <span
                            className="ad-low-tag"
                            style={{
                              color: critical ? '#ef4444' : '#d97706',
                              background: critical ? 'rgba(239,68,68,0.10)' : 'rgba(245,158,11,0.10)',
                            }}
                          >
                            {critical ? 'Critical' : 'Low'} Stock
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ textAlign:'center', padding:'80px 0', color:'var(--muted)' }}>
              Failed to load analytics data.
            </div>
          )}
        </div>
      </div>
    </>
  );
}