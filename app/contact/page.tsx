"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, User, Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Menu, X } from "lucide-react";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// WhatsApp icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const inputClasses = "w-full border-2 border-gray-200 rounded-xl px-3 md:px-4 py-3 md:py-3.5 focus:outline-none focus:border-[#e88b7d] focus:ring-4 focus:ring-[#e88b7d]/10 transition-all placeholder:text-gray-400 text-sm md:text-base";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white py-3 px-4 border-b sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/" className="text-gray-700 hover:text-[#e88b7d] transition">HOME</Link>
            <Link href="/shop" className="text-gray-700 hover:text-[#e88b7d] transition">SHOP</Link>
            <Link href="/about" className="text-gray-700 hover:text-[#e88b7d] transition">ABOUT</Link>
            <Link href="/contact" className="text-[#e88b7d] font-medium">CONTACT</Link>
          </nav>
          
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" />
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/wishlist"><Heart className="w-5 h-5 text-gray-600" /></Link>
            <Link href="/cart"><ShoppingCart className="w-5 h-5 text-gray-600" /></Link>
            <Link href="/account" className="hidden md:block"><User className="w-5 h-5 text-gray-600" /></Link>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col border-t mt-3 pt-3">
            <Link href="/" className="py-2 text-gray-700">HOME</Link>
            <Link href="/shop" className="py-2 text-gray-700">SHOP</Link>
            <Link href="/about" className="py-2 text-gray-700">ABOUT</Link>
            <Link href="/contact" className="py-2 text-[#e88b7d] font-medium">CONTACT</Link>
          </nav>
        )}
      </header>

      {/* Hero */}
      <div className="bg-[#fdf6f0] py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-3 md:mb-4">Contact Us</h1>
          <p className="text-gray-600 text-sm md:text-base">We&apos;d love to hear from you!</p>
        </div>
      </div>

      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl md:text-2xl font-serif text-gray-800 mb-6 md:mb-8">Get In Touch</h2>
              
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#fdf6f0] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#e88b7d]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">Phone / WhatsApp</h3>
                    <p className="text-gray-600 text-sm">+254 792 164 579</p>
                    <a href="https://wa.me/254792164579" className="text-[#e88b7d] text-xs md:text-sm hover:underline">Chat on WhatsApp →</a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#fdf6f0] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#e88b7d]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">Email</h3>
                    <p className="text-gray-600 text-sm">info@dollwigs.co.ke</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#fdf6f0] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#e88b7d]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">Location</h3>
                    <p className="text-gray-600 text-sm">Westlands, Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#fdf6f0] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#e88b7d]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">Business Hours</h3>
                    <p className="text-gray-600 text-sm">Mon - Sat: 9AM - 6PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-xl border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">💬 Quick Response</h3>
                <p className="text-xs md:text-sm text-green-700 mb-3">Get instant replies on WhatsApp.</p>
                <a href="https://wa.me/254792164579" target="_blank" className="inline-flex items-center gap-2 bg-green-500 text-white px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-green-600 transition">
                  <WhatsAppIcon className="w-4 h-4" /> Chat Now
                </a>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="https://facebook.com/dollwigs" target="_blank" className="w-9 h-9 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition">
                    <Facebook className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  </a>
                  <a href="https://instagram.com/dollwigs" target="_blank" className="w-9 h-9 md:w-10 md:h-10 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition">
                    <Instagram className="w-4 h-4 md:w-5 md:h-5 text-pink-600" />
                  </a>
                  <a href="https://x.com/dollwigs" target="_blank" className="w-9 h-9 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                    <XIcon className="w-4 h-4 md:w-5 md:h-5 text-black" />
                  </a>
                  <a href="https://wa.me/254792164579" target="_blank" className="w-9 h-9 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition">
                    <WhatsAppIcon className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border p-5 md:p-8">
              <h2 className="text-xl md:text-2xl font-serif text-gray-800 mb-4 md:mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Full Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={inputClasses} placeholder="Your name" required />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={inputClasses} placeholder="your@email.com" required />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Phone</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={inputClasses} placeholder="+254 792 164 579" />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2">Message</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className={`${inputClasses} resize-none`} rows={4} placeholder="How can we help?" required></textarea>
                </div>
                <button type="submit" className="w-full bg-[#e88b7d] text-white py-3 md:py-4 rounded-xl font-semibold hover:bg-[#d67a6c] transition flex items-center justify-center gap-2 text-sm md:text-base">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#fdf6f0] py-6 md:py-8 border-t">
        <div className="container mx-auto px-4 text-center text-xs md:text-sm text-gray-600">
          <p>&copy; 2026 Doll Wigs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}