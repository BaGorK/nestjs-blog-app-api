import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManyUsersDto {
  @ApiProperty({
    type: 'array',
    isArray: true,
    required: true,
    description: 'The list of users to create',
    items: {
      type: 'User',
    },
    example: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@Doe.com',
        password: 'password',
      },
      {
        firstName: 'Don',
        lastName: 'Doe',
        email: 'don@Doe.com',
        password: 'password',
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
