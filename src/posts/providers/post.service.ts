import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostService {
  constructor(
    /**
     * Injecting Users Service
     */
    private readonly usersService: UsersService,
  ) {}
  public findAll() {
    return 'get all posts';
  }

  public findOneById(id: number) {
    return this.usersService.findOneById(id);
  }
}
