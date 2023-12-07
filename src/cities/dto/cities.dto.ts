import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CitiesDto {
  @ApiProperty({ example: 'Lagos', description: 'The name of the city' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
