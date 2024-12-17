import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './providers/post.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';

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
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log('createPostDto', createPostDto);
    return createPostDto;
  }
}
