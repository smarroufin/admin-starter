<script setup lang="ts">
const { id } = useRoute().params
const { data: cachedArticles } = useNuxtData<Article[]>('articles')
const { data: article } = useFetch(`/api/articles/${id}`, {
  key: `article-${id}`,
  lazy: true,
  default: () => {
    return cachedArticles.value?.find(article => article.id === id)
  },
})
</script>

<template>
  <ArticleTemplate
    v-if="article"
    :article="article"
    class="w-full"
  />
</template>
