<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
    border-radius: 8px;
    box-shadow: 0 1px 6px rgba(49, 49, 49, 0.144);
    padding: 1rem;
    margin: 2rem auto;
    max-width: 50rem;
}
</style>