import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostService } from './providers/post.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostsController],
  providers: [PostService],
  imports: [UsersModule],
})
export class PostsModule {}
