import { registerAs } from '@nestjs/config';

// NOTE: THIS IS FOR LARGE SCALE APPLICATIONS
// this particular file is a configuration file for the users module
// not a global configuration file
export default registerAs('profileConfig', () => ({
  apiKey: process.env.PROFILE_API_KEY,
}));
