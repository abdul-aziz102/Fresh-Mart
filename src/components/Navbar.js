'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useState, useEffect, useRef } from 'react';

const CATEGORIES = [
  { label: 'Fruits & Vegetables', emoji: '🍎', slug: 'Fruits & Vegetables' },
  { label: 'Dairy & Eggs',        emoji: '🥛', slug: 'Dairy & Eggs' },
  { label: 'Bakery',              emoji: '🍞', slug: 'Bakery' },
  { label: 'Meat & Seafood',      emoji: '🥩', slug: 'Meat & Seafood' },
  { label: 'Beverages',           emoji: '🧃', slug: 'Beverages' },
  { label: 'Snacks',              emoji: '🍿', slug: 'Snacks' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [catOpen, setCatOpen]               = useState(false);
  const catRef                              = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@400;500;600&display=swap');

        :root {
          --green-dark: #1b4332;
          --green-mid: #2d6a4f;
          --green-main: #40916c;
          --green-light: #74c69d;
          --green-pale: #d8f3dc;
          --gold: #d4a017;
          --cream: #faf9f6;
          --charcoal: #1c1c1e;
          --muted: #6b7280;
          --white: #ffffff;
          --shadow-soft: 0 4px 24px rgba(27,67,50,0.10);
          --shadow-deep: 0 8px 40px rgba(27,67,50,0.18);
          --radius: 14px;
          --nav-font: 'DM Sans', sans-serif;
          --logo-font: 'Playfair Display', serif;
          --transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }

        /* TOP BAR */
        .topbar {
          background: var(--green-dark);
          color: rgba(255,255,255,0.80);
          font-family: var(--nav-font);
          font-size: 12px;
          letter-spacing: 0.03em;
          padding: 7px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .topbar-left, .topbar-right {
          display: flex; align-items: center; gap: 20px;
        }
        .topbar-item {
          display: flex; align-items: center; gap: 6px;
          transition: var(--transition);
        }
        .topbar-item:hover { color: var(--green-light); cursor: default; }
        .topbar-icon { width: 14px; height: 14px; opacity: 0.75; }
        .topbar-divider { width: 1px; height: 14px; background: rgba(255,255,255,0.18); }
        .topbar-badge {
          background: rgba(255,255,255,0.10);
          border-radius: 20px; padding: 2px 10px;
          font-size: 11px; display: flex; align-items: center; gap: 5px;
          cursor: pointer; transition: var(--transition);
        }
        .topbar-badge:hover { background: rgba(255,255,255,0.18); }
        .topbar-wrap { transition: var(--transition); }
        .topbar-wrap.hidden-on-scroll { transform: translateY(-100%); opacity: 0; pointer-events: none; }

        /* MAIN NAV */
        .navbar-wrapper { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; font-family: var(--nav-font); }
        .main-nav {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(64,145,108,0.12);
          transition: var(--transition);
          padding: 0 32px;
        }
        .main-nav.scrolled {
          box-shadow: var(--shadow-deep);
          background: rgba(255,255,255,0.99);
        }
        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          height: 68px; display: flex;
          align-items: center; justify-content: space-between; gap: 24px;
        }

        /* LOGO */
        .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .logo-img {
          width: 42px; height: 42px;
          border-radius: 10px; object-fit: cover;
          box-shadow: 0 4px 12px rgba(64,145,108,0.30); transition: var(--transition);
        }
        .logo:hover .logo-img { transform: rotate(-6deg) scale(1.08); box-shadow: 0 6px 18px rgba(64,145,108,0.40); }
        .logo-text { font-family: var(--logo-font); font-size: 20px; color: var(--green-dark); letter-spacing: -0.3px; line-height: 1; }
        .logo-sub { font-family: var(--nav-font); font-size: 10px; font-weight: 500; color: var(--green-main); letter-spacing: 0.12em; text-transform: uppercase; display: block; margin-top: 1px; }

        /* NAV LINKS */
        .nav-links { display: flex; align-items: center; gap: 4px; list-style: none; margin: 0; padding: 0; }
        .nav-link {
          position: relative; padding: 8px 14px; font-size: 14px; font-weight: 500;
          color: var(--charcoal); text-decoration: none; border-radius: 8px;
          transition: var(--transition); letter-spacing: 0.01em;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 4px; left: 50%;
          transform: translateX(-50%) scaleX(0); width: 20px; height: 2px;
          background: var(--green-main); border-radius: 2px;
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover { color: var(--green-dark); background: var(--green-pale); }
        .nav-link:hover::after { transform: translateX(-50%) scaleX(1); }

        /* CATEGORIES DROPDOWN */
        .cat-wrapper { position: relative; }
        .cat-trigger {
          display: flex; align-items: center; gap: 5px;
          padding: 8px 14px; font-size: 14px; font-weight: 500;
          color: var(--charcoal); background: transparent;
          border: none; border-radius: 8px; cursor: pointer;
          transition: var(--transition); font-family: var(--nav-font);
          letter-spacing: 0.01em;
        }
        .cat-trigger:hover { color: var(--green-dark); background: var(--green-pale); }
        .cat-trigger.active { color: var(--green-dark); background: var(--green-pale); }
        .cat-arrow {
          width: 14px; height: 14px; transition: transform 0.25s ease;
          color: var(--muted);
        }
        .cat-arrow.open { transform: rotate(180deg); }

        .cat-dropdown {
          position: absolute; top: calc(100% + 10px); left: 0;
          background: white; border-radius: 16px;
          box-shadow: 0 20px 60px rgba(27,67,50,0.18), 0 4px 16px rgba(27,67,50,0.08);
          border: 1px solid rgba(64,145,108,0.10);
          min-width: 240px; padding: 8px;
          animation: dropIn 0.2s cubic-bezier(0.4,0,0.2,1);
          z-index: 999;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .cat-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 14px; border-radius: 10px;
          text-decoration: none; color: var(--charcoal);
          font-size: 14px; font-weight: 500;
          transition: var(--transition);
        }
        .cat-item:hover {
          background: var(--green-pale);
          color: var(--green-dark);
          padding-left: 18px;
        }
        .cat-emoji {
          width: 32px; height: 32px; border-radius: 8px;
          background: var(--green-pale);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; flex-shrink: 0;
          transition: var(--transition);
        }
        .cat-item:hover .cat-emoji {
          background: var(--green-light);
          transform: scale(1.1);
        }
        .cat-divider { height: 1px; background: rgba(64,145,108,0.08); margin: 6px 0; }
        .cat-view-all {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px; border-radius: 10px; text-decoration: none;
          font-size: 13px; font-weight: 600; color: var(--green-main);
          transition: var(--transition);
        }
        .cat-view-all:hover { background: var(--green-pale); color: var(--green-dark); }

        /* RIGHT ACTIONS */
        .nav-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .cart-btn {
          position: relative; display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 12px;
          background: var(--green-pale); border: 1.5px solid rgba(64,145,108,0.15);
          cursor: pointer; text-decoration: none; transition: var(--transition);
        }
        .cart-btn:hover {
          background: var(--green-light); border-color: var(--green-main);
          transform: translateY(-2px); box-shadow: 0 6px 16px rgba(64,145,108,0.25);
        }
        .cart-count {
          position: absolute; top: -6px; right: -6px;
          background: linear-gradient(135deg, #e53e3e, #c53030);
          color: white; font-size: 10px; font-weight: 700;
          min-width: 18px; height: 18px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          padding: 0 4px; box-shadow: 0 2px 6px rgba(229,62,62,0.45);
          animation: pop 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes pop { 0% { transform: scale(0); } 100% { transform: scale(1); } }

        .user-greeting { font-size: 13px; font-weight: 500; color: var(--muted); padding: 0 4px; white-space: nowrap; }
        .user-greeting strong { color: var(--green-dark); }

        .btn-ghost {
          padding: 9px 16px; font-size: 14px; font-weight: 600;
          color: var(--green-dark); background: transparent;
          border: 1.5px solid rgba(64,145,108,0.25); border-radius: 10px;
          text-decoration: none; transition: var(--transition); letter-spacing: 0.01em;
        }
        .btn-ghost:hover { background: var(--green-pale); border-color: var(--green-main); }

        .btn-primary {
          padding: 9px 20px; font-size: 14px; font-weight: 600;
          color: white; background: linear-gradient(135deg, var(--green-main), var(--green-dark));
          border: none; border-radius: 10px; text-decoration: none;
          cursor: pointer; transition: var(--transition); letter-spacing: 0.02em;
          box-shadow: 0 3px 12px rgba(64,145,108,0.30); position: relative; overflow: hidden;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(64,145,108,0.40); }
        .btn-primary:active { transform: translateY(0); }

        .admin-chip {
          padding: 5px 12px; font-size: 12px; font-weight: 600;
          color: var(--gold); background: rgba(212,160,23,0.10);
          border: 1.5px solid rgba(212,160,23,0.30); border-radius: 20px;
          text-decoration: none; letter-spacing: 0.04em; text-transform: uppercase;
          transition: var(--transition);
        }
        .admin-chip:hover { background: rgba(212,160,23,0.20); border-color: var(--gold); }

        .nav-vdivider { width: 1px; height: 24px; background: rgba(64,145,108,0.15); margin: 0 4px; }

        /* HAMBURGER */
        .hamburger {
          display: none; width: 44px; height: 44px;
          align-items: center; justify-content: center;
          border-radius: 12px; background: var(--green-pale);
          border: 1.5px solid rgba(64,145,108,0.15);
          cursor: pointer; transition: var(--transition);
          flex-direction: column; gap: 5px;
        }
        .hamburger:hover { background: var(--green-light); }
        .ham-line { width: 18px; height: 2px; background: var(--green-dark); border-radius: 2px; transition: var(--transition); transform-origin: center; }
        .hamburger.open .ham-line:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
        .hamburger.open .ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open .ham-line:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

        /* MOBILE MENU */
        .mobile-menu {
          background: white; border-top: 1px solid rgba(64,145,108,0.10);
          padding: 16px 24px 24px; display: flex; flex-direction: column; gap: 4px;
          animation: slideDown 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .mobile-link {
          padding: 12px 14px; font-size: 15px; font-weight: 500;
          color: var(--charcoal); text-decoration: none; border-radius: 10px;
          transition: var(--transition); display: flex; align-items: center; gap: 10px;
        }
        .mobile-link:hover { background: var(--green-pale); color: var(--green-dark); padding-left: 20px; }
        .mobile-divider { height: 1px; background: rgba(64,145,108,0.10); margin: 8px 0; }
        .mobile-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 8px; }
        .btn-primary.full { width: 100%; text-align: center; display: block; padding: 13px; border-radius: 12px; }
        .btn-ghost.full   { width: 100%; text-align: center; display: block; padding: 13px; border-radius: 12px; }

        .mobile-cat-title {
          padding: 8px 14px; font-size: 11px; font-weight: 700;
          color: var(--green-main); text-transform: uppercase; letter-spacing: 0.1em;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .desktop-actions { display: none; }
          .hamburger { display: flex; }
          .topbar { padding: 6px 16px; }
          .main-nav { padding: 0 16px; }
          .topbar-left .topbar-item:not(:first-child) { display: none; }
        }
        @media (min-width: 901px) {
          .hamburger { display: none; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      <div className="navbar-wrapper">
        {/* Top Bar */}
        <div className={`topbar-wrap ${isScrolled ? 'hidden-on-scroll' : ''}`}>
          <div className="topbar">
            <div className="topbar-left">
              <span className="topbar-item">
                <svg className="topbar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Ghulam Shah Ln, Lyari, Karachi
              </span>
              <div className="topbar-divider" />
              <span className="topbar-item">
                <svg className="topbar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Open · Closes 11 PM
              </span>
            </div>
            <div className="topbar-right">
              <span className="topbar-badge">🌐 اردو / English</span>
              <span className="topbar-badge">💵 PKR</span>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className={`main-nav ${isScrolled ? 'scrolled' : ''}`}>
          <div className="nav-inner">

            {/* Logo */}
            <Link href="/" className="logo">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtC86-ex4UzWoqYWRbpXZsW7Rn5oXaWpELvw&s"
                alt="Azaan Supermarket Logo"
                className="logo-img"
              />
              <div>
                <span className="logo-text">Azaan</span>
                <span className="logo-sub">Supermarket</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav>
              <ul className="nav-links">
                <li><Link href="/" className="nav-link">Home</Link></li>
                <li><Link href="/products" className="nav-link">Products</Link></li>

                {/* Categories Dropdown */}
                <li className="cat-wrapper" ref={catRef}>
                  <button
                    className={`cat-trigger ${catOpen ? 'active' : ''}`}
                    onClick={() => setCatOpen(!catOpen)}
                  >
                    Categories
                    <svg className={`cat-arrow ${catOpen ? 'open' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {catOpen && (
                    <div className="cat-dropdown">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/products?category=${encodeURIComponent(cat.slug)}`}
                          className="cat-item"
                          onClick={() => setCatOpen(false)}
                        >
                          <span className="cat-emoji">{cat.emoji}</span>
                          {cat.label}
                        </Link>
                      ))}
                      <div className="cat-divider" />
                      <Link href="/products" className="cat-view-all" onClick={() => setCatOpen(false)}>
                        View All Products →
                      </Link>
                    </div>
                  )}
                </li>

                <li><Link href="/about" className="nav-link">About</Link></li>
                <li><Link href="/contact" className="nav-link">Contact</Link></li>
              </ul>
            </nav>

            {/* Right Actions */}
            <div className="nav-actions">
              {/* Wishlist */}
              <Link href="/wishlist" className="cart-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
                {getWishlistCount() > 0 && <span className="cart-count">{getWishlistCount()}</span>}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="cart-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                {getCartCount() > 0 && <span className="cart-count">{getCartCount()}</span>}
              </Link>

              {/* Desktop Auth */}
              <div className="desktop-actions nav-actions">
                {user ? (
                  <>
                    <span className="user-greeting">Hi, <strong>{user.name}</strong></span>
                    <Link href="/orders" className="btn-ghost">Orders</Link>
                    {user.role === 'admin' && (
                      <Link href="/admin/dashboard" className="admin-chip">⚡ Admin</Link>
                    )}
                    <div className="nav-vdivider" />
                    <button onClick={handleLogout} className="btn-primary">Logout</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="btn-ghost">Login</Link>
                    <Link href="/signup" className="btn-primary">Sign Up</Link>
                  </>
                )}
              </div>

              {/* Hamburger */}
              <button
                className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span className="ham-line" />
                <span className="ham-line" />
                <span className="ham-line" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mobile-menu">
              {[['/', 'Home', '🏠'], ['/products', 'Products', '🛍️'], ['/about', 'About', 'ℹ️'], ['/contact', 'Contact', '📩']].map(([href, label, icon]) => (
                <Link key={href} href={href} className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
                  <span>{icon}</span> {label}
                </Link>
              ))}

              {/* Mobile Categories */}
              <div className="mobile-divider" />
              <div className="mobile-cat-title">Categories</div>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products?category=${encodeURIComponent(cat.slug)}`}
                  className="mobile-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{cat.emoji}</span> {cat.label}
                </Link>
              ))}

              <div className="mobile-divider" />
              <div className="mobile-actions">
                {user ? (
                  <>
                    <Link href="/orders" className="btn-ghost full" onClick={() => setIsMobileMenuOpen(false)}>📦 My Orders</Link>
                    {user.role === 'admin' && (
                      <Link href="/admin/dashboard" className="admin-chip" style={{textAlign:'center',padding:'13px'}} onClick={() => setIsMobileMenuOpen(false)}>⚡ Admin Dashboard</Link>
                    )}
                    <button onClick={handleLogout} className="btn-primary full">Logout</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="btn-ghost full" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                    <Link href="/signup" className="btn-primary full" onClick={() => setIsMobileMenuOpen(false)}>Sign Up Free</Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: isScrolled ? '68px' : '108px', transition: 'height 0.3s ease' }} />
    </>
  );
}