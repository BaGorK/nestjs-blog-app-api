import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

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
  ) {}

  /**
   * find all
   */
  public findAllUsers(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
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
    return await this.usersRepository.findOneBy({ id });
  }

  /**
   * create user
   */
  public async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (user) {
      // HANDLE EXCEPTION
      console.log('user already exists');
    }

    const newUser = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(newUser);
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
}
