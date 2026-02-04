"use client";

import { Package, ShoppingCart, Users, DollarSign, Clock, Loader2 } from "lucide-react";
import { useAdminStats, useAdminOrders } from "@/lib/hooks/use-admin";
import Link from "next/link";

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;

export default function ManageDashboard() {
  const { stats, loading: statsLoading } = useAdminStats();
  const { orders, loading: ordersLoading } = useAdminOrders();

  const recentOrders = orders.slice(0, 5);

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#CAB276]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm">Welcome to your store management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#CAB276]/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#CAB276]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{formatPrice(stats.totalRevenue)}</p>
          <p className="text-gray-500 text-sm">Total Revenue</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
          <p className="text-gray-500 text-sm">Total Orders</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalProducts}</p>
          <p className="text-gray-500 text-sm">Products</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalCustomers}</p>
          <p className="text-gray-500 text-sm">Customers</p>
        </div>
      </div>

      {/* Pending Orders Alert */}
      {stats.pendingOrders > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-yellow-500" />
          <p className="text-yellow-200">
            You have <span className="font-bold">{stats.pendingOrders}</span> pending order(s)
          </p>
          <Link href="/manage/orders" className="ml-auto text-yellow-400 hover:underline text-sm">
            View Orders →
          </Link>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-gray-900 rounded-xl border border-gray-800">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="font-semibold text-white">Recent Orders</h2>
          <Link href="/manage/orders" className="text-[#CAB276] text-sm hover:underline">
            View All
          </Link>
        </div>
        {ordersLoading ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#CAB276]" />
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No orders yet</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {order.shipping_address?.name || "Customer"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#CAB276] font-medium">{formatPrice(order.total)}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      order.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : order.status === "processing"
                        ? "bg-blue-500/20 text-blue-400"
                        : order.status === "shipped"
                        ? "bg-purple-500/20 text-purple-400"
                        : order.status === "delivered"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
