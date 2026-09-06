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
  data,
  pending,
  error,
  refresh,
} = await useFetch<StoriesResponse>('/api/stories')

</script>


<template>
  <main class="min-h-screen bg-[#f7f4ee] text-[#28251f]">

    <!-- PAGE INTRO -->

    <section class="border-b border-[#dfd9ce]">
      <div
        class="mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-28"
      >
        <div
          class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div class="max-w-3xl">
            <p
              class="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#a16d45]"
            >
              The Journal
            </p>
            <h1
              class="font-serif text-5xl font-normal leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-8xl"
            >
              Stories
              <span class="italic text-[#a16d45]">
                from life.
              </span>
            </h1>
            <p
              class="mt-7 max-w-2xl text-base leading-7 text-[#716b63] sm:text-lg sm:leading-8"
            >
              Personal experiences, unexpected journeys and the
              moments that shape who we become.
            </p>
          </div>

          <!-- Decorative Circle -->

          <div class="hidden lg:block">
            <div
              class="h-24 w-24 rounded-full border border-[#cfc7bb] p-2"
            >
              <div
                class="flex h-full w-full items-center justify-center rounded-full bg-[#e8dfd2] text-center font-serif text-sm italic"
              >
                Real
                <br />
                stories
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LOADING -->

    <section
      v-if="pending"
      class="mx-auto max-w-7xl px-6 py-20 lg:px-8"
    >
      <div class="animate-pulse">
        <div
          class="aspect-[16/8] rounded-[28px] bg-[#e5dfd5]"
        />
        <div
          class="mt-8 h-10 w-2/3 rounded bg-[#e5dfd5]"
        />
        <div
          class="mt-4 h-5 w-1/2 rounded bg-[#e5dfd5]"
        />
      </div>
    </section>

    <!-- ERROR -->

    <section
      v-else-if="error"
      class="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8"
    >
      <p class="text-[#a16d45]">
        Something went wrong.
      </p>
      <h2 class="mt-3 font-serif text-4xl">
        We couldn't load the stories.
      </h2>
      <button
        type="button"
        class="mt-7 rounded-full bg-[#28251f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a16d45]"
        @click="refresh"
      >
        Try again
      </button>
    </section>

    <!-- CONTENT -->

    <div
      v-else
      class="mx-auto max-w-7xl px-6 lg:px-8"
    >

      <!-- FEATURED STORIES -->

      <section
        v-if="data?.featured?.length"
        class="py-16 lg:py-24"
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
          <span
            class="hidden text-sm text-[#928b81] sm:block"
          >
            Handpicked for you
          </span>
        </div>

        <!-- MAIN FEATURE -->

        <FeaturedStoryCard
          :story="data.featured[0]"
        />

        <!-- SECONDARY FEATURES -->

        <div
          v-if="data.featured.length > 1"
          class="mt-6 grid gap-6 md:grid-cols-2"
        >
          <StoryCard
            v-for="story in data.featured.slice(1)"
            :key="story._id"
            :story="story"
            variant="horizontal"
          />
        </div>
      </section>

      <!-- ALL STORIES -->

      <section
        class="border-t border-[#dfd9ce] py-16 lg:py-24"
      >
        <!-- Header -->
        <div
          class="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p
              class="text-[11px] font-bold uppercase tracking-[0.25em] text-[#a16d45]"
            >
              Explore
            </p>
            <h2
              class="mt-2 font-serif text-3xl sm:text-4xl"
            >
              More stories
            </h2>
          </div>
          <p class="text-sm text-[#928b81]">
            Stories from our community
          </p>
        </div>
        <!-- Story Grid -->
        <div
          v-if="data?.latest?.length"
          class="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          <StoryCard
            v-for="story in data.latest"
            :key="story._id"
            :story="story"
          />
        </div>
        <!-- Empty -->
        <div
          v-else
          class="py-16 text-center"
        >
          <p
            class="font-serif text-2xl text-[#716b63]"
          >
            No stories available yet.
          </p>
          <p
            class="mt-2 text-sm text-[#928b81]"
          >
            Check back soon for new stories.
          </p>
        </div>
      </section>
    </div>
  </main>
</template>