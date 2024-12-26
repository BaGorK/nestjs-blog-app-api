import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    /**
     * Inject the `TagRepository` provider
     */
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  /**
   * Create a new tag
   */
  public async create(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);

    return await this.tagsRepository.save(tag);
  }

  /**
   * Find all tags
   */
  public async findAll() {
    return await this.tagsRepository.find();
  }

  /**
   * Find Multiple tags by ids
   */
  public async findMultipleByIds(ids: number[]) {
    const tags = await this.tagsRepository.find({
      where: {
        id: In(ids),
      },
    });

    return tags;
  }

  /**
   * Delete a tag
   */
  public async delete(id: number) {
    await this.tagsRepository.delete(id);

    return {
      delete: true,
      id,
    };
  }
}
