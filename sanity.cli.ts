import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

/** Config pour la CLI Sanity (`npx sanity dev`, `npx sanity deploy`, `npx sanity init`). */
export default defineCliConfig({
  api: { projectId, dataset },
});
