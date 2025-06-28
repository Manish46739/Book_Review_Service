import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { CacheService } from '../cache/cache.service';

const mockBookModel = {
  find: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue([{ title: 'Book1', author: 'Author1' }]),
};

const mockCacheService = {
  get: jest.fn().mockResolvedValue(null), // Simulate cache miss
  set: jest.fn(),
};

describe('BooksService Integration (Cache Miss)', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: getModelToken('Book'), useValue: mockBookModel },
        { provide: CacheService, useValue: mockCacheService },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should fetch from DB and set cache on cache miss', async () => {
    const books = await service.findAll();
    expect(mockCacheService.get).toHaveBeenCalledWith('books');
    expect(mockBookModel.find).toHaveBeenCalled();
    expect(mockCacheService.set).toHaveBeenCalledWith('books', JSON.stringify([{ title: 'Book1', author: 'Author1' }]));
    expect(books).toEqual([{ title: 'Book1', author: 'Author1' }]);
  });
});
