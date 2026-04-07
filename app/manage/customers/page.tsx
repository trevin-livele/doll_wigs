"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Loader2, Users, Search } from "lucide-react";
import { api } from "@/lib/api/client";
import { Pagination } from "@/components/ui/pagination";

interface Customer {
  id: string;
  email: string;
  displayName: string | null;
  phoneNumber: string | null;
  role: string;
  createdAt: string;
}

const ITEMS_PER_PAGE = 15;

export default function ManageCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<Customer[]>("/admin/users");
      setCustomers(data);
    } catch {
      setCustomers([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (c) =>
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.displayName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCustomers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCustomers, currentPage]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const adminCount = customers.filter((c) => c.role === "admin").length;
  const customerCount = customers.filter((c) => c.role === "user").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <p className="text-gray-400 text-sm">
          {customerCount} customers, {adminCount} admins
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search by email or name..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
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
        <>
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
                  {paginatedCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-800/30">
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">{customer.displayName || "—"}</p>
                          <p className="text-gray-500 text-sm">{customer.email}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400">{customer.phoneNumber || "—"}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-0.5 rounded capitalize ${
                          customer.role === "admin"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-gray-700 text-gray-400"
                        }`}>
                          {customer.role}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400 text-sm">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
}
