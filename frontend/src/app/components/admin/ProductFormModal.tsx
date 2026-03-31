import { useState } from "react";
import type { Category, Product } from "../../types";
import { categories, toBase64, uid } from "../../utils";
import { Button, Card, Input, Label, Textarea } from "../ui";

type Props = {
  open: boolean;
  initial?: Product;
  onClose: () => void;
  onSubmit: (product: Product) => void;
};

export function ProductFormModal({ open, initial, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<Product>(
    initial ?? {
      id: uid(),
      name: "",
      category: "Windows",
      description: "",
      price: "",
      stock: 0,
      image: "",
      features: [""],
      specifications: [{ label: "", value: "" }],
    },
  );
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 p-4">
      <Card className="mx-auto w-full max-w-3xl p-5">
        <h3 className="text-lg font-bold">{initial ? "Edit Product" : "Add Product"}</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>Category</Label><select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })}>{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div><Label>Price</Label><Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
          <div><Label>Stock quantity</Label><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} /></div>
        </div>
        <div className="mt-3"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div className="mt-3">
          <Label>Product image upload</Label>
          <Input type="file" accept="image/*" onChange={async (e) => {
            const file = e.target.files?.[0]; if (!file) return;
            setForm({ ...form, image: await toBase64(file) });
          }} />
        </div>
        <div className="mt-3">
          <Label>Features</Label>
          {form.features.map((feature, i) => (
            <div className="mb-2 flex gap-2" key={`${feature}-${i}`}>
              <Input value={feature} onChange={(e) => setForm({ ...form, features: form.features.map((f, ix) => ix === i ? e.target.value : f) })} />
              <Button className="border border-slate-300 bg-white" onClick={() => setForm({ ...form, features: form.features.filter((_, ix) => ix !== i) })}>-</Button>
            </div>
          ))}
          <Button className="border border-slate-300 bg-white" onClick={() => setForm({ ...form, features: [...form.features, ""] })}>Add feature</Button>
        </div>
        <div className="mt-3">
          <Label>Technical specs</Label>
          {form.specifications.map((spec, i) => (
            <div className="mb-2 grid grid-cols-[1fr_1fr_auto] gap-2" key={`${spec.label}-${i}`}>
              <Input placeholder="Label" value={spec.label} onChange={(e) => setForm({ ...form, specifications: form.specifications.map((s, ix) => ix === i ? { ...s, label: e.target.value } : s) })} />
              <Input placeholder="Value" value={spec.value} onChange={(e) => setForm({ ...form, specifications: form.specifications.map((s, ix) => ix === i ? { ...s, value: e.target.value } : s) })} />
              <Button className="border border-slate-300 bg-white" onClick={() => setForm({ ...form, specifications: form.specifications.filter((_, ix) => ix !== i) })}>-</Button>
            </div>
          ))}
          <Button className="border border-slate-300 bg-white" onClick={() => setForm({ ...form, specifications: [...form.specifications, { label: "", value: "" }] })}>Add spec</Button>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button className="border border-slate-300 bg-white" onClick={onClose}>Cancel</Button>
          <Button className="bg-[#0A2463] text-white hover:bg-[#113385]" onClick={() => onSubmit(form)}>
            {initial ? "Update" : "Create"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
