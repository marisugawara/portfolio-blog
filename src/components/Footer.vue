<script setup>
import { useRoute, RouterLink } from 'vue-router';
const route = useRoute();
</script>

<template>
  <footer>
  <div v-if="route.path === '/'">
      <p>© 2025 My Portfolio Blog</p>
  </div>
  <div v-if="route.path !== '/'" class="home-link">
      <RouterLink to="/">←</RouterLink>
  </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 40px;
  padding: 16px 0;
  text-align: center;
}

.home-link {
  text-align: left;
  margin-left: 10px;
  margin-bottom: 8px;
}

.home-link a {
  color : #333;
  font-size: 25px;
}

p {
  font-size: 12px;
  color: #666;
}
</style>