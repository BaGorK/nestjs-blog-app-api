import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

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

  /**
   * Find all tags
   */
  @ApiOperation({
    summary: 'Find all tags',
    description: 'This endpoint allows you to find all tags',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all tags',
  })
  @Get()
  public findAll() {
    return this.tagsService.findAll();
  }

  /**
   * Delete a tag
   */
  @ApiOperation({
    summary: 'Delete a tag',
    description: 'This endpoint allows you to delete a tag',
  })
  @ApiResponse({
    status: 200,
    description: 'The tag has been successfully deleted',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Tag identifier',
  })
  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }
}
