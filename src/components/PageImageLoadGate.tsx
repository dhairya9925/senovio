"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

function collectImageUrls(root: HTMLElement) {
  const urls = new Set<string>();

  root.querySelectorAll("img").forEach((image) => {
    const src = image.currentSrc || image.src;

    if (src) {
      urls.add(src);
    }
  });

  root.querySelectorAll<HTMLElement>("*").forEach((element) => {
    const backgroundImage = window.getComputedStyle(element).backgroundImage;

    for (const match of backgroundImage.matchAll(/url\((["']?)(.*?)\1\)/g)) {
      const url = match[2];

      if (url && !url.startsWith("data:")) {
        urls.add(new URL(url, window.location.href).href);
      }
    }
  });

  return [...urls];
}

function preloadImage(url: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    let isResolved = false;

    const done = () => {
      if (!isResolved) {
        isResolved = true;
        resolve();
      }
    };

    image.onload = done;
    image.onerror = done;
    image.src = url;

    if (image.complete) {
      done();
    }
  });
}

function PageLoaderOverlay() {
  return (
    <div
      className="senovio-page-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading images"
    >
      <img src="/senovio-logo.webp" alt="" className="senovio-page-loader__mark" />
      <span className="sr-only">Loading images</span>
    </div>
  );
}

export function PageImageLoadGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const frame = window.requestAnimationFrame(() => {
      const root = contentRef.current;
      const urls = root ? collectImageUrls(root) : [];

      if (urls.length === 0) {
        setIsLoading(false);
        return;
      }

      Promise.all(urls.map(preloadImage)).then(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });
    });

    setIsLoading(true);

    return () => {
      isActive = false;
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <>
      <div ref={contentRef}>{children}</div>
      {isLoading && <PageLoaderOverlay />}
    </>
  );
}
