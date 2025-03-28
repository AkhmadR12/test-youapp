import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AboutDocument = About & Document;

@Schema()
export class About {
  @Prop({ required: true })
  displayName: string;

  @Prop()
  bio: string;
  @Prop()
  birthday: string;

  @Prop()
  height: string;

  @Prop()
  weight: string;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop()
  profileImage: string;
}

export const AboutSchema = SchemaFactory.createForClass(About);
