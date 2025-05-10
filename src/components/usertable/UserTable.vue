<script setup lang="ts">
import type { User } from '@/types/User';
import { onMounted, ref } from 'vue';
import DataTable from './DataTable.vue';
import { columns } from './columns';
import Badge from '../ui/badge/Badge.vue';

const data = ref<User[]>([]);

async function getData(): Promise<User[]> {
    return [
        {
            id: 1,
            username: 'duongvbna',
            email: 'anhduong123@gmail.com',
            password: 'duongvbna',
            role: 1,
            fullName: 'Vu Binh Duong'
        },
        {
            id: 2,
            username: 'duongvbna123',
            email: 'anhduong1234@gmail.com',
            password: 'duongvbna',
            role: 2,
            fullName: 'Vu Binh Duong'
        },
    ]
}

onMounted(async () => {
    data.value = await getData();
})
</script>
<template>
    <div class="container py-10 mx-auto">
        <DataTable :columns="columns" :data="data"/>
    </div>
    <Badge class="bg-blue-100 text-black">Hello</Badge>
    <Badge>Hello</Badge>
</template>