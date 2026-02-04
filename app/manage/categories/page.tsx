"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";
import { useAdminCategories } from "@/lib/hooks/use-admin";

type CategoryForm = { name: string; slug: string; image: string };

const emptyForm: CategoryForm = { name: "", slug: "", image: "" };

export default function ManageCategories() {
  const { categories, loading, createCategory, updateCategory, deleteCategory } = useAdminCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (category: { id: string; name: string; slug: string; image: string }) => {
    setEditingId(category.id);
    setForm({ name: category.name, slug: category.slug, image: category.image });
    setModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    const slug = name.replace(" Wigs", "").trim();
    setForm({ ...form, name, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingId) {
      await updateCategory(editingId, form);
    } else {
      await createCategory(form);
    }

    setSaving(false);
    setModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete "${name}"? Products in this category will not be deleted.`)) {
      await deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Categories</h1>
          <p className="text-gray-400 text-sm">{categories.length} categories</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#CAB276] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#b39a5e] transition"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#CAB276]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden group"
            >
              <div className="relative h-32 bg-gray-800">
                <Image src={category.image} alt={category.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <button
                    onClick={() => openEdit(category)}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
                  >
                    <Pencil className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id, category.name)}
                    className="p-2 bg-red-500/50 rounded-lg hover:bg-red-500/70 transition"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium">{category.name}</h3>
                <p className="text-gray-500 text-sm">Slug: {category.slug}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setModalOpen(false)} />
          <div className="relative bg-gray-900 rounded-xl w-full max-w-md border border-gray-800">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {editingId ? "Edit Category" : "Add Category"}
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
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Straight Wigs"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#CAB276]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Slug</label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="e.g., Straight"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#CAB276]"
                />
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

              {form.image && (
                <div className="relative h-24 rounded-lg overflow-hidden bg-gray-800">
                  <Image src={form.image} alt="Preview" fill className="object-cover" />
                </div>
              )}

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
