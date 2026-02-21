<script setup>
import { useRouter } from 'vue-router';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import { IconLogout } from '@tabler/icons-vue';


const router = useRouter();

const logout = () => {
  signOut(auth).then(() => {
    console.log('ログアウトしました');
    router.push('/');
  }).catch((error) => {
    console.error('エラーが発生しました:', error);
    alert('ログアウトに失敗しました');
  });
};
</script>

<template>
  <div class="page-wrapper">
    <div class="body">
      <h1 class="logout-title">
        <IconLogout class="icon" size="50" />
        <span>ログアウト</span>
      </h1>
      <p>ログアウトしますか？</p>
      <button @click="logout">ログアウト</button>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.body {
  width: 100%;
  max-width: 520px;
  margin: 80px auto;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 12px 28px #00000020;
}

.body h1 {
  font-size: 28px;
  margin: 20px 50px;
}

.logout-title {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

button {
  margin: 20px auto 0 auto;
  padding: 10px 20px;
  height: 50px;
  width: 50%;
  font-size: 18px;
  display: block;
  border-radius: 35px;
  text-decoration: none;
  background-color: #c7c7c7;
  border: none;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #89d956;
}

/* モバイル */
@media (max-width: 600px) {
  .body {
    margin: 40px auto;
    padding: 24px;
  }
  button {
    width: 100%;
  }
}
</style>