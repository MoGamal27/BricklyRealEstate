import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { AIPricePredictionService } from './ai-price-prediction.service';
import { Property } from './entities/property.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    CloudinaryModule,
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService, AIPricePredictionService],
  exports: [PropertiesService, AIPricePredictionService],
})
export class PropertiesModule {}
