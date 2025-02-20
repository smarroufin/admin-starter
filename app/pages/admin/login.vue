<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { type LoginSchema, loginSchema } from '#shared/schemas/auth'

definePageMeta({
  layout: 'admin',
})

const { fetch } = useUserSession()
const toast = useToast()
const logging = ref(false)
const state = reactive<Partial<LoginSchema>>({
  email: undefined,
  password: undefined,
})

const isFormValid = computed(() => state.email && state.password)

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
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
      :schema="loginSchema"
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
          label="Login"
        />
      </div>
    </UForm>
  </UCard>
</template>
