import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import PostListPage from './pages/PostListPage.vue'
import LoginPage from './pages/LoginPage.vue'
import LogoutPage from './pages/LogoutPage.vue'
import PostCreatePage from './pages/PostCreatePage.vue'
import PostDetailPage from './pages/PostDetailPage.vue'
import PostEditPage from './pages/PostEditPage.vue'

// ★ここだけ追加
import { db, auth, userStatus } from './firebase'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PostListPage },
    { path: '/login', component: LoginPage },
    { path: '/logout', component: LogoutPage },
    { path: '/posts/new', component: PostCreatePage },
    { path: '/posts/:id', component: PostDetailPage },
    { path: '/posts/edit/:id', component: PostEditPage },
  ],
})

const app = createApp(App)
app.use(router)
app.provide('db', db)
app.provide('auth', auth)
app.provide('userStatus', userStatus)
app.mount('#app')