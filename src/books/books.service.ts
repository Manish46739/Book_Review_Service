
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    private readonly cacheService: CacheService,
  ) {}

  async findAll(): Promise<Book[]> {
    const cachedBooks = await this.cacheService.get('books');
    if (cachedBooks) return JSON.parse(cachedBooks);

    const books = await this.bookModel.find().exec();
    await this.cacheService.set('books', JSON.stringify(books));
    return books;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    await newBook.save();
    await this.cacheService.del('books');
    return newBook;
  }
}
