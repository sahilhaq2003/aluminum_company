import { useState } from "react";

const fallback =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop";

export function ImageWithFallback(props) {
  const [broken, setBroken] = useState(false);

  // If the src is empty, null, or undefined, use the fallback immediately
  const source = !props.src || broken ? fallback : props.src;

  return (
    <img
      {...props}
      src={source}
      onError={() => {
        if (!broken) setBroken(true);
      }}
      // Ensuring the image is always visible
      style={{ minHeight: props.className?.includes("h-") ? "auto" : "100px", ...props.style }}
    />
  );
}
