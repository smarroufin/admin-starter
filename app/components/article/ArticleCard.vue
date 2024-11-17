<script setup lang="ts">
const props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true,
  },
})
</script>

<template>
  <UCard
    :ui="{ root: 'overflow-hidden', body: 'p-0 sm:p-0' }"
    class="w-full"
  >
    <img
      :src="props.article.image"
      class="w-full aspect-video object-cover"
    >
    <div class="flex flex-col justify-start p-4">
      <h2 class="text-xl font-light line-clamp-1">
        {{ props.article.title }}
      </h2>
      <p class="mt-2 line-clamp-1">
        {{ props.article.content }}
      </p>
      <span class="self-end text-sm text-neutral-500 dark:text-neutral-400 mt-4 line-clamp-1">
        {{ props.article.author }}
      </span>
    </div>
  </UCard>
</template>
