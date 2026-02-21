<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { collection, addDoc } from "firebase/firestore";

const router = useRouter();
const db = inject('db');

const contentTitle = ref('');
const contentBody = ref('');

const createContent = () => {
  if (contentTitle.value === '' || contentBody.value === '') {
    alert('タイトルと内容を入力してください');
    return;
  }
  addDoc(collection(db, 'contents'), {
    contentTitle: contentTitle.value,
    contentBody: contentBody.value,
    createdAt: new Date()
  }).then(() => {
    console.log('投稿が完了しました');
    router.push('/');
  }).catch((error) => {
    console.error('エラーが発生しました:', error);
    alert('投稿に失敗しました');
  });
}
</script>


<template>
  <div class="body">
    <h1>新規投稿</h1>

    <form class="post-form" @submit.prevent="createContent">
      <div class="form-group">
        <label for="contentTitle">タイトル</label>
        <input
          type="text"
          id="contentTitle"
          v-model="contentTitle"
          required
        />
      </div>

      <div class="form-group">
        <label for="contentBody">内容</label>
        <textarea
          id="contentBody"
          v-model="contentBody"
          required
        ></textarea>
      </div>

      <button type="submit">投稿する</button>
    </form>
  </div>
</template>

<style scoped>
.body {
  text-align: left;
  width: 100%;
  max-width: 900px;
  margin: 10 auto;
  padding: 35px 30px;
  background-color: #f9f9f9;
  border-radius: 20px;
  box-shadow: 0 8px 24px #0000000d;
}

.body h1 {
  margin-bottom: 24px;
}

.post-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input,
textarea {
  width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  border-radius: 16px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #9fa8ff;
}

textarea {
  min-height: 200px;
  resize: vertical;
}

button {
  margin-top: 10px;
  padding: 12px;
  width: 30%;
  font-weight: 600;
  font-size: 16px;
  border-radius: 25px;
  border: none;
  background-color: #d7d7d7;
  cursor: pointer;
  transition: 0.2s ease;
}

button:hover {
  background-color: #ffc04a;
}
</style>