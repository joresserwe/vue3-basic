<script setup lang="ts">

import { computed } from '@vue/reactivity';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api';
import TodoList from '@/components/TodoList.vue';
import { useToast } from '@/composables/toast';
import { Todo } from '@/types/TodoType.interface';
import Pagination from '@/components/Pagination.vue';

const router = useRouter();
const searchText = ref('');
const todos = reactive<Todo[]>([]);
const PAGE_LIMIT = 5;
const currentPage = ref(1);
const totalCount = ref(0);
let timeOut: number;
const { triggerToast } = useToast();
const lastPage = computed(() => Math.ceil(totalCount.value / PAGE_LIMIT));

const handleClickToCreate = () => {
  router.push('/todos/create');
};

const getTodos = async (page = currentPage.value) => {
  console.log('Get Todos');
  clearTimeout(timeOut);
  todos.length = 0;
  currentPage.value = page;
  try {
    const res = await api.todos.get(
      {
        subject_like: searchText.value, _page: page, _limit: PAGE_LIMIT, _sort: 'id', _order: 'desc',
      },
    );
    totalCount.value = +res.headers['x-total-count'];
    todos.push(...res.data);
  } catch (err) {
    console.log(err);
    triggerToast('Failed to get initial todos', 'danger');
  }
};

const deleteTodo = async (id: number) => {
  try {
    await api.todos.delete(id);
    getTodos();
  } catch (err) {
    triggerToast('Failed to delete todo', 'danger');
  }
};

const toogleCompleteTodo = async (id: number, checked: boolean) => {
  const todo = todos.find((v) => v.id === id);
  try {
    if (todo) {
      await api.todos.patch(id, { completed: checked });
      todo.completed = checked;
    }
  } catch (err) {
    triggerToast('Failed to update todo', 'danger');
  }
};

watch(searchText, (() => {
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    getTodos(1);
  }, 2000);
}));

getTodos();

</script>

<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To Do List</h2>
      <button
        class="btn btn-primary"
        @click="handleClickToCreate"
      >
        Create Todo
      </button>
    </div>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="() => getTodos(1)"
    >
    <hr>
    <TodoList
      :todos="todos"
      @getTodos="getTodos"
      @toogleCompleteTodo="toogleCompleteTodo"
      @deleteTodo="deleteTodo"
    />
    <hr>
    <Pagination
      :currentPage="currentPage"
      :lastPage="lastPage"
      @handleClickToMovePages="getTodos"
    />
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
