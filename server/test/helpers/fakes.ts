import type { NamedRepository } from "../../src/lib/named-repository";
import type { SeasonRepository, TitleRepository } from "../../src/modules/titles/title.repository";
import type { Movie, Season, SeasonInput, Title, TitleInput, TitleKind, TitleQuery, TvShow } from "../../src/modules/titles/title.types";

let nextId = 1;
const newId = () => (nextId++).toString(16).padStart(24, "0");

export function makeMovie(overrides: Partial<Movie> = {}): Movie {
  return {
    id: newId(),
    kind: "MOVIE",
    name: "Inception",
    originalName: null,
    overview: "A thief who steals secrets through dreams.",
    posterUrl: "https://image.tmdb.org/t/p/w500/poster.jpg",
    backdropUrl: null,
    releaseDate: "2010-07-15",
    certification: "PG-13",
    genres: ["Action", "Science Fiction"],
    collections: [],
    languages: ["English"],
    ratings: { imdb: 8.8, rottenTomatoes: 87 },
    cast: [{ name: "Leonardo DiCaprio", character: "Cobb" }],
    trailers: [{ name: "Trailer", youtubeId: "YoHD9XEInc0" }],
    watchOptions: [{ platform: "Netflix", type: "SUBSCRIPTION", url: "https://netflix.com/title/1" }],
    runtimeMinutes: 148,
    directors: ["Christopher Nolan"],
    ...overrides,
  };
}

export function makeTvShow(overrides: Partial<TvShow> = {}): TvShow {
  return {
    id: newId(),
    kind: "TV_SHOW",
    name: "Dark",
    originalName: null,
    overview: "A missing child sets four families on a hunt.",
    posterUrl: null,
    backdropUrl: null,
    releaseDate: "2017-12-01",
    certification: null,
    genres: ["Drama", "Mystery"],
    collections: [],
    languages: ["German"],
    ratings: { imdb: 8.7, rottenTomatoes: 95 },
    cast: [],
    trailers: [],
    watchOptions: [],
    creators: ["Baran bo Odar"],
    status: "Ended",
    seasonCount: 3,
    ...overrides,
  };
}

/** A minimal in-memory TitleRepository with the same semantics as the Mongo one. */
export class InMemoryTitleRepository implements TitleRepository {
  constructor(public titles: Title[] = []) {}

  async findById(id: string) {
    return this.titles.find((title) => title.id === id) ?? null;
  }

  async findMany({ kind, filter = {}, sort, limit }: TitleQuery) {
    const results = this.titles.filter(
      (title) =>
        (!kind || title.kind === kind) &&
        (!filter.genre || title.genres.includes(filter.genre)) &&
        (!filter.collection || title.collections.includes(filter.collection)) &&
        (!filter.platform || title.watchOptions.some((option) => option.platform === filter.platform)),
    );
    const compare: Record<typeof sort, (a: Title, b: Title) => number> = {
      RELEASE_DATE_DESC: (a, b) => b.releaseDate.localeCompare(a.releaseDate),
      IMDB_RATING_DESC: (a, b) => (b.ratings.imdb ?? 0) - (a.ratings.imdb ?? 0),
      NAME_ASC: (a, b) => a.name.localeCompare(b.name),
    };
    return [...results].sort(compare[sort]).slice(0, limit);
  }

  async findSimilar(title: Title, limit: number) {
    return this.titles
      .filter((other) => other.kind === title.kind && other.id !== title.id && other.genres.some((g) => title.genres.includes(g)))
      .slice(0, limit);
  }

  async search(text: string, limit: number) {
    const needle = text.toLowerCase();
    return this.titles.filter((title) => title.name.toLowerCase().includes(needle)).slice(0, limit);
  }

  async create(kind: TitleKind, input: TitleInput<Title>) {
    const title = { ...input, id: newId(), kind } as Title;
    this.titles.push(title);
    return title;
  }

  async update(id: string, kind: TitleKind, input: TitleInput<Title>) {
    const index = this.titles.findIndex((title) => title.id === id && title.kind === kind);
    if (index === -1) return null;
    const title = { ...input, id, kind } as Title;
    this.titles[index] = title;
    return title;
  }

  async delete(id: string, kind: TitleKind) {
    const before = this.titles.length;
    this.titles = this.titles.filter((title) => !(title.id === id && title.kind === kind));
    return this.titles.length < before;
  }
}

export class InMemorySeasonRepository implements SeasonRepository {
  constructor(public seasons: Season[] = []) {}

  async findByTitleIds(titleIds: readonly string[]) {
    return this.seasons.filter((season) => titleIds.includes(season.titleId));
  }

  async upsert(titleId: string, input: SeasonInput) {
    const season = { ...input, titleId };
    this.seasons = [...this.seasons.filter((s) => !(s.titleId === titleId && s.number === input.number)), season];
    return season;
  }

  async delete(titleId: string, number: number) {
    const before = this.seasons.length;
    this.seasons = this.seasons.filter((s) => !(s.titleId === titleId && s.number === number));
    return this.seasons.length < before;
  }

  async deleteByTitle(titleId: string) {
    this.seasons = this.seasons.filter((s) => s.titleId !== titleId);
  }
}

export class InMemoryNamedRepository<T extends { name: string }> implements NamedRepository<T> {
  constructor(public items: T[] = []) {}

  async findAll(filter: Partial<T> = {}, limit = 0) {
    const matches = this.items.filter((item) =>
      Object.entries(filter).every(([key, value]) => item[key as keyof T] === value),
    );
    return limit ? matches.slice(0, limit) : matches;
  }

  async findByName(name: string) {
    return this.items.find((item) => item.name.toLowerCase() === name.toLowerCase()) ?? null;
  }

  async findByNames(names: readonly string[]) {
    return this.items.filter((item) => names.includes(item.name));
  }

  async upsert(entity: T) {
    this.items = [...this.items.filter((item) => item.name !== entity.name), entity];
    return entity;
  }

  async deleteByName(name: string) {
    const before = this.items.length;
    this.items = this.items.filter((item) => item.name !== name);
    return this.items.length < before;
  }
}
