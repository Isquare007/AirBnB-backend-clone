import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { EditDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtGuard)
  async profile(@Request() req) {
    return req.user;
  }
  @Get('')
  @UseGuards(JwtGuard)
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get('/:userId')
  @UseGuards(JwtGuard)
  async getUserById(@Param('userId') userId: number) {
    return await this.userService.getUserById(userId);
  }

  @Post('update-profile/:userId')
  @UseGuards(JwtGuard)
  async updateProfile(
    @Request() req,
    @Param('userId') userId: number,
    @Body() dto: EditDto,
  ) {
    try {
      if (req.user.id !== userId) {
        throw new ForbiddenException(
          'You are not allowed to update this profile.',
        );
      }
      return await this.userService.updateUser(userId, dto);
    } catch (error) {
      throw new ForbiddenException('Failed to update profile.');
    }
  }
}
