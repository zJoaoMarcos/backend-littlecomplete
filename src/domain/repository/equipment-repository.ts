import { Equipment } from '../entity/equipment';

export interface IEquipmentRepository {
  create(
    id: string,
    brand: string,
    model: string,
    department: string,
    status: string,
    supplier?: string,
    invoice?: string,
    warranty?: string,
    purchase_date?: string,
    cpu?: string,
    ram?: string,
    slots?: number,
    storage0_type?: string,
    storage0_syze?: number,
    storage1_type?: string,
    storage1_syze?: number,
    video?: string,
    service_tag?: string,
  ): Promise<Equipment>;

  findAll(): Promise<Equipment[]>;

  findById(id: string): Promise<Equipment>;

  update(id: string, department: string): Promise<void>;
}
