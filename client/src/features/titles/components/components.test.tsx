import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { cardFixture, tvShowDetailsFixture } from "@/test/fixtures";
import { renderWithProviders } from "@/test/render";
import { SeasonGuide } from "./SeasonGuide";
import { TitleCard } from "./TitleCard";
import { TitleRow } from "./TitleRow";

describe("TitleCard", () => {
  it("links to the title page with an accessible poster", () => {
    renderWithProviders(<TitleCard title={cardFixture({ id: "42", name: "Dark", kind: "TV_SHOW" })} />);

    const link = screen.getByRole("link", { name: /Dark/ });
    expect(link).toHaveAttribute("href", "/tv/42");
    // Decorative poster (the name is visible text), served from a srcset.
    expect(link.querySelector("img")).toHaveAttribute("alt", "");
    expect(link.querySelector("img")).toHaveAttribute("srcset", expect.stringContaining("w185"));
    expect(within(link).getByText("Netflix")).toBeInTheDocument();
  });
});

describe("TitleRow", () => {
  const base = { isLoading: false, refetch: () => undefined };

  it("renders a labelled list of cards", () => {
    renderWithProviders(
      <TitleRow title="Latest movies" query={{ ...base, data: [cardFixture(), cardFixture({ name: "Dune" })] }} />,
    );

    expect(screen.getByRole("heading", { name: "Latest movies" })).toBeInTheDocument();
    expect(within(screen.getByRole("list", { name: "Latest movies" })).getAllByRole("listitem")).toHaveLength(2);
  });

  it("shows a skeleton while loading", () => {
    renderWithProviders(<TitleRow title="Latest movies" query={{ ...base, isLoading: true }} />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("is hidden when there are no results", () => {
    const { container } = renderWithProviders(<TitleRow title="Free TV shows" query={{ ...base, data: [] }} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows the error with a retry action", async () => {
    let retried = false;
    const { user } = renderWithProviders(
      <TitleRow
        title="Latest movies"
        query={{
          ...base,
          error: { status: "FETCH_ERROR", message: "Couldn't reach the server." },
          refetch: () => (retried = true),
        }}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Couldn't reach the server.");
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(retried).toBe(true);
  });
});

describe("SeasonGuide", () => {
  it("shows the selected season's dates and episodes", async () => {
    const { user } = renderWithProviders(<SeasonGuide show={tvShowDetailsFixture()} />);

    expect(screen.getByText("1. Pilot")).toBeInTheDocument();
    expect(screen.getByText("January 20, 2008")).toBeInTheDocument();

    await user.selectOptions(screen.getByRole("combobox", { name: "Season" }), "2");

    expect(screen.getByText("1. Seven Thirty-Seven")).toBeInTheDocument();
    expect(screen.getByText("No overview yet.")).toBeInTheDocument();
    expect(screen.queryByText("1. Pilot")).toBeNull();
  });
});
