import { Auditory } from '@/domain/auditory/entity/auditory';
import { IAuditoryRepository } from '@/domain/auditory/repository/auditory.repository';
import { Repository } from 'typeorm';
import { AuditorySchema } from './entities/auditory.schema';

export class TypeOrmAuditoryRepository implements IAuditoryRepository {
  constructor(private ormRepo: Repository<AuditorySchema>) {}

  async save(auditory: Auditory): Promise<void> {
    await this.ormRepo.save({
      id: auditory.id,
      form: auditory.form,
      type: auditory.type,
      module: auditory.module,
      description: auditory.description,
      createdAt: auditory.createdAt,
      createdBy: {
        email: auditory.createdBy,
      },
    });
  }
}
