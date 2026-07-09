"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallback: React.ReactNode;
  sizes?: string;
  className?: string;
}

/**
 * Renders the image at `src` if the file exists; otherwise shows `fallback`.
 * Lets the user drop real photos into /public later without code changes.
 */
export default function ImageWithFallback({
  src,
  alt,
  fallback,
  sizes = "330px",
  className = "",
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}
