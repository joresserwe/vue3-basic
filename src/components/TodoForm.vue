<template>
  <div v-if="loading">
    Loading...
  </div>
  <form v-else>
    <div class="row">
      <div class="col-6">
        <Input
          label="String"
          v-model:subject="todo.subject"
        />
      </div>
      <div class="col-6">
        <div
          class="form-group"
          v-if="!!id"
        >
          <label>Status</label>
          <div>
            <button
              type="button"
              class="btn btn-success"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="handleClickToToggleComplete"
            >
              {{ todo.completed ? 'Completed' : 'Incomplete' }}
            </button>
          </div>
        </div>
      </div>
      <div class="col-12 mt-2">
        <div class="form-group">
          <label>Body</label>
          <textarea
            v-model="todo.body"
            class="form-control"
            cols="30"
            rows="10"
          />
        </div>
      </div>
      <div class="mt-2">
        <button
          type="submit"
          class="btn btn-primary"
          @click.prevent="handleSubmit"
          :disabled="isChanged"
        >
          {{ id ? 'Update' : 'Create' }}
        </button>
        <button
          class="btn btn-outline-dark ms-2"
          @click.prevent="handelClickToCancel"
        >
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import _ from 'lodash';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { emptyTodo, Todo } from '@/types/TodoType.interface';
import { useToast } from '@/composables/toast';
import api from '@/api';
import Input from './Input.vue';

export default defineComponent({
  components: {
    Input,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = ref(route.params.id);
    const todo = ref<Todo>({ ...emptyTodo });
    const todoOrigin = ref<Todo>({ ...emptyTodo });
    const loading = ref(false);
    const { triggerToast } = useToast();

    const isChanged = computed(() => _.isEqual(todo.value, todoOrigin.value));

    const handleClickToToggleComplete = () => {
      todo.value.completed = !todo.value.completed;
    };

    const handelClickToCancel = () => {
      router.push({
        name: 'Todos',
      });
    };

    const validateSubmit = () => {
      if (!todo.value.subject) {
        triggerToast('Subject is required!!', 'danger');
        return false;
      }
      return true;
    };

    const handleSubmit = async () => {
      if (!validateSubmit()) return;

      try {
        let res;
        if (todo.value.id) {
          res = await api.todos.put(todo.value.id, todo.value);
          triggerToast('Successfully Updated');
        } else {
          res = await api.todos.post(todo.value);
          todo.value = { ...res.data };
          id.value = String(todo.value.id);
          triggerToast('Successfully Created');
          router.push({ name: 'Todos' });
        }
        todoOrigin.value = { ...res.data };
      } catch (error) {
        triggerToast('Something went wrong', 'danger');
      }
    };

    const getTodo = async () => {
      try {
        loading.value = true;
        const res = await api.todos.getOne(+id.value);
        todo.value = { ...res.data };
        todoOrigin.value = { ...res.data };
        loading.value = false;
      } catch (error) {
        triggerToast('Something went wrong', 'danger');
      }
    };

    if (id.value) getTodo();

    return {
      id,
      loading,
      todo,
      handleSubmit,
      isChanged,
      handelClickToCancel,
      handleClickToToggleComplete,
    };
  },
});
</script>
