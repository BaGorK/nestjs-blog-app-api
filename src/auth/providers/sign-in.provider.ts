import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Injecting Users Service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject hashing provider
     */
    private readonly hashingProvider: HashingProvider,
  ) {}

  /**
   * Sign In user
   */
  public async signIn(signInDto: SignInDto) {
    // check if the user still exists
    const user = await this.usersService.FindOneUserByEmail(signInDto.email);
    // check if the password is correct
    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description:
          'Could not compare passwords, Unable to process your request at the moment please try later',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return true;
  }
}
