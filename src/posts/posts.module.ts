import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostService } from './providers/post.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [PostsController],
  providers: [PostService],
  imports: [
    UsersModule,
    TagsModule,
    PaginationModule,
    TypeOrmModule.forFeature([Post, MetaOption]),
  ],
})
export class PostsModule {}
