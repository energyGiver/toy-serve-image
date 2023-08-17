import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { ImagesController } from './app.controller';
import { AppService } from './app.service';

describe('ImagesController', () => {
  let imagesController: ImagesController;
  let appService: AppService;

  // Mocked service method
  const mockServeImage = jest.fn().mockImplementation((res: Response) => {
    res.setHeader('Content-Type', 'image/jpeg');
    return res.send('Mock Image Data');
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        AppService,
      ],
    })
      .overrideProvider(AppService)  // Override the AppService
      .useValue({                     // Provide a mocked version
        serveImage: mockServeImage,
      })
      .compile();

    imagesController = app.get<ImagesController>(ImagesController);
    appService = app.get<AppService>(AppService);
  });

  describe('serveImage', () => {
    it('should return synthesized image', () => {
      const mockRes: Partial<Response> = {
        setHeader: jest.fn(),
        send: jest.fn().mockReturnThis(),
      };

      imagesController.serveImage(mockRes as Response);

      expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'image/jpeg');
      expect(mockRes.send).toHaveBeenCalledWith('Mock Image Data');
    });
  });
});
