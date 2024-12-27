import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.SECRET,
  audience: process.env.TOKEN_AUDIENCE,
  issuer: process.env.TOKEN_ISSUER,
  accessTokenTtl: parseInt(process.env.ACCESS_TOKEN_TTL ?? '3600', 10),
}));
