import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@/test/render";
import playerSlice, { trailerClosed, trailerOpened } from "./playerSlice";
import { TrailerCard } from "./TrailerCard";
import { TrailerModal } from "./TrailerModal";

describe("playerSlice", () => {
  it("opens and closes a video", () => {
    const opened = playerSlice.reducer(undefined, trailerOpened({ youtubeId: "abc", name: "Trailer" }));
    expect(opened.video).toEqual({ youtubeId: "abc", name: "Trailer" });
    expect(playerSlice.reducer(opened, trailerClosed()).video).toBeNull();
  });
});

describe("trailer playback", () => {
  it("loads the YouTube player only after a trailer is clicked, and closes it", async () => {
    const { user } = renderWithProviders(
      <>
        <TrailerCard youtubeId="Way9Dexny3w" name="Official Trailer" caption="Dune: Part Two" />
        <TrailerModal />
      </>,
    );
    expect(document.querySelector("iframe")).toBeNull();

    await user.click(screen.getByRole("button", { name: /^Play trailer: Dune: Part Two/ }));

    const dialog = screen.getByRole("dialog", { name: "Trailer: Official Trailer" });
    expect(within(dialog).getByTitle("Official Trailer")).toHaveAttribute(
      "src",
      expect.stringContaining("/embed/Way9Dexny3w"),
    );

    await user.click(within(dialog).getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
