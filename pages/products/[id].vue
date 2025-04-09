<template>
    <div>
        <p>Product details for {{ id }}</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, quos inventore ipsam temporibus tempore
            consectetur. Obcaecati sed eos officiis culpa quae a nihil iste voluptatem minima, quidem asperiores dolore
            ea!</p>
    </div>
</template>

<script setup>
const { id } = useRoute().params;
</script>

<style lang="scss" scoped></style>