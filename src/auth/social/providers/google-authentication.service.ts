import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    /**
     * Inject UsersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    /**
     * Inject generate tokens provider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  /**
   * Method to initialize the module
   */
  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;

    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authentication(googleTokenDto: GoogleTokenDto) {
    try {
      // verify the google token sent by user
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      // extract the payload from google jwt
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();
      // check if the user exists in the database by using googleId
      const user = await this.usersService.findOneByGoogleId(googleId);
      // if googleId exists, generate a new token
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      }
      // if not create a new user and then generate tokens
      const newUser = await this.usersService.createGoogleUser({
        email,
        firstName,
        lastName,
        googleId,
      });

      return this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      // throw UnAuthorizedException
      throw new UnauthorizedException(error);
    }
  }
}
