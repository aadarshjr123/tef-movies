import type { FilterQuery, Model, SortOrder } from "mongoose";
import { equalsText } from "./text";

/** Storage for entities identified by a unique `name` (people, platforms, collections). */
export interface NamedRepository<T extends { name: string }> {
  findAll(filter?: Partial<T>, limit?: number): Promise<T[]>;
  findByName(name: string): Promise<T | null>;
  findByNames(names: readonly string[]): Promise<T[]>;
  upsert(entity: T): Promise<T>;
  deleteByName(name: string): Promise<boolean>;
}

export class MongoNamedRepository<T extends { name: string }> implements NamedRepository<T> {
  constructor(
    private readonly model: Model<T>,
    private readonly toEntity: (doc: T) => T,
    private readonly sort: Record<string, SortOrder> = { name: 1 },
  ) {}

  async findAll(filter: Partial<T> = {}, limit = 0) {
    const docs = await this.model
      .find(filter as FilterQuery<T>)
      .sort(this.sort)
      .limit(limit)
      .lean<T[]>();
    return docs.map(this.toEntity);
  }

  async findByName(name: string) {
    const doc = await this.model.findOne({ name: equalsText(name) } as FilterQuery<T>).lean<T>();
    return doc ? this.toEntity(doc) : null;
  }

  async findByNames(names: readonly string[]) {
    const docs = await this.model.find({ name: { $in: names } } as FilterQuery<T>).lean<T[]>();
    return docs.map(this.toEntity);
  }

  async upsert(entity: T) {
    const doc = await this.model
      .findOneAndUpdate({ name: entity.name } as FilterQuery<T>, entity, {
        upsert: true,
        new: true,
        runValidators: true,
      })
      .lean<T>();
    return this.toEntity(doc!);
  }

  async deleteByName(name: string) {
    const result = await this.model.deleteOne({ name } as FilterQuery<T>);
    return result.deletedCount === 1;
  }
}
