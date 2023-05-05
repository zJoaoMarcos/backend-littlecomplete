import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('departments_id_key', ['id'], { unique: true })
@Index('departments_pkey', ['id'], { unique: true })
@Entity('departments', { schema: 'public' })
export class DepartmentSchema {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character', {
    name: 'department',
    nullable: true,
    unique: true,
    length: 50,
  })
  name: string | null;

  @Column('integer', { name: 'cost_center', nullable: true })
  costCenter: number | null;

  @Column('boolean', { name: 'is_board', nullable: true })
  isBoard: boolean | null;

  @Column('character', { name: 'board', nullable: true, length: 50 })
  board: string | null;

  @Column('character', { name: 'responsible_id', nullable: true, length: 50 })
  responsibleId: string | null;
}
