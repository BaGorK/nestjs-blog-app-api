import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostStatus } from '../enums/postStatus.enum';
import { PostType } from '../enums/postType.enum';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';

export class CreatePostDto {
  @ApiProperty({
    description: 'title of the post',
    example: 'Learn Nest.js',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'slug of the post',
    example: 'learn-nest-js',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" as a separator without space. For example: "this-is-a-slug"',
  })
  @MinLength(4)
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    enumName: 'PostType',
    enum: PostType,
    description: 'type of the post',
    example: 'post',
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    enumName: 'PostStatus',
    enum: PostStatus,
    description: 'status of the post',
    example: 'draft',
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiProperty({
    description: 'content of the post',
    example: 'This is the content of the post',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'excerpt of the post',
    example:
      '{\r\n "@context": "https:\/\/schema.org",\r\n "@type": "Person"\r\n }',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'featured image url of the post',
    example: 'https://example.com',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'publish date of the post',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    type: 'array',
    description: 'tags of the post',
    example: ['nestjs', 'typescript', 'nodejs'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'object',
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description:
            'the meta value is a JSON object that can be used to store any meta information',
          example: '{ "key": "value" }',
        },
      },
    },
    additionalProperties: false, // this will not allow additional properties
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;
}
