import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from './entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entity';
import { Places } from 'src/places/entity';
import { validate as uuidValidate } from 'uuid';
import { ReviewsDto } from './dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Reviews)
    private readonly reviewsRepository: Repository<Reviews>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Places)
    private readonly placesRepository: Repository<Places>,
  ) {}

  async createReview(
    id: string,
    placeId: string,
    reviewDto: ReviewsDto,
  ): Promise<Reviews> {
    if (!uuidValidate(id, placeId)) {
      throw new Error('Invalid UUID format for placeId');
    }
    const { review } = reviewDto;

    const user = await this.userRepository.findOne({ where: { id } });

    // Check if the user exists
    if (!user) {
      throw new Error('Associated user not found');
    }

    const place = await this.placesRepository.findOne({
      where: { id: placeId },
    });

    // Check if the user exists
    if (!place) {
      throw new Error('Associated place not found');
    }

    // Create the reviews
    const reviews = this.reviewsRepository.create({
      review,
      user,
      place,
    });

    return await this.reviewsRepository.save(reviews);
  }

  async getReviews(placeId: string): Promise<Reviews[]> {
    if (!uuidValidate(placeId)) {
      throw new Error('Invalid UUID format for placeId');
    }
    const place = await this.placesRepository.findOne({
      where: { id: placeId },
      relations: ['reviews'],
    });

    // Check if the place exists
    if (!place) {
      throw new Error('Associated place not found');
    }

    return place.reviews;
  }

  async getReview(reviewId: string): Promise<Reviews> {
    if (!uuidValidate(reviewId)) {
      throw new Error('Invalid UUID format for placeId');
    }
    // Fetch the reviews
    const reviews = await this.reviewsRepository.findOne({
      where: { id: reviewId },
      // relations: ['places'],
    });

    // Check if the reviews exists
    if (!reviews) {
      throw new Error('reviews not found');
    }

    return reviews;
  }

  async deleteReview(id: string) {
    if (!uuidValidate(id)) {
      throw new Error('Invalid UUID format for reviewsId');
    }

    const reviews = await this.reviewsRepository.findOne({
      where: { id },
    });

    if (!reviews) {
      throw new Error('Associated review not found');
    }

    await this.reviewsRepository.delete(id);
  }
}
