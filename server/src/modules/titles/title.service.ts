import { badInput, notFound } from "../../lib/errors";
import { clampLimit } from "../../lib/text";
import type { SeasonRepository, TitleRepository } from "./title.repository";
import type {
  Movie,
  Season,
  Title,
  TitleFilter,
  TitleKind,
  TitleSort,
  Trailer,
  TvShow,
} from "./title.types";
import { movieInputSchema, seasonInputSchema, tvShowInputSchema } from "./title.validation";

export interface ListTitlesArgs {
  filter?: TitleFilter | null;
  sort?: TitleSort | null;
  limit?: number | null;
}

export interface TrailerWithTitle extends Trailer {
  title: Title;
}

const LABEL: Record<TitleKind, string> = { MOVIE: "Movie", TV_SHOW: "TV show" };

/**
 * Business rules for movies, TV shows and seasons. Transport (GraphQL) and
 * storage (Mongo) concerns stay out of here, so it is unit-tested against
 * in-memory repositories.
 */
export class TitleService {
  constructor(
    private readonly titles: TitleRepository,
    private readonly seasons: SeasonRepository,
  ) {}

  listMovies(args: ListTitlesArgs = {}) {
    return this.list("MOVIE", args) as Promise<Movie[]>;
  }

  listTvShows(args: ListTitlesArgs = {}) {
    return this.list("TV_SHOW", args) as Promise<TvShow[]>;
  }

  /** Movies and TV shows featuring a cast member, director or creator. */
  listByPerson(kind: TitleKind, person: string) {
    return this.list(kind, { filter: { person }, limit: 100 });
  }

  async getMovie(id: string) {
    return (await this.findOfKind(id, "MOVIE")) as Movie | null;
  }

  async getTvShow(id: string) {
    return (await this.findOfKind(id, "TV_SHOW")) as TvShow | null;
  }

  similar(title: Title, limit?: number | null) {
    if (title.genres.length === 0) return Promise.resolve([]);
    return this.titles.findSimilar(title, clampLimit(limit, 12, 50));
  }

  async search(query: string, limit?: number | null) {
    const text = query.trim();
    if (text.length < 2) throw badInput("Search query must be at least 2 characters.");
    if (text.length > 100) throw badInput("Search query must be at most 100 characters.");
    return this.titles.search(text, clampLimit(limit, 20, 50));
  }

  /** The first trailer of the most recently released titles that have one. */
  async latestTrailers(limit?: number | null): Promise<TrailerWithTitle[]> {
    const count = clampLimit(limit, 5, 20);
    const recent = await this.titles.findMany({ sort: "RELEASE_DATE_DESC", limit: count * 3 });
    return recent
      .filter((title) => title.trailers.length > 0)
      .slice(0, count)
      .map((title) => ({ ...title.trailers[0]!, title }));
  }

  async seasonsOf(titleIds: readonly string[]): Promise<Season[][]> {
    const seasons = await this.seasons.findByTitleIds(titleIds);
    return titleIds.map((id) => seasons.filter((season) => season.titleId === id));
  }

  // --- Mutations -----------------------------------------------------------

  async createMovie(input: unknown) {
    return (await this.titles.create("MOVIE", movieInputSchema.parse(input))) as Movie;
  }

  async createTvShow(input: unknown) {
    return (await this.titles.create("TV_SHOW", tvShowInputSchema.parse(input))) as TvShow;
  }

  async updateMovie(id: string, input: unknown) {
    const updated = await this.titles.update(id, "MOVIE", movieInputSchema.parse(input));
    if (!updated) throw notFound(LABEL.MOVIE, id);
    return updated as Movie;
  }

  async updateTvShow(id: string, input: unknown) {
    const updated = await this.titles.update(id, "TV_SHOW", tvShowInputSchema.parse(input));
    if (!updated) throw notFound(LABEL.TV_SHOW, id);
    return updated as TvShow;
  }

  async deleteTitle(id: string, kind: TitleKind) {
    if (!(await this.titles.delete(id, kind))) throw notFound(LABEL[kind], id);
    if (kind === "TV_SHOW") await this.seasons.deleteByTitle(id);
    return id;
  }

  async setSeason(tvShowId: string, input: unknown) {
    const season = seasonInputSchema.parse(input);
    if (!(await this.findOfKind(tvShowId, "TV_SHOW"))) throw notFound(LABEL.TV_SHOW, tvShowId);
    return this.seasons.upsert(tvShowId, season);
  }

  async deleteSeason(tvShowId: string, number: number) {
    if (!(await this.seasons.delete(tvShowId, number))) throw notFound("Season", `${tvShowId}#${number}`);
    return true;
  }

  private list(kind: TitleKind, { filter, sort, limit }: ListTitlesArgs) {
    return this.titles.findMany({
      kind,
      filter: filter ?? {},
      sort: sort ?? "RELEASE_DATE_DESC",
      limit: clampLimit(limit, 20),
    });
  }

  private async findOfKind(id: string, kind: TitleKind) {
    const title = await this.titles.findById(id);
    return title?.kind === kind ? title : null;
  }
}
