import { Administrator } from '@/domain/administrators/entity/administrator';
import { IAdministratorRepository } from '@/domain/administrators/repository/administrator.repository';
import { Repository } from 'typeorm';
import { AdministratorSchema } from './entities/administrator.schema';

export class TypeOrmAdministratorRepository
  implements IAdministratorRepository
{
  constructor(private ormRepo: Repository<AdministratorSchema>) {}

  async create(administrator: Administrator): Promise<void> {
    await this.ormRepo.save({
      username: administrator.username,
      email: administrator.email,
      displayName: administrator.displayName,
      password: administrator.password,
    });
  }

  async findByEmail(email: string): Promise<Administrator> {
    const administrator = await this.ormRepo.findOneBy({ email });

    if (!administrator) {
      return null;
    }

    return Administrator.create({
      email: administrator.email,
      displayName: administrator.displayName,
      username: administrator.username,
      password: administrator.password,
    });
  }
}
