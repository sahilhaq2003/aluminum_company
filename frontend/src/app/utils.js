export const categories = ["Windows", "Doors", "Facades", "Curtain Walls"];

export function toBase64(file) {
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
