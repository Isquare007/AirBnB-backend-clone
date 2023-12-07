import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { States } from 'src/states/entity';
import { Repository } from 'typeorm';
import { Cities } from './entity';
import { CitiesDto } from './dto';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(States)
    private readonly statesRepository: Repository<States>,
    @InjectRepository(Cities)
    private readonly citiesRepository: Repository<Cities>,
  ) {}

  async createCity(id: string, citiesDto: CitiesDto): Promise<Cities> {
    if (!uuidValidate(id)) {
      throw new Error('Invalid UUID format for stateId');
    }
    const { name } = citiesDto;
    // Fetch the associated state
    const state = await this.statesRepository.findOne({ where: { id } });

    // Check if the state exists
    if (!state) {
      throw new Error('Associated state not found');
    }
    const existingCity = await this.citiesRepository.findOne({
      where: { name: citiesDto.name },
    });

    // Check if the state exists
    if (existingCity) {
      throw new Error('City already exist');
    }

    // Create the city
    const city = this.citiesRepository.create({
      name,
      state,
    });

    return await this.citiesRepository.save(city);
  }

  async getCities(stateId: string): Promise<Cities[]> {
    if (!uuidValidate(stateId)) {
      throw new Error('Invalid UUID format for stateId');
    }
    const state = await this.statesRepository.findOne({
      where: { id: stateId },
      relations: ['cities'],
    });

    // Check if the state exists
    if (!state) {
      throw new Error('Associated state not ffound');
    }
    return state.cities;
  }

  async getCity(cityId: string): Promise<Cities> {
    if (!uuidValidate(cityId)) {
      throw new Error('Invalid UUID format for stateId');
    }
    // Fetch the city
    const city = await this.citiesRepository.findOne({
      where: { id: cityId },
      relations: ['state'], // Specify the relation to load
    });

    // Check if the city exists
    if (!city) {
      throw new Error('City not found');
    }
    return city;
  }

  async updateCity(id: string, dto: CitiesDto): Promise<Cities> {
    if (!uuidValidate(id)) {
      throw new Error('Invalid UUID format for cityId');
    }

    const city = await this.citiesRepository.findOne({
      where: { id },
    });

    if (!city) {
      throw new Error('Associated city not found');
    }

    await this.citiesRepository.update(id, dto);

    const updatedCity = await this.citiesRepository.findOne({ where: { id } });

    return updatedCity;
  }

  async deleteCity(id: string) {
    if (!uuidValidate(id)) {
      throw new Error('Invalid UUID format for cityId');
    }

    const city = await this.citiesRepository.findOne({
      where: { id },
    });

    if (!city) {
      throw new Error('Associated state not found');
    }

    await this.citiesRepository.delete(id);
  }
}
