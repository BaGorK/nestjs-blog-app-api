import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Injecting Users Service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public login(email: string, password: string, id: number) {
    // check if the user still exists
    const user = this.usersService.findOneById(id);
    // check if the password is correct
    // generate a token

    return { email, password, id, user };
  }

  public isAuth() {
    return true;
  }
}
