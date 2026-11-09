/** Escapes user input so it can be embedded in a RegExp as a literal. */
export const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Case-insensitive "contains" matcher for user input. */
export const containsText = (text: string) => new RegExp(escapeRegExp(text.trim()), "i");

/** Case-insensitive exact matcher, so "free classics" finds "Free Classics". */
export const equalsText = (text: string) => new RegExp(`^${escapeRegExp(text.trim())}$`, "i");

/** Clamps a client-supplied page size to a safe range. */
export const clampLimit = (limit: number | null | undefined, fallback: number, max = 100) =>
  Math.min(Math.max(Math.trunc(limit ?? fallback), 1), max);
