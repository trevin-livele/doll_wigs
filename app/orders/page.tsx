"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Phone, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;

const orders = [
  {
    id: "DW-2026-001",
    date: "Feb 1, 2026",
    status: "delivered",
    total: 68300,
    mpesaRef: "QKL7X9M2NP",
    items: [
      { name: "Silky Straight Wig", price: 18500, oldPrice: 24000, image: "https://images.unsplash.com/photo-1611432579699-484f7990b127?w=200&h=200&fit=crop", quantity: 1 },
      { name: "Body Wave Lace Front", price: 24900, oldPrice: 32000, image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&h=200&fit=crop", quantity: 2 },
    ]
  },
  {
    id: "DW-2026-002",
    date: "Jan 28, 2026",
    status: "shipped",
    total: 29900,
    mpesaRef: "PLM8Y7K3QR",
    items: [
      { name: "Blonde Straight Wig", price: 29900, oldPrice: 38000, image: "https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?w=200&h=200&fit=crop", quantity: 1 },
    ]
  },
  {
    id: "DW-2026-003",
    date: "Jan 25, 2026",
    status: "processing",
    total: 35400,
    mpesaRef: "NKJ5T2W9XZ",
    items: [
      { name: "Curly Bob Wig", price: 15900, oldPrice: 21000, image: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=200&h=200&fit=crop", quantity: 1 },
      { name: "Kinky Curly Wig", price: 19500, oldPrice: 25900, image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&h=200&fit=crop", quantity: 1 },
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
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Header */}
      <header className="bg-white py-3 md:py-4 px-4 border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-[#CAB276] transition text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Back to Shop</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" />
          </Link>
          <div className="w-8 md:w-32"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-[#f8f6f1] rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 md:w-7 md:h-7 text-[#CAB276]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-gray-800">My Orders</h1>
            <p className="text-gray-500 text-sm">Track and manage your orders</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 md:py-20 bg-white rounded-xl md:rounded-2xl shadow-sm">
            <Package className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 md:mb-6 text-gray-300" />
            <p className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg">You haven&apos;t placed any orders yet</p>
            <Link href="/" className="inline-block bg-[#CAB276] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-[#b39a5e] transition font-semibold shadow-lg shadow-[#CAB276]/25">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {orders.map(order => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              
              return (
                <div key={order.id} className="bg-white rounded-xl md:rounded-2xl shadow-sm overflow-hidden">
                  {/* Order Header */}
                  <div className="p-4 md:p-5 bg-gradient-to-r from-[#f8f6f1] to-[#f5f3ed] border-b">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3 md:gap-8 text-sm">
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Order</p>
                          <p className="font-bold text-gray-800">{order.id}</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-xs text-gray-500 mb-0.5">Date</p>
                          <p className="font-medium text-gray-800">{order.date}</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-xs text-gray-500 mb-0.5">M-Pesa Ref</p>
                          <p className="font-medium text-gray-800">{order.mpesaRef}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Total</p>
                          <p className="font-bold text-[#CAB276]">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border text-xs md:text-sm ${status.color} self-start md:self-auto`}>
                        <StatusIcon className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="font-semibold">{status.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 md:p-5">
                    <div className="space-y-3 md:space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 md:gap-5">
                          <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 text-sm md:text-base truncate">{item.name}</h3>
                            <p className="text-xs md:text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#CAB276] text-sm md:text-base">{formatPrice(item.price * item.quantity)}</p>
                            <p className="text-[10px] md:text-xs text-gray-400 line-through">{formatPrice(item.oldPrice * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="p-4 md:p-5 border-t bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <button className="text-xs md:text-sm text-[#CAB276] hover:underline font-medium">View Details</button>
                    <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                      {order.status === "delivered" && (
                        <button className="flex-1 md:flex-none px-4 md:px-5 py-2 md:py-2.5 border-2 border-[#CAB276] text-[#CAB276] rounded-lg text-xs md:text-sm font-semibold hover:bg-[#f8f6f1] transition">
                          Buy Again
                        </button>
                      )}
                      {order.status === "shipped" && (
                        <button className="flex-1 md:flex-none px-4 md:px-5 py-2 md:py-2.5 bg-blue-500 text-white rounded-lg text-xs md:text-sm font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                          Track
                        </button>
                      )}
                      {order.status === "processing" && (
                        <button className="flex-1 md:flex-none px-4 md:px-5 py-2 md:py-2.5 bg-gray-100 text-gray-600 rounded-lg text-xs md:text-sm font-medium flex items-center justify-center gap-2">
                          <Phone className="w-3 h-3 md:w-4 md:h-4" />
                          Support
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
        <div className="mt-8 md:mt-12 bg-white rounded-xl md:rounded-2xl shadow-sm p-5 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="p-4 bg-[#f8f6f1] rounded-xl">
              <h3 className="font-medium text-gray-800 mb-2 text-sm md:text-base">📦 Shipping Info</h3>
              <p className="text-xs md:text-sm text-gray-600">Free delivery in Nairobi for orders above KSh 25,000.</p>
            </div>
            <div className="p-4 bg-[#f8f6f1] rounded-xl">
              <h3 className="font-medium text-gray-800 mb-2 text-sm md:text-base">🔄 Returns</h3>
              <p className="text-xs md:text-sm text-gray-600">Easy returns within 7 days. Wigs must be unworn.</p>
            </div>
            <div className="p-4 bg-[#f8f6f1] rounded-xl">
              <h3 className="font-medium text-gray-800 mb-2 text-sm md:text-base">📞 Contact Us</h3>
              <p className="text-xs md:text-sm text-gray-600">WhatsApp: +254 792 164 579</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
