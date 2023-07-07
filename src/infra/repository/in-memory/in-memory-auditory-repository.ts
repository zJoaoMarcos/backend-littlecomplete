import { Auditory } from '@/domain/auditory/entity/auditory';
import { IAuditoryRepository } from '@/domain/auditory/repository/auditory.repository';

export class InMemoryAuditoryRepository implements IAuditoryRepository {
  items = [];

  async save(auditory: Auditory): Promise<void> {
    this.items.push(auditory);
  }
}
