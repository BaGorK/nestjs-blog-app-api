import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/pagination.interface';

@Injectable()
export class PaginationService {
  constructor(
    /**
     * Injecting express request
     */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginationQuery<T>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    relations: string[] = [], // Accept relations as an optional parameter
  ): Promise<Paginated<T>> {
    const results = await repository.find({
      take: paginationQuery.limit,
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      relations,
    });

    // create the request urls
    const baseURL = `${this.request.protocol}://${this.request.headers.host}/`;
    const newUrl = new URL(this.request.url, baseURL);

    // calculating page numbers
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);
    const nextPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : paginationQuery.page + 1;
    const previousPage =
      paginationQuery.page === 1 ? 1 : paginationQuery.page - 1;

    const finalResponse: Paginated<T> = {
      meta: {
        currentPage: paginationQuery.page,
        itemsPerPage: paginationQuery.limit,
        totalItems,
        totalPages,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,
      },
      data: results,
    };

    return finalResponse;
  }
}
