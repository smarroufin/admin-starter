<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <NuxtLink to="/admin/articles">
      <UCard>
        <h3>Articles</h3>
        <p class="text-sm text-neutral-500 dark:text-neutral-400">
          Manage articles here.
        </p>
      </UCard>
    </NuxtLink>
  </div>
</template>
