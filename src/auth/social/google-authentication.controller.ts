import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from './providers/google-authentication.service';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthType } from '../enums/auth-type.enum';
import { Auth } from '../../common/decorators/auth.decorator';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
@ApiTags('Google Authentication')
export class GoogleAuthenticationController {
  constructor(
    /**
     * Inject google authentication service
     */
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  /**
   * Method to authenticate user using google token
   */
  @ApiOperation({
    summary: 'Authenticate user using google token',
  })
  @Post()
  public authenticate(@Body() googleTokenDto: GoogleTokenDto) {
    return this.googleAuthenticationService.authentication(googleTokenDto);
  }
}
