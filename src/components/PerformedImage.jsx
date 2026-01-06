
// src/components/PerformedImage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

/**
 * In-memory cache for aspect ratios by src URL.
 * If you want persistence across sessions, you can mirror this to localStorage.
 */
const ratioCache = new Map();

export default function PerformedImage({
  src,
  alt,
  lqip,              // optional tiny blurred placeholder (data URL or tiny image URL)
  eager = false,      // true for above-the-fold images
  className,
  cover = true,       // object-fit cover by default (set to false to use contain)
  rounded = "rounded-lg",
  onClick
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  //   const [ratio, setRatio] = useState(() => ratioCache.get(src) ?? null);
  const containerRef = useRef(null);

  //   const styleAspect = useMemo(() => {
  //     // If we know the ratio, use it; else a reasonable default (4/3)
  //     const r = ratio ?? 4 / 3;
  //     return { aspectRatio: `${r}` };
  //   }, [ratio]);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    setErrored(false);

    // Create an offscreen image to preload and check loading
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setLoaded(true);
    };
    img.onerror = () => {
      if (!cancelled) setErrored(true);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  // Responsive aspect ratio based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setAspectRatio(2 / 3);
      } else {
        setAspectRatio(4 / 3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div
      ref={containerRef}
      className={className ? className : clsx("relative w-full overflow-hidden bg-base-200", rounded)}
      style={{ aspectRatio }}
    >
      {/* Placeholder layer (blur LQIP or skeleton) */}
      {!loaded && !errored &&(
        lqip ? (
          <img
            src={lqip}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            // className={className ? className : clsx(
            //   "absolute  h-full",
            //   cover ? "object-cover" : "object-contain",
            //   "filter blur-md scale-105"

            // )}
            onClick={onClick}
          />
        ) 
        : (
          <div className="absolute inset-0  h-full bg-gray-300 animate-pulse" />
        )
      )}

      {/* Real image (revealed only after decode) */}
      {!errored && (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={eager ? "high" : "low"}
          onClick={onClick}
          className={clsx(
            // "absolute inset-0 w-full h-full",
            cover ? "object-cover" : "object-contain"
            ,
            (
              clsx(
                "transition-opacity duration-300",
                loaded ? "opacity-100" : "opacity-0"
              )
            ),
            className
          )}
        />
      )}

      {/* Error fallback */}
      {errored && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-base-200 text-sm opacity-70">
          Image failed to load
          <div className="flex">
            <span role="img" aria-label="broken image" className="ml-1">⚠️</span>
            <p>{alt}</p>
            </div>
          
        </div>
      )}
    </div>
  );
}
