<script setup lang="ts">
import type { RowSelectionState } from '@tanstack/table-core'
import type { User } from '#auth-utils'

definePageMeta({
  layout: 'admin',
})

const { data: users, refresh } = await useFetch<User[]>('/api/admin-users', {
  key: 'admin-users',
  lazy: true,
  default: () => [],
})
const toast = useToast()

const selection = ref<RowSelectionState>({})
const selectionArray = computed(() => {
  return Object.entries(selection.value).reduce<User[]>((acc, [key, value]) => {
    if (value) {
      const item = users.value[parseInt(key)]
      if (item) {
        acc.push(item)
      }
    }
    return acc
  }, [])
})
const selectionCount = computed(() => selectionArray.value.length)

async function onDeleteSelection() {
  await $fetch('/api/admin-users/bulk-delete', {
    method: 'POST',
    body: { ids: selectionArray.value.map(user => user.id) },
  }).then(() => {
    toast.add({
      color: 'success',
      title: 'Users deleted successfully!',
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
      <div class="flex items-center gap-2" />
    </div>

    <AdminTable
      v-model:selection="selection"
      :items="users"
      :columns="['email', 'enabled']"
    />
  </div>
</template>
