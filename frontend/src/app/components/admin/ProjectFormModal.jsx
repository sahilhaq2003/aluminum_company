import { useEffect, useState } from "react";
import { adminApi } from "../../api";
import { Button, Card, Input, Label, Textarea } from "../ui";

export function ProjectFormModal({ open, initial, productCategories, onClose, onSubmit }) {
  const [isUploading, setIsUploading] = useState(false);
  const safeCategories = Array.isArray(productCategories) ? productCategories : [];
  const [form, setForm] = useState(initial || {});
  const [galleryCategories, setGalleryCategories] = useState([]);

  useEffect(() => {
    if (initial) {
      setForm({ ...initial, productCategories: initial.productCategories || [] });
      setGalleryCategories(
        (initial.categories || []).map((cat) => ({
          _key: cat._key || cat.id || crypto.randomUUID(),
          name: cat.name || "",
          images: (cat.images || []).map((img) => ({
            _key: img._key || img.id || crypto.randomUUID(),
            imageUrl: img.imageUrl || "",
            caption: img.caption || "",
          })),
        }))
      );
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
        productCategories: [],
      });
      setGalleryCategories([]);
    }
  }, [initial, open]);

  if (!open) return null;

  const handleCoverUpload = async (e) => {
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

  const addGalleryCategory = () => {
    setGalleryCategories((prev) => [
      ...prev,
      { _key: crypto.randomUUID(), name: "", images: [] },
    ]);
  };

  const removeGalleryCategory = (idx) => {
    setGalleryCategories((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateCategoryName = (idx, name) => {
    setGalleryCategories((prev) =>
      prev.map((cat, i) => (i === idx ? { ...cat, name } : cat))
    );
  };

  const handleGalleryImageUpload = async (catIdx, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await adminApi.uploadImage(file);
      setGalleryCategories((prev) =>
        prev.map((cat, i) =>
          i === catIdx
            ? {
                ...cat,
                images: [
                  ...cat.images,
                  { _key: crypto.randomUUID(), imageUrl: url, caption: "" },
                ],
              }
            : cat
        )
      );
    } catch (err) {
      console.error("Gallery image upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  const removeGalleryImage = (catIdx, imgIdx) => {
    setGalleryCategories((prev) =>
      prev.map((cat, i) =>
        i === catIdx
          ? { ...cat, images: cat.images.filter((_, j) => j !== imgIdx) }
          : cat
      )
    );
  };

  const updateImageCaption = (catIdx, imgIdx, caption) => {
    setGalleryCategories((prev) =>
      prev.map((cat, i) =>
        i === catIdx
          ? {
              ...cat,
              images: cat.images.map((img, j) =>
                j === imgIdx ? { ...img, caption } : img
              ),
            }
          : cat
      )
    );
  };

  const handleSubmit = () => {
    const cleanCategories = galleryCategories
      .filter((cat) => cat.name.trim())
      .map((cat) => ({
        name: cat.name.trim(),
        images: cat.images
          .filter((img) => img.imageUrl)
          .map((img) => ({
            imageUrl: img.imageUrl,
            caption: img.caption || "",
          })),
      }));
    onSubmit({ ...form, categories: cleanCategories });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 p-4">
      <Card className="mx-auto w-full max-w-4xl p-6">
        <h3 className="text-lg font-bold text-slate-900">
          {initial ? "Edit Project" : "Add Project"}
        </h3>

        <div className="mt-5 max-h-[70vh] overflow-y-auto pr-1 space-y-5">
          <div className="grid gap-3 md:grid-cols-2">
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

          <div>
            <Label>Description</Label>
            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
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

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label>Scope</Label>
              <Textarea
                rows={2}
                value={form.scope}
                onChange={(e) => setForm({ ...form, scope: e.target.value })}
              />
            </div>
            <div>
              <Label>Results</Label>
              <Textarea
                rows={2}
                value={form.results}
                onChange={(e) => setForm({ ...form, results: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>Cover Image</Label>
            <div className="flex items-center gap-3">
              <Input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                disabled={isUploading}
              />
              {form.coverImageUrl && (
                <img
                  src={form.coverImageUrl}
                  className="h-12 w-12 rounded-lg object-cover"
                  alt="Cover"
                />
              )}
            </div>
          </div>

          <div>
            <Label>Product Categories</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {safeCategories.map((c) => {
                const selected = (form.productCategories || []).includes(c.name);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      const current = form.productCategories || [];
                      const updated = selected
                        ? current.filter((n) => n !== c.name)
                        : [...current, c.name];
                      setForm({ ...form, productCategories: updated });
                    }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition border ${
                      selected
                        ? "bg-[#EA580C] text-white border-[#EA580C]"
                        : "bg-white text-slate-600 border-slate-300 hover:border-[#EA580C]"
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
              {safeCategories.length === 0 && (
                <p className="text-xs text-slate-400">No categories available</p>
              )}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <Label className="!text-sm !tracking-normal !uppercase text-slate-700">Gallery Categories</Label>
                <p className="mt-0.5 text-xs text-slate-400">
                  Add image categories for this project (e.g. Windows, Doors, Facade)
                </p>
              </div>
              <button
                type="button"
                onClick={addGalleryCategory}
                className="flex items-center gap-1.5 rounded-lg border border-[#EA580C]/30 bg-[#EA580C]/5 px-3 py-2 text-xs font-bold text-[#EA580C] transition hover:bg-[#EA580C] hover:text-white"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Category
              </button>
            </div>

            {galleryCategories.length === 0 && (
              <div className="mt-4 rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">
                <svg className="mx-auto h-10 w-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm text-slate-400">
                  No gallery categories yet. Click "Add Category" to group project images.
                </p>
              </div>
            )}

            <div className="mt-4 space-y-4">
              {galleryCategories.map((cat, catIdx) => (
                <div
                  key={cat._key}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Input
                        placeholder="Category name (e.g. Windows, Facade, Interior)"
                        value={cat.name}
                        onChange={(e) => updateCategoryName(catIdx, e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeGalleryCategory(catIdx)}
                      className="rounded-lg border border-red-200 bg-white p-2 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                      title="Remove category"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {cat.images.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                      {cat.images.map((img, imgIdx) => (
                        <div
                          key={img._key}
                          className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white"
                        >
                          <div className="aspect-square overflow-hidden">
                            <img
                              src={img.imageUrl}
                              alt={img.caption || `Image ${imgIdx + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(catIdx, imgIdx)}
                            className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-white opacity-0 shadow transition group-hover:opacity-100"
                          >
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <input
                            type="text"
                            placeholder="Caption..."
                            value={img.caption}
                            onChange={(e) => updateImageCaption(catIdx, imgIdx, e.target.value)}
                            className="w-full border-t border-slate-100 bg-white px-2 py-1.5 text-[11px] text-slate-600 outline-none placeholder:text-slate-300"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white py-3 text-xs font-semibold text-slate-500 transition hover:border-[#EA580C] hover:text-[#EA580C]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {isUploading ? "Uploading..." : "Add Image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading}
                      onChange={(e) => handleGalleryImageUpload(catIdx, e)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2 border-t border-slate-200 pt-4">
          <Button className="border border-slate-300 bg-white" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-[#EA580C] text-white hover:bg-[#C2410C]"
            onClick={handleSubmit}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : initial ? "Update" : "Create"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
