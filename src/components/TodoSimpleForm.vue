<script setup lang="ts">
import { defineEmits, ref } from 'vue';

const todoSubject = ref('');
const hasError = ref(false);
const emit = defineEmits(['addTodo']);
const handleSubmit = () => {
  if (!todoSubject.value) {
    hasError.value = true;
    return;
  }

  emit('addTodo', {
    subject: todoSubject.value,
    completed: false,
  });

  todoSubject.value = '';
  hasError.value = false;
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="d-flex">
      <div
        class="flex-grow-1 me-2"
      >
        <input
          class="form-control"
          type="text"
          v-model="todoSubject"
          placeholder="Type new to-do"
        >
      </div>
      <div>
        <button
          type="submit"
          class="btn btn-primary"
        >
          Add
        </button>
      </div>
    </div>
    <div
      v-show="hasError"
      class="error"
    >
      This Field cannot be empty!!
    </div>
  </form>
</template>

<style scoped>
.error{
  color : red;
}
</style>
