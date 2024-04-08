import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt'


import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { SignupInput } from 'src/auth/dto/inputs/singup.input';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: SignupInput): Promise<User> {
    try {
      const newUser = this.userRepository.create({
        ...createUserInput,
        password: bcrypt.hashSync(createUserInput.password, 10),
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleDbError(error);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  findOneByEmail(email: string) : Promise<User> {
   try {
    return this.userRepository.findOneByOrFail({ email })
   } catch (error) {
    throw new NotFoundException(`${email} not found`)
   }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string) {
    throw new Error('Method not implemented.');
  }

  private handleDbError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException('Email already exists');
    }
    this.logger.error(error);
    throw new InternalServerErrorException('please check the logs');
  }
}
