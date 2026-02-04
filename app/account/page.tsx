"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, User, Package, MapPin, CreditCard, Bell, LogOut, Edit2, Menu, X, Loader2, Save } from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";
import { AuthModal } from "@/components/auth/auth-modal";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface Address {
  id: string;
  label: string;
  address: string;
  city: string;
  county: string;
  isDefault: boolean;
}

export default function AccountPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState({ label: "", address: "", city: "", county: "", isDefault: false });
  const [showAddAddress, setShowAddAddress] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (data) {
      setProfile({
        fullName: data.full_name || "",
        email: data.email,
        phone: data.phone || "",
      });
      // Load addresses from profile
      if (data.address && Array.isArray(data.address)) {
        setAddresses(data.address);
      }
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').update({
      full_name: profile.fullName,
      phone: profile.phone,
      updated_at: new Date().toISOString()
    }).eq('id', user.id);

    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated successfully');
      setIsEditing(false);
    }
    setSaving(false);
  };

  const handleAddAddress = async () => {
    if (!user || !newAddress.label || !newAddress.address || !newAddress.city) {
      toast.error('Please fill in all required fields');
      return;
    }
    const newAddr: Address = { ...newAddress, id: Date.now().toString() };
    const updatedAddresses = newAddress.isDefault 
      ? [...addresses.map(a => ({ ...a, isDefault: false })), newAddr]
      : [...addresses, newAddr];
    
    const { error } = await supabase.from('profiles').update({ address: updatedAddresses }).eq('id', user.id);
    if (!error) {
      setAddresses(updatedAddresses);
      setNewAddress({ label: "", address: "", city: "", county: "", isDefault: false });
      setShowAddAddress(false);
      toast.success('Address added');
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!user) return;
    const updatedAddresses = addresses.filter(a => a.id !== id);
    await supabase.from('profiles').update({ address: updatedAddresses }).eq('id', user.id);
    setAddresses(updatedAddresses);
    toast.success('Address removed');
  };

  const handleSetDefaultAddress = async (id: string) => {
    if (!user) return;
    const updatedAddresses = addresses.map(a => ({ ...a, isDefault: a.id === id }));
    await supabase.from('profiles').update({ address: updatedAddresses }).eq('id', user.id);
    setAddresses(updatedAddresses);
    toast.success('Default address updated');
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const inputClasses = "w-full border-2 border-gray-800 bg-black text-white rounded-xl px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-[#CAB276] transition-all placeholder:text-gray-500 disabled:bg-gray-900 disabled:text-gray-500 text-sm md:text-base";
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  if (authLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#CAB276]" /></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <header className="bg-black py-3 px-4 border-b border-gray-800 sticky top-0 z-40">
          <div className="container mx-auto flex items-center justify-between">
            <nav className="hidden md:flex gap-6 text-sm">
              <Link href="/" className="text-gray-300 hover:text-[#CAB276] transition">HOME</Link>
              <Link href="/shop" className="text-gray-300 hover:text-[#CAB276] transition">SHOP</Link>
            </nav>
            <Link href="/"><Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" /></Link>
            <div className="flex items-center gap-2 md:gap-4">
              <Link href="/wishlist"><Heart className="w-5 h-5 text-gray-400" /></Link>
              <Link href="/cart"><ShoppingCart className="w-5 h-5 text-gray-400" /></Link>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-20 text-center">
          <User className="w-20 h-20 mx-auto mb-6 text-gray-700" />
          <h1 className="text-3xl font-serif text-white mb-4">Sign In to Your Account</h1>
          <p className="text-gray-400 mb-8">Access your orders, wishlist, and manage your profile</p>
          <button onClick={() => setAuthModalOpen(true)} className="bg-[#CAB276] text-black px-8 py-3 rounded-lg font-medium hover:bg-[#b39a5e] transition">Sign In / Create Account</button>
        </div>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-black py-3 px-4 border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white">{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/" className="text-gray-300 hover:text-[#CAB276] transition">HOME</Link>
            <Link href="/shop" className="text-gray-300 hover:text-[#CAB276] transition">SHOP</Link>
            <Link href="/about" className="text-gray-300 hover:text-[#CAB276] transition">ABOUT</Link>
            <Link href="/contact" className="text-gray-300 hover:text-[#CAB276] transition">CONTACT</Link>
          </nav>
          <Link href="/"><Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-8 md:h-10 w-auto" /></Link>
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/wishlist"><Heart className="w-5 h-5 text-gray-400" /></Link>
            <Link href="/cart"><ShoppingCart className="w-5 h-5 text-gray-400" /></Link>
            <Link href="/account" className="p-2 bg-gray-900 rounded-full"><User className="w-5 h-5 text-[#CAB276]" /></Link>
          </div>
        </div>
        {mobileMenuOpen && <nav className="md:hidden flex flex-col border-t border-gray-800 mt-3 pt-3"><Link href="/" className="py-2 text-gray-300">HOME</Link><Link href="/shop" className="py-2 text-gray-300">SHOP</Link><Link href="/about" className="py-2 text-gray-300">ABOUT</Link><Link href="/contact" className="py-2 text-gray-300">CONTACT</Link></nav>}
      </header>

      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="md:hidden mb-4">
          <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="w-full flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-800 text-white">
            <span className="font-medium">{tabs.find(t => t.id === activeTab)?.label}</span><span className="text-gray-400">▼</span>
          </button>
          {mobileSidebarOpen && (
            <div className="mt-2 bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
              {tabs.map(tab => { const Icon = tab.icon; return (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${activeTab === tab.id ? 'bg-[#CAB276] text-black' : 'text-gray-400 hover:bg-gray-800'}`}>
                  <Icon className="w-5 h-5" /><span className="font-medium">{tab.label}</span>
                </button>
              ); })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div className="hidden md:block md:col-span-1">
            <div className="bg-gray-900 rounded-2xl p-6 sticky top-24 border border-gray-800">
              <div className="text-center mb-6 pb-6 border-b border-gray-800">
                <div className="w-20 h-20 mx-auto mb-3 bg-gray-800 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-[#CAB276]" />
                </div>
                <h3 className="font-semibold text-white">{profile.fullName || "User"}</h3>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>
              <nav className="space-y-1">
                {tabs.map(tab => { const Icon = tab.icon; return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${activeTab === tab.id ? 'bg-[#CAB276] text-black' : 'text-gray-400 hover:bg-gray-800'}`}>
                    <Icon className="w-5 h-5" /><span className="font-medium">{tab.label}</span>
                  </button>
                ); })}
              </nav>
              <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-500 hover:bg-red-900/30 transition mt-4">
                <LogOut className="w-5 h-5" /><span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-gray-900 rounded-xl md:rounded-2xl p-5 md:p-8 border border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
                  <div><h2 className="text-xl md:text-2xl font-serif text-white font-bold uppercase">Personal Information</h2><p className="text-gray-500 text-sm md:text-base">Manage your personal details</p></div>
                  <button onClick={() => setIsEditing(!isEditing)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition text-sm ${isEditing ? 'bg-gray-800 text-gray-400' : 'bg-gray-800 text-[#CAB276]'}`}>
                    <Edit2 className="w-4 h-4" />{isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="md:col-span-2"><label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">Full Name</label><input type="text" value={profile.fullName} onChange={(e) => setProfile({...profile, fullName: e.target.value})} disabled={!isEditing} className={inputClasses} placeholder="Enter your full name" /></div>
                  <div><label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">Email</label><input type="email" value={profile.email} disabled className={inputClasses} /></div>
                  <div><label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">Phone</label><input type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} disabled={!isEditing} className={inputClasses} placeholder="+254 7XX XXX XXX" /></div>
                </div>
                {isEditing && (
                  <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">
                    <button onClick={() => setIsEditing(false)} className="flex-1 border-2 border-gray-800 py-2.5 md:py-3 rounded-xl font-medium hover:bg-gray-800 transition text-sm text-white">Cancel</button>
                    <button onClick={handleSaveProfile} disabled={saving} className="flex-1 bg-[#CAB276] text-black py-2.5 md:py-3 rounded-xl font-medium hover:bg-[#b39a5e] transition text-sm flex items-center justify-center gap-2">
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-gray-900 rounded-xl md:rounded-2xl p-5 md:p-8 border border-gray-800">
                <h2 className="text-xl md:text-2xl font-serif text-white mb-4 md:mb-6 font-bold uppercase">My Orders</h2>
                <p className="text-gray-500 mb-4 text-sm md:text-base">View and track your orders</p>
                <Link href="/orders" className="inline-block bg-[#CAB276] text-black px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-medium hover:bg-[#b39a5e] transition text-sm">View All Orders →</Link>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-gray-900 rounded-xl md:rounded-2xl p-5 md:p-8 border border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
                  <div><h2 className="text-xl md:text-2xl font-serif text-white font-bold uppercase">Saved Addresses</h2><p className="text-gray-500 text-sm md:text-base">Manage your delivery addresses</p></div>
                  <button onClick={() => setShowAddAddress(true)} className="bg-[#CAB276] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#b39a5e] transition text-sm">+ Add New</button>
                </div>
                {showAddAddress && (
                  <div className="mb-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <h3 className="font-medium text-white mb-4">Add New Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Label (e.g. Home, Office)" value={newAddress.label} onChange={(e) => setNewAddress({...newAddress, label: e.target.value})} className={inputClasses} />
                      <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} className={inputClasses} />
                      <input type="text" placeholder="Full Address" value={newAddress.address} onChange={(e) => setNewAddress({...newAddress, address: e.target.value})} className={`${inputClasses} md:col-span-2`} />
                      <input type="text" placeholder="County (optional)" value={newAddress.county} onChange={(e) => setNewAddress({...newAddress, county: e.target.value})} className={inputClasses} />
                      <label className="flex items-center gap-2 text-gray-400 text-sm"><input type="checkbox" checked={newAddress.isDefault} onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})} className="rounded" />Set as default</label>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => setShowAddAddress(false)} className="flex-1 border border-gray-700 text-white py-2 rounded-lg text-sm hover:bg-gray-700 transition">Cancel</button>
                      <button onClick={handleAddAddress} className="flex-1 bg-[#CAB276] text-black py-2 rounded-lg text-sm font-medium hover:bg-[#b39a5e] transition">Save Address</button>
                    </div>
                  </div>
                )}
                {addresses.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No saved addresses yet</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {addresses.map(addr => (
                      <div key={addr.id} className={`p-4 md:p-5 rounded-xl border-2 ${addr.isDefault ? 'border-[#CAB276] bg-gray-800' : 'border-gray-800'}`}>
                        <div className="flex justify-between items-start mb-2"><span className="font-semibold text-white text-sm md:text-base">{addr.label}</span>{addr.isDefault && <span className="text-[10px] md:text-xs bg-[#CAB276] text-black px-2 py-1 rounded font-medium">Default</span>}</div>
                        <p className="text-gray-400 text-xs md:text-sm mb-1">{addr.address}</p>
                        <p className="text-gray-500 text-xs mb-3">{addr.city}{addr.county && `, ${addr.county}`}</p>
                        <div className="flex gap-2">
                          {!addr.isDefault && <button onClick={() => handleSetDefaultAddress(addr.id)} className="text-xs md:text-sm text-[#CAB276] hover:underline">Set Default</button>}
                          <button onClick={() => handleDeleteAddress(addr.id)} className="text-xs md:text-sm text-red-500 hover:underline">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "payments" && (
              <div className="bg-gray-900 rounded-xl md:rounded-2xl p-5 md:p-8 border border-gray-800">
                <h2 className="text-xl md:text-2xl font-serif text-white mb-2 font-bold uppercase">Payment Methods</h2>
                <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">We accept M-Pesa payments only</p>
                <div className="bg-gray-800 border border-green-800 rounded-xl p-4 md:p-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-xl flex items-center justify-center"><span className="text-white font-bold text-lg md:text-xl">M</span></div>
                    <div><h3 className="font-semibold text-green-500 text-sm md:text-base">M-Pesa</h3><p className="text-xs md:text-sm text-gray-400">Pay securely with your M-Pesa mobile money</p></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-gray-900 rounded-xl md:rounded-2xl p-5 md:p-8 border border-gray-800">
                <h2 className="text-xl md:text-2xl font-serif text-white mb-4 md:mb-6 font-bold uppercase">Notification Preferences</h2>
                <div className="space-y-3 md:space-y-4">
                  {[{ label: "Order Updates", desc: "Get notified about your order status" },{ label: "Promotions & Sales", desc: "Receive exclusive offers and discounts" },{ label: "New Arrivals", desc: "Be the first to know about new wigs" },{ label: "SMS Notifications", desc: "Receive updates via SMS" }].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 md:p-4 bg-gray-800 rounded-xl">
                      <div><h4 className="font-medium text-white text-sm md:text-base">{item.label}</h4><p className="text-xs md:text-sm text-gray-500">{item.desc}</p></div>
                      <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" defaultChecked={i < 2} className="sr-only peer" /><div className="w-10 md:w-11 h-5 md:h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 md:after:h-5 after:w-4 md:after:w-5 after:transition-all peer-checked:bg-[#CAB276]"></div></label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
