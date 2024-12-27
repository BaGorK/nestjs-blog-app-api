import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import bcrypt from 'bcryptjs';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(data.toString(), salt);
    return hashedPass;
  }
  public async comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    const isCorrect = await bcrypt.compare(data.toString(), encrypted);
    return isCorrect;
  }
}
