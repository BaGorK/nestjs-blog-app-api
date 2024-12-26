import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProviderService {
  constructor(
    /**
     * Inject Data Source
     */
    private readonly dataSource: DataSource,
  ) {}
  /**
   * Create Many users
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];
    // create a query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // connect query runner to database
      await queryRunner.connect();
      // start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      console.log('create many users service', error);
      throw new RequestTimeoutException('Could not connect to the database');
    }

    try {
      console.log(createManyUsersDto);
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      // if successful commit to the database
      await queryRunner.commitTransaction();
    } catch (error) {
      // if error rollback the transaction
      console.log('create many users service', error);
      await queryRunner.rollbackTransaction();

      // throw a conflict exception
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      try {
        // finally release the query runner
        await queryRunner.release();
      } catch (error) {
        console.log('create many users service', error);
        throw new RequestTimeoutException(
          'Could not release the query runner',
          {
            description: String(error),
          },
        );
      }
    }

    return newUsers;
  }
}
