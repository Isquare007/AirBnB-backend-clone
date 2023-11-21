import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto';
import { LocalGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ..../auth/register
  @Post('register')
  async register(@Body() signUpDto: SignUpDto) {
    await this.authService.register(signUpDto);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Request() req) {
    console.log(req);
    return this.authService.login(req.user);
  }
}
