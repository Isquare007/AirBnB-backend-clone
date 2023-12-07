import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Amenity } from '../entity';

export class PlacesDto {
  @ApiProperty({
    example: 'Cozy Cottage',
    description: 'The name of the place',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 3, description: 'Number of rooms in the place' })
  @IsNumber()
  @IsNotEmpty()
  numberOfRooms: number;

  @ApiProperty({ example: 2, description: 'Number of bathrooms in the place' })
  @IsNumber()
  @IsNotEmpty()
  numberOfBathrooms: number;

  @ApiProperty({ example: 6, description: 'Maximum number of guests allowed' })
  @IsNumber()
  @IsNotEmpty()
  maxGuest: number;

  @ApiProperty({ example: 100, description: 'Price per night for the place' })
  @IsNumber()
  @IsNotEmpty()
  pricePerNight: number;

  @ApiProperty({ example: 37.7749, description: 'Latitude of the place' })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ example: -122.4194, description: 'Longitude of the place' })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty({
    example: ['WiFi', 'Parking'],
    description: 'Array of amenities available at the place',
  })
  @IsArray()
  amenities: Amenity[];
}
