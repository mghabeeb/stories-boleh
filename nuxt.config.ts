// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      title: "Story Boleh",
      meta: [
        {
          name: "Story Boleh",
          content:
            "Stroy Boleh is a platform for sharing personal experiences, unexpected journeys and the moments that shape who we become.",
        },
      ],
    },
  },

  compatibilityDate: "2026-04-01",

  devtools: {
    enabled: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~~/assets/css/main.css"],

  modules: ["@nuxtjs/supabase"],
  supabase: {
    types: "~~/server/types/database.types.ts", // optional, path to custom types
    redirect: false, // optional, disables auth redirects
  },
});
