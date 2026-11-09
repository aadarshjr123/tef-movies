import { CollectionModel, PlatformModel, type Collection, type Platform } from "../modules/catalog/catalog";
import { PersonModel } from "../modules/people/person";
import { SeasonModel, TitleModel } from "../modules/titles/title.model";
import type { Logger } from "../lib/logger";
import data from "./data.json" with { type: "json" };

interface SeedTitle {
  kind: string;
  name: string;
  cast: { name: string }[];
  directors?: string[];
  creators?: string[];
  seasons?: unknown[];
  [field: string]: unknown;
}

interface ResettableModel {
  deleteMany(filter: object): PromiseLike<unknown>;
  syncIndexes(): Promise<unknown>;
}

const MODELS: ResettableModel[] = [TitleModel, SeasonModel, PersonModel, CollectionModel, PlatformModel];

/** Replaces the whole database with the sample data in data.json. */
export async function seedDatabase(logger: Logger) {
  await Promise.all(MODELS.map((model) => model.deleteMany({})));
  // Build indexes (including unique ones) before inserting.
  await Promise.all(MODELS.map((model) => model.syncIndexes()));

  const titles = data.titles as SeedTitle[];
  const credits = new Map<string, number>();

  for (const { seasons = [], ...title } of titles) {
    const doc = await TitleModel.create(title);
    if (seasons.length > 0) {
      await SeasonModel.insertMany(seasons.map((season) => ({ ...(season as object), titleId: doc._id })));
    }
    for (const name of [...title.cast.map((member) => member.name), ...(title.directors ?? []), ...(title.creators ?? [])]) {
      credits.set(name, (credits.get(name) ?? 0) + 1);
    }
  }

  await PersonModel.insertMany(data.people.map((person) => ({ ...person, popularity: credits.get(person.name) ?? 0 })));
  await PlatformModel.insertMany(data.platforms as Platform[]);
  await CollectionModel.insertMany(data.collections as Collection[]);

  logger.info(
    { titles: titles.length, people: data.people.length, platforms: data.platforms.length },
    "Seeded sample data",
  );
}

export async function seedIfEmpty(logger: Logger) {
  if ((await TitleModel.estimatedDocumentCount()) === 0) {
    await seedDatabase(logger);
  }
}
