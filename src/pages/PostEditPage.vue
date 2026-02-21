<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { doc, getDoc, updateDoc } from "firebase/firestore";

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const db = inject('db');

const contentTitle = ref('');
const contentBody = ref('');

const getContent = () => {
  const docRef = doc(db, 'contents', id);

  getDoc(docRef)
    .then((snapshot) => {
      if(snapshot.exists()) {
        const data = snapshot.data();

        contentTitle.value = data.contentTitle;
        contentBody.value = data.contentBody;
      } else {
          console.log("該当の記事は存在しません");
      }
    })
    .catch((error) => {
      console.error("エラーが発生しました", error);
    });
};

onMounted(() => {
  getContent();
});

const updateContent = () => {
  if (contentTitle.value === '' || contentBody.value === '') {
    alert('タイトルと内容を入力してください');
    return;
  }

  const docRef = doc(db, 'contents', id);

  updateDoc(docRef, {
    contentTitle: contentTitle.value,
    contentBody: contentBody.value
  }).then(() => {
    console.log('投稿の更新が完了しました');
    router.push(`/posts/${id}`);
  }).catch((error) => {
    console.error('エラーが発生しました:', error);
    alert('投稿の更新に失敗しました');
  });
};
</script>

<template>
  <div class="body">
  <h1>投稿編集</h1>
  <form class="update-form" @submit.prevent="updateContent">

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

  <button type="submit">更新する</button>
  </form>
  </div>
</template>

<style scoped>
.body {
  text-align: left;
  width: 100%;
  max-width: 900px;
  margin: 10px auto;
  padding: 35px 30px;
  background-color: #f9f9f9;
  border-radius: 20px;
  box-shadow: 0 8px 24px #0000000d;
}

.body h1 {
  margin-bottom: 24px;
}

.update-form {
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
  transition: background-color 0.2s ease, transform 0.2s ease;
}

button:hover {
  background-color: #96a4de;
}
</style>