<template>
  <div class="flex flex-col min-h-[100vh]">
    <AppHeader>
      <UButton
        variant="link"
        to="/"
        label="Blog"
      />
    </AppHeader>
    <main class="flex flex-col items-center min-h-[calc(100vh-48px)]">
      <UContainer class="w-full py-4">
        <slot />
      </UContainer>
    </main>
  </div>
</template>
