import type { SchemaTypeDefinition } from "sanity";
import { propertyType } from "./property";
import { leadType } from "./lead";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [propertyType, leadType],
};
