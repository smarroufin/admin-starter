<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { type ArticlePostSchema, articlePostSchema } from '#shared/schemas/articles'

definePageMeta({
  layout: 'admin',
})

const toast = useToast()
const posting = ref(false)
const state = reactive<Partial<ArticlePostSchema>>({
  author: undefined,
  title: undefined,
  content: undefined,
  image: undefined,
})

const isFormValid = computed(() => {
  return state.author || state.title || state.content || state.image
})

async function postArticle(event: FormSubmitEvent<ArticlePostSchema>) {
  if (posting.value || !isFormValid.value) {
    return
  }
  posting.value = true
  await $fetch('/api/articles', {
    method: 'POST',
    body: event.data,
  }).then(() => {
    toast.add({
      color: 'success',
      title: 'Article posted successfully!',
    })
    state.author = undefined
    state.title = undefined
    state.content = undefined
    state.image = undefined
    navigateTo('/admin/articles')
  }).catch((e) => {
    toast.add({
      color: 'error',
      title: getErrorMessage(e),
    })
  })
  posting.value = false
}
</script>

<template>
  <UForm
    :schema="articlePostSchema"
    :state="state"
    class="space-y-4 p-4"
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
        :disabled="!isFormValid"
        color="primary"
        label="Post"
      />
    </div>
  </UForm>
</template>
