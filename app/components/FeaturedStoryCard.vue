```vue
<script setup lang="ts">
interface Story {
  _id: string
  slug: string
  title: string
  summary?: string
  author?: string
  publishedAt?: string
  imageUrl?: string
}

interface Props {
  story: Story
}

defineProps<Props>()

const formatDate = (date?: string) => {
  if (!date) return ''

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

const getReadingTime = (summary?: string) => {
  if (!summary) return '5 min read'

  const words = summary.split(/\s+/).length

  return `${Math.max(1, Math.ceil(words / 40))} min read`
}
</script>

<template>
  <NuxtLink
    :to="`/stories/${story.slug}`"
    class="group block"
  >
    <article
      class="relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#d9d0c3] sm:min-h-[580px]"
    >
      <!-- Background Image -->
      <img
        v-if="story.imageUrl"
        :src="story.imageUrl"
        :alt="story.title"
        fetchpriority="high"
        class="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-[1.03]"
      />

      <!-- Fallback -->
      <div
        v-else
        class="absolute inset-0 flex items-center justify-center bg-[#d9d0c3]"
      >
        <span class="font-serif text-2xl italic text-[#716b63]">
          No image
        </span>
      </div>

      <!-- Gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
      />

      <!-- Featured Badge -->
      <div
        class="absolute left-6 top-6 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md sm:left-8 sm:top-8"
      >
        Featured story
      </div>

      <!-- Content -->
      <div
        class="absolute inset-x-0 bottom-0 max-w-4xl p-7 text-white sm:p-10 lg:p-14"
      >
        <!-- Meta -->
        <div
          class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.15em] text-white/65"
        >
          <span v-if="story.author">
            {{ story.author }}
          </span>

          <span
            v-if="story.author && story.publishedAt"
          >
            •
          </span>

          <span v-if="story.publishedAt">
            {{ formatDate(story.publishedAt) }}
          </span>

          <span v-if="story.publishedAt">
            •
          </span>

          <span>
            {{ getReadingTime(story.summary) }}
          </span>
        </div>

        <!-- Title -->
        <h2
          class="mt-5 max-w-4xl font-serif text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl"
        >
          {{ story.title }}
        </h2>

        <!-- Summary -->
        <p
          v-if="story.summary"
          class="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg"
        >
          {{ story.summary }}
        </p>

        <!-- CTA -->
        <div
          class="mt-7 inline-flex items-center gap-3 text-sm font-semibold"
        >
          <span>
            Read the story
          </span>

          <span
            class="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition-all group-hover:bg-white group-hover:text-[#28251f]"
          >
            →
          </span>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>