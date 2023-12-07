import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { Response } from 'express';
import { ReviewsDto } from './dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('/:placeId/reviews')
  @UseGuards(JwtGuard)
  async getReviews(@Param('placeId') placeId: string, @Res() res: Response) {
    try {
      const reviews = await this.reviewsService.getReviews(placeId);
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Get('/:reviewId')
  @ApiOperation({
    summary: 'Get review by ID',
    description: 'Get details of a review by providing the review ID.',
  })
  @UseGuards(JwtGuard)
  async getreview(@Param('reviewId') reviewId: string, @Res() res: Response) {
    try {
      const review = await this.reviewsService.getReview(reviewId);
      return res.status(200).json(review);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Post('/:placeId')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Create a new review',
    description:
      'Create a new review in a place by providing the place ID and review data.',
  })
  async createReview(
    @Param('placeId') placeId: string,
    @Body(new ValidationPipe()) dto: ReviewsDto,
    @Res() res: Response,
    @Request() req,
  ) {
    try {
      const userId = req.user.id;
      const review = await this.reviewsService.createReview(
        userId,
        placeId,
        dto,
      );
      return res.status(201).json(review);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Delete('/:reviewId')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Delete review by ID',
    description: 'Delete a review by providing the review ID.',
  })
  async deleteplace(@Param('reviewId') reviewId: string, @Res() res: Response) {
    try {
      const review = await this.reviewsService.deleteReview(reviewId);
      return res.status(201).json(review);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
