import type { Services } from "./graphql/context";
import { CatalogService, createCollectionRepository, createPlatformRepository } from "./modules/catalog/catalog";
import { createPersonRepository, PersonService } from "./modules/people/person";
import { MongoSeasonRepository, MongoTitleRepository } from "./modules/titles/title.repository";
import { TitleService } from "./modules/titles/title.service";

/**
 * Composition root: the one place that wires concrete MongoDB repositories
 * into services. Everything else depends on interfaces.
 */
export function createServices(): Services {
  return {
    titles: new TitleService(new MongoTitleRepository(), new MongoSeasonRepository()),
    people: new PersonService(createPersonRepository()),
    catalog: new CatalogService(createCollectionRepository(), createPlatformRepository()),
  };
}
