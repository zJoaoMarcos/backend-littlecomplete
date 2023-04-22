import { randomUUID } from 'node:crypto';
import { Equipment } from './equipment';
import { User } from './user';

export class EquipmentPerUser {
  id: string;
  user: User;
  equipment: Equipment;

  constructor(user: User, equipment: Equipment) {
    this.id = randomUUID();
    this.user = user;
    this.equipment = equipment;
  }

  changeUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
}
