import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { User } from 'src/users/user.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class GenerateTokenProvider {
  constructor(
    /**
     * Injecting JwtService
     */
    private readonly jwtService: JwtService,

    /**
     * Injecting jwt Config Service
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Sign token
   */
  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );

    return accessToken;
  }

  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      // generate access token
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: user.email,
        },
      ),

      // generate refresh token
      this.signToken<{ email: string }>(
        user.id,
        this.jwtConfiguration.refreshTokenTtl,
        { email: user.email },
      ),
    ]);
    // return both tokens
    return {
      accessToken,
      refreshToken,
    };
  }
}
