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
      <NuxtLink :to="`/${article.id}`">
        <ArticleCard :article="article" />
      </NuxtLink>
    </li>
  </ul>
</template>
