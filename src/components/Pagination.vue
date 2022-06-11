<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  currentPage: number,
  lastPage: number,
}

defineProps<Props>();
const emits = defineEmits(['handleClickToMovePages']);
const handleClickToMovePages = (page: number) => {
  emits('handleClickToMovePages', page);
};

</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li
        v-if="currentPage !== 1"
        class="page-item"
        @click="handleClickToMovePages(currentPage - 1)"
      >
        <span class="page-link">Previous</span>
      </li>
      <li
        v-for="pageNum in lastPage"
        :key="pageNum"
        :class="{active: pageNum === currentPage}"
        class="page-item"
        @click="handleClickToMovePages(pageNum)"
      >
        <a
          class="page-link"
          href="#"
        >{{ pageNum }}</a>
      </li>
      <li class="page-item">
        <a
          v-if="currentPage !== lastPage"
          class="page-link"
          href="#"
          @click="handleClickToMovePages(currentPage + 1)"
        >Next</a>
      </li>
    </ul>
  </nav>
</template>
