import { Module } from '@nestjs/common';
import { ImagesController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [ImagesController],
  providers: [AppService],
})
export class AppModule { }
