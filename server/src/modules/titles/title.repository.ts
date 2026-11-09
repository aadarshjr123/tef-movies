import mongoose, { type FilterQuery, type SortOrder } from "mongoose";
import { containsText, equalsText } from "../../lib/text";
import { SeasonModel, TitleModel, type SeasonDocument, type TitleDocument } from "./title.model";
import type {
  Season,
  SeasonInput,
  Title,
  TitleFilter,
  TitleInput,
  TitleKind,
  TitleQuery,
  TitleSort,
} from "./title.types";

export interface TitleRepository {
  findById(id: string): Promise<Title | null>;
  findMany(query: TitleQuery): Promise<Title[]>;
  /** Titles of the same kind ranked by how many genres they share with `title`. */
  findSimilar(title: Title, limit: number): Promise<Title[]>;
  search(text: string, limit: number): Promise<Title[]>;
  create(kind: TitleKind, input: TitleInput<Title>): Promise<Title>;
  update(id: string, kind: TitleKind, input: TitleInput<Title>): Promise<Title | null>;
  delete(id: string, kind: TitleKind): Promise<boolean>;
}

export interface SeasonRepository {
  findByTitleIds(titleIds: readonly string[]): Promise<Season[]>;
  upsert(titleId: string, input: SeasonInput): Promise<Season>;
  delete(titleId: string, number: number): Promise<boolean>;
  deleteByTitle(titleId: string): Promise<void>;
}

const SORTS: Record<TitleSort, Record<string, SortOrder>> = {
  RELEASE_DATE_DESC: { releaseDate: -1, _id: 1 },
  IMDB_RATING_DESC: { "ratings.imdb": -1, releaseDate: -1 },
  NAME_ASC: { name: 1 },
};

export function toTitle(doc: TitleDocument): Title {
  const base = {
    id: doc._id.toString(),
    name: doc.name,
    originalName: doc.originalName ?? null,
    overview: doc.overview,
    posterUrl: doc.posterUrl ?? null,
    backdropUrl: doc.backdropUrl ?? null,
    releaseDate: doc.releaseDate,
    certification: doc.certification ?? null,
    genres: doc.genres,
    collections: doc.collections,
    languages: doc.languages,
    ratings: { imdb: doc.ratings?.imdb ?? null, rottenTomatoes: doc.ratings?.rottenTomatoes ?? null },
    cast: doc.cast.map((member) => ({ name: member.name, character: member.character ?? null })),
    trailers: doc.trailers.map(({ name, youtubeId }) => ({ name, youtubeId })),
    watchOptions: doc.watchOptions.map(({ platform, type, url }) => ({ platform, type, url })),
  };
  return doc.kind === "MOVIE"
    ? { ...base, kind: "MOVIE", runtimeMinutes: doc.runtimeMinutes ?? null, directors: doc.directors ?? [] }
    : {
        ...base,
        kind: "TV_SHOW",
        creators: doc.creators ?? [],
        status: doc.status ?? null,
        seasonCount: doc.seasonCount ?? 0,
      };
}

function toSeason(doc: SeasonDocument): Season {
  return {
    titleId: doc.titleId.toString(),
    number: doc.number,
    startDate: doc.startDate ?? null,
    endDate: doc.endDate ?? null,
    episodes: doc.episodes.map((episode) => ({
      number: episode.number,
      name: episode.name,
      overview: episode.overview ?? null,
      runtimeMinutes: episode.runtimeMinutes ?? null,
    })),
  };
}

export function buildTitleFilter(kind: TitleKind | undefined, filter: TitleFilter = {}): FilterQuery<TitleDocument> {
  const query: FilterQuery<TitleDocument> = {};
  if (kind) query.kind = kind;
  if (filter.genre) query.genres = equalsText(filter.genre);
  if (filter.collection) query.collections = equalsText(filter.collection);
  if (filter.person) {
    const person = equalsText(filter.person);
    query.$or = [{ "cast.name": person }, { directors: person }, { creators: person }];
  }
  if (filter.platform || filter.watchType) {
    query.watchOptions = {
      $elemMatch: {
        ...(filter.platform && { platform: equalsText(filter.platform) }),
        ...(filter.watchType && { type: filter.watchType }),
      },
    };
  }
  return query;
}

const isObjectId = (id: string) => mongoose.isValidObjectId(id) && /^[a-f\d]{24}$/i.test(id);

export class MongoTitleRepository implements TitleRepository {
  async findById(id: string) {
    if (!isObjectId(id)) return null;
    const doc = await TitleModel.findById(id).lean<TitleDocument>();
    return doc ? toTitle(doc) : null;
  }

  async findMany({ kind, filter, sort, limit }: TitleQuery) {
    const docs = await TitleModel.find(buildTitleFilter(kind, filter))
      .sort(SORTS[sort])
      .limit(limit)
      .lean<TitleDocument[]>();
    return docs.map(toTitle);
  }

  async findSimilar(title: Title, limit: number) {
    const docs = await TitleModel.aggregate<TitleDocument>([
      {
        $match: {
          kind: title.kind,
          _id: { $ne: new mongoose.Types.ObjectId(title.id) },
          genres: { $in: title.genres },
        },
      },
      { $addFields: { sharedGenres: { $size: { $setIntersection: ["$genres", title.genres] } } } },
      { $sort: { sharedGenres: -1, "ratings.imdb": -1, _id: 1 } },
      { $limit: limit },
      { $project: { sharedGenres: 0 } },
    ]);
    return docs.map(toTitle);
  }

  async search(text: string, limit: number) {
    const pattern = containsText(text);
    const docs = await TitleModel.find({
      $or: [{ name: pattern }, { genres: pattern }, { collections: pattern }, { "cast.name": pattern }],
    })
      .sort(SORTS.IMDB_RATING_DESC)
      .limit(limit)
      .lean<TitleDocument[]>();
    return docs.map(toTitle);
  }

  async create(kind: TitleKind, input: TitleInput<Title>) {
    const doc = await TitleModel.create({ ...input, kind });
    return toTitle(doc.toObject() as TitleDocument);
  }

  async update(id: string, kind: TitleKind, input: TitleInput<Title>) {
    if (!isObjectId(id)) return null;
    const doc = await TitleModel.findOneAndReplace(
      { _id: id, kind },
      { ...input, kind },
      { new: true, runValidators: true },
    ).lean<TitleDocument>();
    return doc ? toTitle(doc) : null;
  }

  async delete(id: string, kind: TitleKind) {
    if (!isObjectId(id)) return false;
    const result = await TitleModel.deleteOne({ _id: id, kind });
    return result.deletedCount === 1;
  }
}

export class MongoSeasonRepository implements SeasonRepository {
  async findByTitleIds(titleIds: readonly string[]) {
    const ids = titleIds.filter(isObjectId);
    const docs = await SeasonModel.find({ titleId: { $in: ids } })
      .sort({ number: 1 })
      .lean<SeasonDocument[]>();
    return docs.map(toSeason);
  }

  async upsert(titleId: string, input: SeasonInput) {
    const doc = await SeasonModel.findOneAndUpdate(
      { titleId, number: input.number },
      { ...input, titleId },
      { upsert: true, new: true, runValidators: true },
    ).lean<SeasonDocument>();
    return toSeason(doc!);
  }

  async delete(titleId: string, number: number) {
    if (!isObjectId(titleId)) return false;
    const result = await SeasonModel.deleteOne({ titleId, number });
    return result.deletedCount === 1;
  }

  async deleteByTitle(titleId: string) {
    await SeasonModel.deleteMany({ titleId });
  }
}
