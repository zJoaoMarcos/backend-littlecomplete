import { faker } from '@faker-js/faker';
import { Administrator, AdministratorProps } from '../../entity/administrator';

export function MakeRegisterAdministrator(
  override: Partial<AdministratorProps> = {},
) {
  const register = Administrator.create({
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.displayName(),
    displayName: faker.internet.displayName(),
    password: faker.string.uuid(),
    ...override,
  });

  return register;
}
