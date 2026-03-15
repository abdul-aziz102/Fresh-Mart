'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const video = document.getElementById('hero-video');
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        .video-section {
          font-family: 'Outfit', sans-serif;
          background: #0d2b1f;
          position: relative;
          overflow: hidden;
          padding: 80px 0;
        }

        .video-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(82,183,136,0.08) 1.5px, transparent 1.5px);
          background-size: 30px 30px;
          pointer-events: none;
        }

        .video-container {
          position: relative;
          z-index: 1;
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .video-left {
          color: white;
        }

        .video-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #52b788;
          margin-bottom: 20px;
        }

        .video-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 4vw, 56px);
          font-weight: 700;
          line-height: 1.1;
          color: white;
          margin: 0 0 20px;
          letter-spacing: -0.5px;
        }

        .video-subtext {
          font-size: 16px;
          font-weight: 300;
          color: rgba(255,255,255,0.70);
          line-height: 1.7;
          margin: 0 0 32px;
          max-width: 480px;
        }

        .video-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #2d6a4f, #1a4731);
          color: white;
          font-size: 15px;
          font-weight: 600;
          padding: 14px 28px;
          border-radius: 50px;
          text-decoration: none;
          box-shadow: 0 6px 24px rgba(82,183,136,0.30);
          transition: all 0.3s ease;
          margin-bottom: 40px;
        }

        .video-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(82,183,136,0.40);
        }

        .video-stats {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .stat-pill {
          background: rgba(82,183,136,0.15);
          border: 1px solid rgba(82,183,136,0.25);
          border-radius: 30px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 600;
          color: #52b788;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .stat-dot {
          width: 6px;
          height: 6px;
          background: #52b788;
          border-radius: 50%;
        }

        .video-right {
          position: relative;
        }

        .video-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.40);
        }

        .video-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #52b788, #2d6a4f);
          border-radius: 24px;
          z-index: -1;
          opacity: 0.6;
          filter: blur(20px);
        }

        .video-player {
          width: 100%;
          height: 400px;
          object-fit: cover;
          display: block;
          border-radius: 24px;
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: rgba(13,43,31,0.30);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          cursor: pointer;
        }

        .video-card:hover .video-overlay {
          opacity: 1;
        }

        .play-btn {
          width: 70px;
          height: 70px;
          background: rgba(255,255,255,0.95);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 30px rgba(0,0,0,0.30);
          transition: all 0.3s ease;
        }

        .play-btn:hover {
          transform: scale(1.1);
          background: white;
        }

        @media (max-width: 900px) {
          .video-section {
            padding: 60px 0;
          }
          .video-container {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 0 24px;
          }
          .video-player {
            height: 300px;
          }
        }
      `}</style>

      <section className="video-section">
        <div className="video-dots" />

        <div className="video-container">
          <div className="video-left">
            <div className="video-eyebrow">
              ✦ FreshMart Story
            </div>

            <h2 className="video-heading">
              See how we bring freshness to your door
            </h2>

            <p className="video-subtext">
              From farm to table in under 24 hours. Watch our journey of sourcing the finest organic produce directly from local farmers and delivering it fresh to your doorstep.
            </p>

            <Link href="/products" className="video-cta">
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>

            <div className="video-stats">
              <div className="stat-pill">
                <span className="stat-dot" />
                500+ Products
              </div>
              <div className="stat-pill">
                <span className="stat-dot" />
                2hr Delivery
              </div>
              <div className="stat-pill">
                <span className="stat-dot" />
                98% Organic
              </div>
            </div>
          </div>

          <div className="video-right">
            <div className="video-card">
              <video
                id="hero-video"
                className="video-player"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="video-overlay" onClick={togglePlay}>
                <div className="play-btn">
                  {isPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="4" width="4" height="16"/>
                      <rect x="14" y="4" width="4" height="16"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
