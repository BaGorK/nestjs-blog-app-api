export interface ActiveUserData {
  sub: number; // id of the user inside the database
  email: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
