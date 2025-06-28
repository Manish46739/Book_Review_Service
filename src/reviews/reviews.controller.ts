
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('books/:id/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findByBook(@Param('id') id: string) {
    return this.reviewsService.findByBook(id);
  }

  @Post()
  create(@Param('id') id: string, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(id, createReviewDto);
  }
}
