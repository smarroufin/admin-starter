<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'admin',
})

const schema = z.object({
  author: z.string().min(1, 'Invalid author'),
  title: z.string().min(1, 'Invalid title'),
  content: z.string().min(1, 'Invalid content'),
  image: z.string().regex(/https?:\/\/.+/, 'Invalid image url'),
})
type Schema = z.output<typeof schema>

const { data: articles, refresh } = useFetch('/api/articles', { lazy: true, default: () => [] })
const toast = useToast()
const posting = ref(false)
const deleting = ref(false)
const state = reactive<Partial<Schema>>({
  author: undefined,
  title: undefined,
  content: undefined,
  image: undefined,
})

const isFormValid = computed(() => {
  return state.author || state.title || state.content || state.image
})

async function postArticle(event: FormSubmitEvent<Schema>) {
  if (posting.value || deleting.value || !isFormValid.value) {
    return
  }
  posting.value = true
  await $fetch('/api/articles', {
    method: 'POST',
    body: event.data,
  })
    .then(() => {
      toast.add({
        color: 'success',
        title: 'Article posted successfully!',
      })
      state.author = undefined
      state.title = undefined
      state.content = undefined
      state.image = undefined
      refresh()
    })
    .catch((e) => {
      toast.add({
        color: 'error',
        title: getErrorMessage(e),
      })
    })
  posting.value = false
}

async function deleteArticle(id: string) {
  if (posting.value || deleting.value) {
    return
  }
  deleting.value = true
  await $fetch(`/api/articles/${id}`, { method: 'DELETE' })
    .then(() => {
      toast.add({
        color: 'success',
        title: 'Article deleted sucessfully!',
      })
      refresh()
    })
    .catch((e) => {
      toast.add({
        color: 'error',
        title: getErrorMessage(e),
      })
    })
  deleting.value = false
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <UCard>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="postArticle"
      >
        <UFormField
          label="Author"
          name="author"
        >
          <UInput
            v-model="state.author"
            type="text"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Title"
          name="title"
        >
          <UInput
            v-model="state.title"
            type="text"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Content"
          name="content"
        >
          <UTextarea
            v-model="state.content"
            :rows="3"
            :autoresize="false"
            type="text"
            class="w-full resize-none"
          />
        </UFormField>
        <UFormField
          label="Image"
          name="image"
          hint="https://loremflickr.com/320/240?lock=1"
        >
          <UInput
            v-model="state.image"
            type="text"
            class="w-full"
          />
        </UFormField>
        <div class="flex items-center justify-end">
          <UButton
            type="submit"
            :loading="posting"
            :disabled="deleting || !isFormValid"
            color="neutral"
            label="Post"
            class="cursor-pointer"
          />
        </div>
      </UForm>
    </UCard>
    <div
      v-for="article in articles"
      :key="article.id"
      class="relative"
    >
      <ArticleCard :article="article" />
      <UButton
        variant="solid"
        icon="i-lucide-trash"
        :loading="deleting"
        :disabled="posting"
        color="error"
        class="absolute top-2 right-2 cursor-pointer"
        @click="deleteArticle(article.id)"
      />
    </div>
  </div>
</template>
