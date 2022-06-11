<script setup lang="ts">
import { defineEmits } from 'vue';
import Modal from '@/components/Modal.vue';

const emit = defineEmits(['close', 'delete']);

const handleClickToDelete = () => {
  emit('delete');
  emit('close');
};

</script>

<template>
  <Modal @close="emit('close')">
    <template #title>
      Delete Todo
    </template>
    <template #body>
      Are you sure you want to delete this todo?
    </template>
    <template #footer>
      <button
        type="button"
        class="btn btn-danger"
        @click="handleClickToDelete"
      >
        Delete
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="emit('close')"
      >
        Close
      </button>
    </template>
  </Modal>
</template>
