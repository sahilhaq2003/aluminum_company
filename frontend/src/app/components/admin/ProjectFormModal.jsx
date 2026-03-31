import { useEffect, useState } from "react";
import { adminApi } from "../../api";
import { Button, Card, Input, Label, Textarea } from "../ui";

export function ProjectFormModal({ open, initial, onClose, onSubmit }) {
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState(initial || {});

  useEffect(() => {
    if (initial) {
      setForm(initial);
    } else {
      setForm({
        title: "",
        client: "",
        location: "",
        year: new Date().getFullYear(),
        description: "",
        challenge: "",
        solution: "",
        scope: "",
        results: "",
        coverImageUrl: "",
      });
    }
  }, [initial, open]);

  if (!open) return null;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await adminApi.uploadImage(file);
      setForm({ ...form, coverImageUrl: url });
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 p-4">
      <Card className="mx-auto w-full max-w-3xl p-5">
        <h3 className="text-lg font-bold">
          {initial ? "Edit Project" : "Add Project"}
        </h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Client</Label>
            <Input
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
          <div>
            <Label>Year</Label>
            <Input
              type="number"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="mt-3">
          <Label>Description</Label>
          <Textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div>
            <Label>Challenge</Label>
            <Textarea
              rows={2}
              value={form.challenge}
              onChange={(e) => setForm({ ...form, challenge: e.target.value })}
            />
          </div>
          <div>
            <Label>Solution</Label>
            <Textarea
              rows={2}
              value={form.solution}
              onChange={(e) => setForm({ ...form, solution: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-3">
          <Label>Cover Image</Label>
          <div className="flex items-center gap-3">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {form.coverImageUrl && (
              <img
                src={form.coverImageUrl}
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
