import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

import { Stock, StockProps } from '../../entity/stock';

export function MakeStock(override: Partial<StockProps> = {}) {
  const register = Stock.create({
    id: randomUUID(),
    amount: faker.number.int(),
    amountMin: faker.number.int(),
    itemType: faker.commerce.productName(),
    ...override,
  });

  return register;
}
