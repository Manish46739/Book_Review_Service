import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{ title: 'Test Book', author: 'Test Author' }]),
            create: jest.fn().mockResolvedValue({ title: 'Test Book', author: 'Test Author' }),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should return all books', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ title: 'Test Book', author: 'Test Author' }]);
  });

  it('should create a book', async () => {
    const dto = { title: 'Test Book', author: 'Test Author' };
    const result = await controller.create(dto);
    expect(result).toEqual(dto);
  });
});
