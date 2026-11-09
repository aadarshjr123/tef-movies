import { useState, type ImgHTMLAttributes } from "react";
import { responsiveImage } from "@/shared/lib/images";

const FALLBACK = "/images/where-to-watch.svg";

interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  src: string | null | undefined;
  alt: string;
  /** Candidate widths for TMDB srcset; omit for a single image. */
  widths?: readonly number[];
  defaultWidth?: number;
  /** Above-the-fold image (e.g. the LCP hero): load eagerly at high priority. */
  priority?: boolean;
}

/**
 * Lazy-loaded image with a TMDB srcset and a fallback when the image is
 * missing or fails to load. Callers size the wrapper (aspect ratio) so
 * loading images never shift the layout.
 */
export function Img({ src, alt, widths, defaultWidth = 500, priority = false, className = "", ...rest }: ImgProps) {
  const [failed, setFailed] = useState(false);
  const image = src && !failed ? (widths ? responsiveImage(src, widths, defaultWidth) : { src }) : { src: FALLBACK };

  return (
    <img
      {...rest}
      src={image.src}
      srcSet={"srcSet" in image ? image.srcSet : undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`${className} ${image.src === FALLBACK ? "object-contain p-6 opacity-60" : ""}`}
    />
  );
}
