import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

import { Item, ItemProps } from '../../entity/item';

export function MakeItem(override: Partial<ItemProps> = {}) {
  const register = Item.create({
    id: randomUUID(),
    name: faker.word.words(1),
    category: faker.word.words(1),
    description: faker.lorem.sentence(),
    amountMin: faker.number.int(),
    amount: 0,
    createdAt: faker.date.past(),
    updateAt: faker.date.recent(),
    ...override,
  });

  return register;
}
