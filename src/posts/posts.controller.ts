import { Controller, Get } from '@nestjs/common';
import { PostService } from './providers/post.service';

@Controller('posts')
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
  public findAll() {
    return this.postsService.findAll();
  }
}
