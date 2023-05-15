import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DepartmentsSchema } from './departments.schema';
import { EquipmentsUserSchema } from './equipments-user.schema';

@Index('equipments_pkey', ['id'], { unique: true })
@Entity('equipments', { schema: 'public' })
export class EquipmentsSchema {
  @Column('character', { primary: true, name: 'id', length: 13 })
  id: string;

  @Column('character', { name: 'brand', nullable: true, length: 20 })
  brand: string | null;

  @Column('character', { name: 'model', nullable: true, length: 15 })
  model: string | null;

  @Column('character', { name: 'supplier', nullable: true, length: 50 })
  supplier: string | null;

  @Column('character', { name: 'invoice', nullable: true, length: 50 })
  invoice: string | null;

  @Column('character', { name: 'warranty', nullable: true, length: 10 })
  warranty: string | null;

  @Column('date', { name: 'purchase_date', nullable: true })
  purchaseDate: Date | null;

  @Column('character', { name: 'status', nullable: true, length: 30 })
  status: string | null;

  @Column('character', { name: 'cpu', nullable: true, length: 10 })
  cpu: string | null;

  @Column('character', { name: 'ram', nullable: true, length: 10 })
  ram: string | null;

  @Column('integer', { name: 'slots', nullable: true })
  slots: number | null;

  @Column('character', { name: 'storage0_type', nullable: true, length: 5 })
  storage0Type: string | null;

  @Column('integer', { name: 'storage0_syze', nullable: true })
  storage0Syze: number | null;

  @Column('character', { name: 'storage1_type', nullable: true, length: 5 })
  storage1Type: string | null;

  @Column('integer', { name: 'storage1_syze', nullable: true })
  storage1Syze: number | null;

  @Column('character', { name: 'video', nullable: true, length: 20 })
  video: string | null;

  @Column('character', { name: 'service_tag', nullable: true, length: 50 })
  serviceTag: string | null;

  @ManyToOne(() => DepartmentsSchema, (departments) => departments.equipments)
  @JoinColumn([{ name: 'department_id', referencedColumnName: 'id' }])
  department: DepartmentsSchema;

  @OneToMany(
    () => EquipmentsUserSchema,
    (equipmentsUser) => equipmentsUser.equipment,
  )
  equipmentsUsers: EquipmentsUserSchema[];
}
