import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

declare const process: {
  env: Record<string, string | undefined>;
};

export const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2026-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(sanity);

export function urlFor(source: any) {
  return builder.image(source);
}
