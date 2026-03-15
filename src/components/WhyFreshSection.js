export default function WhyFreshSection() {
  const features = [
    {
      icon: '🌱',
      title: 'Farm Direct',
      description: 'Cut out the middlemen. Direct from 50+ local farms to your door.',
      number: '01'
    },
    {
      icon: '⚡',
      title: 'Same Day',
      description: 'Order before 2pm and receive your groceries within 2 hours guaranteed.',
      number: '02'
    },
    {
      icon: '🧪',
      title: 'Lab Tested',
      description: 'Every batch tested for pesticides and quality before we accept it.',
      number: '03'
    },
    {
      icon: '♻️',
      title: 'Eco Packed',
      description: '100% biodegradable packaging. Good for you and the planet.',
      number: '04'
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        .why-fresh-section {
          font-family: 'Outfit', sans-serif;
          background: white;
          padding: 80px 0;
        }

        .why-fresh-container {
          max-width: 1340px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .why-fresh-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .why-fresh-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 700;
          color: #0d2b1f;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.5px;
        }

        .why-fresh-title em {
          font-style: normal;
          color: #2d6a4f;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .feature-column {
          position: relative;
          padding: 32px 24px;
          border-radius: 20px;
          transition: all 0.35s ease;
          overflow: hidden;
        }

        .feature-column::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #2d6a4f, #52b788);
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .feature-column:hover {
          transform: translateY(-8px);
          background: #f0faf4;
        }

        .feature-column:hover::before {
          opacity: 1;
        }

        .feature-number {
          position: absolute;
          top: 20px;
          right: 20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 72px;
          font-weight: 700;
          color: rgba(45,106,79,0.06);
          line-height: 1;
          z-index: 0;
        }

        .feature-icon-wrap {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #2d6a4f, #52b788);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 20px;
          box-shadow: 0 8px 24px rgba(45,106,79,0.20);
          position: relative;
          z-index: 1;
          transition: all 0.35s ease;
        }

        .feature-column:hover .feature-icon-wrap {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 12px 32px rgba(45,106,79,0.30);
        }

        .feature-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 700;
          color: #0d2b1f;
          margin: 0 0 12px;
          position: relative;
          z-index: 1;
        }

        .feature-description {
          font-size: 14px;
          font-weight: 300;
          color: #6b7280;
          line-height: 1.7;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 1100px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 640px) {
          .why-fresh-section {
            padding: 60px 0;
          }
          .why-fresh-container {
            padding: 0 24px;
          }
          .features-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      <section className="why-fresh-section">
        <div className="why-fresh-container">
          <div className="why-fresh-header">
            <h2 className="why-fresh-title">
              Why Fresh <em>Matters</em>
            </h2>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-column">
                <div className="feature-number">{feature.number}</div>
                <div className="feature-icon-wrap">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
