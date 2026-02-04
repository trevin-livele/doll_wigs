"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, User, Trash2, ArrowLeft, Menu, X, Loader2 } from "lucide-react";
import { useWishlist } from "@/lib/hooks/use-wishlist";
import { useCart } from "@/lib/hooks/use-cart";
import { useAuth } from "@/lib/hooks/use-auth";
import { AuthModal } from "@/components/auth/auth-modal";
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  price: number;
  old_price: number | null;
  image: string;
}

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const { wishlistIds, toggleWishlist, loading: wishlistLoading } = useWishlist();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlistIds.length === 0) {
        setProducts([]);
        setLoadingProducts(false);
        return;
      }

      const { data } = await supabase
        .from('products')
        .select('id, name, price, old_price, image')
        .in('id', wishlistIds);

      setProducts(data || []);
      setLoadingProducts(false);
    };

    if (!wishlistLoading) {
      fetchWishlistProducts();
    }
  }, [wishlistIds, wishlistLoading, supabase]);

  const handleRemove = async (productId: string, productName: string) => {
    await toggleWishlist(productId, productName);
  };

  const handleAddToCart = async (product: Product) => {
    await addToCart(product.id, product.name);
  };

  const loading = authLoading || wishlistLoading || loadingProducts;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#CAB276]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <header className="bg-black py-3 px-4 border-b border-gray-800 sticky top-0 z-40">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="text-gray-500 hover:text-[#CAB276] transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" />
            </Link>
            <div className="w-5"></div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-20 text-center">
          <User className="w-20 h-20 mx-auto mb-6 text-gray-700" />
          <h1 className="text-3xl font-serif text-white mb-4">Sign In to View Wishlist</h1>
          <p className="text-gray-400 mb-8">You need to be signed in to view your saved items</p>
          <button onClick={() => setAuthModalOpen(true)} className="bg-[#CAB276] text-black px-8 py-3 rounded-lg font-medium hover:bg-[#b39a5e] transition">
            Sign In / Create Account
          </button>
        </div>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-black py-3 px-4 border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/" className="text-gray-300 hover:text-[#CAB276] transition">HOME</Link>
            <Link href="/shop" className="text-gray-300 hover:text-[#CAB276] transition">SHOP</Link>
            <Link href="/about" className="text-gray-300 hover:text-[#CAB276] transition">ABOUT</Link>
            <Link href="/contact" className="text-gray-300 hover:text-[#CAB276] transition">CONTACT</Link>
          </nav>
          
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" />
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/wishlist" className="relative">
              <Heart className="w-5 h-5 text-[#CAB276] fill-[#CAB276]" />
              {products.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#CAB276] text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {products.length}
                </span>
              )}
            </Link>
            <Link href="/cart"><ShoppingCart className="w-5 h-5 text-gray-400" /></Link>
            <Link href="/account" className="hidden md:block"><User className="w-5 h-5 text-gray-400" /></Link>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col border-t border-gray-800 mt-3 pt-3">
            <Link href="/" className="py-2 text-gray-300">HOME</Link>
            <Link href="/shop" className="py-2 text-gray-300">SHOP</Link>
            <Link href="/about" className="py-2 text-gray-300">ABOUT</Link>
            <Link href="/contact" className="py-2 text-gray-300">CONTACT</Link>
          </nav>
        )}
      </header>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <Link href="/" className="text-gray-500 hover:text-[#CAB276] transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-white font-bold uppercase">My Wishlist</h1>
            <p className="text-gray-500 text-sm md:text-base">{products.length} items saved</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#CAB276]" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 md:py-20 bg-gray-900 rounded-xl md:rounded-2xl shadow-sm border border-gray-800">
            <Heart className="w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 md:mb-6 text-gray-300" />
            <h2 className="text-lg md:text-xl font-semibold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">Save items you love by clicking the heart icon</p>
            <Link href="/shop" className="inline-block bg-[#CAB276] text-white px-6 md:px-8 py-3 rounded-lg font-medium hover:bg-[#b39a5e] transition">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-gray-900 rounded-lg md:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group border border-gray-800">
                <div className="relative h-48 md:h-72 bg-gray-800 overflow-hidden">
                  {product.old_price && <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-600 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded z-10">SALE</span>}
                  <button
                    onClick={() => handleRemove(product.id, product.name)}
                    className="absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-gray-900 rounded-full flex items-center justify-center shadow-md z-10 hover:bg-red-900/50 transition"
                  >
                    <Trash2 className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                  </button>
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-bold text-sm md:text-base mb-1 md:mb-2 text-white line-clamp-1 uppercase">{product.name}</h3>
                  <div className="flex gap-0.5 mb-1 md:mb-2">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-[10px] md:text-xs">★</span>)}
                  </div>
                  <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-4 flex-wrap">
                    <span className="font-bold text-[#CAB276] text-sm md:text-base">{formatPrice(product.price)}</span>
                    {product.old_price && <span className="text-gray-400 line-through text-xs md:text-sm">{formatPrice(product.old_price)}</span>}
                  </div>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="block w-full bg-[#CAB276] text-black py-2 md:py-2.5 rounded-lg text-center text-xs md:text-sm font-medium hover:bg-[#b39a5e] transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-6 md:mt-8 text-center">
            <Link href="/shop" className="text-[#CAB276] hover:underline font-medium text-sm md:text-base">
              Continue Shopping →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
