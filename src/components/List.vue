<script setup lang="ts" generic="T">
import { defineProps } from 'vue';
import { Item } from '@/types/ItemType.interface';

interface Props {
  items: Item[]
}
defineProps<Props>();

</script>

<template>
  <div
    v-for="item in items"
    class="card mt-2"
    :key="item.id"
  >
    <slot :item="item" />
  </div>
</template>

<style scoped>

</style>
