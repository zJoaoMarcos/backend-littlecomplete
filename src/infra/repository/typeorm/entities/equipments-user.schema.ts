import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EquipmentSchema } from './equipments-schema';
import { UserSchema } from './user.schema';

@Index('equipments_user_pkey', ['id'], { unique: true })
@Entity('equipments_user', { schema: 'public' })
export class EquipmentUserSchema {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => EquipmentSchema, (equipments) => equipments.equipmentsUsers)
  @JoinColumn([{ name: 'equipment_id', referencedColumnName: 'id' }])
  equipment: EquipmentSchema;

  @ManyToOne(() => UserSchema, (users) => users.equipmentsUsers)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'username' }])
  user: UserSchema;
}
