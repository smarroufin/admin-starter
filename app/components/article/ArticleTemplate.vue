<script setup lang="ts">
const props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true,
  },
})
</script>

<template>
  <div>
    <div class="bg-neutral-200 dark:bg-black h-80">
      <img
        :src="props.article.image"
        class="h-full mx-auto aspect-video object-cover"
      >
    </div>
    <div class="flex flex-col justify-start p-4">
      <h1 class="text-3xl font-light">
        {{ props.article.title }}
      </h1>
      <p class="mt-8">
        {{ props.article.content }}
      </p>
      <span class="self-end text-sm text-neutral-500 dark:text-neutral-400 mt-8">
        {{ props.article.author }}
      </span>
    </div>
  </div>
</template>
