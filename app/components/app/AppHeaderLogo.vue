<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <div class="flex items-center gap-2.5">
    <img
      src="/logo.png"
      :alt="appConfig.header?.title || 'Logo'"
      class="size-6.5 rounded-md object-contain shrink-0"
    />
    <span class="font-bold text-sm tracking-tight text-neutral-900 dark:text-white">
      {{ appConfig.header?.title || 'HTTP PostgreSQL Gateway' }}
    </span>
  </div>
</template>
