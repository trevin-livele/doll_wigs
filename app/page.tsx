"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ShoppingCart, Phone, Mail, ChevronDown, X, Plus, Minus, User, Facebook, Instagram, MessageCircle, Menu } from "lucide-react";

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

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  sale: boolean;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const heroSlides = [
  {
    subtitle: "TOP BRANDS",
    title: "Spotless Beauty For Your\nHealthy Hair",
    description: "Premium quality wigs crafted with care. Transform your look with our collection of human hair wigs, lace fronts, and closures.",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&h=600&fit=crop&crop=faces",
    buttonText: "Shop Now",
    buttonLink: "/shop"
  },
  {
    subtitle: "NEW ARRIVALS",
    title: "Lace Front Wigs\nNatural Hairline",
    description: "Discover our latest collection of HD lace front wigs. Undetectable hairline for the most natural look possible.",
    image: "https://images.unsplash.com/photo-1611432579699-484f7990b127?w=500&h=600&fit=crop&crop=faces",
    buttonText: "View Collection",
    buttonLink: "/shop?category=lace-front"
  },
  {
    subtitle: "SUMMER SALE",
    title: "Up to 30% Off\nAll Colored Wigs",
    description: "Express yourself with our vibrant colored wigs. From blonde to burgundy, find your perfect shade at amazing prices.",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&h=600&fit=crop&crop=faces",
    buttonText: "Shop Sale",
    buttonLink: "/shop?category=colored"
  }
];

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-slide carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: "Straight Wigs", image: "https://images.unsplash.com/photo-1611432579699-484f7990b127?w=200&h=200&fit=crop", slug: "straight" },
    { name: "Curly Wigs", image: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=200&h=200&fit=crop", slug: "curly" },
    { name: "Bob Wigs", image: "https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?w=200&h=200&fit=crop", slug: "bob" },
    { name: "Lace Front", image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&h=200&fit=crop", slug: "lace-front" },
    { name: "HD Lace", image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop", slug: "hd-lace" },
    { name: "Colored", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop", slug: "colored" },
  ];

  const products: Product[] = [
    { id: 1, name: "Silky Straight Wig", price: 18500, oldPrice: 24000, rating: 5, sale: true, image: "https://images.unsplash.com/photo-1611432579699-484f7990b127?w=400&h=500&fit=crop", category: "Straight" },
    { id: 2, name: "Body Wave Lace Front", price: 24900, oldPrice: 32000, rating: 5, sale: true, image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=400&h=500&fit=crop", category: "Lace Front" },
    { id: 3, name: "Curly Bob Wig", price: 15900, oldPrice: 21000, rating: 5, sale: true, image: "https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?w=400&h=500&fit=crop", category: "Bob" },
    { id: 4, name: "HD Lace Closure Wig", price: 27900, oldPrice: 35000, rating: 5, sale: true, image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&h=500&fit=crop", category: "HD Lace" },
    { id: 5, name: "Deep Wave Wig", price: 22900, oldPrice: 28500, rating: 5, sale: true, image: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=400&h=500&fit=crop", category: "Curly" },
    { id: 6, name: "Blonde Straight Wig", price: 29900, oldPrice: 38000, rating: 5, sale: true, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop", category: "Colored" },
    { id: 7, name: "Kinky Curly Wig", price: 19500, oldPrice: 25900, rating: 5, sale: true, image: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=400&h=500&fit=crop", category: "Curly" },
    { id: 8, name: "Ombre Body Wave", price: 28900, oldPrice: 36000, rating: 5, sale: true, image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=500&fit=crop", category: "Colored" },
  ];

  const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const currentHero = heroSlides[currentSlide];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#fdf6f0] py-2 px-4 text-xs border-b border-[#f5e6db]">
        <div className="hidden md:flex justify-between items-center">
          <div className="flex gap-4 items-center text-gray-600">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +254 792 164 579</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> info@dollwigs.co.ke</span>
          </div>
          <div className="text-center flex-1">
            <span className="text-gray-700">Summer Sale Starts Now & Free Delivery in Nairobi Above KSh 25,000</span>
          </div>
          <div className="flex gap-4 text-gray-600">
            <span>KES</span>
            <span>English</span>
          </div>
        </div>
        <div className="md:hidden text-center text-gray-700">
          <span>🔥 Summer Sale - Free Delivery Above KSh 25,000</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white py-3 px-4 border-b sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <span className="bg-[#fdf6f0] text-[#e88b7d] text-xs px-2 py-1 rounded font-medium">NEW</span>
            <nav className="flex gap-6 text-sm">
              <Link href="/" className="text-[#e88b7d] font-medium">HOME</Link>
              <div className="relative group">
                <Link href="/shop" className="text-gray-700 hover:text-[#e88b7d] flex items-center gap-1 transition">
                  SHOP <ChevronDown className="w-3 h-3" />
                </Link>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/shop?category=straight" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf6f0]">Straight Wigs</Link>
                  <Link href="/shop?category=curly" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf6f0]">Curly Wigs</Link>
                  <Link href="/shop?category=bob" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf6f0]">Bob Wigs</Link>
                  <Link href="/shop?category=lace-front" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf6f0]">Lace Front</Link>
                  <Link href="/shop?category=colored" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf6f0]">Colored Wigs</Link>
                </div>
              </div>
              <Link href="/about" className="text-gray-700 hover:text-[#e88b7d] transition">ABOUT</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#e88b7d] transition">CONTACT</Link>
            </nav>
          </div>
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" />
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Search - hidden on mobile */}
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search wigs..." 
                className="border border-gray-200 rounded-full px-4 py-2 pr-10 text-sm w-48 focus:outline-none focus:border-[#e88b7d] transition"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="p-2 hover:bg-gray-100 rounded-full transition">
                <User className="w-5 h-5 text-gray-600" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 z-50">
                  <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf6f0]">My Account</Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf6f0]">My Orders</Link>
                  <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf6f0]">Wishlist ({wishlist.length})</Link>
                  <hr className="my-2" />
                  <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf6f0]">Login</Link>
                  <Link href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf6f0]">Register</Link>
                </div>
              )}
            </div>
            
            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#e88b7d] fill-[#e88b7d]' : 'text-gray-600'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e88b7d] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            {/* Cart Button */}
            <button onClick={() => setCartOpen(true)} className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e88b7d] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white border-b shadow-lg z-50">
            <nav className="flex flex-col p-4">
              <Link href="/" className="py-3 text-[#e88b7d] font-medium border-b">HOME</Link>
              <Link href="/shop" className="py-3 text-gray-700 border-b">SHOP</Link>
              <Link href="/about" className="py-3 text-gray-700 border-b">ABOUT</Link>
              <Link href="/contact" className="py-3 text-gray-700 border-b">CONTACT</Link>
              <div className="pt-4">
                <input 
                  type="text" 
                  placeholder="Search wigs..." 
                  className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#e88b7d]"
                />
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section with Carousel */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fef7f2 0%, #fce8e0 50%, #e8f5e9 100%)' }}>
        <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col-reverse md:flex-row items-center">
          <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
            <div className="relative w-full h-[300px] md:h-[500px]">
              <div className="absolute top-0 left-0 w-20 md:w-32 h-32 md:h-48 opacity-60 hidden md:block">
                <Image src="https://images.unsplash.com/photo-1518882605630-8eb738f13eb1?w=200&h=300&fit=crop" alt="leaf" fill className="object-contain" />
              </div>
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="relative w-[250px] md:w-[400px] h-[300px] md:h-[450px] rounded-b-full overflow-hidden transition-all duration-500">
                  <Image 
                    src={currentHero.image}
                    alt="Beautiful woman with wig" 
                    fill 
                    className="object-cover transition-opacity duration-500"
                    key={currentSlide}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left">
            <p className="text-[#e88b7d] text-xs md:text-sm tracking-widest mb-2 md:mb-4 transition-all duration-500">{currentHero.subtitle}</p>
            <h1 className="text-3xl md:text-5xl font-serif mb-4 md:mb-6 leading-tight text-gray-800 whitespace-pre-line transition-all duration-500">
              {currentHero.title}
            </h1>
            <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed transition-all duration-500 text-sm md:text-base">
              {currentHero.description}
            </p>
            <div className="flex gap-3 md:gap-4 justify-center md:justify-start">
              <Link href={currentHero.buttonLink} className="bg-[#e88b7d] text-white px-6 md:px-8 py-2.5 md:py-3 rounded hover:bg-[#d67a6c] transition inline-block text-sm md:text-base">
                {currentHero.buttonText}
              </Link>
              <Link href="/about" className="border border-gray-400 text-gray-700 px-6 md:px-8 py-2.5 md:py-3 rounded hover:border-gray-600 transition inline-block text-sm md:text-base">
                Learn More
              </Link>
            </div>
            {/* Auto-sliding carousel dots */}
            <div className="flex gap-2 mt-6 md:mt-8 justify-center md:justify-start">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-[#e88b7d] w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 right-0 w-24 md:w-40 h-36 md:h-60 opacity-50 hidden md:block">
          <Image src="https://images.unsplash.com/photo-1518882605630-8eb738f13eb1?w=200&h=300&fit=crop" alt="leaf" fill className="object-contain transform rotate-180" />
        </div>
      </section>

      {/* Shop By Category */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-8 md:mb-12 text-gray-800">Shop By Category</h2>
          <div className="flex gap-4 md:gap-10 overflow-x-auto pb-4 md:pb-0 md:justify-center scrollbar-hide">
            {categories.map((category, index) => (
              <Link key={index} href={`/shop?category=${category.slug}`} className="text-center cursor-pointer group flex-shrink-0">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto mb-2 md:mb-3 border-2 border-transparent group-hover:border-[#e88b7d] transition-all shadow-md">
                  <Image 
                    src={category.image} 
                    alt={category.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <p className="text-xs md:text-sm text-gray-700 group-hover:text-[#e88b7d] transition whitespace-nowrap">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hand Picked Products */}
      <section className="py-10 md:py-16 bg-[#fdfbfa]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-6 md:mb-8 text-gray-800">Hand Picked Products</h2>
          
          {/* Tabs */}
          <div className="flex justify-center gap-4 md:gap-8 mb-8 md:mb-10 overflow-x-auto pb-2">
            {["All", "Straight", "Curly", "Lace Front"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm transition whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-gray-800 text-gray-800 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {products
              .filter(p => activeTab === "All" || p.category === activeTab)
              .slice(0, 8)
              .map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 md:h-72 bg-[#fdf6f0] overflow-hidden">
                  {product.sale && (
                    <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-green-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded z-10">
                      SALE
                    </span>
                  )}
                  {/* Wishlist button */}
                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                    className="absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center shadow-md z-10 hover:scale-110 transition-transform"
                  >
                    <Heart className={`w-3 h-3 md:w-4 md:h-4 ${wishlist.includes(product.id) ? 'text-[#e88b7d] fill-[#e88b7d]' : 'text-gray-400'}`} />
                  </button>
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Quick add overlay - hidden on mobile */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center">
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-white text-gray-800 px-6 py-2 rounded-full text-sm font-medium hover:bg-[#e88b7d] hover:text-white transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-medium text-xs md:text-sm mb-1 md:mb-2 text-gray-800 line-clamp-1">{product.name}</h3>
                  <div className="flex gap-0.5 mb-1 md:mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-[10px] md:text-xs">★</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                    <span className="font-semibold text-[#e88b7d] text-sm md:text-base">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through text-xs md:text-sm">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                  {/* Mobile add to cart button */}
                  <button 
                    onClick={() => addToCart(product)}
                    className="md:hidden w-full mt-2 bg-[#e88b7d] text-white py-1.5 rounded text-xs font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8 md:mt-10">
            <Link href="/shop" className="inline-block border-2 border-[#e88b7d] text-[#e88b7d] px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-medium hover:bg-[#e88b7d] hover:text-white transition text-sm md:text-base">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#fdf6f0] py-10 md:py-12 border-t border-[#f5e6db]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="block mb-4">
                <Image src="/logo.svg" alt="Doll Wigs" width={120} height={35} className="h-8 md:h-9 w-auto" />
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Premium quality wigs for every style and occasion. Transform your look today.</p>
              <div className="flex gap-3">
                <a href="https://facebook.com/dollwigs" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-blue-50 transition group">
                  <Facebook className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                </a>
                <a href="https://instagram.com/dollwigs" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-pink-50 transition group">
                  <Instagram className="w-4 h-4 text-gray-600 group-hover:text-pink-600" />
                </a>
                <a href="https://x.com/dollwigs" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-gray-100 transition group">
                  <XIcon className="w-4 h-4 text-gray-600 group-hover:text-black" />
                </a>
                <a href="https://wa.me/254792164579" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:bg-green-50 transition group">
                  <WhatsAppIcon className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 md:mb-4 text-gray-800 text-sm md:text-base">Quick Links</h4>
              <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-[#e88b7d] transition">About Us</Link></li>
                <li><Link href="/shop" className="hover:text-[#e88b7d] transition">Shop All</Link></li>
                <li><Link href="/contact" className="hover:text-[#e88b7d] transition">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-[#e88b7d] transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 md:mb-4 text-gray-800 text-sm md:text-base">Customer Service</h4>
              <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                <li><Link href="/shipping" className="hover:text-[#e88b7d] transition">Shipping Info</Link></li>
                <li><Link href="/returns" className="hover:text-[#e88b7d] transition">Returns & Refunds</Link></li>
                <li><Link href="/orders" className="hover:text-[#e88b7d] transition">Track Order</Link></li>
                <li><Link href="/size-guide" className="hover:text-[#e88b7d] transition">Size Guide</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-medium mb-3 md:mb-4 text-gray-800 text-sm md:text-base">Newsletter</h4>
              <p className="text-xs md:text-sm text-gray-600 mb-3">Subscribe for exclusive offers & updates</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 md:px-4 py-2 border border-gray-300 rounded-l text-sm focus:outline-none focus:border-[#e88b7d]"
                />
                <button className="bg-[#e88b7d] text-white px-3 md:px-4 py-2 rounded-r hover:bg-[#d67a6c] transition text-sm">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                📞 +254 792 164 579<br />
                📧 info@dollwigs.co.ke
              </p>
            </div>
          </div>
          <div className="border-t border-[#f5e6db] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-500">
            <p>&copy; 2026 Doll Wigs. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-[#e88b7d] transition">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#e88b7d] transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-white shadow-xl flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Shopping Cart ({cartCount})</h2>
              <button onClick={() => setCartOpen(false)} className="p-1 hover:bg-gray-100 rounded transition">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="mb-4">Your cart is empty</p>
                  <button onClick={() => setCartOpen(false)} className="text-[#e88b7d] hover:underline">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3 md:gap-4 p-3 bg-[#fdf6f0] rounded-lg">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-800 truncate">{item.name}</h3>
                        <p className="text-[#e88b7d] font-semibold text-sm">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100 transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100 transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-lg">{formatPrice(cartTotal)}</span>
                </div>
                <Link 
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="block w-full bg-gray-800 text-white py-3 rounded text-center font-medium hover:bg-gray-700 transition mb-2"
                >
                  View Cart
                </Link>
                <Link 
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="block w-full bg-[#e88b7d] text-white py-3 rounded text-center font-medium hover:bg-[#d67a6c] transition"
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
