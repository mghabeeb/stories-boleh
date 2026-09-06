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

interface StoriesResponse {
  featured: Story[]
  latest: Story[]
}


/* Load stories */

const {
  data: stories,
  pending,
} = await useFetch<StoriesResponse>('/api/stories')

</script>


<template>
  <main class="min-h-screen bg-[#f7f4ee] text-[#28251f]">

    <!-- HERO -->

    <section
      class="border-b border-[#dfd9ce]"
    >
      <div
        class="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32"
      >
        <p
          class="text-[11px] font-bold uppercase tracking-[0.28em] text-[#a16d45]"
        >
          Welcome
        </p>
        <h1
          class="mt-5 max-w-5xl font-serif text-5xl font-normal leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-8xl"
        >
          Stories
          <span class="italic text-[#a16d45]">
            worth sharing.
          </span>
        </h1>
        <p
          class="mt-7 max-w-2xl text-base leading-7 text-[#716b63] sm:text-lg sm:leading-8"
        >
          Discover personal experiences, meaningful journeys
          and stories from our community.
        </p>

        <!-- Stories Link -->

        <NuxtLink
          to="/stories"
          class="mt-8 inline-flex items-center gap-3 rounded-full bg-[#28251f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a16d45]"
        >
          <span>
            Explore all stories
          </span>
          <span>
            →
          </span>
        </NuxtLink>
      </div>
    </section>

    <!-- FEATURED STORIES -->

    <section
      v-if="stories?.featured?.length"
      class="py-16 lg:py-24"
    >
      <div
        class="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <!-- Header -->
        <div
          class="mb-8 flex items-end justify-between"
        >
          <div>
            <p
              class="text-[11px] font-bold uppercase tracking-[0.25em] text-[#a16d45]"
            >
              Editor's picks
            </p>
            <h2
              class="mt-2 font-serif text-3xl sm:text-4xl"
            >
              Featured stories
            </h2>
          </div>
          <NuxtLink
            to="/stories"
            class="hidden text-sm font-semibold transition-colors hover:text-[#a16d45] sm:block"
          >
            View all →
          </NuxtLink>
        </div>

        <!-- MAIN FEATURE -->

        <FeaturedStoryCard
          :story="stories.featured[0]"
        />

        <!-- SECONDARY STORIES -->

        <div
          v-if="stories.featured.length > 1"
          class="mt-6 grid gap-6 md:grid-cols-2"
        >
          <StoryCard
            v-for="story in stories.featured.slice(1, 3)"
            :key="story._id"
            :story="story"
            variant="horizontal"
          />
        </div>
      </div>
    </section>

    <!-- LATEST STORIES -->

    <section
      v-if="stories?.latest?.length"
      class="border-t border-[#dfd9ce] py-16 lg:py-24"
    >
      <div
        class="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <!-- Header -->
        <div
          class="mb-10 flex items-end justify-between"
        >
          <div>
            <p
              class="text-[11px] font-bold uppercase tracking-[0.25em] text-[#a16d45]"
            >
              Latest
            </p>
            <h2
              class="mt-2 font-serif text-3xl sm:text-4xl"
            >
              More stories
            </h2>
          </div>
          <NuxtLink
            to="/stories"
            class="text-sm font-semibold transition-colors hover:text-[#a16d45]"
          >
            View all →
          </NuxtLink>
        </div>

        <!-- STORY GRID -->

        <div
          class="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          <StoryCard
            v-for="story in stories.latest.slice(0, 6)"
            :key="story._id"
            :story="story"
          />
        </div>
      </div>
    </section>

    <!-- LOADING -->

    <section
      v-if="pending"
      class="mx-auto max-w-7xl px-6 py-20 lg:px-8"
    >
      <div
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="animate-pulse"
        >
          <div
            class="aspect-[4/3] rounded-2xl bg-[#e5dfd5]"
          />
          <div
            class="mt-5 h-3 w-1/3 rounded bg-[#e5dfd5]"
          />
          <div
            class="mt-4 h-7 w-4/5 rounded bg-[#e5dfd5]"
          />
          <div
            class="mt-3 h-4 w-full rounded bg-[#e5dfd5]"
          />
        </div>
      </div>
    </section>
  </main>
</template>