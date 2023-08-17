import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly appService: AppService) { }

  @Get('serve')
  async serveImage(@Res() res: Response) {
    return this.appService.serveImage(res)
  }
}
