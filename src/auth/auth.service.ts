import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { User } from './entity';
import { SignUpDto } from './dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(signUpDto: SignUpDto) {
    try {
      const { firstName, lastName, email, password } = signUpDto;

      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        throw new BadRequestException(
          'User with the provided email already exists.',
        );
      }

      // Hash the password with salt
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      const hashedPassword = salt + '.' + hash.toString('hex');

      // Save the user
      const newUser = this.userRepository.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await this.userRepository.save(newUser);

      return { message: 'User registered successfully.' };
    } catch (error) {
      // Handle validation errors or unexpected errors
      if (error instanceof BadRequestException) {
        throw error; // Rethrow BadRequestException as is
      } else {
        throw new BadRequestException('Registration failed');
      }
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      const [salt, hashedPassword] = user.password.split('.');

      const controlHashedPassword = (await scrypt(
        password,
        salt,
        32,
      )) as Buffer;

      if (hashedPassword === controlHashedPassword.toString('hex')) {
        return user;
      }
    }
    return null;
  }

  async login(user: User) {
    try {
      const payload = { sub: user.id, email: user.email };
      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      // Handle unexpected errors
      throw new BadRequestException('Login failed');
    }
  }
}
