'use client';

import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-6 mt-auto w-full">
        <div className="w-full px-4 text-center">
          <p>&copy; 2026 Grocery Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
