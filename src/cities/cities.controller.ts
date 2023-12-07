import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { JwtGuard } from 'src/auth/guard';
import { CitiesDto } from './dto';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('/:stateId/cities')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Get cities in a state',
    description: 'Get a list of cities in a state by providing the state ID.',
  })
  async getCitites(@Param('stateId') stateId: string, @Res() res: Response) {
    try {
      const cities = await this.citiesService.getCities(stateId);
      return res.status(200).json(cities);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Get('/:cityId')
  @ApiOperation({
    summary: 'Get city by ID',
    description: 'Get details of a city by providing the city ID.',
  })
  @UseGuards(JwtGuard)
  async getCity(@Param('cityId') cityId: string, @Res() res: Response) {
    try {
      const city = await this.citiesService.getCity(cityId);
      return res.status(200).json(city);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Post('/:stateId')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Create a new city',
    description:
      'Create a new city in a state by providing the state ID and city data.',
  })
  async createCity(
    @Param('stateId') stateId: string,
    @Body(new ValidationPipe()) dto: CitiesDto,
    @Res() res: Response,
  ) {
    try {
      const city = await this.citiesService.createCity(stateId, dto);
      return res.status(201).json(city);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Put('/:cityId')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Update city by ID',
    description:
      'Update details of a city by providing the city ID and new data.',
  })
  async updateCity(
    @Body() body: CitiesDto,
    @Param('cityId') cityId: string,
    @Res() res: Response,
  ) {
    try {
      const city = await this.citiesService.updateCity(cityId, body);
      return res.status(201).json(city);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Delete('/:cityId')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Delete city by ID',
    description: 'Delete a city by providing the city ID.',
  })
  async deleteState(@Param('cityId') cityId: string, @Res() res: Response) {
    try {
      const city = await this.citiesService.deleteCity(cityId);
      return res.status(201).json(city);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
