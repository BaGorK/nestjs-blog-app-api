import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  /**
   * Hash Password
   */
  abstract hashPassword(data: string | Buffer): Promise<string>;

  /**
   * Compare Password
   * @param data
   * @param encrypted
   */
  abstract comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
}
