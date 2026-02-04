"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Filter, X, User, Menu, Minus, Plus, Loader2 } from "lucide-react";
import { useProducts } from "@/lib/hooks/use-products";
import { useCategories } from "@/lib/hooks/use-categories";
import { useCart } from "@/lib/hooks/use-cart";
import { useWishlist } from "@/lib/hooks/use-wishlist";
import { useAuth } from "@/lib/hooks/use-auth";
import { AuthModal } from "@/components/auth/auth-modal";
import { Pagination } from "@/components/ui/pagination";

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;
const ITEMS_PER_PAGE = 12;

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useAuth();
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts(selectedCategory === "All" ? undefined : selectedCategory);
  const { items: cartItems, cartTotal, cartCount, addToCart, updateQuantity, removeFromCart } = useCart();
  const { wishlistIds, toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = async (product: { id: string; name: string }) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    await addToCart(product.id, product.name);
    setCartOpen(true);
  };

  const handleToggleWishlist = async (productId: string, productName: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    await toggleWishlist(productId, productName);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    setFilterOpen(false);
  };

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });
  }, [products, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const allCategories = ["All", ...categories.map(c => c.slug)];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black py-3 px-4 border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/" className="text-gray-300 hover:text-[#CAB276] transition">HOME</Link>
            <Link href="/shop" className="text-[#CAB276] font-medium">SHOP</Link>
            <Link href="/about" className="text-gray-300 hover:text-[#CAB276] transition">ABOUT</Link>
            <Link href="/contact" className="text-gray-300 hover:text-[#CAB276] transition">CONTACT</Link>
          </nav>
          
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" />
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/wishlist" className="relative">
              <Heart className={`w-5 h-5 ${wishlistIds.length > 0 ? 'text-[#CAB276] fill-[#CAB276]' : 'text-gray-400'}`} />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#CAB276] text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </Link>
            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-400" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#CAB276] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link href="/account" className="hidden md:block">
              <User className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col border-t border-gray-800 mt-3 pt-3">
            <Link href="/" className="py-2 text-gray-300">HOME</Link>
            <Link href="/shop" className="py-2 text-[#CAB276] font-medium">SHOP</Link>
            <Link href="/about" className="py-2 text-gray-300">ABOUT</Link>
            <Link href="/contact" className="py-2 text-gray-300">CONTACT</Link>
          </nav>
        )}
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-900 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-2 font-bold uppercase">Shop All Wigs</h1>
          <p className="text-gray-400 text-sm">
            <Link href="/" className="hover:text-[#CAB276]">Home</Link> / Shop
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Mobile Filter Button */}
        <button 
          onClick={() => setFilterOpen(!filterOpen)}
          className="md:hidden flex items-center gap-2 mb-4 px-4 py-2 border border-gray-700 rounded-lg text-white"
        >
          <Filter className="w-4 h-4" /> Filter by Category
        </button>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar */}
          <div className={`${filterOpen ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="md:sticky md:top-24">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-lg uppercase">
                <Filter className="w-4 h-4" /> Categories
              </h3>
              {categoriesLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-[#CAB276]" />
                </div>
              ) : (
                <ul className="space-y-2 mb-6">
                  {allCategories.map(cat => (
                    <li key={cat}>
                      <button
                        onClick={() => handleCategoryChange(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                          selectedCategory === cat 
                            ? 'bg-[#CAB276] text-black font-medium' 
                            : 'text-gray-400 hover:bg-gray-900'
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="p-4 bg-gray-900 rounded-xl hidden md:block border border-gray-800">
                <h4 className="font-medium text-white mb-2">Need Help?</h4>
                <p className="text-sm text-gray-400 mb-3">Chat with us on WhatsApp</p>
                <a href="https://wa.me/254792164579" className="text-[#CAB276] text-sm font-medium hover:underline">
                  +254 792 164 579
                </a>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <p className="text-gray-400 text-sm">{sortedProducts.length} products</p>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#CAB276]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {productsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#CAB276]" />
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800">
                <p className="text-gray-400">No products found in this category</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                  {paginatedProducts.map(product => (
                    <div key={product.id} className="bg-gray-900 rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition border border-gray-800">
                      <div className="relative h-48 md:h-72 bg-gray-800 overflow-hidden">
                        {product.sale && (
                          <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-[#CAB276] text-black text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded z-10 font-medium">SALE</span>
                        )}
                        <button
                          onClick={() => handleToggleWishlist(product.id, product.name)}
                          className="absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-black/50 rounded-full flex items-center justify-center shadow-md z-10 hover:bg-black transition"
                        >
                          <Heart className={`w-3 h-3 md:w-4 md:h-4 ${isInWishlist(product.id) ? 'text-[#CAB276] fill-[#CAB276]' : 'text-white'}`} />
                        </button>
                        <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition hidden md:flex items-center justify-center">
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className="bg-[#CAB276] text-black px-6 py-2 rounded font-medium hover:bg-[#b39a5e] transition"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                      <div className="p-3 md:p-4">
                        <h3 className="font-bold text-sm md:text-base mb-1 md:mb-2 text-white line-clamp-1 uppercase">{product.name}</h3>
                        <div className="flex gap-0.5 mb-1 md:mb-2">
                          {[...Array(5)].map((_, i) => <span key={i} className="text-[#CAB276] text-[10px] md:text-xs">★</span>)}
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                          <span className="font-bold text-[#CAB276] text-sm md:text-base">{formatPrice(product.price)}</span>
                          {product.old_price && (
                            <span className="text-gray-500 line-through text-xs md:text-sm">{formatPrice(product.old_price)}</span>
                          )}
                        </div>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="md:hidden block w-full mt-2 bg-[#CAB276] text-black py-1.5 rounded text-center text-xs font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70" onClick={() => setCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-gray-900 shadow-xl flex flex-col">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Shopping Cart ({cartCount})</h2>
              <button onClick={() => setCartOpen(false)} className="p-1 hover:bg-gray-800 rounded transition">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-700" />
                  <p className="text-gray-500 mb-4">{user ? 'Your cart is empty' : 'Sign in to view your cart'}</p>
                  {!user ? (
                    <button onClick={() => { setCartOpen(false); setAuthModalOpen(true); }} className="text-[#CAB276] hover:underline">Sign In</button>
                  ) : (
                    <button onClick={() => setCartOpen(false)} className="text-[#CAB276] hover:underline">Continue Shopping</button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3 md:gap-4 p-3 bg-gray-800 rounded-lg">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden flex-shrink-0">
                        <Image src={item.product?.image || ''} alt={item.product?.name || ''} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white truncate">{item.product?.name}</h3>
                        <p className="text-[#CAB276] font-semibold text-sm">{formatPrice(item.product?.price || 0)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition"
                          >
                            <Minus className="w-3 h-3 text-white" />
                          </button>
                          <span className="text-sm w-6 text-center text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition"
                          >
                            <Plus className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-gray-800">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">Subtotal:</span>
                  <span className="font-semibold text-lg text-white">{formatPrice(cartTotal)}</span>
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
                  className="block w-full bg-[#CAB276] text-black py-3 rounded text-center font-medium hover:bg-[#b39a5e] transition"
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
