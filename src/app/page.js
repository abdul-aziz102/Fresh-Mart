'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import WhyFreshSection from '@/components/WhyFreshSection';
import VideoSection from '@/components/VideoSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      addToCart(product, 1);
      alert(`${product.name} added to cart!`);
    }
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <HeroSection />

      {/* FEATURES BAR */}
      <section className="w-full bg-white border-t border-b border-gray-200 py-6 md:py-8">
        <div className="w-full px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-4">
            <div className="flex items-center gap-3 md:gap-4 justify-center sm:justify-start">
              <div className="text-3xl md:text-5xl">🌿</div>
              <div>
                <h3 className="font-bold text-[#1a1a1a] text-sm md:text-lg">100% Organic Food</h3>
                <p className="text-[#666666] text-xs md:text-sm">Fresh from farm</p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4 justify-center sm:justify-start">
              <div className="text-3xl md:text-5xl">📞</div>
              <div>
                <h3 className="font-bold text-[#1a1a1a] text-sm md:text-lg">24/7 Support</h3>
                <p className="text-[#666666] text-xs md:text-sm">Always here to help</p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4 justify-center sm:justify-start">
              <div className="text-3xl md:text-5xl">🎁</div>
              <div>
                <h3 className="font-bold text-[#1a1a1a] text-sm md:text-lg">Great Daily Offers</h3>
                <p className="text-[#666666] text-xs md:text-sm">Save up to 50%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FRESH MATTERS SECTION */}
      <WhyFreshSection />

      {/* CATEGORIES SECTION */}
      <CategoriesSection />

      {/* FEATURED PRODUCTS SECTION */}
      <FeaturedProducts products={products} onAddToCart={handleAddToCart} />

      {/* VIDEO SECTION */}
      <VideoSection />

      {/* TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* NEWSLETTER SECTION */}
      <NewsletterSection />
    </div>
  );
}
