"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Phone, MapPin, Loader2, User } from "lucide-react";
import { useOrders } from "@/lib/hooks/use-orders";
import { useAuth } from "@/lib/hooks/use-auth";
import { useState } from "react";
import { AuthModal } from "@/components/auth/auth-modal";

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  delivered: { label: "Delivered", color: "bg-green-900/50 text-green-500 border-green-800", icon: CheckCircle },
  shipped: { label: "Out for Delivery", color: "bg-blue-900/50 text-blue-400 border-blue-800", icon: Truck },
  processing: { label: "Processing", color: "bg-amber-900/50 text-amber-500 border-amber-800", icon: Clock },
  pending: { label: "Pending", color: "bg-gray-900/50 text-gray-400 border-gray-700", icon: Clock },
};

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#CAB276]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <header className="bg-black py-3 md:py-4 px-4 border-b border-gray-800">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-[#CAB276] transition text-sm"><ArrowLeft className="w-4 h-4" /></Link>
            <Link href="/"><Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" /></Link>
            <div className="w-8"></div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-20 text-center">
          <User className="w-20 h-20 mx-auto mb-6 text-gray-700" />
          <h1 className="text-3xl font-serif text-white mb-4">Sign In to View Orders</h1>
          <p className="text-gray-400 mb-8">You need to be signed in to view your order history</p>
          <button onClick={() => setAuthModalOpen(true)} className="bg-[#CAB276] text-black px-8 py-3 rounded-lg font-medium hover:bg-[#b39a5e] transition">Sign In / Create Account</button>
        </div>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-black py-3 md:py-4 px-4 border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-[#CAB276] transition text-sm"><ArrowLeft className="w-4 h-4" /><span className="hidden md:inline">Back to Shop</span></Link>
          <Link href="/"><Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" /></Link>
          <div className="w-8 md:w-32"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-900 rounded-xl flex items-center justify-center border border-gray-800">
            <Package className="w-5 h-5 md:w-7 md:h-7 text-[#CAB276]" />
          </div>
          <div><h1 className="text-2xl md:text-3xl font-serif text-white font-bold uppercase">My Orders</h1><p className="text-gray-500 text-sm md:text-base">Track and manage your orders</p></div>
        </div>

        {ordersLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#CAB276]" /></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 md:py-20 bg-gray-900 rounded-xl md:rounded-2xl border border-gray-800">
            <Package className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 md:mb-6 text-gray-700" />
            <p className="text-gray-500 mb-4 md:mb-6 text-base md:text-lg">You haven&apos;t placed any orders yet</p>
            <Link href="/shop" className="inline-block bg-[#CAB276] text-black px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-[#b39a5e] transition font-semibold">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {orders.map(order => {
              const status = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              const orderDate = new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
              
              return (
                <div key={order.id} className="bg-gray-900 rounded-xl md:rounded-2xl overflow-hidden border border-gray-800">
                  <div className="p-4 md:p-5 bg-gray-800 border-b border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3 md:gap-8 text-sm">
                        <div><p className="text-xs text-gray-500 mb-0.5">Order</p><p className="font-bold text-white">{order.id.slice(0, 8).toUpperCase()}</p></div>
                        <div className="hidden md:block"><p className="text-xs text-gray-500 mb-0.5">Date</p><p className="font-medium text-white">{orderDate}</p></div>
                        <div><p className="text-xs text-gray-500 mb-0.5">Total</p><p className="font-bold text-[#CAB276]">{formatPrice(order.total)}</p></div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border text-xs md:text-sm ${status.color} self-start md:self-auto`}>
                        <StatusIcon className="w-3 h-3 md:w-4 md:h-4" /><span className="font-semibold">{status.label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 md:p-5">
                    <div className="space-y-3 md:space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 md:gap-5">
                          <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 bg-gray-800">
                            {item.product_image && <Image src={item.product_image} alt={item.product_name} fill className="object-cover" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white text-sm md:text-base truncate uppercase">{item.product_name}</h3>
                            <p className="text-xs md:text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#CAB276] text-sm md:text-base">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 md:p-5 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div className="text-xs md:text-sm text-gray-500">
                      <span className="text-gray-400">Deliver to:</span> {order.shipping_address?.name}, {order.shipping_address?.city}
                    </div>
                    <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                      {order.status === "delivered" && (
                        <Link href="/shop" className="flex-1 md:flex-none px-4 md:px-5 py-2 md:py-2.5 border-2 border-[#CAB276] text-[#CAB276] rounded-lg text-xs md:text-sm font-semibold hover:bg-[#CAB276]/10 transition text-center">Buy Again</Link>
                      )}
                      {order.status === "shipped" && (
                        <button className="flex-1 md:flex-none px-4 md:px-5 py-2 md:py-2.5 bg-blue-600 text-white rounded-lg text-xs md:text-sm font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"><MapPin className="w-3 h-3 md:w-4 md:h-4" />Track</button>
                      )}
                      {(order.status === "processing" || order.status === "pending") && (
                        <a href="https://wa.me/254792164579" className="flex-1 md:flex-none px-4 md:px-5 py-2 md:py-2.5 bg-gray-800 text-gray-300 rounded-lg text-xs md:text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition"><Phone className="w-3 h-3 md:w-4 md:h-4" />Support</a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 md:mt-12 bg-gray-900 rounded-xl md:rounded-2xl p-5 md:p-8 border border-gray-800">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4 uppercase">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="p-4 bg-gray-800 rounded-xl"><h3 className="font-medium text-white mb-2 text-sm md:text-base">📦 Shipping Info</h3><p className="text-xs md:text-sm text-gray-400">Free delivery in Nairobi for orders above KSh 25,000.</p></div>
            <div className="p-4 bg-gray-800 rounded-xl"><h3 className="font-medium text-white mb-2 text-sm md:text-base">🔄 Returns</h3><p className="text-xs md:text-sm text-gray-400">Easy returns within 7 days. Wigs must be unworn.</p></div>
            <div className="p-4 bg-gray-800 rounded-xl"><h3 className="font-medium text-white mb-2 text-sm md:text-base">📞 Contact Us</h3><p className="text-xs md:text-sm text-gray-400">WhatsApp: +254 792 164 579</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
