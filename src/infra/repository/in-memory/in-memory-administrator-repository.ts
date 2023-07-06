import { Administrator } from '@/domain/administrators/entity/administrator';
import { IAdministratorRepository } from '@/domain/administrators/repository/administrator.repository';

export class InMemoryAdministratorRepository
  implements IAdministratorRepository
{
  items: Administrator[] = [];

  async create(administrator: Administrator): Promise<void> {
    this.items.push(administrator);
  }

  async findByEmail(email: string): Promise<Administrator> {
    const administrator = this.items.find(
      (administrator) => administrator.email === email,
    );

    if (!administrator) {
      return null;
    }

    return administrator;
  }

  async save(administrator: Administrator): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.email === administrator.email,
    );

    this.items[itemIndex] = administrator;
  }
}
