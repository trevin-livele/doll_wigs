"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, User, Trash2, ArrowLeft } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
}

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([
    { id: 1, name: "Silky Straight Wig", price: 18500, oldPrice: 24000, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop" },
    { id: 2, name: "Body Wave Lace Front", price: 24900, oldPrice: 32000, image: "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=400&h=500&fit=crop" },
    { id: 5, name: "Deep Wave Wig", price: 22900, oldPrice: 28500, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop" },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#fdfbfa]">
      {/* Header */}
      <header className="bg-white py-3 px-4 border-b sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="text-gray-700 hover:text-[#e88b7d] transition">HOME</Link>
            <Link href="/shop" className="text-gray-700 hover:text-[#e88b7d] transition">SHOP</Link>
            <Link href="/about" className="text-gray-700 hover:text-[#e88b7d] transition">ABOUT</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#e88b7d] transition">CONTACT</Link>
          </nav>
          
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-10 w-auto" />
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="relative">
              <Heart className="w-5 h-5 text-[#e88b7d] fill-[#e88b7d]" />
              <span className="absolute -top-1 -right-1 bg-[#e88b7d] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            </Link>
            <Link href="/cart"><ShoppingCart className="w-5 h-5 text-gray-600" /></Link>
            <Link href="/account"><User className="w-5 h-5 text-gray-600" /></Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-gray-500 hover:text-[#e88b7d] transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-serif text-gray-800">My Wishlist</h1>
            <p className="text-gray-500">{wishlist.length} items saved</p>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <Heart className="w-20 h-20 mx-auto mb-6 text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save items you love by clicking the heart icon</p>
            <Link href="/shop" className="inline-block bg-[#e88b7d] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#d67a6c] transition">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {wishlist.map(product => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
                <div className="relative h-72 bg-[#fdf6f0] overflow-hidden">
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">SALE</span>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md z-10 hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm mb-2 text-gray-800">{product.name}</h3>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-semibold text-[#e88b7d]">{formatPrice(product.price)}</span>
                    <span className="text-gray-400 line-through text-sm">{formatPrice(product.oldPrice)}</span>
                  </div>
                  <Link 
                    href="/cart"
                    className="block w-full bg-[#e88b7d] text-white py-2.5 rounded-lg text-center text-sm font-medium hover:bg-[#d67a6c] transition"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {wishlist.length > 0 && (
          <div className="mt-8 text-center">
            <Link href="/shop" className="text-[#e88b7d] hover:underline font-medium">
              Continue Shopping →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
