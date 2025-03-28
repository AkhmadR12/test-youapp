import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateAboutDto {
  @IsString()
  displayName: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsDateString()
  @IsOptional()
  birthday?: string;

  @IsString()
  @IsOptional()
  height?: string;

  @IsString()
  @IsOptional()
  weight?: string;

  @IsString()
  @IsOptional()
  horoscope?: string;

  @IsString()
  @IsOptional()
  zodiac?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}
