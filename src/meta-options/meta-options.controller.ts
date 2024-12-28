import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(
    /**
     * Inject the MetaOptionsService
     */
    private readonly metaOptionsService: MetaOptionsService,
  ) {}

  /**
   * create meta options
   */
  @ApiOperation({
    summary: 'Create meta options',
    description: 'This endpoint allows you to create meta options',
  })
  @ApiResponse({
    status: 201,
    description: 'The meta options has been successfully created',
  })
  @Post()
  public async create(
    @Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto,
  ) {
    return this.metaOptionsService.create(createPostMetaOptionsDto);
  }
}
