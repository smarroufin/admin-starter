<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { clear, user } = useUserSession()

async function logout() {
  await clear()
  navigateTo(ADMIN_LOGIN_URL)
}

const topItems = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Home',
      to: '/admin',
      icon: 'i-lucide-home',
      exact: true,
    },
    {
      label: 'Collections',
      icon: 'i-lucide-library',
      defaultOpen: true,
      children: [
        {
          label: 'Articles',
          to: '/admin/articles',
        },
        {
          label: 'AdminUsers',
          to: '/admin/admin-users',
        },
      ],
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
      disabled: true,
    },
  ],
])

const bottomItems = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      onSelect: logout,
    },
    {
      slot: 'profile',
      label: user.value?.email ?? '',
      class: 'cursor-default',
    },
  ],
])
</script>

<template>
  <div
    v-if="user"
    class="flex flex-col px-1 sm:px-3 py-2 overflow-y-auto"
  >
    <UNavigationMenu
      orientation="vertical"
      :items="topItems"
      class="flex-1 data-[orientation=vertical]:w-full"
    />
    <UNavigationMenu
      orientation="vertical"
      :items="bottomItems"
      class="flex-shrink-0 data-[orientation=vertical]:w-full"
    >
      <template #profile-leading>
        <UAvatar
          size="2xs"
          :alt="user.email.toUpperCase()"
        />
      </template>
    </UNavigationMenu>
  </div>
</template>
