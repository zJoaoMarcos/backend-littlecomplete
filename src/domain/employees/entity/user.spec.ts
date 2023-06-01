import { User } from './user';

describe('User', () => {
  it('should be create User', () => {
    const user = User.create({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'CTO',
      department: { id: 2425, name: 'IT' },
      telephone: 3004,
      direct_boss: 'Martin Fowler',
      smtp: 'jhon.doe@email.com',
      admission_date: new Date(),
      demission_date: null,
      status: 'active',
    });

    expect(user.user_name).toEqual('jhon.doe');
    expect(user.demission_date).toEqual(null);
    expect(user.status).toEqual('active');
    expect(user.telephone).toEqual(3004);
  });

  it('should be assign telephone an User', () => {
    const user = User.create({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'CTO',
      department: { id: 42342, name: 'IT' },
      telephone: 3004,
      direct_boss: 'Martin Fowler',
      smtp: 'jhon.doe@email.com',
      admission_date: new Date(),
      demission_date: null,
      status: 'active',
    });

    user.telephone = 3004;

    expect(user.telephone).toBe(3004);
  });

  it('should be update User title', () => {
    const user = User.create({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'CTO',
      department: { id: 42342, name: 'IT' },
      telephone: 3004,
      direct_boss: 'Martin Fowler',
      smtp: 'jhon.doe@email.com',
      admission_date: new Date(),
      demission_date: null,
      status: 'active',
    });

    user.title = 'Developer';

    expect(user.title).toBe('Developer');
  });

  it('should be update User department', () => {
    const user = User.create({
      user_name: 'jhon.doe',
      complete_name: 'Jhon Doe',
      title: 'CTO',
      department: { id: 42342, name: 'IT' },
      telephone: 3004,
      direct_boss: 'Martin Fowler',
      smtp: 'jhon.doe@email.com',
      admission_date: new Date(),
      demission_date: null,
      status: 'active',
    });

    user.department_id = 242424;

    expect(user.department_id).toBe(242424);
  });
});
