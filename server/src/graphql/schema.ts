import { makeExecutableSchema } from "@graphql-tools/schema";
import { catalogResolvers } from "../modules/catalog/catalog.resolvers";
import { catalogTypeDefs } from "../modules/catalog/catalog.typeDefs";
import { personResolvers } from "../modules/people/person.resolvers";
import { personTypeDefs } from "../modules/people/person.typeDefs";
import { titleResolvers } from "../modules/titles/title.resolvers";
import { titleTypeDefs } from "../modules/titles/title.typeDefs";
import { baseTypeDefs } from "./base.typeDefs";

/** Each module contributes its own SDL and resolvers; adding one doesn't touch the others. */
const modules = [
  { typeDefs: titleTypeDefs, resolvers: titleResolvers },
  { typeDefs: personTypeDefs, resolvers: personResolvers },
  { typeDefs: catalogTypeDefs, resolvers: catalogResolvers },
];

export const schema = makeExecutableSchema({
  typeDefs: [baseTypeDefs, ...modules.map((module) => module.typeDefs)],
  resolvers: modules.map((module) => module.resolvers),
});
