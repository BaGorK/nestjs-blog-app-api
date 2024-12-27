import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import profileConfig from '../config/profile.config';
import { ConfigType } from '@nestjs/config';
import { UsersCreateManyProviderService } from './users-create-many.provider.service';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

/**
 * Users Service Provider
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Inject Users Repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * Inject Auth Service
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    /**
     * Inject module specific config files
     */
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    /**
     * Inject UsersCreateManyProvider
     */
    private readonly usersCreateManyProvider: UsersCreateManyProviderService,

    /**
     * Inject Create User Provider
     */
    private readonly createUserProvider: CreateUserProvider,

    /**
     * Inject FindOneUserByEmailProvider
     */
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  /**
   * find all
   */
  public findAllUsers(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    // test module specific config file
    console.log('test module specific config file', this.profileConfiguration);
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    console.log(getUsersParamDto, limit, page);

    return [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Alice Caeiro' },
      { id: 3, name: 'Who Knows' },
    ];
  }

  /**
   * find by id
   * @param id
   * @returns
   */
  public async findOneById(id: number) {
    let user = undefined;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      console.log('find by id service', error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Database Error',
        },
      );
    }

    if (!user) {
      throw new BadRequestException('The user id does not exist');
    }

    return user;
  }

  /**
   * create user
   */
  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * update user
   */
  public updateUser(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  /**
   * Delete user
   */
  public removeUser(id: number) {
    return `User ${id} has been removed`;
  }

  /**
   * Create Many users
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return this.usersCreateManyProvider.createMany(createManyUsersDto);
  }

  /**
   * Find One By Email
   */
  public async FindOneUserByEmail(email: string) {
    return this.findOneUserByEmailProvider.findUserByEmail(email);
  }
}
