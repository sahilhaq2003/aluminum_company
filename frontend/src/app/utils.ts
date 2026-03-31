export const categories = ["Windows", "Doors", "Facades", "Curtain Walls"] as const;

export function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}
