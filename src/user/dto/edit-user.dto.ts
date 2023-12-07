import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, IsString } from 'class-validator';

export class EditDto {
  @ApiProperty({
    example: 'John',
    description: 'The updated first name of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The updated last name of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The updated email address of the user',
  })
  @IsOptional()
  @IsEmail()
  email: string;
}
