<script setup lang="ts">
const { user } = useUserSession()
</script>

<template>
  <div class="flex flex-col h-[100vh]">
    <header class="flex-shrink-0 flex items-center gap-2 h-16 border-b border-neutral-800 px-4 sm:px-6">
      <USlideover
        v-if="user"
        side="left"
        title="Admin"
        description="Admin navigation slideover"
        class="md:hidden"
        :ui="{
          description: 'sr-only',
          content: 'max-w-sm',
        }"
      >
        <UButton
          icon="i-lucide-menu"
          color="neutral"
          variant="ghost"
          class="-ml-2"
        />
        <template #body>
          <AdminNavigation class="h-full" />
        </template>
      </USlideover>

      <span class="font-semibold">Admin</span>
    </header>

    <div class="flex h-[calc(100vh-64px)] overflow-y-hidden">
      <AdminNavigation
        v-if="user"
        class="flex-shrink-0 hidden md:flex max-w-3xs border-r border-neutral-800"
      />

      <main class="flex-1 min-h-[calc(100vh-64px)] h-full overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
