<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { inject } from 'vue';

const userStatus = inject('userStatus');
const route = useRoute();
</script>

<template>
  <div class="header">
    <nav class="menu-link">
    <img src="./top-logo.png" alt="Logo" v-if="route.path === '/'" />
    <ul class="nav-right">
    <template v-if="!userStatus">
    <li v-if="route.path !== '/login'" class="login">
      <RouterLink to="/login">ログイン</RouterLink>
    </li>
    </template>

  <template v-else>
    <li v-if="route.path !== '/logout'" class="post">
      <RouterLink to="/posts/new">新規投稿</RouterLink>
    </li>
    <li v-if="route.path !== '/logout'" class="logout">
      <RouterLink to="/logout">ログアウト</RouterLink>
    </li>
  </template>
  </ul>
    </nav>
  </div>
</template>

<style scoped>
.header {
  max-width: 900px;
  margin: 0 auto;
  padding: 15px 16px;
}

img {
  display: block;
  width: min(300px, 40vw);
  height: auto;
  flex: 0 0 auto;
}

.menu-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.menu-link li a {
  padding: 9px 18px;
  font-size: 10px;
  display: inline-block;
  font-weight: 600;
  display: inline-block;
  border-radius: 25px;
  text-decoration: none;
  color: #333;

}

.nav-right {
  margin-left: auto;
  display: flex;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.post a:hover {
  background-color: #ffc04a;
  color: #fff;
}
.logout a:hover {
  background-color: #89d956;
  color: #fff;
}
.login a:hover {
  background-color: #a7d7e2;
  color: #fff;
}
</style>