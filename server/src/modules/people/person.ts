import mongoose, { Schema } from "mongoose";
import { z } from "zod";
import { notFound } from "../../lib/errors";
import { MongoNamedRepository, type NamedRepository } from "../../lib/named-repository";
import { clampLimit } from "../../lib/text";
import { urlOrPath } from "../titles/title.validation";

export interface Person {
  name: string;
  imageUrl: string | null;
  bio: string | null;
  /** Ordering for "popular people"; the seed sets it to the number of credits. */
  popularity: number;
}

const personSchema = new Schema<Person>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    imageUrl: String,
    bio: String,
    popularity: { type: Number, default: 0 },
  },
  { timestamps: true },
);
personSchema.index({ popularity: -1, name: 1 });

export const PersonModel = mongoose.model<Person>("Person", personSchema);

export const personInputSchema = z.object({
  name: z.string().trim().min(1).max(200),
  imageUrl: urlOrPath.nullable().default(null),
  bio: z.string().trim().max(2000).nullable().default(null),
  popularity: z.number().int().min(0).default(0),
});

const toPerson = (doc: Person): Person => ({
  name: doc.name,
  imageUrl: doc.imageUrl ?? null,
  bio: doc.bio ?? null,
  popularity: doc.popularity ?? 0,
});

export const createPersonRepository = (): NamedRepository<Person> =>
  new MongoNamedRepository(PersonModel, toPerson, { popularity: -1, name: 1 });

export class PersonService {
  constructor(private readonly people: NamedRepository<Person>) {}

  list(limit?: number | null) {
    return this.people.findAll({}, clampLimit(limit, 24));
  }

  get(name: string) {
    return this.people.findByName(name);
  }

  /** Batch lookup used by the DataLoader; preserves the order of `names`. */
  async getMany(names: readonly string[]) {
    const found = await this.people.findByNames(names);
    const byName = new Map(found.map((person) => [person.name, person]));
    return names.map((name) => byName.get(name) ?? null);
  }

  async upsert(input: unknown) {
    return this.people.upsert(personInputSchema.parse(input));
  }

  async delete(name: string) {
    if (!(await this.people.deleteByName(name))) throw notFound("Person", name);
    return true;
  }
}
