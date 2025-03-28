import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { About, AboutSchema } from './schemas/about.schema';
import { AboutService } from './services/about.service';
import { AboutController } from './controllers/about.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: About.name, schema: AboutSchema }])],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}
