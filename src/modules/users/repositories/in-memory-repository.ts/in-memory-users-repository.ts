import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user';
import { UsersRepository } from '../users-repository';

interface IUsersRepository {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: string;
  telephone?: number;
  direct_boss: string;
  smtp: string;
  admission_date?: Date;
  demission_date?: Date;
  status: string;
}

@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
  public items: IUsersRepository[] = [];

  create(data: User) {
    const user = {
      user_name: data.user_name,
      complete_name: data.complete_name,
      title: data.title,
      department_id: data.department_id,
      telephone: data.telephone,
      direct_boss: data.direct_boss,
      smtp: data.smtp,
      admission_date: data.admission_date,
      demission_date: data.demission_date,
      status: data.status,
    };

    this.items.push(user);

    return {
      user,
    };
  }

  findById(user_name: string) {
    const user = this.items.find((user) => user.user_name === user_name);

    if (!user) {
      return null;
    }

    return {
      user,
    };
  }
}
