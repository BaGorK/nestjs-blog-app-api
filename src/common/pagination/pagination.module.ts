import { Module } from '@nestjs/common';
import { PaginationService } from './providers/pagination.service';

@Module({
  providers: [PaginationService],
})
export class PaginationModule {}
