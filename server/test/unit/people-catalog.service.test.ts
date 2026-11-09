import { describe, expect, it } from "vitest";
import { CatalogService, type Collection, type Platform } from "../../src/modules/catalog/catalog";
import { PersonService, type Person } from "../../src/modules/people/person";
import { InMemoryNamedRepository } from "../helpers/fakes";

const person = (name: string): Person => ({ name, imageUrl: null, bio: null, popularity: 0 });

describe("PersonService", () => {
  it("getMany returns results in key order, with null for unknown names", async () => {
    const service = new PersonService(new InMemoryNamedRepository([person("A"), person("B")]));

    const result = await service.getMany(["B", "Unknown", "A"]);

    expect(result.map((p) => p?.name ?? null)).toEqual(["B", null, "A"]);
  });

  it("validates input on upsert", async () => {
    const service = new PersonService(new InMemoryNamedRepository<Person>());

    await expect(service.upsert({ name: "X", imageUrl: "javascript:alert(1)" })).rejects.toThrow();
    await expect(service.upsert({ name: "X" })).resolves.toMatchObject({ name: "X", popularity: 0 });
  });

  it("throws NOT_FOUND when deleting an unknown person", async () => {
    const service = new PersonService(new InMemoryNamedRepository<Person>());

    await expect(service.delete("Nobody")).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});

describe("CatalogService", () => {
  const netflix: Platform = { name: "Netflix", logoUrl: "https://logo", pricing: "Subscription" };
  const service = () =>
    new CatalogService(
      new InMemoryNamedRepository<Collection>([
        { name: "Drama", kind: "GENRE", imageUrl: null },
        { name: "Marvel", kind: "COLLECTION", imageUrl: null },
      ]),
      new InMemoryNamedRepository([netflix]),
    );

  it("filters collections by kind", async () => {
    expect((await service().listCollections("GENRE")).map((c) => c.name)).toEqual(["Drama"]);
    expect(await service().listCollections()).toHaveLength(2);
  });

  it("returns a placeholder for platforms without a record", async () => {
    const result = await service().getPlatforms(["Netflix", "Mubi"]);

    expect(result).toEqual([netflix, { name: "Mubi", logoUrl: null, pricing: null }]);
  });
});
