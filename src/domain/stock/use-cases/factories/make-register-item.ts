import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

import { Item, ItemProps } from '../../entity/item';

export function MakeItem(override: Partial<ItemProps> = {}) {
  const register = Item.create({
    id: randomUUID(),
    name: faker.commerce.productName(),
    model: faker.commerce.productDescription(),
    type: faker.commerce.productMaterial(),
    category: faker.commerce.productAdjective(),
    amount: faker.number.int({ max: 100 }),
    brand: faker.commerce.productName(),
    updatedAt: faker.date.recent(),
    createdAt: faker.date.past(),
    createdBy: faker.internet.email(),
    ...override,
  });

  return register;
}
