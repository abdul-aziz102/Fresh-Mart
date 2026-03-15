'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
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
        setError('Access denied. Admin credentials required.');
        setLoading(false);
      }
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        :root {
          --admin-dark: #0f172a;
          --admin-darker: #020617;
          --admin-slate: #1e293b;
          --admin-blue: #3b82f6;
          --admin-blue-dark: #2563eb;
          --admin-cyan: #06b6d4;
          --admin-text: #f1f5f9;
          --admin-muted: #94a3b8;
          --admin-border: rgba(148, 163, 184, 0.1);
        }

        .admin-page {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, var(--admin-darker) 0%, var(--admin-dark) 50%, #1e293b 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .admin-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .admin-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%);
          top: -200px;
          right: -200px;
          pointer-events: none;
          animation: pulse 8s ease-in-out infinite;
        }

        .admin-glow2 {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.1), transparent 70%);
          bottom: -150px;
          left: -150px;
          pointer-events: none;
          animation: pulse 10s ease-in-out infinite reverse;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .admin-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 440px;
        }

        .admin-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .admin-shield {
          width: 64px;
          height: 64px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, var(--admin-blue), var(--admin-cyan));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--admin-cyan);
          margin-bottom: 16px;
        }

        .admin-badge-dot {
          width: 6px;
          height: 6px;
          background: var(--admin-cyan);
          border-radius: 50%;
          animation: blink 2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .admin-title {
          font-size: 32px;
          font-weight: 800;
          color: var(--admin-text);
          margin: 0 0 8px;
          letter-spacing: -0.5px;
        }

        .admin-subtitle {
          font-size: 14px;
          font-weight: 400;
          color: var(--admin-muted);
          margin: 0;
        }

        .admin-card {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid var(--admin-border);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .admin-error {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 12px;
          padding: 12px 16px;
          color: #fca5a5;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 24px;
        }

        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .admin-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .admin-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--admin-text);
        }

        .admin-input-wrap {
          position: relative;
        }

        .admin-input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--admin-muted);
          pointer-events: none;
        }

        .admin-input {
          width: 100%;
          padding: 14px 16px 14px 46px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--admin-border);
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: var(--admin-text);
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .admin-input:focus {
          background: rgba(15, 23, 42, 0.8);
          border-color: var(--admin-blue);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .admin-input::placeholder {
          color: #475569;
        }

        .admin-eye {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--admin-muted);
          padding: 4px;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }

        .admin-eye:hover {
          color: var(--admin-blue);
        }

        .admin-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, var(--admin-blue), var(--admin-blue-dark));
          color: white;
          border: none;
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
          margin-top: 8px;
        }

        .admin-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
        }

        .admin-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .admin-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .admin-footer {
          text-align: center;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--admin-border);
        }

        .admin-footer-text {
          font-size: 12px;
          color: var(--admin-muted);
        }

        .admin-footer-text code {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 11px;
          color: var(--admin-cyan);
          font-family: 'Inter', monospace;
        }

        @media (max-width: 640px) {
          .admin-card {
            padding: 28px 24px;
          }
          .admin-title {
            font-size: 26px;
          }
        }
      `}</style>

      <div className="admin-page">
        <div className="admin-bg-grid" />
        <div className="admin-glow" />
        <div className="admin-glow2" />

        <div className="admin-container">
          <div className="admin-header">
            <div className="admin-shield">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <div className="admin-badge">
              <span className="admin-badge-dot" />
              Admin Access
            </div>
            <h1 className="admin-title">Admin Portal</h1>
            <p className="admin-subtitle">Secure access for authorized personnel only</p>
          </div>

          <div className="admin-card">
            {error && (
              <div className="admin-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-field">
                <label className="admin-label">Admin Email</label>
                <div className="admin-input-wrap">
                  <span className="admin-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <input
                    className="admin-input"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="admin@grocery.com"
                  />
                </div>
              </div>

              <div className="admin-field">
                <label className="admin-label">Password</label>
                <div className="admin-input-wrap">
                  <span className="admin-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    className="admin-input"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Enter admin password"
                    style={{paddingRight: 46}}
                  />
                  <button type="button" className="admin-eye" onClick={() => setShowPass(!showPass)}>
                    {showPass
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>

              <button type="submit" className="admin-btn" disabled={loading}>
                {loading
                  ? <><span className="admin-spinner" /> Authenticating...</>
                  : <>Access Dashboard <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                }
              </button>
            </form>

            
          </div>
        </div>
      </div>
    </>
  );
}
