<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import TodoCard from '@/components/TodoCard.vue';
import Modal from '@/components/DeleteModal.vue';
import { Todo } from '@/types/TodoType.interface';
import List from './List.vue';

interface Props{
  todos: Todo[];
}

defineProps<Props>();
const emits = defineEmits(['getTodos', 'deleteTodo', 'toogleCompleteTodo']);
const showModal = ref(false);
const deleteTodoId = ref();
const openDeleteModal = (id: number) => {
  deleteTodoId.value = id;
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
};

const deleteTodo = () => {
  emits('deleteTodo', deleteTodoId.value);
};

const completeTodo = (id: number, isChecked: boolean) => {
  emits('toogleCompleteTodo', id, isChecked);
};

</script>

<template>
  <div v-if="!todos.length">
    There is noting to display
  </div>
  <List :items="todos">
    <template #default="{ item }">
      <TodoCard
        :todo="(item as Todo)"
        @toogleCompleteTodo="completeTodo"
        @getTodos="emits('getTodos')"
        @openDeleteModal="openDeleteModal"
      />
    </template>
  </List>
  <teleport to="#modal">
    <Modal
      v-if="showModal"
      @close="closeModal"
      @delete="deleteTodo"
    />
  </teleport>
</template>

<style scoped>

</style>
