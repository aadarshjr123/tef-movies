import { screen, waitFor, within } from "@testing-library/react";
import { HttpResponse, graphql } from "msw";
import { describe, expect, it } from "vitest";
import { renderApp } from "./render";
import { server } from "./server";

describe("Home page", () => {
  it("renders the hero and rows from the API, hiding empty rows", async () => {
    renderApp("/");

    expect(await screen.findByRole("region", { name: "Featured titles" })).toBeInTheDocument();
    const latest = await screen.findByRole("list", { name: "Latest movies" });
    expect(within(latest).getByText("Oppenheimer")).toBeInTheDocument();
    expect(await screen.findByRole("list", { name: "Free movies" })).toBeInTheDocument();
    expect(await screen.findByRole("list", { name: "Popular people" })).toBeInTheDocument();
    // The mocked API returns no free TV shows, so that row isn't rendered.
    expect(screen.queryByRole("heading", { name: "Free TV shows" })).toBeNull();
    expect(document.title).toBe("TEF Movies");
  });

  it("shows an error per row, and retrying recovers just that row", async () => {
    let fail = true;
    server.use(
      graphql.query("Movies", () =>
        fail
          ? HttpResponse.json({ errors: [{ message: "Database unavailable" }] })
          : HttpResponse.json({ data: { movies: [] } }),
      ),
    );
    const { user } = renderApp("/");

    const alerts = await screen.findAllByRole("alert");
    expect(alerts[0]).toHaveTextContent("Database unavailable");
    // Rows fail independently; the TV rows still render.
    expect(await screen.findByRole("list", { name: "Latest TV shows" })).toBeInTheDocument();

    fail = false;
    await user.click(within(alerts[0]!).getByRole("button", { name: "Try again" }));
    await waitFor(() => expect(screen.getAllByRole("alert")).toHaveLength(alerts.length - 1));
  });
});

describe("Movie details page", () => {
  it("shows details, credits linking to people, and where to watch", async () => {
    renderApp("/movies/movie-1");

    expect(await screen.findByRole("heading", { level: 1, name: "Inception" })).toBeInTheDocument();
    expect(screen.getByText("· 2h 28m")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Leonardo DiCaprio/ })).toHaveAttribute(
      "href",
      "/people/Leonardo%20DiCaprio",
    );
    expect(screen.getByRole("link", { name: /Watch now on Netflix/ })).toHaveAttribute(
      "href",
      "https://www.netflix.com/title/70131314",
    );
    expect(
      within(screen.getByRole("list", { name: "More movies like this" })).getByText("Interstellar"),
    ).toBeInTheDocument();
    expect(document.title).toBe("Inception · TEF Movies");
  });

  it("opens the trailer in the shared player", async () => {
    const { user } = renderApp("/movies/movie-1");

    await user.click(await screen.findByRole("button", { name: "Play trailer: Official Trailer" }));

    expect(screen.getByRole("dialog", { name: "Trailer: Official Trailer" })).toBeInTheDocument();
  });

  it("shows not found for an unknown id", async () => {
    renderApp("/movies/missing");
    expect(await screen.findByText("We couldn't find that movie.")).toBeInTheDocument();
  });
});

describe("TV show page", () => {
  it("includes the season guide", async () => {
    renderApp("/tv/show-1");

    expect(await screen.findByRole("heading", { level: 1, name: "Breaking Bad" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Season" })).toHaveValue("1");
    expect(screen.getByText("1. Pilot")).toBeInTheDocument();
  });
});

describe("Search page", () => {
  it("searches as you type, keeps the query in the URL and groups results", async () => {
    const { user, router } = renderApp("/search");

    // Before typing, the browse tiles are shown.
    expect(await screen.findByRole("list", { name: "Genres" })).toBeInTheDocument();

    await user.type(screen.getByRole("searchbox"), "nolan");

    expect(await screen.findByRole("list", { name: "Movie results" })).toHaveTextContent("Inception");
    expect(screen.getByRole("list", { name: "TV show results" })).toHaveTextContent("Westworld");
    expect(router.state.location.search).toBe("?q=nolan");
  });

  it("reports when nothing matches", async () => {
    renderApp("/search?q=zzzz");
    expect(await screen.findByText("No results for “zzzz”.")).toBeInTheDocument();
  });
});

describe("Browse page", () => {
  it("filters by genre via the URL", async () => {
    const requested: unknown[] = [];
    server.use(
      graphql.query("Movies", ({ variables }) => {
        requested.push(variables.filter);
        return HttpResponse.json({ data: { movies: [] } });
      }),
    );
    const { user, router } = renderApp("/movies/browse");

    await user.click(await screen.findByRole("button", { name: "Action" }));

    await waitFor(() => expect(requested).toContainEqual({ genre: "Action" }));
    expect(router.state.location.search).toBe("?genre=Action");
    expect(screen.getByRole("button", { name: "Action" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("Routing", () => {
  it("renders a not found page for unknown paths", async () => {
    renderApp("/nope");
    expect(await screen.findByRole("heading", { name: "Not found" })).toBeInTheDocument();
  });

  it("highlights the active navigation link", async () => {
    renderApp("/movies");
    const nav = await screen.findByRole("navigation", { name: "Main" });
    expect(within(nav).getByRole("link", { name: "Movies" })).toHaveAttribute("aria-current", "page");
  });
});
