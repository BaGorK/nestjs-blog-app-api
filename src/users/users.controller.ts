import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  DefaultValuePipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { CustomParseIntPipe } from 'src/common/pipes/parse-init/custom-parse-int.pipe';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * get all users
   */
  @Get(':id?')
  @ApiOperation({
    summary: 'Get all users',
    description: 'This endpoint returns all users',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    description: 'The number of entries returned per query',
    example: 20,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description: 'The position of the page number that the API should return',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The list of users has been successfully returned',
  })
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAllUsers(getUsersParamDto, limit, page);
  }

  /**
   * create a user
   */
  @ApiOperation({
    summary: 'Create a user',
    description: 'This endpoint creates a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'The user data to be created',
  })
  @Post()
  // @SetMetadata(AUTH_TYPE_KEY, AuthType.None)
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Create Many Users
   */
  @ApiOperation({
    summary: 'Create many users',
    description: 'This endpoint creates many users',
  })
  @ApiResponse({
    status: 201,
    description: 'The users have been successfully created',
  })
  @ApiBody({
    type: CreateManyUsersDto,
    description: 'The list of users to be created',
  })
  @Post('create-many')
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.usersService.createMany(createManyUsersDto);
  }

  // @Get(':id')
  // public getUser() {
  //   return this.usersService.findOneById(getUsersParamDto.id);
  // }

  /**
   * update a user by id
   */
  @ApiOperation({
    summary: 'Get a user by id',
    description: 'This endpoint returns a user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully returned',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The user id',
  })
  @Patch(':id')
  public updateUser(
    @Param('id', CustomParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  /**
   * Delete User By Id
   */
  @ApiOperation({
    summary: 'Delete a user by id',
    description: 'This endpoint deletes a user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The user id',
  })
  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.removeUser(id);
  }
}
