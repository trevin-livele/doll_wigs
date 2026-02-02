"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ShoppingCart, Phone, Mail, ChevronDown, X, Plus, Minus, User, Facebook, Instagram, Menu } from "lucide-react";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface Product { id: number; name: string; price: number; oldPrice?: number; rating: number; sale: boolean; image: string; category: string; }
interface CartItem extends Product { quantity: number; }

const heroSlides = [
  { subtitle: "PREMIUM COLLECTION", title: "Luxury Wigs For\nThe Modern Woman", description: "Premium quality wigs crafted with care. Transform your look with our collection of human hair wigs, lace fronts, and closures.", image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&h=600&fit=crop&crop=faces", buttonText: "Shop Now", buttonLink: "/shop" },
  { subtitle: "NEW ARRIVALS", title: "Lace Front Wigs\nNatural Hairline", description: "Discover our latest collection of HD lace front wigs. Undetectable hairline for the most natural look possible.", image: "https://images.unsplash.com/photo-1611432579699-484f7990b127?w=500&h=600&fit=crop&crop=faces", buttonText: "View Collection", buttonLink: "/shop" },
  { subtitle: "EXCLUSIVE SALE", title: "Up to 30% Off\nAll Colored Wigs", description: "Express yourself with our vibrant colored wigs. From blonde to burgundy, find your perfect shade.", image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&h=600&fit=crop&crop=faces", buttonText: "Shop Sale", buttonLink: "/shop" }
];

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { const interval = setInterval(() => { setCurrentSlide((prev) => (prev + 1) % heroSlides.length); }, 3000); return () => clearInterval(interval); }, []);

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
  const addToCart = (product: Product) => { setCart(prev => { const existing = prev.find(item => item.id === product.id); if (existing) { return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item); } return [...prev, { ...product, quantity: 1 }]; }); setCartOpen(true); };
  const toggleWishlist = (productId: number) => { setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]); };
  const removeFromCart = (id: number) => { setCart(prev => prev.filter(item => item.id !== id)); };
  const updateQuantity = (id: number, delta: number) => { setCart(prev => prev.map(item => { if (item.id === id) { const newQty = item.quantity + delta; return newQty > 0 ? { ...item, quantity: newQty } : item; } return item; }).filter(item => item.quantity > 0)); };
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const currentHero = heroSlides[currentSlide];

  return (
    <div className="min-h-screen bg-black">
      {/* Top Bar */}
      <div className="bg-[#CAB276] py-2 px-4 text-xs">
        <div className="hidden md:flex justify-between items-center container mx-auto">
          <div className="flex gap-4 items-center text-black">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +254 792 164 579</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> info@dollwigs.co.ke</span>
          </div>
          <span className="text-black font-medium">Free Delivery in Nairobi Above KSh 25,000</span>
          <div className="flex gap-4 text-black"><span>KES</span><span>English</span></div>
        </div>
        <div className="md:hidden text-center text-black font-medium">Free Delivery Above KSh 25,000</div>
      </div>

      {/* Header */}
      <header className="bg-black py-4 px-4 border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6 text-sm">
              <Link href="/" className="text-[#CAB276] font-medium tracking-wide">HOME</Link>
              <Link href="/shop" className="text-white hover:text-[#CAB276] transition tracking-wide">SHOP</Link>
              <Link href="/about" className="text-white hover:text-[#CAB276] transition tracking-wide">ABOUT</Link>
              <Link href="/contact" className="text-white hover:text-[#CAB276] transition tracking-wide">CONTACT</Link>
            </nav>
          </div>
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative hidden md:block">
              <input type="text" placeholder="Search..." className="bg-gray-900 border border-gray-700 rounded-full px-4 py-2 pr-10 text-sm w-40 text-white placeholder-gray-500 focus:outline-none focus:border-[#CAB276]" />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
            </div>
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="p-2 text-white hover:text-[#CAB276] transition"><User className="w-5 h-5" /></button>
              {userMenuOpen && (<div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 rounded-lg border border-gray-800 py-2 z-50">
                <Link href="/account" className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-[#CAB276]">My Account</Link>
                <Link href="/orders" className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-[#CAB276]">My Orders</Link>
                <Link href="/wishlist" className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-[#CAB276]">Wishlist</Link>
              </div>)}
            </div>
            <Link href="/wishlist" className="relative p-2 text-white hover:text-[#CAB276] transition">
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#CAB276] fill-[#CAB276]' : ''}`} />
              {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-[#CAB276] text-black text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">{wishlist.length}</span>}
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative p-2 text-white hover:text-[#CAB276] transition">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#CAB276] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">{cartCount}</span>}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (<div className="md:hidden absolute left-0 right-0 top-full bg-black border-b border-gray-800 z-50">
          <nav className="flex flex-col p-4">
            <Link href="/" className="py-3 text-[#CAB276] font-medium border-b border-gray-800">HOME</Link>
            <Link href="/shop" className="py-3 text-white border-b border-gray-800">SHOP</Link>
            <Link href="/about" className="py-3 text-white border-b border-gray-800">ABOUT</Link>
            <Link href="/contact" className="py-3 text-white">CONTACT</Link>
          </nav>
        </div>)}
      </header>

      {/* Hero Section - Image Left, Content Right */}
      <section className="bg-black">
        <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center">
          {/* Image on Left */}
          <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 order-2 md:order-1">
            <div className="relative w-[280px] md:w-[400px] h-[350px] md:h-[500px] rounded-t-full overflow-hidden border-4 border-[#CAB276]">
              <Image src={currentHero.image} alt="Model" fill className="object-cover" key={currentSlide} />
            </div>
          </div>
          {/* Content on Right */}
          <div className="w-full md:w-1/2 text-center md:text-left order-1 md:order-2">
            <p className="text-[#CAB276] text-sm md:text-base tracking-[0.3em] mb-4 font-bold">{currentHero.subtitle}</p>
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight text-white whitespace-pre-line font-bold uppercase">{currentHero.title}</h1>
            <p className="text-gray-300 mb-8 leading-relaxed text-base md:text-lg max-w-md mx-auto md:mx-0">{currentHero.description}</p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link href={currentHero.buttonLink} className="bg-[#CAB276] text-black px-8 py-3 rounded font-bold hover:bg-[#b39a5e] transition tracking-wide uppercase">{currentHero.buttonText}</Link>
              <Link href="/about" className="border border-[#CAB276] text-[#CAB276] px-8 py-3 rounded font-bold hover:bg-[#CAB276] hover:text-black transition tracking-wide uppercase">Learn More</Link>
            </div>
            <div className="flex gap-2 mt-8 justify-center md:justify-start">
              {heroSlides.map((_, index) => (<button key={index} onClick={() => setCurrentSlide(index)} className={`h-1 rounded-full transition-all ${currentSlide === index ? 'bg-[#CAB276] w-8' : 'bg-gray-700 w-2 hover:bg-gray-600'}`} />))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-10 text-black font-bold uppercase">Shop By Category</h2>
          <div className="flex gap-6 md:gap-10 overflow-x-auto pb-4 md:pb-0 md:justify-center scrollbar-hide">
            {categories.map((category, index) => (
              <Link key={index} href={`/shop?category=${category.slug}`} className="text-center group flex-shrink-0">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden mx-auto mb-3 border-2 border-transparent group-hover:border-[#CAB276] transition-all shadow-lg">
                  <Image src={category.image} alt={category.name} width={112} height={112} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-sm md:text-base text-gray-800 group-hover:text-[#CAB276] transition font-bold uppercase">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section - Black Background */}
      <section className="bg-black py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-4 text-white font-bold uppercase">Hand Picked Products</h2>
          <p className="text-gray-400 text-center mb-8 text-base md:text-lg">Premium quality wigs for every occasion</p>
          <div className="flex justify-center gap-6 md:gap-8 mb-10 overflow-x-auto pb-2">
            {["All", "Straight", "Curly", "Lace Front"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 text-base md:text-lg transition tracking-wide uppercase ${activeTab === tab ? 'border-b-2 border-[#CAB276] text-[#CAB276] font-bold' : 'text-gray-500 hover:text-white font-medium'}`}>{tab}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.filter(p => activeTab === "All" || p.category === activeTab).slice(0, 8).map((product) => (
              <div key={product.id} className="bg-gray-900 rounded-lg overflow-hidden group">
                <div className="relative h-52 md:h-72 overflow-hidden">
                  {product.sale && <span className="absolute top-3 left-3 bg-[#CAB276] text-black text-xs px-2 py-1 rounded font-medium z-10">SALE</span>}
                  <button onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }} className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center z-10 hover:bg-black transition">
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'text-[#CAB276] fill-[#CAB276]' : 'text-white'}`} />
                  </button>
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition hidden md:flex items-center justify-center">
                    <button onClick={() => addToCart(product)} className="bg-[#CAB276] text-black px-6 py-2 rounded font-medium hover:bg-[#b39a5e] transition">Add to Cart</button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm md:text-base mb-2 text-white uppercase">{product.name}</h3>
                  <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <span key={i} className="text-[#CAB276] text-xs">★</span>)}</div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#CAB276] text-base md:text-lg">{formatPrice(product.price)}</span>
                    {product.oldPrice && <span className="text-gray-500 line-through text-sm md:text-base">{formatPrice(product.oldPrice)}</span>}
                  </div>
                  <button onClick={() => addToCart(product)} className="md:hidden w-full mt-3 bg-[#CAB276] text-black py-2 rounded text-sm font-medium">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/shop" className="inline-block border-2 border-[#CAB276] text-[#CAB276] px-8 py-3 rounded font-medium hover:bg-[#CAB276] hover:text-black transition tracking-wide">View All Products</Link>
          </div>
        </div>
      </section>

      {/* About Section - Split */}
      <section className="bg-black py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative h-[300px] md:h-[450px] rounded-lg overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=600&h=700&fit=crop" alt="About" fill className="object-cover" />
            </div>
            <div>
              <p className="text-[#CAB276] text-sm md:text-base tracking-[0.3em] mb-4 font-bold uppercase">ABOUT US</p>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 font-bold uppercase">Meet Your Beauty Partner</h2>
              <p className="text-gray-300 mb-6 leading-relaxed text-base md:text-lg">At Doll Wigs, we believe every woman deserves to feel confident and beautiful. Our premium collection of wigs is carefully curated to help you express your unique style.</p>
              <p className="text-gray-300 mb-8 leading-relaxed text-base md:text-lg">From natural-looking lace fronts to bold colored styles, we have something for every occasion and personality.</p>
              <Link href="/about" className="inline-block border-b-2 border-[#CAB276] text-[#CAB276] pb-1 font-medium hover:text-white hover:border-white transition tracking-wide">READ MORE</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-[#CAB276] py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { title: "Premium Quality", desc: "100% Human Hair" },
              { title: "Fast Delivery", desc: "Same Day in Nairobi" },
              { title: "M-Pesa Payment", desc: "Secure & Easy" },
              { title: "Free Returns", desc: "7 Day Policy" }
            ].map((item, i) => (
              <div key={i}>
                <h3 className="font-bold text-black mb-1 text-base md:text-lg uppercase">{item.title}</h3>
                <p className="text-black/80 text-sm md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="block mb-4"><Image src="/logo.svg" alt="Doll Wigs" width={120} height={35} className="h-8 w-auto" /></Link>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">Premium quality wigs for every style and occasion.</p>
              <div className="flex gap-3">
                <a href="https://facebook.com" className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center hover:bg-[#CAB276] transition group"><Facebook className="w-4 h-4 text-gray-400 group-hover:text-black" /></a>
                <a href="https://instagram.com" className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center hover:bg-[#CAB276] transition group"><Instagram className="w-4 h-4 text-gray-400 group-hover:text-black" /></a>
                <a href="https://x.com" className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center hover:bg-[#CAB276] transition group"><XIcon className="w-4 h-4 text-gray-400 group-hover:text-black" /></a>
                <a href="https://wa.me/254792164579" className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center hover:bg-[#CAB276] transition group"><WhatsAppIcon className="w-4 h-4 text-gray-400 group-hover:text-black" /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white text-base tracking-wide uppercase">QUICK LINKS</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/about" className="hover:text-[#CAB276] transition">About Us</Link></li>
                <li><Link href="/shop" className="hover:text-[#CAB276] transition">Shop All</Link></li>
                <li><Link href="/contact" className="hover:text-[#CAB276] transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white text-base tracking-wide uppercase">SUPPORT</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/shipping" className="hover:text-[#CAB276] transition">Shipping</Link></li>
                <li><Link href="/returns" className="hover:text-[#CAB276] transition">Returns</Link></li>
                <li><Link href="/orders" className="hover:text-[#CAB276] transition">Track Order</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold mb-4 text-white text-base tracking-wide uppercase">NEWSLETTER</h4>
              <p className="text-sm text-gray-500 mb-3">Get exclusive offers</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="flex-1 px-4 py-2 bg-gray-900 border border-gray-800 rounded-l text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#CAB276]" />
                <button className="bg-[#CAB276] text-black px-4 py-2 rounded-r font-medium hover:bg-[#b39a5e] transition">Join</button>
              </div>
              <p className="text-xs text-gray-600 mt-3">📞 +254 792 164 579</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-600">
            <p>&copy; 2026 Doll Wigs. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={() => setCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-gray-900 shadow-xl flex flex-col">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Shopping Cart ({cartCount})</h2>
              <button onClick={() => setCartOpen(false)} className="p-1 hover:bg-gray-800 rounded transition"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-700" />
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <button onClick={() => setCartOpen(false)} className="text-[#CAB276] hover:underline">Continue Shopping</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 bg-gray-800 rounded-lg">
                      <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0"><Image src={item.image} alt={item.name} fill className="object-cover" /></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white truncate">{item.name}</h3>
                        <p className="text-[#CAB276] font-semibold text-sm">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition"><Minus className="w-3 h-3 text-white" /></button>
                          <span className="text-sm w-6 text-center text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition"><Plus className="w-3 h-3 text-white" /></button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-800">
                <div className="flex justify-between mb-4"><span className="text-gray-400">Subtotal:</span><span className="font-semibold text-lg text-white">{formatPrice(cartTotal)}</span></div>
                <Link href="/cart" onClick={() => setCartOpen(false)} className="block w-full bg-gray-800 text-white py-3 rounded text-center font-medium hover:bg-gray-700 transition mb-2">View Cart</Link>
                <Link href="/checkout" onClick={() => setCartOpen(false)} className="block w-full bg-[#CAB276] text-black py-3 rounded text-center font-medium hover:bg-[#b39a5e] transition">Checkout</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
