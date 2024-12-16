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
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUsersParamDto } from './dtos/get-users-param.dto';

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
  @ApiResponse({
    status: 200,
    description: 'The list of users has been successfully returned',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description: 'The position of the page number that the API should return',
    example: 1,
  })
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get(':id')
  // public getUser() {
  //   return this.usersService.findOneById(getUsersParamDto.id);
  // }

  @Patch(':id')
  public updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  public deleteUser() {
    return 'delete user';
  }
}
