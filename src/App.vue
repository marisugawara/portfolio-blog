<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app">
    <Header />
    <main class="app-main">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  flex-direction: column;
  background-color: #ffffff;
}

.app-main {
  flex: 1;
  padding: 0 5px;
}
</style>
