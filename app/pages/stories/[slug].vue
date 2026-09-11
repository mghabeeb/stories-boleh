<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import { useRoute } from 'vue-router'
import { computed, onMounted, onUnmounted, watch, onBeforeUnmount } from 'vue'

const route = useRoute()

const slug = computed(() => String(route.params.slug))

const {
  data: story,
  pending,
  error,
} = await useFetch(
  () => `/api/stories/${slug.value}`
)

const formatDate = (date?: string) => {
  if (!date) return ''

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

const readingTime = computed(() => {
  const body = story.value?.body

  if (!Array.isArray(body)) {
    return '5 min read'
  }

  const text = body
    .filter((block: any) => block?._type === 'block')
    .map((block: any) =>
      Array.isArray(block.children)
        ? block.children
            .map((child: any) => child?.text || '')
            .join(' ')
        : ''
    )
    .join(' ')

  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length

  return `${Math.max(1, Math.ceil(words / 200))} min read`
})

useHead(() => ({
  title: story.value?.title
    ? `${story.value.title} — Stories`
    : 'Story',
}))

// Time spent
onMounted(() => {
  const start = Date.now()

  const sendDuration = () => {
    const duration = Math.round((Date.now() - start) / 1000) // seconds
    const data = JSON.stringify({
      event: 'time_spent',
      path: route.fullPath,
      duration
    })
    
    // Wrap inside a Blob to force application/json header
    const blob = new Blob([data], { type: 'application/json' })
    navigator.sendBeacon('/api/analytics', blob)
  }

  // Note: 'pagehide' is highly recommended over 'beforeunload' for mobile browsers
  window.addEventListener('pagehide', sendDuration)
  
  onBeforeUnmount(() => {
    sendDuration()
    window.removeEventListener('pagehide', sendDuration)
  })
})

// Scroll depth
onMounted(() => {
  let maxDepth = 0
  const thresholds = [25, 50, 75, 100]

  const handler = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    
    // Prevent division by zero if page is not scrollable
    if (docHeight <= 0) return 
    
    const percent = Math.round((scrollTop / docHeight) * 100)

    const reached = thresholds.find(t => percent >= t && t > maxDepth)
    if (reached) {
      maxDepth = reached
      const data = JSON.stringify({
        event: 'scroll_depth',
        path: route.fullPath,
        depth: reached
      })
      
      const blob = new Blob([data], { type: 'application/json' })
      navigator.sendBeacon('/api/analytics', blob)
    }
  }

  window.addEventListener('scroll', handler, { passive: true })
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handler)
  })
})

// Navigation
watch(() => route.fullPath, (newPath, oldPath) => {
  const data = JSON.stringify({
    event: 'page_navigation',
    path: newPath, // Explicitly fulfills your database NOT NULL requirement
    from: oldPath,
    to: newPath
  })
  
  const blob = new Blob([data], { type: 'application/json' })
  navigator.sendBeacon('/api/analytics', blob)
})
</script>

