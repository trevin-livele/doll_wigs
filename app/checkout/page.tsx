"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Smartphone, Shield, CheckCircle, MapPin } from "lucide-react";

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const orderItems = [
    { id: 1, name: "Silky Straight Wig", price: 18500, oldPrice: 24000, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop", quantity: 1 },
    { id: 2, name: "Body Wave Lace Front", price: 24900, oldPrice: 32000, image: "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=200&h=200&fit=crop", quantity: 2 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = orderItems.reduce((sum, item) => sum + (item.oldPrice - item.price) * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const inputClasses = "w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#e88b7d] focus:ring-4 focus:ring-[#e88b7d]/10 transition-all placeholder:text-gray-400 bg-white";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-[#fdfbfa]">
      {/* Header */}
      <header className="bg-white py-4 px-4 border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-gray-600 hover:text-[#e88b7d] transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4 text-green-500" />
            Secure Checkout
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-center gap-4">
            {["Delivery Details", "M-Pesa Payment", "Confirmation"].map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step > i + 1 ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 
                  step === i + 1 ? 'bg-[#e88b7d] text-white shadow-lg shadow-[#e88b7d]/30' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className={`transition-colors font-medium ${step === i + 1 ? 'text-gray-800' : 'text-gray-400'}`}>{label}</span>
                {i < 2 && <div className={`w-12 h-0.5 ml-2 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-[#fdf6f0] rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#e88b7d]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Delivery Information</h2>
                    <p className="text-sm text-gray-500">Where should we deliver your wigs?</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>First Name</label>
                    <input type="text" className={inputClasses} placeholder="e.g. Jane" />
                  </div>
                  <div>
                    <label className={labelClasses}>Last Name</label>
                    <input type="text" className={inputClasses} placeholder="e.g. Wanjiku" />
                  </div>
                  <div className="col-span-2">
                    <label className={labelClasses}>Email Address</label>
                    <input type="email" className={inputClasses} placeholder="jane@example.com" />
                  </div>
                  <div className="col-span-2">
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
                      <span className="inline-flex items-center px-4 border-2 border-r-0 border-gray-200 rounded-l-xl bg-gray-50 text-gray-600 font-medium">
                        +254
                      </span>
                      <input type="tel" className="flex-1 border-2 border-gray-200 rounded-r-xl px-4 py-3.5 focus:outline-none focus:border-[#e88b7d] focus:ring-4 focus:ring-[#e88b7d]/10 transition-all placeholder:text-gray-400" placeholder="792 164 579" />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className={labelClasses}>Delivery Instructions (Optional)</label>
                    <textarea className={`${inputClasses} resize-none`} rows={2} placeholder="Any special instructions for delivery..."></textarea>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-[#e88b7d] text-white py-4 rounded-xl font-semibold hover:bg-[#d67a6c] transition-all mt-8 shadow-lg shadow-[#e88b7d]/25"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                    <Smartphone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Pay with M-Pesa</h2>
                    <p className="text-sm text-gray-500">Fast, secure mobile payment</p>
                  </div>
                </div>
                
                {/* M-Pesa Info Box */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30">
                      <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800 mb-2">How M-Pesa Payment Works</h3>
                      <ol className="text-sm text-green-700 space-y-1.5">
                        <li className="flex items-start gap-2"><span className="font-semibold">1.</span> Enter your M-Pesa registered phone number below</li>
                        <li className="flex items-start gap-2"><span className="font-semibold">2.</span> Click &quot;Pay Now&quot; - you&apos;ll receive an STK push notification</li>
                        <li className="flex items-start gap-2"><span className="font-semibold">3.</span> Enter your M-Pesa PIN on your phone to confirm</li>
                        <li className="flex items-start gap-2"><span className="font-semibold">4.</span> Payment confirms instantly!</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className={labelClasses}>M-Pesa Phone Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-5 border-2 border-r-0 border-green-200 rounded-l-xl bg-green-50 text-green-700 font-semibold">
                        +254
                      </span>
                      <input 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 border-2 border-green-200 rounded-r-xl px-4 py-4 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all placeholder:text-gray-400 text-lg font-medium"
                        placeholder="792 164 579"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Enter the phone number registered with M-Pesa</p>
                  </div>

                  <div className="bg-gradient-to-r from-[#fdf6f0] to-[#fef0eb] rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Amount to Pay</span>
                      <span className="text-3xl font-bold text-[#e88b7d]">{formatPrice(total)}</span>
                    </div>
                    <p className="text-sm text-green-600 mt-2">You&apos;re saving {formatPrice(savings)} on this order! 🎉</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-200 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="flex-1 bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-5 h-5" />
                    Pay {formatPrice(total)}
                  </button>
                </div>

                <p className="text-center text-xs text-gray-500 mt-6 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  Secured by Safaricom M-Pesa
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/20">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful! 🎉</h2>
                <p className="text-gray-600 mb-8 text-lg">Your order has been confirmed and is being processed.</p>
                
                <div className="bg-gradient-to-r from-[#fdf6f0] to-[#fef0eb] rounded-xl p-6 mb-8 text-left">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Order Number</p>
                      <p className="font-bold text-gray-800 text-lg">DW-2026-004</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">M-Pesa Reference</p>
                      <p className="font-bold text-gray-800 text-lg">QKL7X9M2NP</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
                      <p className="font-bold text-green-600 text-lg">{formatPrice(total)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                      <p className="font-bold text-green-600 text-lg flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Confirmed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-left">
                  <p className="text-sm text-blue-700">
                    📦 <strong>Estimated Delivery:</strong> 2-3 business days within Nairobi, 4-5 days for other counties.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Link 
                    href="/orders"
                    className="flex-1 border-2 border-[#e88b7d] text-[#e88b7d] py-4 rounded-xl font-semibold hover:bg-[#fdf6f0] transition-all text-center"
                  >
                    View My Orders
                  </Link>
                  <Link 
                    href="/"
                    className="flex-1 bg-[#e88b7d] text-white py-4 rounded-xl font-semibold hover:bg-[#d67a6c] transition-all text-center shadow-lg shadow-[#e88b7d]/25"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {orderItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 bg-[#e88b7d] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm font-bold text-[#e88b7d]">{formatPrice(item.price)}</p>
                      <p className="text-xs text-gray-400 line-through">{formatPrice(item.oldPrice)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="my-5" />
              
              <div className="space-y-3 text-sm">
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
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg pt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-[#e88b7d]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
