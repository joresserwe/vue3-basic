<template>
  <div
    class="card-body p-2 d-flex"
    @click.stop="handleClickToDetail()"
  >
    <div class="flex-grow-1">
      <input
        type="checkbox"
        class="mx-2"
        :checked="todo.completed"
        @change.stop="handleClickToComplete($event)"
        @click.stop
      >
      <span
        :class="{completed : todo.completed}"
      >
        {{ todo.subject }}
      </span>
    </div>
    <div>
      <button
        class="btn btn-danger btn-sm"
        @click.stop="handleClickToDelete"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { Todo } from '@/types/TodoType.interface';

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  emits: ['toogleCompleteTodo', 'openDeleteModal'],
  setup(props, { emit }) {
    const router = useRouter();

    const deleteTodo = () => {
      emit('openDeleteModal', props.todo.id);
    };

    const handleClickToComplete = (e: Event) => {
      if (e.target instanceof HTMLInputElement) { emit('toogleCompleteTodo', props.todo.id, e.target.checked); }
    };
    const handleClickToDelete = () => {
      deleteTodo();
    };
    const handleClickToDetail = () => {
      // router.push(`/todos/${id}`);
      // 경로가 나중에 변하면, 이름이 있기 때누에 고내찮아짐
      router.push({
        name: 'Todo',
        params: { id: props.todo.id },
      });
    };

    return {
      handleClickToComplete,
      handleClickToDelete,
      handleClickToDetail,
    };
  },
});
</script>

<style scoped>

.card-body{
  cursor: pointer;
}

.completed{
  color: grey;
  text-decoration: line-through;
}

</style>
