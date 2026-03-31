import { Button, Card } from "../ui";

type Props = {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function DeleteConfirmModal({ open, title, onConfirm, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <Card className="w-full max-w-md p-5">
        <h3 className="text-lg font-bold text-slate-900">Confirm delete</h3>
        <p className="mt-2 text-sm text-slate-600">{title}</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={onClose} className="border border-slate-300 bg-white">Cancel</Button>
          <Button onClick={onConfirm} className="bg-red-600 text-white hover:bg-red-700">Delete</Button>
        </div>
      </Card>
    </div>
  );
}
