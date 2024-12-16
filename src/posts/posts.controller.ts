import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './providers/post.service';
import { ApiTags } from '@nestjs/swagger';
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
  public createPost(@Body() createPostDto: CreatePostDto) {
    return createPostDto;
  }
}
