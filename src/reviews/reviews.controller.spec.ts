import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: {
            findByBook: jest.fn().mockResolvedValue([{ reviewer: 'Alice', rating: 5, comment: 'Great!' }]),
            create: jest.fn().mockResolvedValue({ reviewer: 'Alice', rating: 5, comment: 'Great!' }),
          },
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should return all reviews for a book', async () => {
    const result = await controller.findByBook('bookid');
    expect(result).toEqual([{ reviewer: 'Alice', rating: 5, comment: 'Great!' }]);
  });

  it('should create a review for a book', async () => {
    const dto = { reviewer: 'Alice', rating: 5, comment: 'Great!' };
    const result = await controller.create('bookid', dto);
    expect(result).toEqual(dto);
  });
});
