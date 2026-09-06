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
  variant?: 'default' | 'horizontal'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

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
    <!-- ========================================= -->
    <!-- HORIZONTAL VARIANT                       -->
    <!-- ========================================= -->

    <article
      v-if="variant === 'horizontal'"
      class="grid overflow-hidden rounded-2xl border border-[#ddd7cd] bg-[#fcfaf6] sm:grid-cols-2"
    >
      <!-- Image -->
      <div class="aspect-[4/3] overflow-hidden bg-[#e4ddd3]">
        <img
          v-if="story.imageUrl"
          :src="story.imageUrl"
          :alt="story.title"
          loading="lazy"
          class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div
          v-else
          class="flex h-full items-center justify-center"
        >
          <span class="font-serif text-lg italic text-[#928b81]">
            No image
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="flex flex-col justify-center p-6 sm:p-7">
        <p
          class="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a16d45]"
        >
          Featured
        </p>

        <h3
          class="mt-3 font-serif text-2xl leading-tight transition-colors group-hover:text-[#a16d45]"
        >
          {{ story.title }}
        </h3>

        <p
          v-if="story.summary"
          class="mt-3 line-clamp-3 text-sm leading-6 text-[#716b63]"
        >
          {{ story.summary }}
        </p>

        <div
          class="mt-5 flex items-center gap-2 text-sm font-semibold text-[#28251f]"
        >
          <span>Read</span>

          <span
            class="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </article>

    <!-- ========================================= -->
    <!-- DEFAULT VARIANT                          -->
    <!-- ========================================= -->

    <article v-else>
      <!-- Image -->
      <div
        class="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e4ddd3]"
      >
        <img
          v-if="story.imageUrl"
          :src="story.imageUrl"
          :alt="story.title"
          loading="lazy"
          class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div
          v-else
          class="flex h-full items-center justify-center"
        >
          <span class="font-serif text-lg italic text-[#928b81]">
            No image
          </span>
        </div>

        <!-- Hover Arrow -->
        <div
          class="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#28251f] opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:opacity-100"
        >
          ↗
        </div>
      </div>

      <!-- Content -->
      <div class="pt-5">
        <!-- Meta -->
        <div
          class="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a16d45]"
        >
          <span v-if="story.author">
            {{ story.author }}
          </span>

          <span
            v-if="story.author && story.publishedAt"
            class="text-[#c8c0b6]"
          >
            •
          </span>

          <span v-if="story.publishedAt">
            {{ formatDate(story.publishedAt) }}
          </span>

          <span
            v-if="story.publishedAt"
            class="text-[#c8c0b6]"
          >
            •
          </span>

          <span>
            {{ getReadingTime(story.summary) }}
          </span>
        </div>

        <!-- Title -->
        <h3
          class="mt-3 font-serif text-2xl leading-tight transition-colors group-hover:text-[#a16d45]"
        >
          {{ story.title }}
        </h3>

        <!-- Summary -->
        <p
          v-if="story.summary"
          class="mt-3 line-clamp-3 text-sm leading-6 text-[#716b63]"
        >
          {{ story.summary }}
        </p>
      </div>
    </article>
  </NuxtLink>
</template>