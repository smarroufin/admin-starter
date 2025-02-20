<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { clear, user } = useUserSession()

async function logout() {
  await clear()
  navigateTo(ADMIN_LOGIN_URL)
}

const items = computed<DropdownMenuItem[]>(() => [
  {
    type: 'label' as const,
    label: user.value?.email ?? '',
  },
  {
    type: 'separator' as const,
  },
  {
    type: 'link' as const,
    label: 'Logout',
    icon: 'i-lucide-log-out',
    onSelect: logout,
  },
])
</script>

<template>
  <div class="flex flex-col min-h-[100vh]">
    <AppHeader>
      <nav class="flex items-center justify-between">
        <UButton
          variant="link"
          to="/admin"
          label="Admin"
        />
        <UDropdownMenu
          v-if="user"
          :items="items"
          :content="{ align: 'end' }"
          :popper="{ placement: 'bottom-end' }"
        >
          <button class="cursor-pointer">
            <UAvatar :alt="user.email.toUpperCase()" />
          </button>
        </UDropdownMenu>
        <div
          v-else
          class="flex items-center gap-x-4"
        >
          <UButton
            variant="link"
            to="/admin/login"
            label="Login"
          />
          <UButton
            variant="link"
            to="/admin/register"
            label="Register"
          />
        </div>
      </nav>
    </AppHeader>
    <main class="flex flex-col items-center min-h-[calc(100vh-48px)]">
      <UContainer class="w-full py-4 flex-1 flex flex-col">
        <slot />
      </UContainer>
    </main>
  </div>
</template>
