<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { type RegisterSchema, registerSchema } from '#shared/schemas/auth'

definePageMeta({
  layout: 'admin',
})

const toast = useToast()
const registering = ref(false)
const state = reactive<Partial<RegisterSchema>>({
  email: undefined,
  password: undefined,
})

const isFormValid = computed(() => state.email && state.password)

async function onSubmit(event: FormSubmitEvent<RegisterSchema>) {
  if (registering.value || !isFormValid.value) {
    return
  }
  registering.value = true
  await $fetch('/api/auth/register', {
    method: 'POST',
    body: event.data,
  }).then(() => {
    toast.add({
      color: 'success',
      title: 'Successfully registered! Please wait for an approval email.',
    })
    state.email = undefined
    state.password = undefined
  }).catch((e) => {
    toast.add({
      color: 'error',
      title: getErrorMessage(e),
    })
  })
  registering.value = false
}
</script>

<template>
  <UCard class="self-center">
    <UForm
      :schema="registerSchema"
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
          :loading="registering"
          :disabled="!isFormValid"
          color="neutral"
          class="cursor-pointer"
          label="Register"
        />
      </div>
    </UForm>
  </UCard>
</template>
