import { Controller, Post, Body, Req } from '@nestjs/common';
import { AboutService } from '../services/about.service';
import { CreateAboutDto } from '../dto/about.dto';
import { Request } from 'express';
@Controller('profile')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}
  @Post('/edit-about')
  async updateProfile(@Body() updateProfileDto: CreateAboutDto, @Req() req) {
    const userId = req.user.id; // Pastikan token JWT membawa user ID
    return this.aboutService.updateProfile(userId, updateProfileDto);
  }
  
}
