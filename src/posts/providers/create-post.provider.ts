import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { Post } from '../post.entity';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    /**
     * Injecting Posts Repository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    /**
     * Injecting Users Service
     */
    private readonly usersService: UsersService,

    /**
     * Injecting Tags Service
     */
    private readonly tagsService: TagsService,
  ) {}

  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    let author = undefined;
    let tags = undefined;
    let post = undefined;

    // Find author from the users table
    try {
      author = await this.usersService.findOneById(user.sub);

      // Find Tags from the tags table
      tags = await this.tagsService.findMultipleByIds(createPostDto.tags);
    } catch (error) {
      throw new ConflictException(error);
    }

    if (tags.length !== createPostDto.tags.length) {
      throw new BadRequestException('Please check your tag ids');
    }

    // Create new post and Assign author to the post
    post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    try {
      // Save post
      await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Ensure post slug is unique and not a duplicate',
      });
    }
  }
}
