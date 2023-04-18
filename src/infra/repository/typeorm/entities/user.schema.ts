import { Column, Entity, Index, OneToMany } from 'typeorm';
import { EquipmentUserSchema } from './equipments-user.schema';

@Index('users_smtp_key', ['smtp'], { unique: true })
@Index('users_pkey', ['username'], { unique: true })
@Entity('users', { schema: 'public' })
export class UserSchema {
  @Column('character', { primary: true, name: 'username', length: 50 })
  username: string;

  @Column('character', { name: 'complete_name', nullable: true, length: 100 })
  completeName: string | null;

  @Column('character', { name: 'title', nullable: true, length: 50 })
  title: string | null;

  @Column('character', { name: 'department_id', nullable: true, length: 50 })
  departmentId: string | null;

  @Column('integer', { name: 'telephone', nullable: true })
  telephone: number | null;

  @Column('character', { name: 'direct_boss', nullable: true, length: 50 })
  directBoss: string | null;

  @Column('character', {
    name: 'smtp',
    nullable: true,
    unique: true,
    length: 50,
  })
  smtp: string | null;

  @Column('date', { name: 'admission_date', nullable: true })
  admissionDate: string | null;

  @Column('date', { name: 'demission_date', nullable: true })
  demissionDate: string | null;

  @Column('character', { name: 'status', nullable: true, length: 50 })
  status: string | null;

  @OneToMany(() => EquipmentUserSchema, (equipmentsUser) => equipmentsUser.user)
  equipmentsUsers: EquipmentUserSchema[];
}
