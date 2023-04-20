import { Equipment } from './equipment';
import { EquipmentPerUser } from './equipment-per-user';
import { User } from './user';

describe('Equipment Per User', () => {
  it('Should register a Equipment Per User', () => {
    const user = new User(
      'jhon.doe',
      'Jhon Doe',
      'CTO',
      'TI',
      3004,
      'Martin Fowler',
      'jhon.doe@email.com',
      '18/02/2000',
      null,
      'active',
    );

    const equipment = new Equipment(
      '01-005-00434',
      'Dell',
      'T31P',
      'TI',
      'activate',
      '16GB',
      2,
      240,
      'SSD',
    );

    const equipmentPerUser = new EquipmentPerUser(user, equipment);
    expect(equipmentPerUser.equipment).toEqual(equipment);
    expect(equipmentPerUser.user).toEqual(user);
  });

  it('can change the associated user', () => {
    const user = new User(
      'jhon.doe',
      'Jhon Doe',
      'CTO',
      'TI',
      3004,
      'Martin Fowler',
      'jhon.doe@email.com',
      '18/02/2000',
      null,
      'vacation',
    );

    const equipment = new Equipment(
      '01-005-00434',
      'Dell',
      'T31P',
      'TI',
      'activate',
      '16GB',
      2,
      240,
      'SSD',
    );
    const equipmentPerUser = new EquipmentPerUser(user, equipment);
    const newUser = new User(
      'jane.doe',
      'Jane Doe',
      'Developer',
      'TI',
      3002,
      'Martin Fowler',
      'jane.doe@email.com',
      '23/06/2000',
      null,
      'active',
    );
    equipmentPerUser.changeUser(newUser);
    expect(equipmentPerUser.getUser()).toEqual(newUser);
  });
});
