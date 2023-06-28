import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { Equipment, EquipmentProps } from '../../entity/equipment';

export function makeCreateEquipment(override: Partial<EquipmentProps> = {}) {
  const equipment = Equipment.create({
    id: randomUUID(),
    brand: faker.commerce.productName(),
    status: faker.word.adjective(),
    department: {
      id: faker.number.int(),
      name: faker.commerce.department(),
    },
    serviceTag: faker.string.nanoid(),
    currentUser: faker.internet.userName(),
    patrimony: faker.company.name(),
    type: faker.word.adjective(),
    model: faker.commerce.product(),
    purchase: {
      invoice: faker.string.nanoid(),
      purchaseDate: faker.date.recent(),
      supplier: faker.commerce.department(),
      warranty: faker.string.numeric(),
    },
    config: {
      cpu: `iCore ${faker.number.int({ max: 12 })}`,
      ram: `${faker.number.int({ max: 32 })} GB`,
      video: faker.word.adjective(),
      storage: {
        slots: faker.number.int({ max: 2 }),
        storage0Syze: faker.number.int({ max: 1000 }),
        storage0Type: faker.word.adjective(),
        storage1Syze: faker.number.int({ max: 1000 }),
        storage1Type: faker.word.adjective(),
      },
    },

    ...override,
  });

  return equipment;
}
