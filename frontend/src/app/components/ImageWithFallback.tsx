import { useState, type ImgHTMLAttributes } from "react";

const fallback = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop";

export function ImageWithFallback(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [broken, setBroken] = useState(false);
  return <img {...props} src={broken ? fallback : props.src} onError={() => setBroken(true)} />;
}
