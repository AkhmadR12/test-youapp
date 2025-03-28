// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   // await app.listen(process.env.PORT ?? 3000);
//   app.enableCors({
//     origin: '*', // Bisa diubah ke http://localhost:3001 jika Next.js pakai port lain
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   });

//   await app.listen(3001);
// }

 
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as express from 'express';

dotenv.config(); // Load environment variables sebelum aplikasi dijalankan

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set batas ukuran body request
  app.use(bodyParser.json({ limit: '10mb' })); // Atur batas sesuai kebutuhan
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use('/uploads', express.static('uploads')); // Agar file bisa diakses

  app.use(cors({ origin: '*' })); // Aktifkan CORS agar bisa diakses frontend
  // app.enableCors(); // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Pastikan ini sesuai dengan port Next.js
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  // Middleware untuk memastikan response selalu JSON
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  }); 

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log('Server running on http://localhost:3001');
}
bootstrap();