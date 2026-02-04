"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2, Users, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/hooks/use-admin";

export default function ManageCustomers() {
  const [customers, setCustomers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const supabase = createClient();

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    // Use RPC function to avoid RLS recursion
    const { data } = await supabase.rpc("admin_get_all_profiles");
    setCustomers(data || []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const filteredCustomers = customers.filter(
    (c) =>
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <p className="text-gray-400 text-sm">{customers.length} registered users</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by email or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#CAB276]"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#CAB276]" />
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-12 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-gray-700" />
          <p className="text-gray-500">No customers found</p>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Customer</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Phone</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Role</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-800/30">
                    <td className="p-4">
                      <div>
                        <p className="text-white font-medium">{customer.full_name || "—"}</p>
                        <p className="text-gray-500 text-sm">{customer.email}</p>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400">{customer.phone || "—"}</td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-2 py-0.5 rounded capitalize ${
                          customer.role === "admin"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-gray-700 text-gray-400"
                        }`}
                      >
                        {customer.role}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">
                      {new Date(customer.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
