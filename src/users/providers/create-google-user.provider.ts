import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { GoogleUser } from '../interfaces/google-user.interface';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    /**
     * Inject users repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async createGoogleUser(googleUser: GoogleUser) {
    try {
      const user = this.usersRepository.create(googleUser);

      return await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Could Not Create A New User',
      });
    }
  }
}
