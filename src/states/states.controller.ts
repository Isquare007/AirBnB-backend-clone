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
import { StatesService } from './states.service';
import { JwtGuard } from 'src/auth/guard';
import { StatesDto } from './dto';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('States')
@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Get('')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Get all states',
    description: 'Get a list of all states.',
  })
  async getStates(@Res() res: Response) {
    try {
      const states = await this.statesService.getStates();
      return res.status(200).json(states);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Get('/:stateId')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Get state by ID',
    description: 'Get state details by providing the state ID.',
  })
  async getState(@Param('stateId') stateId: string, @Res() res: Response) {
    try {
      const state = await this.statesService.getState(stateId);
      return res.status(200).json(state);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Post('')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Create a new state',
    description: 'Create a new state with the provided data.',
  })
  async createState(
    @Body(new ValidationPipe()) body: StatesDto,
    @Res() res: Response,
  ) {
    try {
      const newState = await this.statesService.createState(body);
      return res.status(201).json(newState);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Put('/:stateId')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Update state by ID',
    description: 'Update state details by providing the state ID and new data.',
  })
  async updateState(
    @Body() body: StatesDto,
    @Param('stateId') stateId: string,
    @Res() res: Response,
  ) {
    try {
      const state = await this.statesService.updateState(stateId, body);
      return res.status(201).json(state);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Delete('/:stateId')
  @ApiOperation({
    summary: 'Delete state by ID',
    description: 'Delete state by providing the state ID.',
  })
  @UseGuards(JwtGuard)
  async deleteState(@Param('stateId') stateId: string, @Res() res: Response) {
    try {
      const state = await this.statesService.deleteState(stateId);
      return res.status(201).json(state);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
