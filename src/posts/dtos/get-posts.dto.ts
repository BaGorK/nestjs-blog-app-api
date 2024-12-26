import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetPostsBaseDto {
  @ApiPropertyOptional({
    type: 'string',
    required: false,
  })
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({
    type: 'string',
    required: false,
  })
  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetPostsDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationQueryDto,
) {}
