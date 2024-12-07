import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  public getUsers() {
    return 'all users';
  }

  @Post()
  public createUser(@Body() body) {
    return body;
  }

  @Get(':id')
  public getUser() {
    return 'user by id';
  }

  @Put(':id')
  public updateUser() {
    return 'update user';
  }

  @Delete(':id')
  public deleteUser() {
    return 'delete user';
  }
}
