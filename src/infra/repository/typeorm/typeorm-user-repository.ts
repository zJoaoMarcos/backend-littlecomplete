import { User } from 'src/domain/entity/user';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/repository/user-repository';
import { UserSchema } from './entities/user.schema';

export class TypeOrmUserRepository implements IUserRepository {
  constructor(private ormRepo: Repository<UserSchema>) {}
  async create(
    user_name: string,
    complete_name: string,
    title: string,
    department_id: string,
    direct_boss: string,
    smtp: string,
    admission_date: Date,
    status: string,
    telephone?: number,
    demission_date?: Date,
  ): Promise<User> {
    const user = User.create({
      user_name,
      complete_name,
      title,
      telephone,
      department_id,
      direct_boss,
      smtp,
      admission_date,
      status: status,
      demission_date,
    });

    await this.ormRepo.save({
      username: user.user_name,
      completeName: user.complete_name,
      title: user.title,
      departmentId: user.department_id,
      directBoss: user.direct_boss,
      telephone: user.telephone,
      smtp: user.smtp,
      admissionDate: user.admission_date,
      demissionDate: user.demission_date,
      status: user.status,
    });

    return;
  }

  async findAll(): Promise<User[]> {
    const user = await this.ormRepo.find();

    if (!user) {
      return null;
    }

    return user.map((user) => {
      return User.create({
        user_name: user.username,
        complete_name: user.completeName,
        title: user.title,
        telephone: user.telephone,
        department_id: user.departmentId,
        direct_boss: user.directBoss,
        smtp: user.smtp,
        admission_date: user.admissionDate,
        status: user.status,
        demission_date: user.demissionDate,
      });
    });
  }

  async findByUserName(userName: string): Promise<User> {
    const user = await this.ormRepo.findOneBy({ username: userName });

    if (!user) {
      return null;
    }

    return User.create({
      user_name: user.username,
      complete_name: user.completeName,
      title: user.title,
      telephone: user.telephone,
      department_id: user.departmentId,
      direct_boss: user.directBoss,
      smtp: user.smtp,
      admission_date: user.admissionDate,
      status: user.status,
      demission_date: user.demissionDate,
    });
  }

  async updateUserDepartment(
    userName: string,
    department: string,
  ): Promise<User> {
    await this.ormRepo.update(
      {
        username: userName,
      },
      {
        departmentId: department,
      },
    );

    const user = await this.ormRepo.findOneBy({ username: userName });

    return User.create({
      user_name: user.username,
      complete_name: user.completeName,
      title: user.title,
      telephone: user.telephone,
      department_id: user.departmentId,
      direct_boss: user.directBoss,
      smtp: user.smtp,
      admission_date: user.admissionDate,
      status: user.status,
      demission_date: user.demissionDate,
    });
  }

  async updateUserTitle(userName: string, title: string): Promise<User> {
    await this.ormRepo.update(
      {
        username: userName,
      },
      {
        title: title,
      },
    );

    const user = await this.ormRepo.findOneBy({ username: userName });

    return User.create({
      user_name: user.username,
      complete_name: user.completeName,
      title: user.title,
      telephone: user.telephone,
      department_id: user.departmentId,
      direct_boss: user.directBoss,
      smtp: user.smtp,
      admission_date: user.admissionDate,
      status: user.status,
      demission_date: user.demissionDate,
    });
  }

  async updateUserStatus(userName: string, status: string): Promise<User> {
    await this.ormRepo.update(
      {
        username: userName,
      },
      {
        status: status,
      },
    );

    const user = await this.ormRepo.findOneBy({ username: userName });

    return User.create({
      user_name: user.username,
      complete_name: user.completeName,
      title: user.title,
      telephone: user.telephone,
      department_id: user.departmentId,
      direct_boss: user.directBoss,
      smtp: user.smtp,
      admission_date: user.admissionDate,
      status: user.status,
      demission_date: user.demissionDate,
    });
  }

  async assignTelephone(userName: string, telephone: number): Promise<User> {
    await this.ormRepo.update(
      {
        username: userName,
      },
      {
        telephone,
      },
    );

    const user = await this.ormRepo.findOneBy({ username: userName });

    return User.create({
      user_name: user.username,
      complete_name: user.completeName,
      title: user.title,
      telephone: user.telephone,
      department_id: user.departmentId,
      direct_boss: user.directBoss,
      smtp: user.smtp,
      admission_date: user.admissionDate,
      status: user.status,
      demission_date: user.demissionDate,
    });
  }
}
