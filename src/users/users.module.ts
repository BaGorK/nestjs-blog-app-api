import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import profileConfig from './config/profile.config';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  // when we have a circular dependency, we can use forwardRef to resolve it
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),

    // importing env variables for the users module only
    ConfigModule.forFeature(profileConfig),
  ],
})
export class UsersModule {}
