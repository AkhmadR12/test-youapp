# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

Sebelum memulai, pastikan beberapa hal berikut telah tersedia dan dikonfigurasi dengan benar:

1. **MongoDB Connection**  
   - Harus memiliki koneksi MongoDB dengan nama **"test-youapp"**.
   - Database ini harus memiliki koleksi berikut:
     - `users`
     - `about`
     - `interest`

2. **Install dan Jalankan Docker Containers**  
   Jika Docker belum terinstall, silakan install terlebih dahulu sesuai dengan sistem operasi Anda. Setelah itu, jalankan perintah berikut di terminal untuk mengatur dan menjalankan container yang diperlukan:
   
   ```bash
   docker run -d --name mongo \
     -p 27017:27017 \
     mongo

   docker run -d --name rabbitmq \
     -p 15672:15672 -p 5672:5672 \
     rabbitmq:management
   ```
   
   Dengan perintah di atas, container MongoDB dan RabbitMQ akan berjalan secara otomatis.

### Install Dependencies

Untuk memulai, install dependency yang diperlukan dengan perintah berikut:

```bash
npx create-next-app@latest frontend 
# or
yarn create next-app frontend
```

### Menjalankan Backend

Pastikan backend berjalan sebelum menjalankan aplikasi frontend:

```bash
npm run start:dev
```

Backend harus berjalan pada **port 3001**.

### Menjalankan Frontend

Setelah backend dan semua layanan lain aktif, jalankan frontend dari folder `test-youapp`:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Frontend juga harus berjalan pada **port 3001**.

### Mengakses Aplikasi

Setelah semua layanan berjalan, buka browser dan akses:

[http://localhost:3001/login](http://localhost:3001/login)

## Editing

Anda dapat mulai mengedit halaman dengan memodifikasi file `app/page.tsx`. Perubahan akan diterapkan secara otomatis.

## Fonts

Proyek ini menggunakan [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) untuk mengoptimalkan dan memuat [Geist](https://vercel.com/font), font baru dari Vercel.

## Learn More

Untuk mempelajari lebih lanjut tentang Next.js, kunjungi:

- [Next.js Documentation](https://nextjs.org/docs) - Pelajari fitur dan API Next.js.
- [Learn Next.js](https://nextjs.org/learn) - Tutorial interaktif Next.js.
- [Next.js GitHub](https://github.com/vercel/next.js) - Berkontribusi dan berikan masukan.

## Deploy on Vercel

Cara termudah untuk melakukan deploy adalah menggunakan platform [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Lihat dokumentasi [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying) untuk informasi lebih lanjut.

