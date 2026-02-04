"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Loader2, ChevronDown, ChevronUp, Package } from "lucide-react";
import { useAdminOrders } from "@/lib/hooks/use-admin";
import { Pagination } from "@/components/ui/pagination";

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;
const ITEMS_PER_PAGE = 10;

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  processing: "bg-blue-500/20 text-blue-400",
  shipped: "bg-purple-500/20 text-purple-400",
  delivered: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

export default function ManageOrders() {
  const { orders, loading, updateOrderStatus } = useAdminOrders();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    return filter === "all" ? orders : orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Count orders by status
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: orders.length };
    statusOptions.forEach((s) => {
      counts[s] = orders.filter((o) => o.status === s).length;
    });
    return counts;
  }, [orders]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-gray-400 text-sm">{orders.length} total orders</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => handleFilterChange("all")}
          className={`px-3 py-1.5 rounded-lg text-sm transition ${
            filter === "all" ? "bg-[#CAB276] text-black" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          All ({statusCounts.all})
        </button>
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => handleFilterChange(status)}
            className={`px-3 py-1.5 rounded-lg text-sm capitalize transition ${
              filter === status ? "bg-[#CAB276] text-black" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {status} ({statusCounts[status]})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#CAB276]" />
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-12 text-center">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-700" />
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedOrders.map((order) => (
              <div key={order.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div
                  className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-800/30 transition"
                  onClick={() => toggleExpand(order.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-medium">
                        {order.shipping_address?.name || "Customer"}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded capitalize ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#CAB276] font-semibold">{formatPrice(order.total)}</p>
                    <p className="text-gray-500 text-sm">{order.order_items?.length || 0} items</p>
                  </div>
                  {expandedId === order.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                {expandedId === order.id && (
                  <div className="border-t border-gray-800 p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-gray-500 mb-1">Contact</h4>
                        <p className="text-white">{order.shipping_address?.phone || "N/A"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-500 mb-1">Shipping Address</h4>
                        <p className="text-white">
                          {order.shipping_address?.address}, {order.shipping_address?.city}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-500 mb-2">Items</h4>
                      <div className="space-y-2">
                        {order.order_items?.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-2">
                            <div className="w-10 h-10 rounded overflow-hidden bg-gray-700 relative flex-shrink-0">
                              {item.product_image && (
                                <Image src={item.product_image} alt={item.product_name} fill className="object-cover" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm truncate">{item.product_name}</p>
                              <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-[#CAB276] text-sm">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-sm text-gray-500">Update Status:</span>
                      <div className="flex gap-2 flex-wrap">
                        {statusOptions.map((status) => (
                          <button
                            key={status}
                            onClick={() => updateOrderStatus(order.id, status)}
                            disabled={order.status === status}
                            className={`px-3 py-1 rounded text-xs capitalize transition ${
                              order.status === status
                                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
}
