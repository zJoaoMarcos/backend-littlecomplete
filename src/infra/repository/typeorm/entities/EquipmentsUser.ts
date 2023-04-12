import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Equipments } from './Equipments';
import { Users } from './Users';

@Index('equipments_user_pkey', ['id'], { unique: true })
@Entity('equipments_user', { schema: 'public' })
export class EquipmentsUser {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => Equipments, (equipments) => equipments.equipmentsUsers)
  @JoinColumn([{ name: 'equipment_id', referencedColumnName: 'id' }])
  equipment: Equipments;

  @ManyToOne(() => Users, (users) => users.equipmentsUsers)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'username' }])
  user: Users;
}
