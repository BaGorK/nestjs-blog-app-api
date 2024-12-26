import { Module } from '@nestjs/common';
import { PaginationService } from './providers/pagination.service';

@Module({
  providers: [PaginationService],
  exports: [PaginationService],
})
export class PaginationModule {}
