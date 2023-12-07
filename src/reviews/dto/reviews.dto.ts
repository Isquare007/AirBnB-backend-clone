import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  review: string;
}
