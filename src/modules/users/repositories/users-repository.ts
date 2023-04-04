import { User } from '../entities/user';

export abstract class UsersRepository {
  abstract create(user: User);
  abstract findById(user_name: string);
}
