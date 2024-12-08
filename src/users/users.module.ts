import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  // when we have a circular dependency, we can use forwardRef to resolve it
  imports: [forwardRef(() => AuthModule)],
})
export class UsersModule {}
