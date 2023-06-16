import { faker } from '@faker-js/faker';

import { User, UserProps } from '../../entity/user';

export function makeCreateUser(override: Partial<UserProps> = {}) {
  const user = User.create({
    user_name: faker.internet.userName(),
    complete_name: faker.person.fullName(),
    title: faker.person.jobTitle(),
    department: {
      id: faker.number.int({ max: 100 }),
      name: faker.commerce.department(),
    },
    telephone: faker.number.int({ min: 3000, max: 3800 }),
    direct_boss: faker.person.fullName(),
    smtp: faker.internet.email(),
    admission_date: faker.date.past({ years: 5 }),
    demission_date: faker.date.recent(),
    status: faker.word.adjective(),
    ...override,
  });

  return user;
}
