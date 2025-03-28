import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { About, AboutSchema } from './about/schemas/about.schema';
import { AboutService } from './about/services/about.service';
import { AboutController } from './about/controllers/about.controller';
import { AboutModule } from './about/about.module';
// import { ProfileModule } from './profile/profile.module';
// import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
// import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test-youapp'),
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'chat_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    MongooseModule.forFeature([{ name: About.name, schema: AboutSchema }]),
   
    ConfigModule.forRoot(), // Load .env
    // MongooseModule.forRoot(process.env.MONGO_URI), // Gunakan variabel dari .env
    AboutModule,
    ChatModule,
    AuthModule,
    UsersModule,
    // ProfileModule,
  ],
  providers: [AboutService],
  controllers: [AboutController],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes('*'); // Atau tentukan rute tertentu
//   }
// }