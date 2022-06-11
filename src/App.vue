<script setup lang="ts">
import Toast from './components/Toast.vue';
import Navbar from './components/Navbar.vue';

</script>

<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
  <Toast />
</template>
