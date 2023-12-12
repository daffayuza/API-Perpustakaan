# Final Project API Perpustakaan

## Overview
Proyek API Perpustakaan dirancang untuk memberikan solusi efisien dalam manajemen dan akses data perpustakaan. Tujuan utama proyek ini adalah menciptakan antarmuka pemrograman aplikasi (API) yang dapat digunakan untuk mengelola informasi perpustakaan, termasuk data buku, peminjaman, dan informasi anggota.

### How To Use ?
* jalankan perintah berikut 

```bash
npm install
```
* setelah itu copy file `.env.example` pada terminal dengan cara :

```bash
cp .env.example .env
```
* Buat database terlebih dahulu pada Mysql, kemudian isikan configurasi pada file `.env`. silahkan disesuaikan dengan nama database yang anda buat tadi
```
APP_NAME = Vocasia Backend Framework
APP_PORT = 3000
APP_URL = http://localhost
NODE_ENV=development

# database
DB_HOST=127.0.0.1
DB_DRIVER=mysql
DB_NAME=library_api
DB_USER=root
DB_PASS=root
DB_PORT=3306
PRIVATE_KEY=saOnGqNIfg  //bisa ditukar dengan string random lainnya

```
* Kemudian jalankan script dibawah ini untuk melakukan migration ke database : 
```
npx sequelize-cli db:migrate 
```
* Kemudian jalankan script dibawah ini untuk Menambahkan Akun Admin untuk Akses Semua Fitur 
```
npx sequelize-cli db:seed:all 
```
* Coba jalankan menggunakan script dibawah ini : 
```
npm run start
```
* kemudian coba akses url dibawah ini menggunakan http request app favorit kalian :
```
http://localhost:3000/
```
# Resources 
* ExpressJs
* Sequelize
* Nodemon
* mysql2
* bcrypt
* JsonWebToken
# Group Members
* Muhammad Syahrul Romadhon
* Muhammad Daffa Yuza
* Madwa Razami
* Nia Damayanti
* Ahmad Syaeful Hidayat
