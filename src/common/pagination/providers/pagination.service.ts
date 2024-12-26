import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PaginationService {
  public async paginationQuery<T>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    return await repository.find({
      take: paginationQuery.limit,
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
    });
  }
}
