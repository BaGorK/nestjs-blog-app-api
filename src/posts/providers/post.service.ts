import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    /**
     * Injecting Users Service
     */
    private readonly usersService: UsersService,

    /**
     * Injecting Posts Repository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  /**
   * create new post
   */
  public async create(createPostDto: CreatePostDto) {
    const post = this.postsRepository.create(createPostDto);

    return await this.postsRepository.save(post);
  }

  /**
   * Get all posts
   */
  public findAll() {
    return 'get all posts';
  }

  /**
   * Get post by id
   */
  public findOneById(id: number) {
    return this.usersService.findOneById(id);
  }
}
