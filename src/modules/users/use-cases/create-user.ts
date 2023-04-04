import { Injectable } from '@nestjs/common/decorators';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';
import { UserAlreadyExistsError } from './error/user-already-exists-error';

interface CreateUserUseCaseResponse {
  user: User;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    user_name,
    complete_name,
    title,
    department_id,
    direct_boss,
    smtp,
    telephone,
    admission_date,
    demission_date,
    status,
  }: CreateUserDto): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findById(user_name);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const user = new User({
      user_name,
      complete_name,
      title,
      department_id,
      direct_boss,
      smtp,
      telephone,
      admission_date,
      demission_date,
      status,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
