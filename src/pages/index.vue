<template>
  <div>Home page</div>
  <div>{{ count }}</div>
  <button @click="count++">
    Add
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCount } from '@/composables/count';

export default defineComponent({
  setup() {
    const { count } = useCount();
    return { count };
  },
});
</script>
