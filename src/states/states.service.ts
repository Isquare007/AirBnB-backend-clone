import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { States } from './entity';
import { StatesDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(States)
    private readonly statesRepository: Repository<States>,
  ) {}

  async getStates() {
    return await this.statesRepository.find();
  }

  async getState(id: string) {
    const state = await this.statesRepository.findOne({ where: { id } });
    if (!state) {
      throw new NotFoundException('State not found');
    }
    return state;
  }

  async createState(dto: StatesDto) {
    try {
      const { name } = dto;

      const existingState = await this.statesRepository.findOne({
        where: { name },
      });

      if (existingState) {
        throw new BadRequestException('State already exist');
      }

      const newState = await this.statesRepository.create({ name });

      await this.statesRepository.save(newState);

      return { message: 'State created successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateState(id: string, dto: StatesDto) {
    if (!uuidValidate(id)) {
      throw new Error('Invalid UUID format for stateId');
    }
    const state = await this.statesRepository.findOne({ where: { id } });
    if (!state) {
      throw new NotFoundException('State not found');
    }

    await this.statesRepository.update(id, dto);

    const updatedState = await this.statesRepository.findOne({ where: { id } });

    return updatedState;
  }

  async deleteState(id: string) {
    if (!uuidValidate(id)) {
      throw new Error('Invalid UUID format for stateId');
    }
    const state = await this.statesRepository.findOne({ where: { id } });
    if (!state) {
      throw new NotFoundException('State not found');
    }
    await this.statesRepository.delete(id);
  }
}
