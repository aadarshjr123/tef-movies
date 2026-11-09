const TMDB_SIZE = /(image\.tmdb\.org\/t\/p\/)[^/]+\//;

/** Widths TMDB serves for each image type. */
export const IMAGE_WIDTHS = {
  poster: [185, 342, 500, 780],
  backdrop: [300, 500, 780, 1280],
  profile: [185, 300],
} as const;

export interface ResponsiveImage {
  src: string;
  srcSet?: string;
}

/**
 * Builds a srcset for TMDB image URLs so the browser downloads the smallest
 * file that fills the slot. Other URLs (and site-relative paths) pass through.
 */
export function responsiveImage(url: string, widths: readonly number[], defaultWidth: number): ResponsiveImage {
  if (!TMDB_SIZE.test(url)) return { src: url };
  const at = (width: number) => url.replace(TMDB_SIZE, `$1w${width}/`);
  return {
    src: at(defaultWidth),
    srcSet: widths.map((width) => `${at(width)} ${width}w`).join(", "),
  };
}

export const youtubeThumbnail = (youtubeId: string, quality: "mq" | "hq" | "maxres" = "hq") =>
  `https://i.ytimg.com/vi/${youtubeId}/${quality}default.jpg`;

/** Privacy-enhanced embed; only loaded once the user chooses to play. */
export const youtubeEmbedUrl = (youtubeId: string) =>
  `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
