import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cities } from './entity';
import { States } from 'src/states/entity';
import { StatesService } from 'src/states/states.service';
import { StatesController } from 'src/states/states.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cities, States])],
  controllers: [CitiesController, StatesController],
  providers: [CitiesService, StatesService],
})
export class CitiesModule {}
