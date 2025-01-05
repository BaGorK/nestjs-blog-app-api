import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GoogleTokenDto {
  @ApiProperty({
    description: 'Google token',
    example: 'google-token',
  })
  @IsString()
  token: string;
}
