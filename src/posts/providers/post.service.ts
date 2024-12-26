import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostService {
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

  /**
   * create new post
   */
  public async create(createPostDto: CreatePostDto) {
    // Find author from the users table
    const author = await this.usersService.findOneById(createPostDto.authorId);

    // Find Tags from the tags table
    const tags = await this.tagsService.findMultipleByIds(createPostDto.tags);

    // Create new post and Assign author to the post
    const post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    // Save post
    return await this.postsRepository.save(post);
  }

  /**
   * Get all posts
   */
  public async findAll() {
    return await this.postsRepository.find({
      relations: {
        metaOptions: true,
        author: true,
        tags: true,
      },
    });
  }

  /**
   * Get post by id
   */
  public findOneById(id: number) {
    return this.usersService.findOneById(id);
  }

  /**
   * Delete Post by id
   */
  public async delete(id: number) {
    // NOTE:  ON DELETING A POST, ALL RELATED META OPTIONS WILL BE DELETED
    await this.postsRepository.delete(id);
    return { status: 'success', message: 'Post deleted successfully' };
  }

  /**
   * Update Post by id
   */
  public async update(patchPostDto: PatchPostDto) {
    let tags = undefined;
    let post = undefined;
    // find tags
    try {
      tags = await this.tagsService.findMultipleByIds(patchPostDto.tags);
    } catch (error) {
      console.log('error update on post service', error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
      );
    }
    /**
     * number of need to be equal to the number of tag ids
     */
    if (!tags || !tags.length || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException(
        'Please check your tag Ids and ensure they are correct',
      );
    }
    // find the post by id
    try {
      post = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (error) {
      console.log('error update on post service', error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
      );
    }

    if (!post) {
      throw new BadRequestException('The post with the post id does not exist');
    }

    // update the post
    post.title = patchPostDto.title ?? post.title;
    post.slug = patchPostDto.slug ?? post.slug;
    post.postType = patchPostDto.postType ?? post.postType;
    post.status = patchPostDto.status ?? post.status;
    post.content = patchPostDto.content ?? post.content;
    post.schema = patchPostDto.schema ?? post.schema;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // assign the new tags
    post.tags = tags;

    // save and return the updated post
    try {
      post = await this.postsRepository.save(post);
    } catch (error) {
      console.log('error update on post service', error);
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
      );
    }

    return post;
  }
}
