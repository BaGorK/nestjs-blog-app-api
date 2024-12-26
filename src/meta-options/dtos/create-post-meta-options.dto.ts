import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'The meta key',
    example: '{"key": "value"}',
  })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
