<template>
  <header
    class="sticky top-0 z-50 border-b border-[#e7e1d8] bg-[#f7f4ee]/95 backdrop-blur"
  >
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

      <!-- Logo -->
      <NuxtLink to="/" class="group flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-[#a16d45] text-white"
        >
          <span class="font-serif text-xl">S</span>
        </div>

        <div class="leading-none">
          <div class="font-serif text-xl font-semibold tracking-tight text-[#28251f]">
            Story Boleh
          </div>

          <div class="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#8b8378]">
            Stories that shape us
          </div>
        </div>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden items-center gap-8 md:flex">
        <NuxtLink
          to="/"
          class="text-sm font-medium text-[#5f5a52] transition hover:text-[#a16d45]"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/stories"
          class="text-sm font-medium text-[#5f5a52] transition hover:text-[#a16d45]"
        >
          Stories
        </NuxtLink>

      </nav>

      <!-- Actions -->
      <div class="hidden items-center gap-4 md:flex">

        <!-- Search -->
        <button
          type="button"
          aria-label="Search"
          class="flex h-9 w-9 items-center justify-center rounded-full text-[#5f5a52] transition hover:bg-[#ebe5dc] hover:text-[#a16d45]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
            />
          </svg>
        </button>

        <!-- CTA -->
        <NuxtLink
          to="/share"
          class="rounded-full bg-[#a16d45] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#895a38]"
        >
          Share Your Story
        </NuxtLink>
      </div>

      <!-- Mobile Menu Button -->
      <button
        type="button"
        aria-label="Open menu"
        class="flex h-10 w-10 items-center justify-center rounded-full text-[#28251f] hover:bg-[#ebe5dc] md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 7h16M4 12h16M4 17h16"
          />
        </svg>
      </button>

    </div>
  </header>
</template>