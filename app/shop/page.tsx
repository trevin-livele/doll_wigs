"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ShoppingCart, Filter, ChevronDown, X, User, Menu } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  rating: number;
  image: string;
  category: string;
}

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const categories = ["All", "Straight", "Curly", "Bob", "Lace Front", "HD Lace", "Colored"];

  const products: Product[] = [
    { id: 1, name: "Silky Straight Wig", price: 18500, oldPrice: 24000, rating: 5, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop", category: "Straight" },
    { id: 2, name: "Body Wave Lace Front", price: 24900, oldPrice: 32000, rating: 5, image: "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=400&h=500&fit=crop", category: "Lace Front" },
    { id: 3, name: "Curly Bob Wig", price: 15900, oldPrice: 21000, rating: 5, image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop", category: "Bob" },
    { id: 4, name: "HD Lace Closure Wig", price: 27900, oldPrice: 35000, rating: 5, image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop", category: "HD Lace" },
    { id: 5, name: "Deep Wave Wig", price: 22900, oldPrice: 28500, rating: 5, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop", category: "Curly" },
    { id: 6, name: "Blonde Straight Wig", price: 29900, oldPrice: 38000, rating: 5, image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=500&fit=crop", category: "Colored" },
    { id: 7, name: "Kinky Curly Wig", price: 19500, oldPrice: 25900, rating: 5, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop", category: "Curly" },
    { id: 8, name: "Ombre Body Wave", price: 28900, oldPrice: 36000, rating: 5, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop", category: "Colored" },
    { id: 9, name: "Water Wave Wig", price: 21500, oldPrice: 27000, rating: 5, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop", category: "Curly" },
    { id: 10, name: "Pixie Cut Wig", price: 12900, oldPrice: 16500, rating: 5, image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop", category: "Bob" },
    { id: 11, name: "Red Lace Front", price: 32000, oldPrice: 40000, rating: 5, image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=500&fit=crop", category: "Colored" },
    { id: 12, name: "Natural Straight", price: 16500, oldPrice: 22000, rating: 5, image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop", category: "Straight" },
  ];

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredProducts = products.filter(p => selectedCategory === "All" || p.category === selectedCategory);

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
            <Link href="/shop" className="text-[#e88b7d] font-medium">SHOP</Link>
            <Link href="/about" className="text-gray-700 hover:text-[#e88b7d] transition">ABOUT</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#e88b7d] transition">CONTACT</Link>
          </nav>
          
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" />
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/wishlist" className="relative">
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#e88b7d] fill-[#e88b7d]' : 'text-gray-600'}`} />
            </Link>
            <Link href="/cart">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
            </Link>
            <Link href="/account" className="hidden md:block">
              <User className="w-5 h-5 text-gray-600" />
            </Link>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col border-t mt-3 pt-3">
            <Link href="/" className="py-2 text-gray-700">HOME</Link>
            <Link href="/shop" className="py-2 text-[#e88b7d] font-medium">SHOP</Link>
            <Link href="/about" className="py-2 text-gray-700">ABOUT</Link>
            <Link href="/contact" className="py-2 text-gray-700">CONTACT</Link>
          </nav>
        )}
      </header>

      {/* Breadcrumb */}
      <div className="bg-[#fdf6f0] py-6 md:py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-serif text-gray-800 mb-2">Shop All Wigs</h1>
          <p className="text-gray-600 text-sm">
            <Link href="/" className="hover:text-[#e88b7d]">Home</Link> / Shop
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Mobile Filter Button */}
        <button 
          onClick={() => setFilterOpen(!filterOpen)}
          className="md:hidden flex items-center gap-2 mb-4 px-4 py-2 border rounded-lg"
        >
          <Filter className="w-4 h-4" /> Filter by Category
        </button>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar - Mobile Collapsible */}
          <div className={`${filterOpen ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="md:sticky md:top-24">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Categories
              </h3>
              <ul className="space-y-2 mb-6">
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => { setSelectedCategory(cat); setFilterOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                        selectedCategory === cat 
                          ? 'bg-[#e88b7d] text-white' 
                          : 'text-gray-600 hover:bg-[#fdf6f0]'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="p-4 bg-[#fdf6f0] rounded-xl hidden md:block">
                <h4 className="font-medium text-gray-800 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">Chat with us on WhatsApp</p>
                <a href="https://wa.me/254792164579" className="text-[#e88b7d] text-sm font-medium hover:underline">
                  +254 792 164 579
                </a>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <p className="text-gray-600 text-sm">{filteredProducts.length} products</p>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#e88b7d]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition">
                  <div className="relative h-48 md:h-72 bg-[#fdf6f0] overflow-hidden">
                    <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-green-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded z-10">SALE</span>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center shadow-md z-10"
                    >
                      <Heart className={`w-3 h-3 md:w-4 md:h-4 ${wishlist.includes(product.id) ? 'text-[#e88b7d] fill-[#e88b7d]' : 'text-gray-400'}`} />
                    </button>
                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition hidden md:flex items-center justify-center">
                      <Link href="/cart" className="bg-white text-gray-800 px-6 py-2 rounded-full text-sm font-medium hover:bg-[#e88b7d] hover:text-white transition">
                        Add to Cart
                      </Link>
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-medium text-xs md:text-sm mb-1 md:mb-2 text-gray-800 line-clamp-1">{product.name}</h3>
                    <div className="flex gap-0.5 mb-1 md:mb-2">
                      {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-[10px] md:text-xs">★</span>)}
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                      <span className="font-semibold text-[#e88b7d] text-sm">{formatPrice(product.price)}</span>
                      <span className="text-gray-400 line-through text-xs">{formatPrice(product.oldPrice)}</span>
                    </div>
                    <Link href="/cart" className="md:hidden block w-full mt-2 bg-[#e88b7d] text-white py-1.5 rounded text-center text-xs font-medium">
                      Add to Cart
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
