import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersCreateManyProviderService } from './providers/users-create-many.provider.service';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import profileConfig from './config/profile.config';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyProviderService,
    CreateUserProvider,
    FindOneUserByEmailProvider,
  ],
  exports: [UsersService],
  // when we have a circular dependency, we can use forwardRef to resolve it
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),

    // importing env variables for the users module only
    ConfigModule.forFeature(profileConfig),

    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class UsersModule {}
