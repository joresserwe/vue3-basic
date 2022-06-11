<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <router-link
      class="navbar-brand"
      :to="{name: 'Home'}"
    >
      Basic
    </router-link>
    <ul class="navbar-nav me-auto">
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/todos"
        >
          Todos
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
