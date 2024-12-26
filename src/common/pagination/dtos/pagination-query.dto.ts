import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    type: 'number',
    required: false,
    description: 'The amount of items to retrieve',
    example: 20,
  })
  @IsOptional()
  @IsPositive()
  limit?: number;

  @ApiPropertyOptional({
    type: 'number',
    required: false,
    description: 'The page number',
    example: 1,
  })
  @IsOptional()
  @IsPositive()
  page?: number;
}
