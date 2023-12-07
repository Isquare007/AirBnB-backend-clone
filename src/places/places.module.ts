import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Places } from './entity';
import { Cities } from 'src/cities/entity';
import { User } from 'src/auth/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Places, Cities, User])],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
