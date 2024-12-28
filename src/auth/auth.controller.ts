import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

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
  public async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
