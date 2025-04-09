<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const searchValue = ref('');

const items = ref<NavigationMenuItem[]>([
    {
        label: "Guide",
        icon: "i-lucide-book-open",
        to: '/',
        children: [
            {
                label: 'Introduction',
                description: 'Fully styled and customizable components for Nuxt.',
                icon: 'i-lucide-house'
            },
            {
                label: 'Installation',
                description: 'Learn how to install and configure Nuxt UI in your application.',
                icon: 'i-lucide-cloud-download'
            },
        ]
    }
])
</script>

<template>
    <div>
        <div class="justify-between items-center mx-4 flex my-2">
            <div class="flex items-center justify-center gap-2">
                <h1>Stylix</h1>
                <UNavigationMenu :items="items" class="justify-center" />
            </div>
            <UInput v-model="searchValue" icon="i-lucide-search" placeholder="Search for flashcards" />
            <div class="flex gap-1">
                <UButton class="rounded-md">Sign Up</UButton>
                <UButton class="rounded-md">Login</UButton>
            </div>
        </div>
        <div>
            <slot />
        </div>
    </div>


</template>