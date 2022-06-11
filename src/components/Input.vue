<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  label: string,
  subject?: string,
}

const emits = defineEmits(['update:subject']);
defineProps<Props>();

const handleInput = (e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    emits('update:subject', e.target.value);
  }
};

</script>

<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input
      type="text"
      class="form-control"
      :value="subject"
      @input="handleInput"
    >
  </div>
</template>

<style scoped>

</style>
