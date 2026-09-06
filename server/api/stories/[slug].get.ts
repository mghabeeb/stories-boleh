import { createError } from 'h3'
import { sanity, urlFor } from '../../utils/sanity'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Story slug is required',
    })
  }

  const query = `
    *[
      _type == "story" &&
      slug.current == $slug
    ][0] {
      _id,
      title,
      summary,
      author,
      publishedAt,
      body,
      featuredImage
    }
  `

  const story = await sanity.fetch(query, { slug })

  if (!story) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Story not found',
    })
  }

  return {
    ...story,

    imageUrl: story.featuredImage
      ? urlFor(story.featuredImage)
          .width(1600)
          .auto('format')
          .url()
      : null,
  }
})
