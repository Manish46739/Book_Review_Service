import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async findByBook(bookId: string): Promise<Review[]> {
    return this.reviewModel.find({ bookId }).exec();
  }

  async create(bookId: string, createReviewDto: CreateReviewDto): Promise<Review> {
    // Prevent the same reviewer from reviewing the same book multiple times
    const existing = await this.reviewModel.findOne({ bookId, reviewer: createReviewDto.reviewer });
    if (existing) {
      throw new Error('Reviewer has already reviewed this book.');
    }
    const newReview = new this.reviewModel({ ...createReviewDto, bookId });
    return newReview.save();
  }
}
