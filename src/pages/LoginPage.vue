<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { IconLock, IconMail, IconKey } from '@tabler/icons-vue';

const router = useRouter();
const email = ref('');
const password = ref('');

const auth = getAuth();

const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      router.push('/')
    })
    .catch((error) => {
      console.error(error)
      ('ログインに失敗しました')
    })
}
</script>

<template>
  <div class="page-wrapper">
  <div class="body">
  <h1 class="login-title">
  <IconLock class="icon" size="50" />
  <span>ログイン</span>
  </h1>
  <form @submit.prevent="login" class="login-form">
    <div class="label">
      <label for="email">Email</label>
    </div>
    <div class="input">
      <input type="email" id="email" v-model="email" placeholder="メールアドレスを入力してください" required />
    </div>
    <div class="label">
      <label for="password">Password</label>
    </div>
    <div class="input">
      <input type="password" id="password" v-model="password" placeholder="パスワードを入力してください" required />
    </div>
    <button type="submit">ログイン</button>
  </form>
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
  background-color: #eeeeee;
  border-radius: 25px;
  text-align: left;
  box-shadow: 0 12px 28px #00000020;
}

.body h1 {
  font-size: 28px;
  margin: 20px 50px;
}

.login-title {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.label {
  margin-left: 10px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.login-form input {
  width: 100%;
  height: 46px;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 20px;
  border: 1px solid #bfbfbf;
  box-sizing: border-box;
}

button {
  margin: 20px auto 0 auto;
  padding: 10px 20px;
  height: 50px;
  width: 80%;
  font-size: 18px;
  display: block;
  border-radius: 35px;
  text-decoration: none;
  background-color: #c7c7c7;
  border: none;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
}

button:hover {
  background-color: #bfc9ff;
  border: none;
}
</style>