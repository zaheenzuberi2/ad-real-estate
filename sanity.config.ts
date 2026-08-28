import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schemas";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("AD Real Estate")
          .items([
            S.listItem()
              .title("Properties")
              .child(
                S.documentTypeList("property")
                  .title("Properties")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.divider(),
            S.listItem()
              .title("New Enquiries")
              .child(
                S.documentList()
                  .title("New Enquiries")
                  .filter('_type == "lead" && status == "new"')
                  .defaultOrdering([
                    { field: "submittedAt", direction: "desc" },
                  ])
              ),
            S.listItem()
              .title("All Enquiries")
              .child(
                S.documentTypeList("lead")
                  .title("All Enquiries")
                  .defaultOrdering([
                    { field: "submittedAt", direction: "desc" },
                  ])
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
