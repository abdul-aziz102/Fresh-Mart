'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am Azaan Supermarket Assistant 🌿\nHow can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages.filter((m) => m.role !== 'assistant' || messages.indexOf(m) !== 0), userMessage],
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message || 'Sorry, something went wrong.' }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I could not connect. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickReplies = ['Track my order', 'Delivery info', 'Best deals today', 'Contact support'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        .cb-wrap * { box-sizing: border-box; font-family: 'Inter', sans-serif; }

        /* FLOATING BUTTON */
        .cb-fab {
          position: fixed;
          bottom: 24px; right: 24px;
          width: 60px; height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #16a34a, #0f7a35);
          color: #fff; border: none; cursor: pointer;
          box-shadow: 0 4px 20px rgba(22,163,74,0.45);
          font-size: 26px; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .cb-fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(22,163,74,0.55); }
        .cb-fab:active { transform: scale(0.95); }

        /* PULSE RING */
        .cb-fab-ring {
          position: fixed;
          bottom: 14px; right: 14px;
          width: 80px; height: 80px;
          border-radius: 50%;
          border: 2px solid rgba(22,163,74,0.35);
          z-index: 9998;
          animation: cbPulse 2.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes cbPulse {
          0%,100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0; }
        }

        /* BADGE */
        .cb-badge {
          position: absolute; top: -4px; right: -4px;
          background: #ef4444; color: white;
          width: 20px; height: 20px; border-radius: 50%;
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid white;
          animation: cbPop 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes cbPop { from { transform: scale(0); } to { transform: scale(1); } }

        /* WINDOW */
        .cb-window {
          position: fixed;
          bottom: 96px; right: 24px;
          width: 380px; height: 560px;
          border-radius: 20px;
          display: flex; flex-direction: column;
          box-shadow: 0 20px 60px rgba(0,0,0,0.20), 0 4px 16px rgba(0,0,0,0.10);
          z-index: 9999;
          background: #f8fafc;
          border: 1px solid rgba(0,0,0,0.06);
          animation: cbSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
          overflow: hidden;
        }
        @keyframes cbSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .cb-window {
            bottom: 0; right: 0; left: 0;
            width: 100%; height: 100vh;
            border-radius: 0;
          }
          .cb-fab { bottom: 16px; right: 16px; }
          .cb-fab-ring { bottom: 6px; right: 6px; }
        }

        /* HEADER */
        .cb-header {
          background: linear-gradient(135deg, #16a34a, #0f7a35);
          padding: 16px 18px;
          display: flex; align-items: center; gap: 12px;
          flex-shrink: 0;
        }
        .cb-avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,0.20);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.30);
        }
        .cb-header-info { flex: 1; }
        .cb-header-name {
          color: white; font-size: 15px; font-weight: 600;
          display: block; line-height: 1.2;
        }
        .cb-header-status {
          color: rgba(255,255,255,0.80); font-size: 12px;
          display: flex; align-items: center; gap: 5px; margin-top: 2px;
        }
        .cb-status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #86efac;
          box-shadow: 0 0 0 2px rgba(134,239,172,0.30);
          animation: cbBlink 2s ease-in-out infinite;
        }
        @keyframes cbBlink { 0%,100%{opacity:1;} 50%{opacity:0.4;} }

        .cb-close-btn {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,0.15); border: none;
          color: white; cursor: pointer; font-size: 16px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .cb-close-btn:hover { background: rgba(255,255,255,0.25); }

        /* MESSAGES */
        .cb-messages {
          flex: 1; overflow-y: auto; padding: 16px;
          display: flex; flex-direction: column; gap: 12px;
          scroll-behavior: smooth;
        }
        .cb-messages::-webkit-scrollbar { width: 4px; }
        .cb-messages::-webkit-scrollbar-track { background: transparent; }
        .cb-messages::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

        /* MESSAGE BUBBLE */
        .cb-msg {
          display: flex; align-items: flex-end; gap: 8px;
          animation: cbFadeIn 0.25s ease;
        }
        @keyframes cbFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        .cb-msg.user { flex-direction: row-reverse; }

        .cb-msg-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, #16a34a, #0f7a35);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(22,163,74,0.30);
        }

        .cb-bubble {
          max-width: 75%; padding: 10px 14px;
          border-radius: 16px; font-size: 14px;
          line-height: 1.55; white-space: pre-wrap;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .cb-msg.bot .cb-bubble {
          background: white; color: #1f2937;
          border-bottom-left-radius: 4px;
          border: 1px solid rgba(0,0,0,0.06);
        }
        .cb-msg.user .cb-bubble {
          background: linear-gradient(135deg, #16a34a, #0f7a35);
          color: white; border-bottom-right-radius: 4px;
        }

        .cb-time {
          font-size: 10px; color: #9ca3af;
          margin-top: 3px; text-align: right;
        }
        .cb-msg.bot .cb-time { text-align: left; }

        /* TYPING */
        .cb-typing {
          display: flex; align-items: center; gap: 5px;
          padding: 12px 16px;
          background: white; border-radius: 16px;
          border-bottom-left-radius: 4px;
          width: fit-content;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .cb-typing span {
          width: 7px; height: 7px; border-radius: 50%;
          background: #9ca3af; display: inline-block;
          animation: cbTyping 1.2s ease-in-out infinite;
        }
        .cb-typing span:nth-child(2) { animation-delay: 0.2s; }
        .cb-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes cbTyping {
          0%,80%,100% { transform: translateY(0); background: #9ca3af; }
          40% { transform: translateY(-6px); background: #16a34a; }
        }

        /* QUICK REPLIES */
        .cb-quick {
          padding: 8px 16px 4px;
          display: flex; gap: 7px; flex-wrap: wrap; flex-shrink: 0;
        }
        .cb-quick-btn {
          padding: 6px 12px; border-radius: 20px;
          border: 1.5px solid #16a34a; color: #16a34a;
          background: white; font-size: 12px; font-weight: 500;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
          font-family: 'Inter', sans-serif;
        }
        .cb-quick-btn:hover { background: #16a34a; color: white; transform: translateY(-1px); }

        /* INPUT */
        .cb-input-wrap {
          padding: 12px 14px;
          border-top: 1px solid #e5e7eb;
          background: white; flex-shrink: 0;
        }
        .cb-input-inner {
          display: flex; align-items: center; gap: 8px;
          background: #f1f5f9; border-radius: 14px;
          padding: 8px 8px 8px 14px;
          border: 1.5px solid transparent;
          transition: border-color 0.2s;
        }
        .cb-input-inner:focus-within { border-color: #16a34a; background: white; }

        .cb-input {
          flex: 1; border: none; background: transparent;
          font-size: 14px; color: #1f2937; outline: none;
          font-family: 'Inter', sans-serif;
          resize: none; max-height: 80px;
        }
        .cb-input::placeholder { color: #9ca3af; }

        .cb-send-btn {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #16a34a, #0f7a35);
          color: white; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(22,163,74,0.35);
        }
        .cb-send-btn:hover { transform: scale(1.08); box-shadow: 0 4px 12px rgba(22,163,74,0.45); }
        .cb-send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .cb-footer-text {
          text-align: center; font-size: 11px; color: #9ca3af;
          margin-top: 6px;
        }
      `}</style>

      <div className="cb-wrap">
        {/* Pulse Ring — only when closed */}
        {!isOpen && <div className="cb-fab-ring" />}

        {/* Floating Button */}
        <button className="cb-fab" onClick={() => setIsOpen(!isOpen)} aria-label="Chat">
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          )}
          {!isOpen && messages.length > 1 && (
            <span className="cb-badge">1</span>
          )}
        </button>

        {/* Chat Window */}
        {isOpen && (
          <div className="cb-window">

            {/* Header */}
            <div className="cb-header">
              <div className="cb-avatar">🌿</div>
              <div className="cb-header-info">
                <span className="cb-header-name">Azaan Supermarket Assistant</span>
                <span className="cb-header-status">
                  <span className="cb-status-dot" />
                  Online · Usually replies instantly
                </span>
              </div>
              <button className="cb-close-btn" onClick={() => setIsOpen(false)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="cb-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`cb-msg ${msg.role === 'user' ? 'user' : 'bot'}`}>
                  {msg.role === 'assistant' && (
                    <div className="cb-msg-avatar">🌿</div>
                  )}
                  <div>
                    <div className="cb-bubble">{msg.content}</div>
                    <div className="cb-time">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="cb-msg bot">
                  <div className="cb-msg-avatar">🌿</div>
                  <div className="cb-typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies — show only at start */}
            {messages.length <= 1 && (
              <div className="cb-quick">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    className="cb-quick-btn"
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => inputRef.current?.focus(), 50);
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="cb-input-wrap">
              <form onSubmit={sendMessage}>
                <div className="cb-input-inner">
                  <input
                    ref={inputRef}
                    className="cb-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about products, delivery..."
                    disabled={isTyping}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(e);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    className="cb-send-btn"
                    disabled={!input.trim() || isTyping}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </div>
              </form>
              <p className="cb-footer-text">Powered by Azaan Supermarket AI · Available 24/7</p>
            </div>

          </div>
        )}
      </div>
    </>
  );
}