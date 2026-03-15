'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      if (result.user && result.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } else {
      setError(result.message);
    }
    setLoading(false);
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
          --border:  rgba(45,106,79,0.12);
          --t: all 0.28s cubic-bezier(0.4,0,0.2,1);
        }

        .li-page {
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--cream);
        }

        /* ── LEFT PANEL ── */
        .li-left {
          position: relative;
          background: linear-gradient(160deg, var(--g-deep), #1a3a2a 50%, #0f2d1f);
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 52px 56px;
          overflow: hidden;
        }
        .li-left-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(82,183,136,0.07) 1.5px, transparent 1.5px);
          background-size: 26px 26px; pointer-events: none;
        }
        .li-left-glow {
          position: absolute; width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(82,183,136,0.10), transparent 70%);
          top: -100px; left: -100px; pointer-events: none;
        }
        .li-left-glow2 {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(82,183,136,0.06), transparent 70%);
          bottom: -80px; right: -80px; pointer-events: none;
        }
        .li-left-content { position: relative; z-index: 1; }

        .li-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; margin-bottom: 72px;
        }
        .li-logo-box {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, var(--g-vivid), var(--g-main));
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(82,183,136,0.35);
          transition: var(--t);
        }
        .li-logo:hover .li-logo-box { transform: rotate(-6deg) scale(1.08); }
        .li-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 700; color: white; line-height: 1;
        }
        .li-logo-sub {
          font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.45);
          letter-spacing: 0.12em; text-transform: uppercase; display: block; margin-top: 1px;
        }

        .li-left-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--g-vivid); margin-bottom: 20px;
        }
        .li-tag-dash { width: 20px; height: 1.5px; background: var(--g-vivid); border-radius: 2px; }

        .li-left-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 3.5vw, 54px); font-weight: 700;
          color: white; line-height: 1.06; margin: 0 0 18px; letter-spacing: -0.5px;
        }
        .li-left-title em { font-style: normal; color: var(--g-vivid); }
        .li-left-sub {
          font-size: 15px; font-weight: 300;
          color: rgba(255,255,255,0.50); line-height: 1.65;
          max-width: 360px; margin: 0 0 52px;
        }

        /* feature list */
        .li-features { display: flex; flex-direction: column; gap: 12px; }
        .li-feature {
          display: flex; align-items: center; gap: 12px;
          font-size: 14px; font-weight: 400; color: rgba(255,255,255,0.65);
        }
        .li-feature-check {
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(82,183,136,0.20);
          border: 1px solid rgba(82,183,136,0.35);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: var(--g-vivid);
        }

        /* image showcase */
        .li-showcase {
          margin-top: 48px;
          border-radius: 20px; overflow: hidden;
          position: relative; height: 200px;
        }
        .li-showcase img {
          width: 100%; height: 100%; object-fit: cover; opacity: 0.55;
        }
        .li-showcase-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(13,43,31,0.75) 100%);
          display: flex; align-items: flex-end; padding: 18px 20px;
        }
        .li-showcase-text {
          font-size: 13px; font-weight: 500; color: white; line-height: 1.4;
        }
        .li-showcase-text strong { color: var(--g-vivid); font-weight: 600; display: block; font-size: 15px; }

        .li-left-bottom {
          position: relative; z-index: 1;
          border-top: 1px solid rgba(82,183,136,0.12);
          padding-top: 24px;
        }
        .li-avatars {
          display: flex; align-items: center; gap: 0; margin-bottom: 10px;
        }
        .li-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          border: 2px solid var(--g-deep);
          background: linear-gradient(135deg, var(--g-vivid), var(--g-main));
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: white;
          margin-right: -8px; flex-shrink: 0;
        }
        .li-avatar-more {
          width: 30px; height: 30px; border-radius: 50%;
          border: 2px solid var(--g-deep);
          background: rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.70);
          margin-right: 12px;
        }
        .li-social-proof {
          font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.50);
        }
        .li-social-proof strong { color: white; font-weight: 600; }

        /* ── RIGHT PANEL ── */
        .li-right {
          display: flex; align-items: center; justify-content: center;
          padding: 48px 56px; background: var(--cream); overflow-y: auto;
        }
        .li-form-wrap { width: 100%; max-width: 400px; }

        .li-form-header { margin-bottom: 32px; }
        .li-form-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--g-main); margin-bottom: 12px;
        }
        .li-eyebrow-dot { width: 6px; height: 6px; background: var(--g-vivid); border-radius: 50%;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        .li-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px; font-weight: 700; color: var(--g-deep);
          margin: 0 0 8px; line-height: 1.04; letter-spacing: -0.5px;
        }
        .li-form-title em { font-style: normal; color: var(--g-main); }
        .li-form-sub { font-size: 14px; font-weight: 300; color: var(--muted); margin: 0; line-height: 1.6; }

        .li-error {
          display: flex; align-items: center; gap: 10px;
          background: #fff5f5; border: 1.5px solid rgba(229,62,62,0.22);
          border-radius: 12px; padding: 13px 16px;
          color: #c53030; font-size: 13px; font-weight: 500;
          margin-bottom: 20px; animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-6px);} to{opacity:1;transform:translateY(0);} }

        .li-form { display: flex; flex-direction: column; gap: 18px; }
        .li-field { display: flex; flex-direction: column; gap: 7px; }
        .li-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; color: var(--charcoal);
        }
        .li-input-wrap { position: relative; }
        .li-input-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: var(--muted); pointer-events: none;
        }
        .li-input {
          width: 100%; padding: 13px 16px 13px 42px;
          border: 1.5px solid var(--border); border-radius: 12px;
          font-family: 'Outfit', sans-serif; font-size: 14px;
          color: var(--charcoal); background: white; outline: none;
          transition: var(--t); box-sizing: border-box;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }
        .li-input:focus {
          border-color: var(--g-vivid); background: white;
          box-shadow: 0 0 0 3px rgba(82,183,136,0.12);
        }
        .li-input::placeholder { color: #b8c0cc; }

        .li-eye {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: var(--muted); padding: 2px; transition: color 0.2s;
          display: flex; align-items: center;
        }
        .li-eye:hover { color: var(--g-main); }

        .li-forgot {
          text-align: right; margin-top: -10px;
        }
        .li-forgot a {
          font-size: 12px; font-weight: 500; color: var(--g-main);
          text-decoration: none; transition: color 0.2s;
        }
        .li-forgot a:hover { color: var(--g-rich); text-decoration: underline; }

        .li-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, var(--g-main), var(--g-deep));
          color: white; border: none; border-radius: 14px;
          font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600;
          cursor: pointer; transition: var(--t);
          display: flex; align-items: center; justify-content: center; gap: 10px;
          box-shadow: 0 4px 16px rgba(45,106,79,0.28); letter-spacing: 0.02em;
        }
        .li-btn:hover:not(:disabled) {
          transform: translateY(-2px); box-shadow: 0 10px 28px rgba(45,106,79,0.38);
        }
        .li-btn:disabled { opacity: 0.70; cursor: not-allowed; transform: none; }
        .li-spinner {
          width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to{transform:rotate(360deg);} }

        .li-divider {
          display: flex; align-items: center; gap: 12px;
          color: var(--muted); font-size: 12px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .li-divider::before, .li-divider::after {
          content:''; flex:1; height:1px; background: var(--border);
        }

        .li-signup-link {
          text-align: center; font-size: 14px; color: var(--muted);
        }
        .li-signup-link a { color: var(--g-main); font-weight: 600; text-decoration: none; }
        .li-signup-link a:hover { color: var(--g-rich); }

        /* demo hint */
        .li-demo {
          background: var(--g-soft);
          border: 1px solid var(--border);
          border-radius: 12px; padding: 14px 16px;
          display: flex; align-items: flex-start; gap: 10px;
        }
        .li-demo-icon {
          width: 28px; height: 28px; border-radius: 8px;
          background: var(--g-main); color: white;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; flex-shrink: 0; margin-top: 1px;
        }
        .li-demo-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--g-main); display: block; margin-bottom: 4px;
        }
        .li-demo-creds {
          font-size: 12px; color: var(--muted); font-weight: 400; line-height: 1.55;
        }
        .li-demo-creds code {
          font-family: 'Outfit', monospace;
          background: white; border: 1px solid var(--border);
          border-radius: 5px; padding: 1px 6px;
          font-size: 11px; color: var(--g-rich); font-weight: 600;
        }

        @media (max-width: 900px) {
          .li-page { grid-template-columns: 1fr; }
          .li-left { display: none; }
          .li-right { padding: 40px 24px; min-height: 100vh; }
        }
      `}</style>

      <div className="li-page">

        {/* ── LEFT ── */}
        <div className="li-left">
          <div className="li-left-dots" />
          <div className="li-left-glow" />
          <div className="li-left-glow2" />

          <div className="li-left-content">
            <Link href="/" className="li-logo">
              <div className="li-logo-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/>
                  <path d="M8 12l3 3 5-5"/>
                </svg>
              </div>
              <div>
                <span className="li-logo-text">FreshMart</span>
                <span className="li-logo-sub">Premium Grocery</span>
              </div>
            </Link>

            <div className="li-left-tag">
              <span className="li-tag-dash" /> Welcome Back
            </div>
            <h2 className="li-left-title">Your fresh<br />cart is <em>waiting</em></h2>
            <p className="li-left-sub">
              Sign in to access your orders, saved addresses, exclusive deals, and same-day delivery perks.
            </p>

            <div className="li-features">
              {[
                'Track your orders in real-time',
                'Access exclusive member-only deals',
                'Save your favourite items & lists',
                'Fast checkout with saved addresses',
              ].map((f, i) => (
                <div key={i} className="li-feature">
                  <span className="li-feature-check">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  {f}
                </div>
              ))}
            </div>

            <div className="li-showcase">
              <img src="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=700&q=80" alt="Fresh produce" />
              <div className="li-showcase-overlay">
                <div className="li-showcase-text">
                  <strong>500+ fresh products</strong>
                  Delivered to your door in under 2 hours
                </div>
              </div>
            </div>
          </div>

          <div className="li-left-bottom">
            <div className="li-avatars">
              {['A','B','S','R'].map((l,i) => (
                <div key={i} className="li-avatar" style={{zIndex: 4-i}}>{l}</div>
              ))}
              <div className="li-avatar-more">+</div>
            </div>
            <p className="li-social-proof">
              <strong>12,000+</strong> happy customers shop with us every week
            </p>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="li-right">
          <div className="li-form-wrap">
            <div className="li-form-header">
              <div className="li-form-eyebrow">
                <span className="li-eyebrow-dot" /> Sign In
              </div>
              <h1 className="li-form-title"><em>Welcome</em><br />back</h1>
              <p className="li-form-sub">Enter your credentials to access your account.</p>
            </div>

            {error && (
              <div className="li-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="li-form">

              <div className="li-field">
                <label className="li-label">Email Address</label>
                <div className="li-input-wrap">
                  <span className="li-input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <input
                    className="li-input" type="email" value={email}
                    onChange={e => setEmail(e.target.value)} required
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="li-field">
                <label className="li-label">Password</label>
                <div className="li-input-wrap">
                  <span className="li-input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    className="li-input" type={showPass ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)} required
                    placeholder="Enter your password" style={{paddingRight: 42}}
                  />
                  <button type="button" className="li-eye" onClick={() => setShowPass(!showPass)}>
                    {showPass
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>

              <div className="li-forgot">
                <a href="#">Forgot password?</a>
              </div>

              <button type="submit" className="li-btn" disabled={loading}>
                {loading
                  ? <><span className="li-spinner" /> Signing in...</>
                  : <>Sign In <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg></>
                }
              </button>

              <div className="li-divider">or</div>

              <div className="li-signup-link">
                Don't have an account? <Link href="/signup">Create one free →</Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}