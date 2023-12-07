import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto';
import { LocalGuard } from './guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user.',
  })
  async register(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    return await this.authService.register(signUpDto);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate a user and generate an access token.',
  })
  login(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.user);
  }
}
