import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from '../common/decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { Response } from 'express';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    /**
     * Injecting auth service
     */

    private readonly authService: AuthService,
  ) {}

  /**
   * Sign In
   * @param signInDto
   * @returns
   */
  @ApiOperation({
    summary: 'Sign In',
    description: 'Sign In a user',
  })
  @ApiResponse({
    status: 200,
    description: 'User signed in successfully',
  })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @Auth(AuthType.None)
  public async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const res = await this.authService.signIn(signInDto);
    response.cookie('accessToken', res.accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });

    return res;
  }

  /**
   * refresh tokens
   */
  @ApiOperation({
    summary: 'Refresh Tokens',
    description: 'Refresh tokens',
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  @Auth(AuthType.None)
  public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
