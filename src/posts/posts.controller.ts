import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './providers/post.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    /**
     * Injecting posts service
     */
    private readonly postsService: PostService,
  ) {}

  /**
   * Get all posts
   */
  @Get()
  public findAllPosts() {
    return this.postsService.findAll();
  }

  /**
   * Create Post
   */
  @Post()
  @ApiOperation({
    summary: 'Create a post',
    description: 'This endpoint allows you to create a new post',
  })
  @ApiBody({
    type: CreatePostDto,
    description: 'Data required to create a new post',
  })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created',
  })
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  /**
   * Update Post
   */
  @ApiOperation({
    summary: 'Update a post',
    description: "This endpoint allows you to update a post's information",
  })
  @ApiBody({
    type: PatchPostDto,
    description: 'Data required to update a post',
  })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated',
  })
  @Patch(':id')
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return patchPostDto;
  }

  /**
   * Delete Post
   */
  @ApiOperation({
    summary: 'Delete a post',
    description: 'This endpoint allows you to delete a post',
  })
  @ApiParam({
    name: 'id',
    description: 'Post ID',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully deleted',
  })
  @Delete(':id')
  public deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
