<template>
    <button
      type="button"
      class="sortable-button"
      :class="{ 'sortable-button--active': sortKey === currentSortKey }"
      :aria-label="`Сортировать по параметру ${label}, текущее состояние: (${sortDirLabel})`"
      :disabled="disabledButton"
      @click="toggleSort"
    >
      {{ label }}
      <div class="sortable-button__icons-container">
        <AppIcon name="local-icon:arrow-up-simple" class="sortable-button__icon" :class="{ 'sortable-button__icon--active': sortKey === currentSortKey && sortDir === 'asc' }" aria-hidden="true"/>
        <AppIcon name="local-icon:arrow-up-simple" class="sortable-button__icon sortable-button__icon--down" :class="{ 'sortable-button__icon--active': sortKey === currentSortKey && sortDir === 'desc' }" aria-hidden="true"/>
      </div>
    </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string;
  sortKey: string;
  currentSortKey: string | null;
  currentSortDir: string | null;
  disabledButton?: boolean;
}>(), { disabledButton: false });

const emit = defineEmits<{
    (e: "updateSort", v: { sortedBy: string }): void;
}>();

const sortDir = computed(() => (props.currentSortKey === props.sortKey ? props.currentSortDir : null));

const sortDirLabel = computed(() => {
  if (!sortDir.value) return 'не сортировано, нажмите для сортировки по возрастанию';
  return sortDir.value === 'asc' ? 'по возрастанию, нажмите для сортировки по убыванию' : 'по убыванию, нажмите для сброса';
});

const toggleSort = () => {
  emit('updateSort', { sortedBy: props.sortKey});
};
</script>

<style scoped lang="scss">
.sortable-button {
  @include typography-1440-p3-regular;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  height: 40px;
  width: 100%;
  margin: -10px 0px;
  transition: var(--transition);
  &:hover {
    color: var(--color-primary);
  }
  &.sortable-button--active {
    color: var(--color-primary);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.sortable-button__icons-container {
  margin-left: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2px;
}
.sortable-button__icon {
  width: 7px;
  height: 4px;
  color: var(--color-text);
  opacity: 0.4;
  &.sortable-button__icon--down {
    transform: rotate(180deg);
  }
  &.sortable-button__icon--active {
    opacity: 1;
    color: var(--color-primary);
  }
}

</style>