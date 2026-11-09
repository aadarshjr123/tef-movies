import { timingSafeEqual } from "node:crypto";
import DataLoader from "dataloader";
import type { CatalogService, Platform } from "../modules/catalog/catalog";
import type { Person, PersonService } from "../modules/people/person";
import type { TitleService } from "../modules/titles/title.service";
import type { Season } from "../modules/titles/title.types";
import { unauthenticated } from "../lib/errors";

/** Everything resolvers depend on, injected so tests can supply fakes. */
export interface Services {
  titles: TitleService;
  people: PersonService;
  catalog: CatalogService;
}

/**
 * Per-request batch loaders. A title page resolves ~20 cast photos, several
 * platform logos and its seasons; without these each would be its own query
 * (the N+1 problem). DataLoader collects keys within a tick into one query.
 */
export interface Loaders {
  personByName: DataLoader<string, Person | null>;
  platformByName: DataLoader<string, Platform>;
  seasonsByTitleId: DataLoader<string, Season[]>;
}

export interface GraphQLContext {
  services: Services;
  loaders: Loaders;
  isAdmin: boolean;
}

export function createLoaders(services: Services): Loaders {
  return {
    personByName: new DataLoader((names) => services.people.getMany(names)),
    platformByName: new DataLoader((names) => services.catalog.getPlatforms(names)),
    seasonsByTitleId: new DataLoader((ids) => services.titles.seasonsOf(ids)),
  };
}

/** Constant-time comparison of the bearer token with ADMIN_TOKEN. */
export function isAdminToken(authorization: string | undefined, adminToken: string | undefined): boolean {
  if (!adminToken || !authorization?.startsWith("Bearer ")) return false;
  const given = Buffer.from(authorization.slice("Bearer ".length));
  const expected = Buffer.from(adminToken);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export function requireAdmin(context: GraphQLContext) {
  if (!context.isAdmin) throw unauthenticated();
}
