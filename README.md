# 📄 Mini Project - User Management App (React)

## 🧾 Deskripsi
Aplikasi manajemen user sederhana menggunakan React dan API Reqres.in. Pengguna dapat login, register, melihat daftar user, dan detail user.

## 🚀 Fitur
- Login & Register menggunakan API
- Protected Route (tidak bisa ke Home tanpa login)
- Fetch dan tampilkan daftar user
- Detail user dari API Reqres

## 🔗 API (Reqres.in)
- `POST /api/login` → login user
- `POST /api/register` → registrasi user
- `GET /api/users?page=1` → daftar user
- `GET /api/users/:id` → detail user

## 🗂️ Struktur Folder (src/)
- `assets/` → gambar/icon
- `components/`
  - `figma/` → referensi desain
  - `ui/` → Button, Avatar, Dropdown
  - `AuthContext.jsx` → context auth global
  - `LoginPage.jsx`, `RegisterPage.jsx`, `HomePage.jsx`, `UserDetailPage.jsx`
  - `Navigation.jsx` → sidebar/menu navigasi

## 🔧 Teknologi
- React + Vite
- Context API
- Fetch API
- Tailwind CSS (opsional)

## 🧪 Cara Menjalankan
```bash
npm install
npm run dev
