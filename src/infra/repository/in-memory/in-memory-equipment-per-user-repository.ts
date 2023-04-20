import { Equipment } from '../../../core/entity/equipment';
import { EquipmentPerUser } from '../../../core/entity/equipment-per-user';
import { User } from '../../../core/entity/user';
import { EquipmentPerUserRepositoryInterface } from '../../../core/repository/equipment-per-user-repository';

export class InMemoryEquipmentPerUserRepository
  implements EquipmentPerUserRepositoryInterface
{
  items: EquipmentPerUser[] = [];

  async save(
    id: string,
    user: User,
    equipment: Equipment,
  ): Promise<EquipmentPerUser> {
    const equipmentPerUser = new EquipmentPerUser(user, equipment);

    this.items.push(equipmentPerUser);

    return equipmentPerUser;
  }

  async findAll(): Promise<EquipmentPerUser[]> {
    const equipmentsPerUser = this.items;

    if (!equipmentsPerUser) {
      return null;
    }

    return Promise.resolve(equipmentsPerUser);
  }

  async findByEquipmentId(id: string): Promise<EquipmentPerUser> {
    const equipmentsPerUser = this.items.find(
      (item) => item.equipment.id === id,
    );

    if (!equipmentsPerUser) {
      return null;
    }

    return Promise.resolve(equipmentsPerUser);
  }

  async findByUserName(id: string): Promise<EquipmentPerUser[]> {
    const equipmentsPerUser = this.items.filter(
      (item) => item.user.user_name === id,
    );

    if (!equipmentsPerUser) {
      return null;
    }

    return Promise.resolve(equipmentsPerUser);
  }
}
