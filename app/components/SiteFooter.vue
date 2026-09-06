<template>
  <footer class="border-t border-[#e7e1d8] bg-[#28251f] text-[#f7f4ee]">

    <!-- Main Footer -->
    <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">

      <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

        <!-- Brand -->
        <div class="lg:col-span-2">

          <NuxtLink to="/" class="inline-block">
            <div class="font-serif text-3xl font-semibold">
              Story Boleh
            </div>
          </NuxtLink>

          <p class="mt-5 max-w-lg text-base leading-7 text-[#c9c2b8]">
            Story Boleh is a platform for sharing personal experiences,
            unexpected journeys and the moments that shape who we become.
          </p>

          <p class="mt-6 max-w-md font-serif text-xl italic leading-8 text-[#e1d8cc]">
            Everyone has a story worth telling.
          </p>

        </div>

        <!-- Explore -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-[#a16d45]">
            Explore
          </h3>

          <nav class="mt-5 space-y-3">
            <NuxtLink
              to="/"
              class="block text-sm text-[#c9c2b8] transition hover:text-white"
            >
              Home
            </NuxtLink>

            <NuxtLink
              to="/stories"
              class="block text-sm text-[#c9c2b8] transition hover:text-white"
            >
              Stories
            </NuxtLink>

            <NuxtLink
              to="/about"
              class="block text-sm text-[#c9c2b8] transition hover:text-white"
            >
              About Story Boleh
            </NuxtLink>

            <NuxtLink
              to="/share"
              class="block text-sm text-[#c9c2b8] transition hover:text-white"
            >
              Share Your Story
            </NuxtLink>
          </nav>
        </div>

        <!-- Connect -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-[#a16d45]">
            Connect
          </h3>

          <nav class="mt-5 space-y-3">
            <a
              href="#"
              class="block text-sm text-[#c9c2b8] transition hover:text-white"
            >
              Instagram
            </a>

            <a
              href="#"
              class="block text-sm text-[#c9c2b8] transition hover:text-white"
            >
              Facebook
            </a>

            <a
              href="#"
              class="block text-sm text-[#c9c2b8] transition hover:text-white"
            >
              LinkedIn
            </a>

            <a
              href="mailto:hello@storyboleh.com"
              class="block text-sm text-[#c9c2b8] transition hover:text-white"
            >
              hello@storyboleh.com
            </a>
          </nav>
        </div>

      </div>

      <!-- Divider -->
      <div class="my-12 h-px bg-[#48433c]"></div>

      <!-- Bottom -->
      <div class="flex flex-col gap-4 text-sm text-[#9f988e] sm:flex-row sm:items-center sm:justify-between">

        <p>
          © {{ new Date().getFullYear() }} Story Boleh. All rights reserved.
        </p>

        <div class="flex gap-6">
          <NuxtLink
            to="/privacy"
            class="transition hover:text-white"
          >
            Privacy
          </NuxtLink>

          <NuxtLink
            to="/terms"
            class="transition hover:text-white"
          >
            Terms
          </NuxtLink>
        </div>

      </div>

    </div>
  </footer>
</template>