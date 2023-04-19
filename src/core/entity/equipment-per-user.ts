import { Equipment } from './equipment';
import { User } from './user';

export class EquipmentPerUser {
  id: number;
  equipment: Equipment;
  user: User;

  constructor(id: number, equipment: Equipment, user: User) {
    this.id = id;
    this.equipment = equipment;
    this.user = user;
  }
}
