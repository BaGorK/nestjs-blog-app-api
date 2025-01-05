import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Inject SignIn provider
     */
    private readonly signInProvider: SignInProvider,

    /**
     * Inject Refresh Tokens provider
     */
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  /**
   * Sign In user
   */
  public signIn(signInDto: SignInDto) {
    return this.signInProvider.signIn(signInDto);
  }

  /**
   * Refresh tokens
   */
  public refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }

  public isAuth() {
    return true;
  }
}
