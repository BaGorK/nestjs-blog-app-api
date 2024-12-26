import { Body, Controller, Post } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
  constructor(
    /**
     * Inject the `TagsService` provider
     */
    private readonly tagsService: TagsService,
  ) {}

  /**
   * Create a new tag
   */
  @ApiOperation({
    summary: 'Create a tag',
    description: 'This endpoint allows you to create a new tag',
  })
  @ApiBody({
    type: CreateTagDto,
    description: 'Data required to create a new tag',
  })
  @ApiResponse({
    status: 201,
    description: 'The tag has been successfully created',
  })
  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }
}
