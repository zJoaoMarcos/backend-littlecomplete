import { PaginationParams } from 'src/core/repositories/pagination-params';
import { User } from 'src/domain/entity/user';
import { Repository } from 'typeorm';
import {
  FindManyOutput,
  IUserRepository,
} from '../../../domain/repository/user-repository';
import { UsersSchema } from './entities/users.schema';

export class TypeOrmUserRepository implements IUserRepository {
  constructor(private ormRepo: Repository<UsersSchema>) {}

  async create(user: User): Promise<void> {
    await this.ormRepo.save({
      username: user.user_name,
      completeName: user.complete_name,
      title: user.title,

      directBoss: {
        username: user.direct_boss,
      },
      telephone: user.telephone,
      smtp: user.smtp,
      admissionDate: user.admission_date,
      demissionDate: user.demission_date,
      status: user.status,
      department: {
        id: user.department_id,
      },
    });

    return;
  }

  async findMany(params: PaginationParams): Promise<FindManyOutput> {
    const { skip, take } = params;

    const [result, totalCount] = await this.ormRepo.findAndCount({
      skip: skip,
      take: take,
      order: {
        username: 'asc',
      },
      relations: {
        department: true,
        directBoss: true,
      },
    });

    console.log(result);

    if (!result) {
      return null;
    }

    const users = result.map((user) => {
      return User.create({
        user_name: user.username,
        complete_name: user.completeName,
        title: user.title,
        telephone: user.telephone,
        department: {
          id: user.department.id,
          name: user.department.name,
        },
        direct_boss: user.directBoss ? user.directBoss.username : null,
        smtp: user.smtp,
        admission_date: user.admissionDate,
        status: user.status,
        demission_date: user.demissionDate,
      });
    });

    return {
      users,
      totalCount,
    };
  }

  async findByUserName(userName: string): Promise<User> {
    const user = await this.ormRepo.findOne({
      where: { username: userName },
      relations: {
        department: true,
      },
    });

    if (!user) {
      return null;
    }

    console.log(user);

    return User.create({
      user_name: user.username,
      complete_name: user.completeName,
      title: user.title,
      telephone: user.telephone,
      department: {
        id: user.department.id,
        name: user.department.name,
      },
      direct_boss: user.directBoss.username,
      smtp: user.smtp,
      admission_date: user.admissionDate,
      status: user.status,
      demission_date: user.demissionDate,
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepo.findOne({
      where: { smtp: email },
      relations: {
        department: true,
      },
    });

    if (!user) {
      return null;
    }

    return User.create({
      user_name: user.username,
      complete_name: user.completeName,
      title: user.title,
      telephone: user.telephone,
      department: {
        id: user.department.id,
        name: user.department.name,
      },
      direct_boss: user.directBoss.username,
      smtp: user.smtp,
      admission_date: user.admissionDate,
      status: user.status,
      demission_date: user.demissionDate,
    });
  }

  async save(user: User): Promise<void> {
    await this.ormRepo.update(
      {
        username: user.user_name,
      },
      {
        completeName: user.complete_name,
        title: user.title,
        telephone: user.telephone,
        department: {
          id: user.department_id,
        },
        directBoss: { username: user.direct_boss },
        smtp: user.smtp,
        status: user.status,
        admissionDate: user.admission_date,
        demissionDate: user.demission_date,
      },
    );
  }
}
