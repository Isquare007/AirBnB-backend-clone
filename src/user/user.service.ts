import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity';
import { Repository } from 'typeorm';
import { EditDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUsers() {
    try {
      const usersList = [];
      const users = await this.userRepository.find();

      for (const user of users) {
        const modifiedUser = { ...user, password: '-' };
        usersList.push(modifiedUser);
      }

      return usersList;
    } catch (error) {
      // Handle errors or rethrow if needed
      throw new Error('Failed to retrieve users.');
    }
  }
  async getUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.password = '-';
    return user;
  }
  async updateUser(id: string, dto: EditDto) {
    await this.userRepository.update(id, dto);
    return await this.userRepository.findOne({ where: { id } });
  }
}
