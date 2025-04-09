<script setup lang="ts">
const { data } = await useFetch('/api/currency');
</script>

<template>
    <div>{{ data }}</div>

</template>
