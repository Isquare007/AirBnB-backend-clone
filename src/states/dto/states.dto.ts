import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class StatesDto {
  @ApiProperty({ example: 'Kwara State', description: 'The name of the state' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
