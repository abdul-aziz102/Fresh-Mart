'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/myorders');
      setOrders(response.data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Out for Delivery':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="w-full px-4 md:px-6 lg:px-8 py-8 md:py-16">
          <div className="text-center text-lg md:text-xl text-gray-600">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8">My Orders</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 md:px-6 py-3 md:py-4 rounded-xl mb-6 text-sm md:text-base">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 text-center">
            <div className="text-5xl md:text-6xl mb-4 md:mb-6">📦</div>
            <p className="text-gray-600 text-lg md:text-2xl mb-6 md:mb-8">You haven't placed any orders yet</p>
            <Link
              href="/products"
              className="inline-block bg-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:bg-green-700 transition shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 md:mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span
                    className={`mt-3 md:mt-0 inline-block px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mb-3 md:mb-4 pb-3 md:pb-4 border-b">
                  <p className="text-gray-700 mb-2 font-medium text-sm md:text-base">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {order.items.slice(0, 3).map((item, index) => (
                      <span key={index} className="bg-gray-100 px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm text-gray-700">
                        {item.name} × {item.quantity}
                      </span>
                    ))}
                    {order.items.length > 3 && (
                      <span className="bg-gray-100 px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm text-gray-600">
                        +{order.items.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-2xl md:text-3xl font-bold text-green-600">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                    <span className="text-gray-600 ml-2 text-sm md:text-base">
                      • {order.paymentMethod}
                    </span>
                  </div>
                  <Link
                    href={`/orders/${order._id}`}
                    className="inline-block bg-green-600 text-white px-5 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-green-700 transition text-sm md:text-base text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
