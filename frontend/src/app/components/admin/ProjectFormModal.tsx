import { useState } from "react";
import type { Category, Project } from "../../types";
import { categories, toBase64, uid } from "../../utils";
import { Button, Card, Input, Label, Textarea } from "../ui";

type Props = {
  open: boolean;
  initial?: Project;
  onClose: () => void;
  onSubmit: (project: Project) => void;
};

export function ProjectFormModal({ open, initial, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<Project>(
    initial ?? {
      id: uid(),
      title: "",
      client: "",
      location: "",
      year: new Date().getFullYear(),
      category: "Windows",
      description: "",
      challenge: "",
      solution: "",
      scope: "",
      results: "",
      mainImage: "",
      gallery: [],
    },
  );

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 p-4">
      <Card className="mx-auto w-full max-w-3xl p-5">
        <h3 className="text-lg font-bold">{initial ? "Edit Project" : "Add Project"}</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {["title", "client", "location"].map((k) => (
            <div key={k}>
              <Label>{k}</Label>
              <Input value={(form as Record<string, string>)[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
            </div>
          ))}
          <div>
            <Label>Year</Label><Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
          </div>
          <div>
            <Label>Category</Label>
            <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        {["description", "challenge", "solution", "scope", "results"].map((k) => (
          <div key={k} className="mt-3">
            <Label>{k}</Label>
            <Textarea rows={2} value={(form as Record<string, string>)[k] ?? ""} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
          </div>
        ))}
        <div className="mt-3">
          <Label>Main image upload</Label>
          <Input type="file" accept="image/*" onChange={async (e) => {
            const file = e.target.files?.[0]; if (!file) return;
            setForm({ ...form, mainImage: await toBase64(file) });
          }} />
        </div>
        <div className="mt-3">
          <Label>Detail images upload</Label>
          <Input type="file" accept="image/*" multiple onChange={async (e) => {
            const files = Array.from(e.target.files ?? []);
            const urls = await Promise.all(files.map(toBase64));
            setForm({ ...form, gallery: [...form.gallery, ...urls] });
          }} />
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
