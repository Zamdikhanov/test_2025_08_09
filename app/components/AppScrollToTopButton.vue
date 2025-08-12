<template>
    <button
        v-if="isVisible"
        aria-label="Прокрутить наверх"
        class="scroll-to-top"
        :title="title"
        @click="onClick"
    >
        <AppIcon name="local-icon:arrow-up" class="scroll-to-top__icon" />
    </button>

    <div
        class="visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
    >
        {{ liveMessage }}
    </div>
</template>

<script setup lang="ts">
const title = "Наверх";

async function onClick() {
    await scrollToTop({ smooth: true });
}

const isVisible = ref(false);
const liveMessage = ref("");
const threshold = 0;
const target = computed(
    () => document?.querySelector<HTMLElement>(".app-container") || null
);

function checkScroll() {
    isVisible.value = window.scrollY > threshold;
}

onMounted(() => {
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
});

onUnmounted(() => {
    window.removeEventListener("scroll", checkScroll);
});

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function scrollToTop({ smooth = true }: { smooth?: boolean } = {}) {
    if (typeof window === "undefined") return;

    const reduce = prefersReducedMotion();
    if (reduce) smooth = false;

    if (smooth && "scrollBehavior" in document.documentElement.style) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        window.scrollTo(0, 0);
    }

    // после прокрутки: фокус на целевой контейнер (если есть)
    if (target.value) {
        // поставить tabindex если нужно, затем фокус и удалить tabindex после blur
        const hadTabIndex = target.value.hasAttribute("tabindex");
        if (!hadTabIndex) target.value.setAttribute("tabindex", "-1");
        target.value.focus({ preventScroll: true });
        const cleanup = () => {
            if (!hadTabIndex) target.value?.removeAttribute("tabindex");
            target.value?.removeEventListener("blur", cleanup);
        };
        target.value.addEventListener("blur", cleanup, { once: true });
    } else {
        (document.body as HTMLElement).focus?.();
    }

    liveMessage.value = "Прокрутка страницы наверх завершена";
    setTimeout(() => {
        liveMessage.value = "";
    }, 3000);
}
</script>

<style scoped>
.scroll-to-top {
    position: fixed;
    right: 32px;
    bottom: 32px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: var(--color-primary-light);
    color: #fff;
    display: inline-grid;
    place-items: center;
    cursor: pointer;
    border: none;
    transition: var(--transition);
    z-index: 1000;
}

/* видимый фокус: используем :focus-visible для клавиатурных пользователей */
.scroll-to-top:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 3px;
    transform: translateY(-2px);
}

/* небольшая hover анимация для мыши */
.scroll-to-top:hover {
    transform: translateY(-3px);
    opacity: 0.95;
    background-color: var(--color-primary);
    box-shadow: 0px 6px 20px 0px #95d0a1;
}

/* visually-hidden класс для live-region */
.visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
}

.scroll-to-top__icon {
    width: 8px;
    height: 12px;
}
</style>
