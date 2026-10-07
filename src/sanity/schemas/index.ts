import type { SchemaTypeDefinition } from "sanity";
import { propertyType } from "./property";
import { leadType } from "./lead";
import { postType } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [propertyType, leadType, postType],
};
