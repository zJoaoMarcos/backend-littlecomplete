import { Auditory } from '../entity/auditory';

export interface IAuditoryRepository {
  save(auditory: Auditory): Promise<void>;
}
