<script setup>
import { ref, inject, onMounted } from 'vue';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { RouterLink } from 'vue-router';
import { IconCalendarWeek } from '@tabler/icons-vue';

const contents = ref([]);
const db = inject('db');

const getContents = () => {
  getDocs(query(collection(db, "contents"), orderBy("createdAt", "desc")))
    .then((snapshot) => {
      contents.value = [];
      snapshot.forEach((doc) => {
        const data = doc.data();

        const content = {
          id: doc.id,
          title: data.contentTitle,
          body: data.contentBody,
          createdAt: data.createdAt
        };
        contents.value.push(content);
      });
    })
    .catch((error) => {
      console.log("エラーにより取得できませんでした", error);
    });
};

onMounted(() => {
  getContents();
});
</script>

<template>
  <div class="body">
    <div>
      <h1>投稿一覧</h1>
      <div v-for="content in contents" :key="content.id" id="post-item">
        <p><IconCalendarWeek /> {{ new Date(content.createdAt.seconds * 1000).toLocaleString() }}</p>
        <RouterLink :to="`/posts/${content.id}`">
        <h2 id="content-title">{{ content.title }}</h2>
        </RouterLink>
      </div>
    <div
    v-if="contents.length === 0"
    class="alert alert-info max-w-2xl mx-auto">
    投稿された記事はまだありません
    </div>
    </div>
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

h1 {
  margin-bottom: 80px;
  color: #333333ff;
  font-size: 30px;
}

h1::after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  margin-top: 30px;
  background-color: #ccc;
}

#post-item {
  margin-bottom: 78px;
}

p {
  font-size: 18px;
  color: #555555ff;
  display: flex;
  align-items: center;
  gap: 6px;
}

#content-title {
  width: 300px;
  margin-top: 0;
  margin-left: 10px;
  margin-bottom: 30px;
  font-size: 23px;
  color: #333333ff;
}

#content-title:hover {
  color: #456983ff;
  text-decoration: underline;
}
</style>