import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EquipmentsSchema } from './equipments.schema';
import { UsersSchema } from './users.schema';

@Index('equipments_user_pkey', ['id'], { unique: true })
@Entity('equipments_user', { schema: 'public' })
export class EquipmentsUserSchema {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => EquipmentsSchema, (equipments) => equipments.equipmentsUsers)
  @JoinColumn([{ name: 'equipment_id', referencedColumnName: 'id' }])
  equipment: EquipmentsSchema;

  @ManyToOne(() => UsersSchema, (users) => users.equipmentsUsers)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'username' }])
  user: UsersSchema;
}
