import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

import { Stock, StockProps } from '../../entity/stock';

export function MakeStock(override: Partial<StockProps> = {}) {
  const register = Stock.create({
    id: randomUUID(),
    amount: faker.number.int({ max: 100 }),
    amountMin: faker.number.int({ max: 100 }),
    itemType: faker.commerce.productName(),
    ...override,
  });

  return register;
}
