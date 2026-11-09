import React from "react";
import { CLOUDINARY_CLOUD } from "../config";

const placeholder = "/images/where-to-watch.svg";

// Drop-in replacement for cloudinary-react's <Image>: renders full URLs (and
// site-relative paths) directly, and only builds a Cloudinary URL for bare
// public IDs. The original "tefdb" Cloudinary account no longer serves images.
export const Image = ({ publicId, cloud_name, format, children, ...props }) => {
  let src = publicId || placeholder;
  if (publicId && !/^(https?:)?\/\//.test(publicId) && !publicId.startsWith("/")) {
    src = CLOUDINARY_CLOUD
      ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/q_85/${publicId}${format ? "." + format : ""}`
      : placeholder;
  }
  return (
    <img
      loading="lazy"
      {...props}
      src={src}
      onError={(e) => {
        if (!e.currentTarget.src.endsWith(placeholder)) e.currentTarget.src = placeholder;
      }}
    />
  );
};

// Kept so existing <Image><Transformation /></Image> markup still compiles.
export const Transformation = () => null;
export const Video = () => null;
