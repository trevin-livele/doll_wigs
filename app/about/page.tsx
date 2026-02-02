import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, User, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white py-3 px-4 border-b sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/" className="text-gray-700 hover:text-[#CAB276] transition">HOME</Link>
            <Link href="/shop" className="text-gray-700 hover:text-[#CAB276] transition">SHOP</Link>
            <Link href="/about" className="text-[#CAB276] font-medium">ABOUT</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#CAB276] transition">CONTACT</Link>
          </nav>
          
          <Link href="/" className="flex items-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" />
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/wishlist"><Heart className="w-5 h-5 text-gray-600" /></Link>
            <Link href="/cart"><ShoppingCart className="w-5 h-5 text-gray-600" /></Link>
            <Link href="/account" className="hidden md:block"><User className="w-5 h-5 text-gray-600" /></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-[#f8f6f1] py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-3 md:mb-4">About Doll Wigs</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Kenya&apos;s premier destination for premium quality wigs. We believe every woman deserves to feel beautiful and confident.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative h-[300px] md:h-[500px] rounded-xl md:rounded-2xl overflow-hidden order-2 md:order-1">
              <Image 
                src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=600&h=700&fit=crop" 
                alt="Our Story" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mb-4 md:mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
                Founded in 2020, Doll Wigs started with a simple mission: to provide Kenyan women with access to high-quality, affordable wigs that look and feel natural.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
                We source our wigs from the finest manufacturers, ensuring each piece meets our strict quality standards. From human hair lace fronts to synthetic bob wigs, we have something for every style and budget.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Today, we&apos;re proud to have served thousands of happy customers across Kenya, helping them transform their look and boost their confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 md:py-16 bg-[#faf9f7]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif text-center text-gray-800 mb-8 md:mb-12">Why Choose Doll Wigs?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: "Premium Quality", desc: "100% human hair and high-grade synthetic options" },
              { title: "Affordable Prices", desc: "Competitive pricing without compromising quality" },
              { title: "Fast Delivery", desc: "Same-day delivery in Nairobi, 2-3 days countrywide" },
              { title: "M-Pesa Payment", desc: "Easy and secure mobile payment" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 md:p-6 rounded-xl shadow-sm text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#f8f6f1] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#CAB276]" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">{item.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-3 md:mb-4">Ready to Transform Your Look?</h2>
          <p className="text-white/80 mb-6 md:mb-8 text-sm md:text-base">Browse our collection and find your perfect wig today.</p>
          <Link href="/shop" className="inline-block bg-[#CAB276] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-medium hover:bg-[#b39a5e] transition text-sm md:text-base">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f8f6f1] py-6 md:py-8 border-t">
        <div className="container mx-auto px-4 text-center text-xs md:text-sm text-gray-600">
          <p>&copy; 2026 Doll Wigs. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/privacy" className="hover:text-[#CAB276]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#CAB276]">Terms</Link>
            <Link href="/contact" className="hover:text-[#CAB276]">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
