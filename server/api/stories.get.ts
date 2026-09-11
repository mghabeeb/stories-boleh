import { sanity, urlFor } from "../utils/sanity";

export default defineEventHandler(async () => {
  const query = `
    {
      "featured": *[
        _type == "story" &&
        featured == true
      ] | order(publishedAt desc)[0...3] {
        _id,
        title,
        summary,
        body,
        author,
        publishedAt,
        "slug": slug.current,
        featuredImage
      },

      "latest": *[
        _type == "story"
      ] | order(publishedAt desc)[0...9] {
        _id,
        title,
        summary,
        body,
        author,
        publishedAt,
        "slug": slug.current,
        featuredImage
      }
    }
  `;

  const data = await sanity.fetch(query);

  return {
    featured: data.featured.map(addImageUrl),
    latest: data.latest.map(addImageUrl),
  };
});

function addImageUrl(story: any) {
  return {
    ...story,
    imageUrl: story.featuredImage
      ? urlFor(story.featuredImage)
          .width(1200)
          .height(800)
          .fit("crop")
          .auto("format")
          .url()
      : null,
  };
}
