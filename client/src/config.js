// GraphQL endpoint of the TEF Movies API. Set REACT_APP_API_URL at build time
// (e.g. in client/.env or your hosting provider's settings) to point elsewhere.
export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:4000/graphql";

// Cloudinary account used by the original 2022 data, which stored image public
// IDs. Seeded data uses full image URLs, so this is only needed for old data.
export const CLOUDINARY_CLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD || "";
