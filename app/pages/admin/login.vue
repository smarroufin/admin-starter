<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'admin',
})

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Invalid password'),
})
type Schema = z.output<typeof schema>

const { fetch } = useUserSession()
const toast = useToast()
const logging = ref(false)
const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

const isFormValid = computed(() => state.email && state.password)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (logging.value || !isFormValid.value) {
    return
  }
  logging.value = true
  await $fetch('/api/auth/login', {
    method: 'POST',
    body: event.data,
  }).then(async () => {
    await fetch()
    navigateTo(ADMIN_HOME_URL)
  }).catch((e) => {
    toast.add({
      color: 'error',
      title: getErrorMessage(e),
    })
  })
  logging.value = false
}
</script>

<template>
  <UCard class="self-center">
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 w-60"
      @submit="onSubmit"
    >
      <UFormField
        label="Email"
        name="email"
      >
        <UInput
          v-model="state.email"
          type="email"
          class="w-full"
        />
      </UFormField>
      <UFormField
        label="Password"
        name="password"
      >
        <UInput
          v-model="state.password"
          type="password"
          class="w-full"
        />
      </UFormField>
      <div class="flex items-center justify-end">
        <UButton
          type="submit"
          :loading="logging"
          :disabled="!isFormValid"
          color="neutral"
          class="cursor-pointer"
          label="Login"
        />
      </div>
    </UForm>
  </UCard>
</template>
