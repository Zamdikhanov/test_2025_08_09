<template>
    <div ref="app-container" class="app-container">
        <slot />
        <AppScrollToTopButton />
        <AppFooter />
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.app-container {
    padding: 32px var(--layout-padding-inline) 0;
}

@media (min-width: 480px) {
    .app-container {
        padding: 32px var(--layout-padding-inline) 0;
    }
}
@media (min-width: 960px) {
    .app-container {
        padding: 48px var(--layout-padding-inline) 0;
    }
}
@media (min-width: 1440px) {
    .app-container {
        padding: 96px var(--layout-padding-inline) 0;
    }
}
</style>
