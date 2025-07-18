<script setup lang="ts">
import type { RowSelectionState } from '@tanstack/table-core'

definePageMeta({
  layout: 'admin',
})

const { data: articles, refresh } = useFetch<Article[]>('/api/articles', {
  key: 'articles',
  lazy: true,
  default: () => [],
})
const route = useRoute()
const toast = useToast()

const selection = ref<RowSelectionState>({})
const selectionArray = computed(() => {
  return Object.entries(selection.value).reduce<Article[]>((acc, [key, value]) => {
    if (value) {
      const item = articles.value[parseInt(key)]
      if (item) {
        acc.push(item)
      }
    }
    return acc
  }, [])
})
const selectionCount = computed(() => selectionArray.value.length)

async function onDeleteSelection() {
  await $fetch('/api/articles/bulk-delete', {
    method: 'POST',
    body: { ids: selectionArray.value.map(article => article.id) },
  }).then(() => {
    toast.add({
      color: 'success',
      title: 'Articles deleted successfully!',
    })
    selection.value = {}
    refresh()
  }).catch((e) => {
    toast.add({
      color: 'error',
      title: getErrorMessage(e),
    })
  })
}
</script>

<template>
  <div class="relative h-full">
    <div class="flex items-center justify-end h-12 border-b border-(--ui-border) px-2">
      <div
        v-if="selectionCount"
        class="flex-1 flex items-center gap-2"
      >
        <UButton
          label="Delete"
          color="error"
          @click="onDeleteSelection"
        />
        <span class="text-sm">{{ selectionCount }} selected item(s)</span>
      </div>
      <div class="flex items-center gap-2">
        <UButton
          label="New"
          :to="`${route.path}/new`"
        />
      </div>
    </div>

    <AdminTable
      v-model:selection="selection"
      :items="articles"
      :columns="['title', 'author']"
    />
  </div>
</template>
