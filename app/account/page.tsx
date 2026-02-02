"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, User, Package, MapPin, CreditCard, Bell, LogOut, Edit2, Camera } from "lucide-react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    firstName: "Jane",
    lastName: "Wanjiku",
    email: "jane.wanjiku@email.com",
    phone: "+254 792 164 579",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=faces"
  });

  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", address: "123 Westlands Road, Nairobi", isDefault: true },
    { id: 2, label: "Office", address: "456 Kilimani, Nairobi", isDefault: false },
  ]);

  const inputClasses = "w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#e88b7d] focus:ring-4 focus:ring-[#e88b7d]/10 transition-all placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-500";

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

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
          
          <Link href="/" className="flex items-center gap-1">
            <Image src="/logo.svg" alt="Doll Wigs" width={140} height={40} className="h-10 w-auto" />
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/wishlist"><Heart className="w-5 h-5 text-gray-600" /></Link>
            <Link href="/cart"><ShoppingCart className="w-5 h-5 text-gray-600" /></Link>
            <Link href="/account" className="p-2 bg-[#fdf6f0] rounded-full">
              <User className="w-5 h-5 text-[#e88b7d]" />
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <Image 
                    src={profile.avatar} 
                    alt={profile.firstName}
                    fill
                    className="rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#e88b7d] rounded-full flex items-center justify-center shadow-lg">
                    <Camera className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-800">{profile.firstName} {profile.lastName}</h3>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
                        activeTab === tab.id 
                          ? 'bg-[#e88b7d] text-white' 
                          : 'text-gray-600 hover:bg-[#fdf6f0]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-500 hover:bg-red-50 transition mt-4">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-serif text-gray-800">Personal Information</h2>
                    <p className="text-gray-500">Manage your personal details</p>
                  </div>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                      isEditing 
                        ? 'bg-gray-100 text-gray-600' 
                        : 'bg-[#fdf6f0] text-[#e88b7d]'
                    }`}
                  >
                    <Edit2 className="w-4 h-4" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      disabled={!isEditing}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      disabled={!isEditing}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      disabled={!isEditing}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      disabled={!isEditing}
                      className={inputClasses}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex-1 border-2 border-gray-200 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => { setIsEditing(false); alert('Profile updated!'); }}
                      className="flex-1 bg-[#e88b7d] text-white py-3 rounded-xl font-medium hover:bg-[#d67a6c] transition"
                    >
                      Save Changes
                    </button>
                  </div>
                )}

                {/* Password Section */}
                <div className="mt-10 pt-8 border-t">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <input type="password" placeholder="••••••••" className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input type="password" placeholder="••••••••" className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                      <input type="password" placeholder="••••••••" className={inputClasses} />
                    </div>
                  </div>
                  <button className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition">
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-serif text-gray-800 mb-6">My Orders</h2>
                <p className="text-gray-500 mb-4">View and track your orders</p>
                <Link href="/orders" className="inline-block bg-[#e88b7d] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#d67a6c] transition">
                  View All Orders →
                </Link>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-serif text-gray-800">Saved Addresses</h2>
                    <p className="text-gray-500">Manage your delivery addresses</p>
                  </div>
                  <button className="bg-[#e88b7d] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#d67a6c] transition">
                    + Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {addresses.map(addr => (
                    <div key={addr.id} className={`p-5 rounded-xl border-2 ${addr.isDefault ? 'border-[#e88b7d] bg-[#fdf6f0]' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-gray-800">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="text-xs bg-[#e88b7d] text-white px-2 py-1 rounded">Default</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{addr.address}</p>
                      <div className="flex gap-2">
                        <button className="text-sm text-[#e88b7d] hover:underline">Edit</button>
                        <span className="text-gray-300">|</span>
                        <button className="text-sm text-red-500 hover:underline">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-serif text-gray-800 mb-2">Payment Methods</h2>
                <p className="text-gray-500 mb-6">We accept M-Pesa payments only</p>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">M-Pesa</h3>
                      <p className="text-sm text-green-700">Pay securely with your M-Pesa mobile money</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-green-700">
                    During checkout, you&apos;ll receive an STK push notification to complete payment with your M-Pesa PIN.
                  </p>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-serif text-gray-800 mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {[
                    { label: "Order Updates", desc: "Get notified about your order status" },
                    { label: "Promotions & Sales", desc: "Receive exclusive offers and discounts" },
                    { label: "New Arrivals", desc: "Be the first to know about new wigs" },
                    { label: "SMS Notifications", desc: "Receive updates via SMS" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#fdfbfa] rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-800">{item.label}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e88b7d]"></div>
                      </label>
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
