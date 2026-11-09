import { describe, expect, it } from "vitest";
import { formatDate, formatRuntime, truncateWords } from "./format";
import { IMAGE_WIDTHS, responsiveImage, youtubeEmbedUrl } from "./images";
import { paths } from "./routes";

describe("formatDate", () => {
  it("formats ISO dates without timezone drift", () => {
    expect(formatDate("2010-07-15")).toBe("July 15, 2010");
    expect(formatDate("2024-01-01")).toBe("January 1, 2024");
  });

  it("handles missing and invalid dates", () => {
    expect(formatDate(null)).toBe("TBA");
    expect(formatDate("soon")).toBe("soon");
  });
});

describe("formatRuntime", () => {
  it.each([
    [148, "2h 28m"],
    [45, "45m"],
    [120, "2h 0m"],
    [null, null],
    [0, null],
  ])("%s → %s", (minutes, expected) => {
    expect(formatRuntime(minutes)).toBe(expected);
  });
});

describe("truncateWords", () => {
  it("truncates at word boundaries", () => {
    expect(truncateWords("one two three four", 2)).toBe("one two…");
    expect(truncateWords("short", 5)).toBe("short");
  });
});

describe("responsiveImage", () => {
  it("builds a srcset for TMDB urls", () => {
    const image = responsiveImage("https://image.tmdb.org/t/p/w500/abc.jpg", IMAGE_WIDTHS.backdrop, 780);

    expect(image.src).toBe("https://image.tmdb.org/t/p/w780/abc.jpg");
    expect(image.srcSet).toBe(
      "https://image.tmdb.org/t/p/w300/abc.jpg 300w, https://image.tmdb.org/t/p/w780/abc.jpg 780w, https://image.tmdb.org/t/p/w1280/abc.jpg 1280w",
    );
  });

  it("passes other urls through", () => {
    expect(responsiveImage("/images/logo.svg", [100], 100)).toEqual({ src: "/images/logo.svg" });
  });
});

describe("helpers", () => {
  it("uses the privacy-enhanced YouTube domain", () => {
    expect(youtubeEmbedUrl("abc")).toMatch(/^https:\/\/www\.youtube-nocookie\.com\/embed\/abc/);
  });

  it("builds title and person paths", () => {
    expect(paths.title("MOVIE", "1")).toBe("/movies/1");
    expect(paths.title("TV_SHOW", "1")).toBe("/tv/1");
    expect(paths.person("Aamir Khan")).toBe("/people/Aamir%20Khan");
    expect(paths.search("a&b")).toBe("/search?q=a%26b");
  });
});
