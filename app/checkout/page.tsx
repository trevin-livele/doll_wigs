"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Smartphone, Shield, CheckCircle, MapPin } from "lucide-react";

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const [orderItems] = useState([
    { id: 1, name: "Sample Wig", price: 18500, oldPrice: 24000, image: "https://images.unsplash.com/photo-1611432579699-484f7990b127?w=200&h=200&fit=crop", quantity: 1 },
  ]);

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = orderItems.reduce((sum, item) => sum + (item.oldPrice - item.price) * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const inputClasses = "w-full border-2 border-gray-800 rounded-xl px-3 md:px-4 py-3 md:py-3.5 focus:outline-none focus:border-[#CAB276] focus:ring-4 focus:ring-[#CAB276]/10 transition-all placeholder:text-gray-400 bg-gray-800 text-white text-sm md:text-base";
  const labelClasses = "block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2";

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black py-3 md:py-4 px-4 border-b border-gray-800 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-gray-400 hover:text-[#CAB276] transition text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Back to Cart</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-500">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="hidden md:inline">Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-3 md:py-5">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {["Delivery", "Payment", "Done"].map((label, i) => (
              <div key={label} className="flex items-center gap-1 md:gap-3">
                <div className={`w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all ${
                  step > i + 1 ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 
                  step === i + 1 ? 'bg-[#CAB276] text-black shadow-lg shadow-[#CAB276]/30' : 'bg-gray-800 text-gray-500'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className={`transition-colors text-xs md:text-base font-medium hidden md:inline ${step === i + 1 ? 'text-white' : 'text-gray-400'}`}>{label}</span>
                {i < 2 && <div className={`w-6 md:w-12 h-0.5 ml-1 md:ml-2 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-700'}`}></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {step === 1 && (
              <div className="bg-gray-900 rounded-xl md:rounded-2xl shadow-sm p-5 md:p-8 border border-gray-800">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#CAB276]" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-white uppercase">Delivery Information</h2>
                    <p className="text-xs md:text-sm text-gray-500">Where should we deliver your wigs?</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label className={labelClasses}>First Name</label>
                    <input type="text" className={inputClasses} placeholder="e.g. Jane" />
                  </div>
                  <div>
                    <label className={labelClasses}>Last Name</label>
                    <input type="text" className={inputClasses} placeholder="e.g. Wanjiku" />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClasses}>Email Address</label>
                    <input type="email" className={inputClasses} placeholder="jane@example.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClasses}>Delivery Address</label>
                    <input type="text" className={inputClasses} placeholder="Building name, street, apartment number" />
                  </div>
                  <div>
                    <label className={labelClasses}>City / Town</label>
                    <input type="text" className={inputClasses} placeholder="e.g. Nairobi" />
                  </div>
                  <div>
                    <label className={labelClasses}>County</label>
                    <select className={`${inputClasses} cursor-pointer`}>
                      <option value="">Select county</option>
                      <option value="nairobi">Nairobi</option>
                      <option value="mombasa">Mombasa</option>
                      <option value="kisumu">Kisumu</option>
                      <option value="nakuru">Nakuru</option>
                      <option value="eldoret">Uasin Gishu</option>
                      <option value="kiambu">Kiambu</option>
                      <option value="machakos">Machakos</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Area / Estate</label>
                    <input type="text" className={inputClasses} placeholder="e.g. Westlands, Kilimani" />
                  </div>
                  <div>
                    <label className={labelClasses}>Phone Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 md:px-4 border-2 border-r-0 border-gray-800 rounded-l-xl bg-gray-900 text-gray-400 font-medium text-sm">
                        +254
                      </span>
                      <input type="tel" className="flex-1 border-2 border-gray-800 bg-gray-800 text-white rounded-r-xl px-3 md:px-4 py-3 md:py-3.5 focus:outline-none focus:border-[#CAB276] focus:ring-4 focus:ring-[#CAB276]/10 transition-all placeholder:text-gray-500 text-sm md:text-base" placeholder="792 164 579" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClasses}>Delivery Instructions (Optional)</label>
                    <textarea className={`${inputClasses} resize-none`} rows={2} placeholder="Any special instructions for delivery..."></textarea>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-[#CAB276] text-white py-3 md:py-4 rounded-xl font-semibold hover:bg-[#b39a5e] transition-all mt-6 md:mt-8 shadow-lg shadow-[#CAB276]/20"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-gray-900 rounded-xl md:rounded-2xl shadow-sm p-5 md:p-8 border border-gray-800">
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                    <Smartphone className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-white uppercase">Pay with M-Pesa</h2>
                    <p className="text-xs md:text-sm text-gray-500">Fast, secure mobile payment</p>
                  </div>
                </div>
                
                {/* M-Pesa Info Box */}
                <div className="bg-gray-900 border border-green-800 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30">
                      <span className="text-white font-bold text-base md:text-lg">M</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-500 mb-2 text-sm md:text-base">How M-Pesa Payment Works</h3>
                      <ol className="text-xs md:text-sm text-gray-400 space-y-1 md:space-y-1.5">
                        <li className="flex items-start gap-2"><span className="font-semibold text-green-500">1.</span> Enter your M-Pesa phone number</li>
                        <li className="flex items-start gap-2"><span className="font-semibold text-green-500">2.</span> Click &quot;Pay Now&quot; - you&apos;ll receive an STK push</li>
                        <li className="flex items-start gap-2"><span className="font-semibold text-green-500">3.</span> Enter your M-Pesa PIN to confirm</li>
                        <li className="flex items-start gap-2"><span className="font-semibold text-green-500">4.</span> Payment confirms instantly!</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 md:space-y-6">
                  <div>
                    <label className={labelClasses}>M-Pesa Phone Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 md:px-5 border-2 border-r-0 border-green-700 rounded-l-xl bg-gray-900 text-green-500 font-semibold text-sm md:text-base">
                        +254
                      </span>
                      <input 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 border-2 border-green-700 bg-gray-800 text-white rounded-r-xl px-3 md:px-4 py-3 md:py-4 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all placeholder:text-gray-500 text-base md:text-lg font-medium"
                        placeholder="792 164 579"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Enter the phone number registered with M-Pesa</p>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-medium text-sm md:text-base">Amount to Pay</span>
                      <span className="text-2xl md:text-3xl font-bold text-[#CAB276]">{formatPrice(total)}</span>
                    </div>
                    <p className="text-xs md:text-sm text-green-500 mt-2">You&apos;re saving {formatPrice(savings)} on this order! 🎉</p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-800 py-3 md:py-4 rounded-xl font-semibold hover:bg-gray-800 hover:border-gray-700 transition-all text-sm md:text-base"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="flex-1 bg-green-500 text-white py-3 md:py-4 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <Smartphone className="w-4 h-4 md:w-5 md:h-5" />
                    Pay {formatPrice(total)}
                  </button>
                </div>

                <p className="text-center text-xs text-gray-500 mt-4 md:mt-6 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Secured by Safaricom M-Pesa
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="bg-gray-900 rounded-xl md:rounded-2xl shadow-sm p-6 md:p-10 text-center border border-gray-800">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg shadow-green-500/20">
                  <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-500" />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 uppercase">Payment Successful! 🎉</h2>
                <p className="text-gray-400 mb-6 md:mb-8 text-base md:text-lg">Your order has been confirmed and is being processed.</p>
                
                <div className="bg-gray-900 rounded-xl p-4 md:p-6 mb-6 md:mb-8 text-left">
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <p className="text-xs md:text-sm text-gray-500 mb-1">Order Number</p>
                      <p className="font-bold text-white text-sm md:text-lg">DW-2026-004</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-gray-500 mb-1">M-Pesa Reference</p>
                      <p className="font-bold text-white text-sm md:text-lg">QKL7X9M2NP</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-gray-500 mb-1">Amount Paid</p>
                      <p className="font-bold text-green-500 text-sm md:text-lg">{formatPrice(total)}</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-gray-500 mb-1">Payment Status</p>
                      <p className="font-bold text-green-500 text-sm md:text-lg flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4" /> Confirmed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 md:p-4 mb-6 md:mb-8 text-left">
                  <p className="text-xs md:text-sm text-gray-400">
                    📦 <strong className="text-white">Estimated Delivery:</strong> 2-3 business days within Nairobi, 4-5 days for other counties.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                  <Link 
                    href="/orders"
                    className="flex-1 border-2 border-[#CAB276] text-[#CAB276] py-3 md:py-4 rounded-xl font-semibold hover:bg-gray-900 transition-all text-center text-sm md:text-base"
                  >
                    View My Orders
                  </Link>
                  <Link 
                    href="/"
                    className="flex-1 bg-[#CAB276] text-white py-3 md:py-4 rounded-xl font-semibold hover:bg-[#b39a5e] transition-all text-center shadow-lg shadow-[#CAB276]/20 text-sm md:text-base"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-gray-900 rounded-xl md:rounded-2xl shadow-sm p-5 md:p-6 lg:sticky lg:top-4 border border-gray-800">
              <h2 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6 uppercase">Order Summary</h2>
              
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                {orderItems.map(item => (
                  <div key={item.id} className="flex gap-3 md:gap-4">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 bg-[#CAB276] text-white text-[10px] md:text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-medium">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs md:text-sm font-bold text-[#CAB276]">{formatPrice(item.price)}</p>
                      <p className="text-[10px] md:text-xs text-gray-400 line-through">{formatPrice(item.oldPrice)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="my-4 md:my-5 border-gray-800" />
              
              <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>You Save</span>
                  <span className="font-medium">-{formatPrice(savings)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Delivery</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <hr className="my-2 border-gray-800" />
                <div className="flex justify-between text-base md:text-lg pt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-[#CAB276]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
