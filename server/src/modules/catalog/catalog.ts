import mongoose, { Schema } from "mongoose";
import { z } from "zod";
import { notFound } from "../../lib/errors";
import { MongoNamedRepository, type NamedRepository } from "../../lib/named-repository";
import { urlOrPath } from "../titles/title.validation";

export type CollectionKind = "GENRE" | "COLLECTION";

/** A browse tile: a genre ("Drama") or a curated collection ("Oscar Winners"). */
export interface Collection {
  name: string;
  kind: CollectionKind;
  imageUrl: string | null;
}

/** A streaming or rental service. */
export interface Platform {
  name: string;
  logoUrl: string | null;
  pricing: string | null;
}

export const CollectionModel = mongoose.model<Collection>(
  "Collection",
  new Schema<Collection>({
    name: { type: String, required: true, unique: true, trim: true },
    kind: { type: String, enum: ["GENRE", "COLLECTION"], required: true },
    imageUrl: String,
  }),
);

export const PlatformModel = mongoose.model<Platform>(
  "Platform",
  new Schema<Platform>({
    name: { type: String, required: true, unique: true, trim: true },
    logoUrl: String,
    pricing: String,
  }),
);

export const collectionInputSchema = z.object({
  name: z.string().trim().min(1).max(100),
  kind: z.enum(["GENRE", "COLLECTION"]),
  imageUrl: urlOrPath.nullable().default(null),
});

export const platformInputSchema = z.object({
  name: z.string().trim().min(1).max(100),
  logoUrl: urlOrPath.nullable().default(null),
  pricing: z.string().trim().max(100).nullable().default(null),
});

export const createCollectionRepository = (): NamedRepository<Collection> =>
  new MongoNamedRepository(CollectionModel, (doc) => ({
    name: doc.name,
    kind: doc.kind,
    imageUrl: doc.imageUrl ?? null,
  }));

export const createPlatformRepository = (): NamedRepository<Platform> =>
  new MongoNamedRepository(PlatformModel, (doc) => ({
    name: doc.name,
    logoUrl: doc.logoUrl ?? null,
    pricing: doc.pricing ?? null,
  }));

export class CatalogService {
  constructor(
    private readonly collections: NamedRepository<Collection>,
    private readonly platforms: NamedRepository<Platform>,
  ) {}

  listCollections(kind?: CollectionKind | null) {
    return this.collections.findAll(kind ? { kind } : {});
  }

  listPlatforms() {
    return this.platforms.findAll();
  }

  /**
   * Batch lookup used by the DataLoader. Titles can reference a platform that
   * has no record yet; those get a placeholder instead of failing the query.
   */
  async getPlatforms(names: readonly string[]): Promise<Platform[]> {
    const found = await this.platforms.findByNames(names);
    const byName = new Map(found.map((platform) => [platform.name, platform]));
    return names.map((name) => byName.get(name) ?? { name, logoUrl: null, pricing: null });
  }

  async upsertCollection(input: unknown) {
    return this.collections.upsert(collectionInputSchema.parse(input));
  }

  async deleteCollection(name: string) {
    if (!(await this.collections.deleteByName(name))) throw notFound("Collection", name);
    return true;
  }

  async upsertPlatform(input: unknown) {
    return this.platforms.upsert(platformInputSchema.parse(input));
  }

  async deletePlatform(name: string) {
    if (!(await this.platforms.deleteByName(name))) throw notFound("Platform", name);
    return true;
  }
}
