"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

/**
 * Validates if a string is a valid absolute URL
 */
function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;

  // Check if it starts with http:// or https://
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Check if it's a valid relative path starting with /
  if (url.startsWith('/')) {
    return true;
  }

  return false;
}

/**
 * Image component with automatic fallback to placeholder
 * When the main image fails to load or is invalid, it shows a placeholder instead
 */
export default function ImageWithFallback({
  src,
  fallbackSrc = "https://placehold.co/600x400/e2e8f0/64748b?text=Image+Not+Available",
  alt,
  ...props
}: ImageWithFallbackProps) {
  // Validate URL immediately and use fallback if invalid
  const validSrc = isValidUrl(src) ? src : fallbackSrc;
  const [imgSrc, setImgSrc] = useState(validSrc);
  const [isError, setIsError] = useState(false);

  // Update image source when src prop changes
  useEffect(() => {
    const newValidSrc = isValidUrl(src) ? src : fallbackSrc;
    setImgSrc(newValidSrc);
    setIsError(false);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (!isError) {
          setImgSrc(fallbackSrc);
          setIsError(true);
        }
      }}
    />
  );
}
