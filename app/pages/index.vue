<script setup lang="ts">
const { data: articles } = useFetch('/api/articles', {
  key: 'articles',
  lazy: true,
  default: () => [],
})
</script>

<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <li
      v-for="article in articles"
      :key="article.id"
    >
      <UCard
        :ui="{ root: 'overflow-hidden', body: 'p-0 sm:p-0' }"
        class="w-full"
      >
        <img
          :src="article.image"
          class="w-full aspect-video object-cover"
        >
        <div class="flex flex-col justify-start p-4">
          <h2 class="text-xl font-light line-clamp-1">
            {{ article.title }}
          </h2>
          <p class="mt-2 line-clamp-1">
            {{ article.content }}
          </p>
          <span class="self-end text-sm text-neutral-500 dark:text-neutral-400 mt-4 line-clamp-1">
            {{ article.author }}
          </span>
        </div>
      </UCard>
    </li>
  </ul>
</template>
