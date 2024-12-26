import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @ApiPropertyOptional({
    type: 'string',
    required: false,
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'The email of the user',
    example: 'john@doe.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(96)
  email: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'The password of the user',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(96)
  password: string;
}
