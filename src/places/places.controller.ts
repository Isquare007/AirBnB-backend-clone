import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { JwtGuard } from 'src/auth/guard';
import { Response } from 'express';
import { PlacesDto } from './dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesServices: PlacesService) {}

  @Get('/:cityId/places')
  @ApiOperation({
    summary: 'Get places in a city',
    description: 'Get a list of places in a city by providing the city ID.',
  })
  async getPlaces(@Param('cityId') cityId: string, @Res() res: Response) {
    try {
      const places = await this.placesServices.getPlaces(cityId);
      return res.status(200).json(places);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Get('/:placeId')
  @ApiOperation({
    summary: 'Get place by ID',
    description: 'Get details of a place by providing the place ID.',
  })
  async getPlace(@Param('placeId') placeId: string, @Res() res: Response) {
    try {
      const place = await this.placesServices.getPlace(placeId);
      return res.status(200).json(place);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Post('/:cityId')
  @ApiOperation({
    summary: 'Create a new place',
    description:
      'Create a new place in a city by providing the city ID and place data.',
  })
  @UseGuards(JwtGuard)
  async createPlace(
    @Param('cityId') cityId: string,
    @Request() req,
    // @Res() res: Response,
    @Body(new ValidationPipe()) dto: PlacesDto,
  ) {
    const userId = req.user.id;
    const place = await this.placesServices.createPlace(userId, cityId, dto);
    return place;
  }

  @Put('/:placeId')
  @ApiOperation({
    summary: 'Update place by ID',
    description:
      'Update details of a place by providing the place ID and new data.',
  })
  @UseGuards(JwtGuard)
  async updatePlace(
    @Param('placeId') placeId: string,
    @Res() res: Response,
    dto: PlacesDto,
  ) {
    try {
      const place = await this.placesServices.updatePlace(placeId, dto);
      return res.status(201).json(place);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Delete('/:placeId')
  @ApiOperation({
    summary: 'Delete place by ID',
    description: 'Delete a place by providing the place ID.',
  })
  @UseGuards(JwtGuard)
  async deletePlace(@Param('placeId') placeId: string, @Res() res: Response) {
    try {
      await this.placesServices.deletePlace(placeId);
      return res.status(200).json('Place deleted successfully');
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
