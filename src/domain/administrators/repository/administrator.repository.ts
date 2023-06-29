import { Administrator } from '../entity/administrator';

export interface IAdministratorRepository {
  create(administrator: Administrator): Promise<void>;
  findByEmail(email: string): Promise<Administrator>;
}