<template>
  <main class="min-h-screen bg-[#f7f4ee] text-[#28251f]">

    <!-- Loading -->
    <section
      v-if="pending"
      class="mx-auto max-w-5xl px-6 py-20 lg:px-8"
    >
      <div class="animate-pulse">

        <div class="h-4 w-24 rounded bg-[#e3ddd3]" />

        <div
          class="mx-auto mt-16 h-20 max-w-3xl rounded bg-[#e3ddd3]"
        />

        <div
          class="mx-auto mt-5 h-6 max-w-xl rounded bg-[#e3ddd3]"
        />

        <div
          class="mt-14 aspect-[16/9] rounded-3xl bg-[#e3ddd3]"
        />

      </div>
    </section>

    <!-- Error -->
    <section
      v-else-if="error"
      class="flex min-h-[70vh] items-center justify-center px-6"
    >
      <div class="text-center">

        <p
          class="text-xs font-bold uppercase tracking-[0.25em] text-[#a16d45]"
        >
          404
        </p>

        <h1
          class="mt-4 font-serif text-5xl"
        >
          Story not found
        </h1>

        <p
          class="mx-auto mt-5 max-w-md text-[#716b63]"
        >
          This story may have been removed or the link may
          have changed.
        </p>

        <NuxtLink
          to="/stories"
          class="mt-8 inline-flex items-center gap-2 rounded-full bg-[#28251f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a16d45]"
        >
          ← Explore stories
        </NuxtLink>

      </div>
    </section>

    <!-- Story -->
    <article v-else-if="story">

      <!-- Header -->
      <header
        class="mx-auto max-w-5xl px-6 pb-14 pt-8 sm:pt-12 lg:px-8 lg:pb-20"
      >

        <!-- Back -->
        <NuxtLink
          to="/stories"
          class="group inline-flex items-center gap-2 text-sm text-[#716b63] transition hover:text-[#a16d45]"
        >
          <span
            class="transition-transform group-hover:-translate-x-1"
          >
            ←
          </span>

          All stories
        </NuxtLink>

        <!-- Title -->
        <div
          class="mx-auto mt-16 max-w-4xl text-center"
        >

          <div
            class="flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a16d45]"
          >

            <span v-if="story.author">
              {{ story.author }}
            </span>

            <span
              v-if="story.author && story.publishedAt"
              class="text-[#c7beb3]"
            >
              •
            </span>

            <time v-if="story.publishedAt">
              {{ formatDate(story.publishedAt) }}
            </time>

            <span class="text-[#c7beb3]">
              •
            </span>

            <span>
              {{ readingTime }}
            </span>

          </div>

          <h1
            class="mt-7 font-serif text-5xl font-normal leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-8xl"
          >
            {{ story.title }}
          </h1>

          <p
            v-if="story.summary"
            class="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#716b63] sm:text-xl"
          >
            {{ story.summary }}
          </p>

        </div>

      </header>

      <!-- Hero image -->
      <div
        v-if="story.imageUrl"
        class="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8"
      >

        <figure>
          <div
            class="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-[#e2dbd1] sm:rounded-[32px]"
          >

            <img
              :src="story.imageUrl"
              :alt="story.title"
              class="h-full w-full object-cover"
            />

          </div>

          <figcaption
            class="mt-9 text-center text-xl text-[#363636]"
          >
            {{ story.body }}
          </figcaption>
        </figure>

      </div>

      <!-- Story content -->
      <div
        class="mx-auto max-w-3xl px-6 pb-20 pt-16 sm:pt-20 lg:pb-28"
      >

        <div
          class="story-prose"
        >
          <PortableText
            v-if="story.body"
            :value="story.body"
          />
        </div>

        <!-- Story ending -->
        <div
          class="mt-20 border-t border-[#dcd5cb] pt-10"
        >

          <div class="flex items-center justify-between gap-6">

            <div>
              <p
                class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a16d45]"
              >
                Written by
              </p>

              <p class="mt-2 font-serif text-xl">
                {{ story.author }}
              </p>
            </div>

            <NuxtLink
              to="/stories"
              class="group inline-flex items-center gap-2 rounded-full border border-[#cfc7bc] px-5 py-3 text-sm font-semibold transition hover:border-[#28251f] hover:bg-[#28251f] hover:text-white"
            >
              More stories
              <span
                class="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </NuxtLink>

          </div>

        </div>

      </div>

      <!-- Bottom CTA -->
      <section
        class="border-t border-[#ded8ce] bg-[#e9e0d4]"
      >

        <div
          class="mx-auto max-w-3xl px-6 py-20 text-center lg:py-24"
        >

          <p
            class="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a16d45]"
          >
            Keep exploring
          </p>

          <h2
            class="mt-4 font-serif text-4xl leading-tight sm:text-5xl"
          >
            There are more stories
            waiting for you.
          </h2>

          <NuxtLink
            to="/stories"
            class="mt-8 inline-flex items-center gap-3 rounded-full bg-[#28251f] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#a16d45]"
          >
            Explore all stories

            <span>→</span>
          </NuxtLink>

        </div>

      </section>

    </article>

  </main>
</template>

<style scoped>
.story-prose {
  color: #403b35;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 19px;
  line-height: 1.9;
}

.story-prose :deep(p) {
  margin: 0 0 1.7em;
}

.story-prose :deep(h2) {
  margin-top: 2.5em;
  margin-bottom: 0.7em;
  color: #28251f;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 32px;
  font-weight: 400;
  line-height: 1.2;
}

.story-prose :deep(h3) {
  margin-top: 2em;
  margin-bottom: 0.6em;
  color: #28251f;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 26px;
  font-weight: 400;
}

.story-prose :deep(blockquote) {
  margin: 2.5em 0;
  padding: 1.5em 0 1.5em 1.5em;
  border-left: 3px solid #a16d45;
  color: #716b63;
  font-size: 25px;
  font-style: italic;
  line-height: 1.5;
}

.story-prose :deep(a) {
  color: #a16d45;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.story-prose :deep(ul),
.story-prose :deep(ol) {
  margin: 1.5em 0;
  padding-left: 1.5em;
}

.story-prose :deep(li) {
  margin-bottom: 0.5em;
}

.story-prose :deep(strong) {
  color: #28251f;
  font-weight: 700;
}

@media (max-width: 640px) {
  .story-prose {
    font-size: 18px;
    line-height: 1.8;
  }

  .story-prose :deep(blockquote) {
    font-size: 21px;
  }
}
</style>
