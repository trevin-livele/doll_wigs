"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Loader2, X, Search } from "lucide-react";
import { useAdminProducts, useAdminCategories } from "@/lib/hooks/use-admin";
import type { Product } from "@/lib/hooks/use-products";

const formatPrice = (price: number) => `KSh ${price.toLocaleString()}`;

type ProductForm = Omit<Product, "id" | "created_at" | "updated_at">;

const emptyForm: ProductForm = {
  name: "",
  price: 0,
  old_price: null,
  rating: 5,
  sale: false,
  image: "",
  category: "",
  description: "",
  stock: 100,
};

export default function ManageProducts() {
  const { products, loading, createProduct, updateProduct, deleteProduct } = useAdminProducts();
  const { categories } = useAdminCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      old_price: product.old_price,
      rating: product.rating,
      sale: product.sale,
      image: product.image,
      category: product.category,
      description: product.description,
      stock: product.stock,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingId) {
      await updateProduct(editingId, form);
    } else {
      await createProduct(form);
    }

    setSaving(false);
    setModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete "${name}"?`)) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-gray-400 text-sm">{products.length} products</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#CAB276] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#b39a5e] transition"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#CAB276]"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#CAB276]" />
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Product</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Category</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Price</th>
                  <th className="text-left p-4 text-gray-400 font-medium text-sm">Stock</th>
                  <th className="text-right p-4 text-gray-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-800/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800 relative flex-shrink-0">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-medium truncate">{product.name}</p>
                          {product.sale && (
                            <span className="text-xs bg-[#CAB276]/20 text-[#CAB276] px-1.5 py-0.5 rounded">
                              Sale
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400">{product.category}</td>
                    <td className="p-4">
                      <span className="text-[#CAB276] font-medium">{formatPrice(product.price)}</span>
                      {product.old_price && (
                        <span className="text-gray-500 line-through text-sm ml-2">
                          {formatPrice(product.old_price)}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-gray-400">{product.stock}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-2 hover:bg-gray-800 rounded-lg transition"
                        >
                          <Pencil className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setModalOpen(false)} />
          <div className="relative bg-gray-900 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {editingId ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1 hover:bg-gray-800 rounded">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#CAB276]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Price (KSh)</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#CAB276]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Old Price (optional)</label>
                  <input
                    type="number"
                    value={form.old_price || ""}
                    onChange={(e) =>
                      setForm({ ...form, old_price: e.target.value ? parseInt(e.target.value) : null })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#CAB276]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Category</label>
                  <select
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#CAB276]"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name.replace(" Wigs", "")}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#CAB276]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#CAB276]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description || ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#CAB276] resize-none"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.sale}
                    onChange={(e) => setForm({ ...form, sale: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#CAB276] focus:ring-[#CAB276]"
                  />
                  <span className="text-gray-400 text-sm">On Sale</span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-700 rounded-lg text-gray-400 hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-[#CAB276] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#b39a5e] transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
