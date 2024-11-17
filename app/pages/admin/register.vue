<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: 'admin',
})

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})
type Schema = z.output<typeof schema>

const toast = useToast()
const registering = ref(false)
const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

const isFormValid = computed(() => state.email && state.password)

async function onSubmit(event: FormSubmitEvent<Schema>) {
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
          :disabled="registering || !isFormValid"
          color="neutral"
          class="cursor-pointer"
          label="Register"
        />
      </div>
    </UForm>
  </UCard>
</template>
