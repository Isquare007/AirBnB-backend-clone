import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StatesModule } from './states/states.module';
import { JwtStrategy } from './auth/strategy';
import { CitiesModule } from './cities/cities.module';
import { PlacesModule } from './places/places.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: Number(configService.get('POSTGRES_PORT')),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [__dirname + '/../**/*.entity.js'],
          synchronize: true,
        };
      },
    }),
    AuthModule,
    UserModule,
    StatesModule,
    CitiesModule,
    PlacesModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
