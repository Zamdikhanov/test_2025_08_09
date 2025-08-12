<template>
    <footer class="app-footer">
        <div class="app-container app-footer__container">
            <div class="app-footer__links-block">
                <a
                    href="https://github.com/Zamdikhanov"
                    target="_blank"
                    rel="nofollow"
                    class="app-footer__link"
                >
                    <span>Github</span>
                </a>
                <a
                    href="https://t.me/zamdikhanov"
                    target="_blank"
                    rel="nofollow"
                    class="app-footer__link"
                >
                    <span>Telegram</span>
                </a>
                <a
                    href="https://zamdikhanov.ru"
                    target="_blank"
                    rel="nofollow"
                    class="app-footer__link"
                >
                    <span>Мой сайт</span>
                </a>
            </div>
            <div class="app-footer__copyright">© 2025 Айрат Замдиханов</div>
        </div>
    </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-footer {
    padding: 1.5rem 0px;
    border-top: 1px solid var(--color-text);
    margin-top: 4rem;
}
.app-footer__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem 3rem;
}
.app-footer__links-block {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
}
.app-footer__link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-text-secondary);
    &:hover {
        color: var(--color-text);
    }
    &:hover .app-footer__link-icon {
        color: var(--color-text);
        transform: rotate(22.5deg);
    }
    .app-footer__link-icon {
        --icon-size: 30px;
        color: var(--color-text-secondary);
        transform: rotate(0deg);
        transition:
            transform ease-in-out 0.3s,
            var(--transition);
    }
}
.app-footer__copyright {
    display: flex;
    align-items: center;
}
@media (min-width: 1400px) {
    .app-footer {
        padding: 4rem 0px;
        margin-top: 6rem;
    }
}
</style>
