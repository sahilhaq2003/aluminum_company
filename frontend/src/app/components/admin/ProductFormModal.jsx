import { useEffect, useState } from "react";
import { adminApi } from "../../api";
import { Button, Card, Input, Label, Textarea } from "../ui";

export function ProductFormModal({ open, initial, categories, onClose, onSubmit }) {
  const [isUploading, setIsUploading] = useState(false);
  const safeCategories = Array.isArray(categories) ? categories : [];
  const [form, setForm] = useState(initial || {});

  useEffect(() => {
    if (initial) {
      setForm(initial);
    } else {
      setForm({
        name: "",
        description: "",
        imageUrl: "",
        categoryId: safeCategories[0]?.id || 0,
        price: "",
        stock: 0,
      });
    }
  }, [initial, open, safeCategories]);

  if (!open) return null;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await adminApi.uploadImage(file);
      setForm({ ...form, imageUrl: url });
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 p-4">
      <Card className="mx-auto w-full max-w-2xl p-5">
        <h3 className="text-lg font-bold">
          {initial ? "Edit Product" : "Add Product"}
        </h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <Label>Category</Label>
            <select
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              value={form.categoryId}
              onChange={(e) =>
                setForm({ ...form, categoryId: Number(e.target.value) })
              }
            >
              {safeCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Price</Label>
            <Input
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div>
            <Label>Stock quantity</Label>
            <Input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="mt-3">
          <Label>Description</Label>
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="mt-3">
          <Label>Product Image</Label>
          <div className="flex items-center gap-3">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                className="h-10 w-10 rounded object-cover"
              />
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button className="border border-slate-300 bg-white" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-[#0A2463] text-white hover:bg-[#113385]"
            onClick={() => onSubmit(form)}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : initial ? "Update" : "Create"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
