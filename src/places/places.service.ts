import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Places } from './entity';
import { Repository } from 'typeorm';
import { PlacesDto } from './dto';
import { validate as uuidValidate } from 'uuid';
import { Cities } from 'src/cities/entity';
import { User } from 'src/auth/entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Places)
    private readonly placesRepository: Repository<Places>,
    @InjectRepository(Cities)
    private readonly citiesRepository: Repository<Cities>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getPlaces(cityId: string) {
    if (!uuidValidate(cityId)) {
      throw new Error('Invalid UUID format for cityId');
    }

    const city = await this.citiesRepository.findOne({
      where: { id: cityId },
      relations: ['places'],
    });

    if (!city) {
      throw new Error('Associated city not found');
    }

    return city.places;
  }

  async getPlace(placeId: string) {
    if (!uuidValidate(placeId)) {
      throw new Error('Invalid UUID format for stateId');
    }
    const place = await this.placesRepository.findOne({
      where: { id: placeId },
      relations: ['reviews', 'city'],
    });
    if (!place) {
      throw new Error('Place not found');
    }

    return place;
  }

  async createPlace(userId: string, cityId: string, dto: PlacesDto) {
    if (!uuidValidate(userId, cityId)) {
      throw new Error('Invalid UUID format for stateId');
    }
    const {
      name,
      description,
      numberOfRooms,
      numberOfBathrooms,
      maxGuest,
      pricePerNight,
      latitude,
      longitude,
      amenities,
    } = dto;
    const city = await this.citiesRepository.findOne({
      where: { id: cityId },
    });

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!city || !user) {
      throw new Error('Associated city or user not found');
    }
    const place = this.placesRepository.create({
      name,
      description,
      numberOfRooms,
      numberOfBathrooms,
      maxGuest,
      pricePerNight,
      latitude,
      longitude,
      city,
      user,
      amenities,
    });

    return await this.placesRepository.save(place);
  }

  async updatePlace(id: string, dto: PlacesDto) {
    if (!uuidValidate(id)) {
      throw new Error('Invalid UUID format for placeId');
    }

    const {
      name,
      description,
      numberOfRooms,
      numberOfBathrooms,
      maxGuest,
      pricePerNight,
      latitude,
      longitude,
      amenities,
    } = dto;

    // Retrieve the existing place
    const existingPlace = await this.placesRepository.findOne({
      where: { id },
    });

    if (!existingPlace) {
      throw new Error('Place not found');
    }

    // Update place properties with new values
    existingPlace.name = name;
    existingPlace.description = description;
    existingPlace.numberOfRooms = numberOfRooms;
    existingPlace.numberOfBathrooms = numberOfBathrooms;
    existingPlace.maxGuest = maxGuest;
    existingPlace.pricePerNight = pricePerNight;
    existingPlace.latitude = latitude;
    existingPlace.longitude = longitude;
    existingPlace.amenities = amenities;

    // Save the updated place with associated amenities
    const savedPlace = await this.placesRepository.save(existingPlace);
    return savedPlace;
  }

  async deletePlace(id: string) {
    if (!uuidValidate(id)) {
      throw new Error('Invalid UUID format for stateId');
    }

    const place = await this.placesRepository.findOne({
      where: { id },
    });
    if (!place) {
      throw new Error('Place not found');
    }

    await this.placesRepository.delete(id);
  }
}
