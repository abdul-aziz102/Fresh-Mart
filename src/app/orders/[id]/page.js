'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function OrderDetailPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchOrder();
  }, [id, user]);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    setCancelling(true);
    try {
      await api.put(`/orders/${id}/cancel`);
      fetchOrder();
      alert('Order cancelled successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order');
    } finally {
      setCancelling(false);
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

  const canCancelOrder = () => {
    return (
      order &&
      order.status !== 'Out for Delivery' &&
      order.status !== 'Delivered' &&
      order.status !== 'Cancelled'
    );
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="w-full px-4 md:px-6 lg:px-8 py-8 md:py-16">
          <div className="text-center text-lg md:text-xl text-gray-600">Loading order details...</div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="w-full px-4 md:px-6 lg:px-8 py-8 md:py-16">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 md:px-6 py-3 md:py-4 rounded-xl max-w-2xl mx-auto text-sm md:text-base">
            {error || 'Order not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-4 md:mb-6">
          <button
            onClick={() => router.push('/orders')}
            className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2 text-sm md:text-base"
          >
            ← Back to Orders
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 lg:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Order #{order._id.slice(-8).toUpperCase()}
              </h1>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                Placed on{' '}
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
              className={`mt-3 md:mt-0 inline-block px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base lg:text-lg font-semibold ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
            <div className="bg-gray-50 rounded-xl p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Delivery Address</h2>
              <div className="text-gray-700 space-y-1 text-sm md:text-base">
                <p className="font-medium">{order.deliveryAddress.street}</p>
                <p>
                  {order.deliveryAddress.city}, {order.deliveryAddress.state}{' '}
                  {order.deliveryAddress.zipCode}
                </p>
                <p className="mt-3 pt-3 border-t">
                  <span className="font-semibold">Phone:</span> {order.deliveryAddress.phone}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Payment</h2>
              <div className="text-gray-700">
                <p className="mb-2 text-sm md:text-base">
                  <span className="font-semibold">Method:</span> {order.paymentMethod}
                </p>
                <p className="text-3xl md:text-4xl font-bold text-green-600 mt-4">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Order Items</h2>
            <div className="space-y-3 md:space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-xl"
                >
                  {item.product?.image && (
                    <img
                      src={item.product.image}
                      alt={item.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base md:text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-lg md:text-xl font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {canCancelOrder() && (
            <div className="border-t pt-4 md:pt-6">
              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="bg-red-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-semibold hover:bg-red-700 transition disabled:bg-gray-400 text-sm md:text-base"
              >
                {cancelling ? 'Cancelling...' : 'Cancel Order'}
              </button>
              <p className="text-xs md:text-sm text-gray-600 mt-3">
                You can cancel this order before it's out for delivery
              </p>
            </div>
          )}

          {order.status === 'Delivered' && order.deliveredAt && (
            <div className="border-t pt-4 md:pt-6">
              <div className="bg-green-50 rounded-xl p-4 md:p-6">
                <p className="text-green-800 font-semibold text-base md:text-lg">
                  ✓ Delivered on{' '}
                  {new Date(order.deliveredAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          )}

          {order.status === 'Cancelled' && order.cancelledAt && (
            <div className="border-t pt-4 md:pt-6">
              <div className="bg-red-50 rounded-xl p-4 md:p-6">
                <p className="text-red-800 font-semibold text-base md:text-lg">
                  Cancelled on{' '}
                  {new Date(order.cancelledAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
