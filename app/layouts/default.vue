<template>
  <div class="flex flex-col min-h-[100vh]">
    <header class="flex items-center border-b text-neutral-200 dark:text-neutral-800 h-12">
      <UContainer class="flex-1">
        <UButton
          variant="link"
          to="/"
          label="Website"
        />
      </UContainer>
    </header>
    <main class="flex flex-col items-center min-h-[calc(100vh-48px)]">
      <UContainer class="w-full py-4">
        <slot />
      </UContainer>
    </main>
  </div>
</template>
