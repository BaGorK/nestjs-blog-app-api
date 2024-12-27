import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    /**
     * Inject Users Repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * Inject hashing provider
     */
    @Inject(forwardRef(() => HashingProvider)) // since there is a circular dependency between the users module and auth module
    private readonly hashingProvider: HashingProvider,
  ) {}

  /**
   * create user
   */
  public async createUser(createUserDto: CreateUserDto) {
    let user = undefined;

    try {
      user = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      console.log('create user service', error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Database Error',
        },
      );
    }

    if (user) {
      throw new BadRequestException(
        'User already exists Please check your email',
      );
    }

    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      console.log('create user service', error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Database Error',
        },
      );
    }

    return newUser;
  }
}
