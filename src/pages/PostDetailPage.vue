<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { IconCalendarWeek } from '@tabler/icons-vue';


const route = useRoute();
const router = useRouter();
const id = route.params.id;

const db = inject('db');
const userStatus = inject('userStatus');

const content = ref(null);

const showDeletePop = ref(false);

// 投稿データを取得する関数(編集フォームにデフォルト値として表示するため)
const getContent = () => {
  const docRef = doc(db, 'contents', id)

  getDoc(docRef)
    .then((snapshot) => {
      if(snapshot.exists()) {
        const data = snapshot.data();

        content.value = {
          id: snapshot.id,
          title: data.contentTitle,
          body: data.contentBody,
          createdAt: data.createdAt
        }
      } else {
          console.log("該当の記事は存在しません");
      }
    })
    .catch((error) => {
      console.error("エラーが発生しました:", error);
    })
};

onMounted(() => {
  getContent();
});

const deleteContent = () => {
  const docRef = doc(db, 'contents', id);

  deleteDoc(docRef)
  .then(() => {
    console.log('投稿の削除が完了しました');
    router.push('/');
  })
  .catch((error) => {
    console.error('エラーが発生しました:', error);
    alert('投稿の削除に失敗しました');
  });
}

</script>

<template>
<div class="body">
  <section v-if="!content">
    <p>読み込み中...</p>
  </section>

  <section v-else>
    <div>
      <p><IconCalendarWeek />{{ new Date(content.createdAt.seconds * 1000).toLocaleString() }}</p>
    </div>
      <h1>{{ content.title }}</h1>
      <p>{{ content.body }}</p>

      <div v-if="userStatus">
        <RouterLink :to="`/posts/edit/${content.id}`" id="edit">編集</RouterLink>

        <!-- 実際には削除せず変数showDeletePopをtrueにする -->
        <button @click="showDeletePop = true" id="delete">削除</button>

        <!-- 変数showDeletePopがtrueになったことでキャンセルまたは削除を選択できる -->
        <div v-if="showDeletePop" class="delete-pop">
          <div class="delete-box">
            <div class="delete-confirm">
              <p>本当に削除しますか？</p>
            </div>
            <div class="delete-buttons">
              <button @click="showDeletePop = false" id="cancel">キャンセル</button>
              <button @click="deleteContent" id="delete">削除する</button>
            </div>
          </div>
        </div>
      </div>
  </section>
</div>
</template>

<style scoped>
.body {
  text-align: left;
  max-width: 900px;
  width: 100%;
  margin: 50 auto;
  padding: 35px 30px;
  border-radius: 20px;
  border: 2px solid #b0b0b0ff;
}

h1 {
  font-size: 30px;
}

p {
  font-size: 15px;
  color: #555555ff;
  display: flex;
  align-items: center;
  gap: 6px;
}

.main {
  text-align: left;
  width: 800px;
  margin: 10 auto;
  padding: 80px;
  border-color: #a6a6a6ff;
  border-radius: 25px;
}

#edit {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ffffffff;
  border: 2px solid #253e56ff;
  color: #253e56ff;
  text-decoration: none;
  border-radius: 25px;
}

#edit:hover {
  background-color: #253e56ff;
  color: #ffffffff;
}

#delete {
  margin-left: 20px;
  padding: 10px 20px;
  background-color: #ffffffff;
  border: 2px solid #ec5757ff;
  color: #ec5757ff;
  text-decoration: none;
  border-radius: 25px;
}

#delete:hover {
  background-color: #ec5757ff;
  color: #ffffffff;
}

.delete-pop {
  position: fixed;
  inset: 0;
  background: rgba(144, 144, 144, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.delete-box {
  background: #ffffff;
  padding: 20px;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}


.delete-confirm p {
  font-size: 18px;
  display: center;
  margin-bottom: 20px;
}

#cancel {
  margin-right: 20px;
  padding: 10px 20px;
  background-color: #ffffffff;
  border: 1px solid #253e56ff;
  color: #253e56ff;
  text-decoration: none;
  border-radius: 25px;
}

#cancel:hover {
  background-color: #253e56ff;
  color: #ffffffff;
}
</style>