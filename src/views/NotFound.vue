<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center text-center px-4">
    <h1 class="text-6xl font-bold text-red-600">404</h1>
    <p class="text-xl mt-4 text-gray-700">Page Not Found</p>
    <p class="text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
    <RouterLink to="/" class="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Go Back Home
    </RouterLink>
  </div>
</template>
