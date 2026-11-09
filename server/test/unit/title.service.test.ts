import { beforeEach, describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { AppError } from "../../src/lib/errors";
import { TitleService } from "../../src/modules/titles/title.service";
import { InMemorySeasonRepository, InMemoryTitleRepository, makeMovie, makeTvShow } from "../helpers/fakes";

describe("TitleService", () => {
  let titles: InMemoryTitleRepository;
  let seasons: InMemorySeasonRepository;
  let service: TitleService;

  beforeEach(() => {
    titles = new InMemoryTitleRepository();
    seasons = new InMemorySeasonRepository();
    service = new TitleService(titles, seasons);
  });

  describe("listMovies", () => {
    it("returns only movies, newest first by default", async () => {
      titles.titles = [
        makeMovie({ name: "Old", releaseDate: "1999-01-01" }),
        makeTvShow({ name: "Show" }),
        makeMovie({ name: "New", releaseDate: "2024-01-01" }),
      ];

      const result = await service.listMovies();

      expect(result.map((m) => m.name)).toEqual(["New", "Old"]);
    });

    it("clamps the limit to between 1 and 100", async () => {
      titles.titles = Array.from({ length: 120 }, (_, i) => makeMovie({ name: `M${i}` }));

      expect(await service.listMovies({ limit: 500 })).toHaveLength(100);
      expect(await service.listMovies({ limit: -3 })).toHaveLength(1);
    });
  });

  describe("getMovie / getTvShow", () => {
    it("does not return a TV show when a movie is requested", async () => {
      const show = makeTvShow();
      titles.titles = [show];

      expect(await service.getMovie(show.id)).toBeNull();
      expect(await service.getTvShow(show.id)).toEqual(show);
    });
  });

  describe("search", () => {
    it.each(["", " a ", "x".repeat(101)])("rejects query %j", async (query) => {
      await expect(service.search(query)).rejects.toBeInstanceOf(AppError);
    });

    it("trims the query before searching", async () => {
      titles.titles = [makeMovie({ name: "Interstellar" })];

      const result = await service.search("  inter  ");

      expect(result.map((t) => t.name)).toEqual(["Interstellar"]);
    });
  });

  describe("similar", () => {
    it("returns nothing for a title without genres", async () => {
      const title = makeMovie({ genres: [] });
      titles.titles = [title, makeMovie()];

      expect(await service.similar(title)).toEqual([]);
    });

    it("excludes the title itself", async () => {
      const title = makeMovie({ name: "A" });
      titles.titles = [title, makeMovie({ name: "B" })];

      expect((await service.similar(title)).map((t) => t.name)).toEqual(["B"]);
    });
  });

  describe("latestTrailers", () => {
    it("takes the first trailer of the newest titles that have one", async () => {
      titles.titles = [
        makeMovie({ name: "No trailer", releaseDate: "2025-01-01", trailers: [] }),
        makeMovie({ name: "Newest", releaseDate: "2024-01-01", trailers: [{ name: "T1", youtubeId: "aaaaaaaaaaa" }, { name: "T2", youtubeId: "bbbbbbbbbbb" }] }),
        makeMovie({ name: "Older", releaseDate: "2020-01-01" }),
      ];

      const result = await service.latestTrailers(2);

      expect(result.map((t) => [t.title.name, t.youtubeId])).toEqual([
        ["Newest", "aaaaaaaaaaa"],
        ["Older", "YoHD9XEInc0"],
      ]);
    });
  });

  describe("seasonsOf", () => {
    it("groups seasons by title id, in the order requested", async () => {
      seasons.seasons = [
        { titleId: "b", number: 1, startDate: null, endDate: null, episodes: [] },
        { titleId: "a", number: 1, startDate: null, endDate: null, episodes: [] },
      ];

      const result = await service.seasonsOf(["a", "b", "c"]);

      expect(result.map((group) => group.map((s) => s.titleId))).toEqual([["a"], ["b"], []]);
    });
  });

  describe("mutations", () => {
    const validMovie = { name: "New Film", overview: "Plot.", releaseDate: "2025-05-01" };

    it("creates a movie, filling defaults", async () => {
      const movie = await service.createMovie(validMovie);

      expect(movie).toMatchObject({ kind: "MOVIE", name: "New Film", genres: [], directors: [], ratings: { imdb: null } });
    });

    it("rejects invalid input with a ZodError", async () => {
      await expect(service.createMovie({ ...validMovie, releaseDate: "May 2025" })).rejects.toBeInstanceOf(ZodError);
      await expect(service.createMovie({ ...validMovie, ratings: { imdb: 11 } })).rejects.toBeInstanceOf(ZodError);
      await expect(
        service.createMovie({ ...validMovie, trailers: [{ name: "t", youtubeId: "not-an-id" }] }),
      ).rejects.toBeInstanceOf(ZodError);
    });

    it("throws NOT_FOUND when updating a missing movie", async () => {
      await expect(service.updateMovie("missing", validMovie)).rejects.toMatchObject({ code: "NOT_FOUND" });
    });

    it("deletes a TV show's seasons with the show", async () => {
      const show = makeTvShow();
      titles.titles = [show];
      seasons.seasons = [{ titleId: show.id, number: 1, startDate: null, endDate: null, episodes: [] }];

      await service.deleteTitle(show.id, "TV_SHOW");

      expect(titles.titles).toEqual([]);
      expect(seasons.seasons).toEqual([]);
    });

    it("only sets seasons on existing TV shows", async () => {
      const movie = makeMovie();
      titles.titles = [movie];

      await expect(service.setSeason(movie.id, { number: 1 })).rejects.toMatchObject({ code: "NOT_FOUND" });
    });
  });
});
