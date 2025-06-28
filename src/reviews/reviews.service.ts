
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
    const newReview = new this.reviewModel({ ...createReviewDto, bookId });
    return newReview.save();
  }
}
