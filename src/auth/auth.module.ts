import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { secretKey } from './jwt-constants';
import { JwtStrategy, LocalStrategy } from './strategy';
import { User } from './entity';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: secretKey,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
})
export class AuthModule {}
