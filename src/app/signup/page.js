'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const router = useRouter();

  const passwordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
  const strengthColor = ['', '#e53e3e', '#dd6b20', '#d4a017', '#38a169', '#2d6a4f'];
  const strength = passwordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (!phone || phone.length < 10) { setError('Please enter a valid phone number'); return; }
    setLoading(true);
    const result = await signup(name, email, phone, password);
    if (result.success) { router.push('/'); } else { setError(result.message); }
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

        .su-page {
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--cream);
        }

        /* LEFT PANEL */
        .su-left {
          position: relative;
          background: linear-gradient(160deg, var(--g-deep), #1a3a2a 50%, #0f2d1f);
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 52px 56px;
          overflow: hidden;
        }
        .su-left-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(82,183,136,0.07) 1.5px, transparent 1.5px);
          background-size: 26px 26px; pointer-events: none;
        }
        .su-left-glow {
          position: absolute;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(82,183,136,0.09), transparent 70%);
          bottom: -100px; right: -100px; pointer-events: none;
        }
        .su-left-content { position: relative; z-index: 1; }

        .su-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; margin-bottom: 64px;
        }
        .su-logo-box {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, var(--g-vivid), var(--g-main));
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(82,183,136,0.35);
        }
        .su-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 700; color: white; line-height: 1;
        }
        .su-logo-sub {
          font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.45);
          letter-spacing: 0.12em; text-transform: uppercase; display: block; margin-top: 1px;
        }

        .su-left-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(34px, 3.2vw, 50px); font-weight: 700;
          color: white; line-height: 1.08; margin: 0 0 18px; letter-spacing: -0.5px;
        }
        .su-left-title em { font-style: normal; color: var(--g-vivid); }
        .su-left-sub {
          font-size: 15px; font-weight: 300;
          color: rgba(255,255,255,0.50); line-height: 1.65;
          max-width: 360px; margin: 0 0 48px;
        }

        .su-perks { display: flex; flex-direction: column; gap: 14px; }
        .su-perk {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(82,183,136,0.14);
          border-radius: 14px; transition: var(--t);
        }
        .su-perk:hover { background: rgba(255,255,255,0.08); border-color: rgba(82,183,136,0.25); }
        .su-perk-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(82,183,136,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 17px;
        }
        .su-perk-title { font-size: 13px; font-weight: 600; color: white; display: block; margin-bottom: 2px; }
        .su-perk-sub { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.50); }

        .su-left-bottom {
          position: relative; z-index: 1;
          border-top: 1px solid rgba(82,183,136,0.12);
          padding-top: 24px;
        }
        .su-review {
          font-size: 13px; font-weight: 300; font-style: italic;
          color: rgba(255,255,255,0.50); line-height: 1.65; margin: 0 0 14px;
        }
        .su-reviewer {
          display: flex; align-items: center; gap: 10px;
        }
        .su-reviewer-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, var(--g-vivid), var(--g-main));
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: white; flex-shrink: 0;
        }
        .su-reviewer-name { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.70); }
        .su-reviewer-stars { color: #f59e0b; font-size: 11px; letter-spacing: 1px; }

        /* RIGHT PANEL */
        .su-right {
          display: flex; align-items: center; justify-content: center;
          padding: 48px 56px;
          background: var(--cream);
          overflow-y: auto;
        }
        .su-form-wrap { width: 100%; max-width: 420px; }

        .su-form-header { margin-bottom: 28px; }
        .su-form-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--g-main); margin-bottom: 12px;
        }
        .su-eyebrow-dot { width: 6px; height: 6px; background: var(--g-vivid); border-radius: 50%; }
        .su-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px; font-weight: 700; color: var(--g-deep);
          margin: 0 0 8px; line-height: 1.05; letter-spacing: -0.5px;
        }
        .su-form-title em { font-style: normal; color: var(--g-main); }
        .su-form-sub { font-size: 14px; font-weight: 300; color: var(--muted); margin: 0; line-height: 1.6; }

        .su-error {
          display: flex; align-items: center; gap: 10px;
          background: #fff5f5; border: 1.5px solid rgba(229,62,62,0.22);
          border-radius: 12px; padding: 13px 16px;
          color: #c53030; font-size: 13px; font-weight: 500;
          margin-bottom: 20px; animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

        .su-form { display: flex; flex-direction: column; gap: 16px; }
        .su-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .su-field { display: flex; flex-direction: column; gap: 7px; }
        .su-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; color: var(--charcoal);
        }
        .su-input-wrap { position: relative; }
        .su-input-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: var(--muted); pointer-events: none;
        }
        .su-input {
          width: 100%; padding: 12px 16px 12px 42px;
          border: 1.5px solid var(--border); border-radius: 12px;
          font-family: 'Outfit', sans-serif; font-size: 14px;
          color: var(--charcoal); background: white; outline: none;
          transition: var(--t); box-sizing: border-box;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }
        .su-input:focus {
          border-color: var(--g-vivid); background: white;
          box-shadow: 0 0 0 3px rgba(82,183,136,0.12);
        }
        .su-input::placeholder { color: #b8c0cc; }

        .su-eye {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: var(--muted); padding: 2px; transition: color 0.2s;
          display: flex; align-items: center;
        }
        .su-eye:hover { color: var(--g-main); }

        .su-strength { margin-top: 8px; }
        .su-strength-bars { display: flex; gap: 4px; margin-bottom: 5px; }
        .su-strength-bar {
          flex: 1; height: 3px; border-radius: 3px;
          background: #e5e7eb; transition: background 0.3s;
        }
        .su-strength-label { font-size: 11px; font-weight: 600; letter-spacing: 0.04em; }

        .su-match {
          font-size: 11px; font-weight: 500; margin-top: 6px;
          display: flex; align-items: center; gap: 5px;
        }

        .su-terms {
          font-size: 12px; color: var(--muted); line-height: 1.55; text-align: center;
        }
        .su-terms a { color: var(--g-main); font-weight: 500; text-decoration: none; }
        .su-terms a:hover { text-decoration: underline; }

        .su-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, var(--g-main), var(--g-deep));
          color: white; border: none; border-radius: 14px;
          font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600;
          cursor: pointer; transition: var(--t);
          display: flex; align-items: center; justify-content: center; gap: 10px;
          box-shadow: 0 4px 16px rgba(45,106,79,0.28); letter-spacing: 0.02em;
        }
        .su-btn:hover:not(:disabled) {
          transform: translateY(-2px); box-shadow: 0 10px 28px rgba(45,106,79,0.38);
        }
        .su-btn:disabled { opacity: 0.70; cursor: not-allowed; transform: none; }
        .su-spinner {
          width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .su-divider {
          display: flex; align-items: center; gap: 12px;
          color: var(--muted); font-size: 12px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .su-divider::before, .su-divider::after {
          content: ''; flex: 1; height: 1px; background: var(--border);
        }

        .su-login-link {
          text-align: center; font-size: 14px; color: var(--muted);
        }
        .su-login-link a { color: var(--g-main); font-weight: 600; text-decoration: none; }
        .su-login-link a:hover { color: var(--g-rich); }

        @media (max-width: 900px) {
          .su-page { grid-template-columns: 1fr; }
          .su-left { display: none; }
          .su-right { padding: 40px 24px; min-height: 100vh; }
          .su-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="su-page">

        {/* LEFT */}
        <div className="su-left">
          <div className="su-left-dots" />
          <div className="su-left-glow" />
          <div className="su-left-content">
            <Link href="/" className="su-logo">
              <div className="su-logo-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/><path d="M8 12l3 3 5-5"/>
                </svg>
              </div>
              <div>
                <span className="su-logo-text">FreshMart</span>
                <span className="su-logo-sub">Premium Grocery</span>
              </div>
            </Link>

            <h2 className="su-left-title">Join thousands<br />shopping <em>fresh</em></h2>
            <p className="su-left-sub">Create your free account and get access to daily deals, same-day delivery, and 500+ organic products.</p>

            <div className="su-perks">
              {[
                { icon: '🚚', title: 'Free first delivery', sub: 'No minimum order required' },
                { icon: '🌿', title: '100% organic sourced', sub: 'Certified fresh, every day' },
                { icon: '↩️', title: 'Hassle-free returns', sub: 'Full refund within 24 hours' },
              ].map((p, i) => (
                <div key={i} className="su-perk">
                  <div className="su-perk-icon">{p.icon}</div>
                  <div>
                    <span className="su-perk-title">{p.title}</span>
                    <span className="su-perk-sub">{p.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="su-left-bottom">
            <p className="su-review">"FreshMart changed how I grocery shop. Everything arrives fresh and the prices are unbeatable."</p>
            <div className="su-reviewer">
              <div className="su-reviewer-avatar">A</div>
              <div>
                <div className="su-reviewer-name">Ayesha M. — Verified Customer</div>
                <div className="su-reviewer-stars">★★★★★</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="su-right">
          <div className="su-form-wrap">
            <div className="su-form-header">
              <div className="su-form-eyebrow"><span className="su-eyebrow-dot" /> New Account</div>
              <h1 className="su-form-title">Create your<br /><em>account</em></h1>
              <p className="su-form-sub">Fill in your details below to get started for free.</p>
            </div>

            {error && (
              <div className="su-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="su-form">
              <div className="su-row">
                <div className="su-field">
                  <label className="su-label">Full Name</label>
                  <div className="su-input-wrap">
                    <span className="su-input-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input className="su-input" type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Sara Khan" />
                  </div>
                </div>
                <div className="su-field">
                  <label className="su-label">Phone Number</label>
                  <div className="su-input-wrap">
                    <span className="su-input-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span>
                    <input className="su-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="03001234567" />
                  </div>
                </div>
              </div>

              <div className="su-field">
                <label className="su-label">Email Address</label>
                <div className="su-input-wrap">
                  <span className="su-input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  <input className="su-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="sara@example.com" />
                </div>
              </div>

              <div className="su-field">
                <label className="su-label">Password</label>
                <div className="su-input-wrap">
                  <span className="su-input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                  <input className="su-input" type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="At least 6 characters" style={{paddingRight: 42}} />
                  <button type="button" className="su-eye" onClick={() => setShowPass(!showPass)}>
                    {showPass
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
                {password && (
                  <div className="su-strength">
                    <div className="su-strength-bars">
                      {[1,2,3,4,5].map(n => (
                        <div key={n} className="su-strength-bar" style={{ background: n <= strength ? strengthColor[strength] : '#e5e7eb' }} />
                      ))}
                    </div>
                    <span className="su-strength-label" style={{ color: strengthColor[strength] }}>{strengthLabel[strength]}</span>
                  </div>
                )}
              </div>

              <div className="su-field">
                <label className="su-label">Confirm Password</label>
                <div className="su-input-wrap">
                  <span className="su-input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </span>
                  <input className="su-input" type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required placeholder="Repeat your password" style={{paddingRight: 42}} />
                  <button type="button" className="su-eye" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
                {confirmPassword && (
                  <div className="su-match" style={{ color: password === confirmPassword ? '#2d6a4f' : '#c53030' }}>
                    {password === confirmPassword
                      ? <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Passwords match</>
                      : <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Passwords don't match</>
                    }
                  </div>
                )}
              </div>

              <p className="su-terms">
                By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
              </p>

              <button type="submit" className="su-btn" disabled={loading}>
                {loading
                  ? <><span className="su-spinner" /> Creating Account...</>
                  : <>Create Account <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                }
              </button>

              <div className="su-divider">or</div>

              <div className="su-login-link">
                Already have an account? <Link href="/login">Sign in instead →</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}