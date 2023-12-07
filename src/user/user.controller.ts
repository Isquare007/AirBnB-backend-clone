import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Request,
  UseGuards,
  Body,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { EditDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Get user profile',
    description: 'Get the profile of the authenticated user.',
  })
  async profile(@Request() req) {
    return req.user;
  }
  @Get('')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get a list of all users.',
  })
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get('/:userId')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Get user details by providing the user ID.',
  })
  async getUserById(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Put('update/:userId')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Update user profile',
    description: 'Update the profile of the authenticated user.',
  })
  async updateProfile(
    @Request() req,
    @Param('userId') userId: string,
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
