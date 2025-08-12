<template>
    <NuxtRouteAnnouncer />
    <div class="default-layer">
        <div class="app-container error-page__content">
            <h1>Ошибка 404</h1>
            <div>Страница отсутствует или удалена</div>
            <nuxt-link to="/"> Перейти на главную </nuxt-link>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.default-layer {
    min-height: 100vh;
    min-height: 100dvh;
    display: grid;
    grid-template-rows: 1fr;
}
.error-page__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-block: 4rem;
    gap: 0.5rem;
}
</style>
