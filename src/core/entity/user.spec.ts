import { User } from './user';

describe('User', () => {
  it('should be create User', () => {
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

    expect(user.user_name).toEqual('jhon.doe');
    expect(user.demission_date).toEqual(null);
    expect(user.status).toEqual('active');
    expect(user.telephone).toEqual(3004);
  });

  it('should be assign telephone an User', () => {
    const user = new User(
      'jhon.doe',
      'Jhon Doe',
      'CTO',
      'TI',
      null,
      'Martin Fowler',
      'jhon.doe@email.com',
      '18/02/2000',
      null,
      'active',
    );
    user.assignTelephone(3004);
    expect(user.telephone).toBe(3004);
  });

  it('should be update User title', () => {
    const user = new User(
      'jhon.doe',
      'Jhon Doe',
      'CTO',
      'TI',
      null,
      'Martin Fowler',
      'jhon.doe@email.com',
      '18/02/2000',
      null,
      'active',
    );
    user.changeTitle('Developer');
    expect(user.title).toBe('Developer');
  });

  it('should be update User department', () => {
    const user = new User(
      'jhon.doe',
      'Jhon Doe',
      'CTO',
      'TI',
      null,
      'Martin Fowler',
      'jhon.doe@email.com',
      '18/02/2000',
      null,
      'active',
    );
    user.changeDepartment('BI');
    expect(user.department_id).toBe('BI');
  });
});
