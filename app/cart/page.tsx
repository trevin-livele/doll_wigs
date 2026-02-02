"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ArrowLeft, ShoppingBag } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  quantity: number;
}

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "Silky Straight Wig", price: 18500, oldPrice: 24000, image: "https://images.unsplash.com/photo-1611432579699-484f7990b127?w=200&h=200&fit=crop", quantity: 1 },
    { id: 2, name: "Body Wave Lace Front", price: 24900, oldPrice: 32000, image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&h=200&fit=crop", quantity: 2 },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = cart.reduce((sum, item) => sum + (item.oldPrice - item.price) * item.quantity, 0);
  const shipping = subtotal > 25000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#fdfbfa]">
      {/* Header */}
      <header className="bg-white py-4 px-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-[#e88b7d] transition text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Continue Shopping</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" />
          </Link>
          <div className="w-8 md:w-32"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <h1 className="text-2xl md:text-3xl font-serif text-gray-800 mb-6 md:mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12 md:py-16 bg-white rounded-xl shadow-sm">
            <ShoppingBag className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-6 text-base md:text-lg">Your cart is empty</p>
            <Link href="/" className="inline-block bg-[#e88b7d] text-white px-6 md:px-8 py-3 rounded-lg hover:bg-[#d67a6c] transition font-medium">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-500">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
                
                {cart.map(item => (
                  <div key={item.id} className="p-4 md:p-5 border-b hover:bg-gray-50 transition">
                    {/* Mobile Layout */}
                    <div className="md:hidden flex gap-3">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-gray-800 text-sm">{item.name}</span>
                          <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[#e88b7d] font-semibold text-sm mt-1">{formatPrice(item.price)}</p>
                        <p className="text-xs text-gray-400 line-through">{formatPrice(item.oldPrice)}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 rounded border flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 rounded border flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-gray-800 text-sm">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6 flex items-center gap-4">
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition p-1">
                          <X className="w-4 h-4" />
                        </button>
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden shadow-sm">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">{item.name}</span>
                          <p className="text-xs text-green-600 mt-1">Save {formatPrice(item.oldPrice - item.price)}</p>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="font-semibold text-[#e88b7d]">{formatPrice(item.price)}</span>
                        <p className="text-xs text-gray-400 line-through">{formatPrice(item.oldPrice)}</p>
                      </div>
                      <div className="col-span-2 flex items-center justify-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-[#e88b7d] hover:text-[#e88b7d] transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-[#e88b7d] hover:text-[#e88b7d] transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="col-span-2 text-center font-bold text-gray-800">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 md:mb-6">Order Summary</h2>
                
                <div className="space-y-3 md:space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>You Save</span>
                    <span className="font-medium">-{formatPrice(savings)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium">{shipping === 0 ? <span className="text-green-600">FREE</span> : formatPrice(shipping)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-500 bg-[#fdf6f0] p-2 rounded">
                      Add {formatPrice(25000 - subtotal)} more for free delivery
                    </p>
                  )}
                  <hr className="my-2" />
                  <div className="flex justify-between text-base md:text-lg pt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-[#e88b7d]">{formatPrice(total)}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  className="block w-full bg-[#e88b7d] text-white py-3 md:py-4 rounded-lg text-center font-medium hover:bg-[#d67a6c] transition mt-5 md:mt-6 shadow-lg shadow-[#e88b7d]/25"
                >
                  Proceed to Checkout
                </Link>

                <div className="mt-4 p-3 bg-green-50 rounded-lg text-xs text-green-700 flex items-center gap-2">
                  <span className="text-lg">📱</span>
                  <span>Pay securely with M-Pesa</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
