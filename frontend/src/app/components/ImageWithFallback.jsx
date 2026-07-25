import { useState } from "react";

const fallback =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop";

function getImageUrl(imageId) {
  if (!imageId) return null;
  return `/api/images/${imageId}`;
}

export function ImageWithFallback({ imageId, src, ...props }) {
  const [broken, setBroken] = useState(false);
  const resolvedSrc = imageId ? getImageUrl(imageId) : src;
  const source = !resolvedSrc || broken ? fallback : resolvedSrc;

  return (
    <img
      {...props}
      src={source}
      onError={() => {
        if (!broken) setBroken(true);
      }}
      style={{ minHeight: props.className?.includes("h-") ? "auto" : "100px", ...props.style }}
    />
  );
}
