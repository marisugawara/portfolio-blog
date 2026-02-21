# Portfolio Blog App

## 🇯🇵 日本語

### 概要
Vue 3 と Firebase を使用したWebアプリケーションです。
認証機能と Firestore のセキュリティルールを実装しています。

### 技術スタック
- Vue 3 (Composition API)
- Vue Router
- Firebase Authentication
- Firestore Database
- Firebase Hosting

### 主な機能
- 投稿一覧・詳細の公開表示
- ログイン / ログアウト
- 投稿の作成・編集・削除（オーナーのみ）
- UID制限によるFirestore書き込み制御

### セキュリティ
Firestore Security Rules により、特定のUIDのみ書き込み可能な設計としています。

---

## 🇺🇸 English

### Overview
A Vue 3 + Firebase web application with authentication and secure Firestore rules.

### Tech Stack
- Vue 3 (Composition API)
- Vue Router
- Firebase Authentication
- Firestore Database
- Firebase Hosting

### Features
- Public post listing and detail pages
- Login / Logout
- Create, Edit, Delete posts (Owner-only access)
- Authentication state management
- Firestore security rules restricting write access by UID

### Security
Write operations are restricted to a specific authenticated UID via Firestore Security Rules.