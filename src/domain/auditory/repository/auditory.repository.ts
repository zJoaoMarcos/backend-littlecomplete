import { Auditory } from '../entity/auditory';

export interface IAuditoryRepository {
  create(auditory: Auditory): Promise<void>;
}
