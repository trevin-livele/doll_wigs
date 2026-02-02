import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, User, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white py-3 px-4 border-b sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="text-gray-700 hover:text-[#e88b7d] transition">HOME</Link>
            <Link href="/shop" className="text-gray-700 hover:text-[#e88b7d] transition">SHOP</Link>
            <Link href="/about" className="text-[#e88b7d] font-medium">ABOUT</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#e88b7d] transition">CONTACT</Link>
          </nav>
          
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-10 w-auto" />
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/wishlist"><Heart className="w-5 h-5 text-gray-600" /></Link>
            <Link href="/cart"><ShoppingCart className="w-5 h-5 text-gray-600" /></Link>
            <Link href="/account"><User className="w-5 h-5 text-gray-600" /></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-[#fdf6f0] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif text-gray-800 mb-4">About Doll Wigs</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kenya&apos;s premier destination for premium quality wigs. We believe every woman deserves to feel beautiful and confident.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=700&fit=crop" 
                alt="Our Story" 
                fill 
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2020, Doll Wigs started with a simple mission: to provide Kenyan women with access to high-quality, affordable wigs that look and feel natural.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We source our wigs from the finest manufacturers, ensuring each piece meets our strict quality standards. From human hair lace fronts to synthetic bob wigs, we have something for every style and budget.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we&apos;re proud to have served thousands of happy customers across Kenya, helping them transform their look and boost their confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[#fdfbfa]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center text-gray-800 mb-12">Why Choose Doll Wigs?</h2>
          <div className="grid grid-cols-4 gap-6">
            {[
              { title: "Premium Quality", desc: "100% human hair and high-grade synthetic options" },
              { title: "Affordable Prices", desc: "Competitive pricing without compromising quality" },
              { title: "Fast Delivery", desc: "Same-day delivery in Nairobi, 2-3 days countrywide" },
              { title: "M-Pesa Payment", desc: "Easy and secure mobile payment" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-12 h-12 bg-[#fdf6f0] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-[#e88b7d]" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#e88b7d]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-white mb-4">Ready to Transform Your Look?</h2>
          <p className="text-white/90 mb-8">Browse our collection and find your perfect wig today.</p>
          <Link href="/shop" className="inline-block bg-white text-[#e88b7d] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#fdf6f0] py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>&copy; 2026 Doll Wigs. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/privacy" className="hover:text-[#e88b7d]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#e88b7d]">Terms</Link>
            <Link href="/contact" className="hover:text-[#e88b7d]">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
