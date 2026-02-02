"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Phone, MapPin } from "lucide-react";

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;

const orders = [
  {
    id: "DW-2026-001",
    date: "Feb 1, 2026",
    status: "delivered",
    total: 68300,
    mpesaRef: "QKL7X9M2NP",
    items: [
      { name: "Silky Straight Wig", price: 18500, oldPrice: 24000, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop", quantity: 1 },
      { name: "Body Wave Lace Front", price: 24900, oldPrice: 32000, image: "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=200&h=200&fit=crop", quantity: 2 },
    ]
  },
  {
    id: "DW-2026-002",
    date: "Jan 28, 2026",
    status: "shipped",
    total: 29900,
    mpesaRef: "PLM8Y7K3QR",
    items: [
      { name: "Blonde Straight Wig", price: 29900, oldPrice: 38000, image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=200&h=200&fit=crop", quantity: 1 },
    ]
  },
  {
    id: "DW-2026-003",
    date: "Jan 25, 2026",
    status: "processing",
    total: 35400,
    mpesaRef: "NKJ5T2W9XZ",
    items: [
      { name: "Curly Bob Wig", price: 15900, oldPrice: 21000, image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop", quantity: 1 },
      { name: "Kinky Curly Wig", price: 19500, oldPrice: 25900, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop", quantity: 1 },
    ]
  },
];

const statusConfig = {
  delivered: { label: "Delivered", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
  shipped: { label: "Out for Delivery", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Truck },
  processing: { label: "Processing", color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#fdfbfa]">
      {/* Header */}
      <header className="bg-white py-4 px-4 border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-[#e88b7d] transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-10 w-auto" />
          </Link>
          <div className="w-32"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-[#fdf6f0] rounded-xl flex items-center justify-center">
            <Package className="w-7 h-7 text-[#e88b7d]" />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-gray-800">My Orders</h1>
            <p className="text-gray-500">Track and manage your orders</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <Package className="w-20 h-20 mx-auto mb-6 text-gray-300" />
            <p className="text-gray-500 mb-6 text-lg">You haven&apos;t placed any orders yet</p>
            <Link href="/" className="inline-block bg-[#e88b7d] text-white px-8 py-4 rounded-xl hover:bg-[#d67a6c] transition font-semibold shadow-lg shadow-[#e88b7d]/25">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              
              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  {/* Order Header */}
                  <div className="p-5 bg-gradient-to-r from-[#fdf6f0] to-[#fef0eb] border-b flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Order Number</p>
                        <p className="font-bold text-gray-800">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Date Placed</p>
                        <p className="font-medium text-gray-800">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">M-Pesa Ref</p>
                        <p className="font-medium text-gray-800">{order.mpesaRef}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Total</p>
                        <p className="font-bold text-[#e88b7d]">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${status.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{status.label}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-5">
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-5">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#e88b7d]">{formatPrice(item.price * item.quantity)}</p>
                            <p className="text-xs text-gray-400 line-through">{formatPrice(item.oldPrice * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="p-5 border-t bg-gray-50 flex justify-between items-center">
                    <button className="text-sm text-[#e88b7d] hover:underline font-medium">View Order Details</button>
                    <div className="flex gap-3">
                      {order.status === "delivered" && (
                        <button className="px-5 py-2.5 border-2 border-[#e88b7d] text-[#e88b7d] rounded-lg text-sm font-semibold hover:bg-[#fdf6f0] transition">
                          Buy Again
                        </button>
                      )}
                      {order.status === "shipped" && (
                        <button className="px-5 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition flex items-center gap-2 shadow-lg shadow-blue-500/25">
                          <MapPin className="w-4 h-4" />
                          Track Package
                        </button>
                      )}
                      {order.status === "processing" && (
                        <button className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Contact Support
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Need Help?</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 bg-[#fdf6f0] rounded-xl">
              <h3 className="font-medium text-gray-800 mb-2">📦 Shipping Info</h3>
              <p className="text-sm text-gray-600">Free delivery in Nairobi for orders above KSh 25,000. Other counties 4-5 business days.</p>
            </div>
            <div className="p-4 bg-[#fdf6f0] rounded-xl">
              <h3 className="font-medium text-gray-800 mb-2">🔄 Returns</h3>
              <p className="text-sm text-gray-600">Easy returns within 7 days. Wigs must be unworn with tags attached.</p>
            </div>
            <div className="p-4 bg-[#fdf6f0] rounded-xl">
              <h3 className="font-medium text-gray-800 mb-2">📞 Contact Us</h3>
              <p className="text-sm text-gray-600">WhatsApp: +254 792 164 579<br />Email: support@dollwigs.co.ke</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
