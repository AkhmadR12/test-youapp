import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About, AboutDocument } from '../schemas/about.schema';
import { CreateAboutDto } from '../dto/about.dto';

@Injectable()
export class AboutService {
  constructor(@InjectModel('About') private aboutModel: Model<AboutDocument>) {}
  
  async createAbout(createAboutDto: CreateAboutDto): Promise<About> {
    const newAbout = new this.aboutModel(createAboutDto);
    return newAbout.save();
  }
  
  async getAboutById(userId: string): Promise<About | null> { // Perbaiki return type
    return this.aboutModel.findById(userId).lean().exec();
  }
  
  async updateProfile(userId: string, updateData: CreateAboutDto) {
    const updatedProfile = await this.aboutModel.findOneAndUpdate({ userId }, updateData, { new: true });
    if (!updatedProfile) {
        throw new NotFoundException(`Profile with userId ${userId} not found`);
    }
    return updatedProfile;
}

  async updateAbout(userId: string, updateData: Partial<CreateAboutDto>): Promise<About> { 
    const updatedAbout = await this.aboutModel.findByIdAndUpdate(userId, updateData, { new: true }).lean().exec();
    if (!updatedAbout) {
      throw new NotFoundException(`Data with userId ${userId} not found`);
    }
    return updatedAbout;
  }
}
