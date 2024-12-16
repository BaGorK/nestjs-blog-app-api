import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';

@Injectable()
export class UsersService {
  constructor(
    /**
     * Inject Auth Service
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * find all
   */
  public findAll(
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
  public findOneById(id: number) {
    return id;
  }

  public create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  public update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  public remove(id: number) {
    return `User ${id} has been removed`;
  }
}
