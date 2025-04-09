<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

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
        <UNavigationMenu :items="items" class="w-full justify-center" />
        <div>
            <slot />
        </div>
    </div>


</template>