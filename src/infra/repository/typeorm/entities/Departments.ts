import { Column, Entity, Index } from 'typeorm';

@Index('departments_pkey', ['department'], { unique: true })
@Entity('departments', { schema: 'public' })
export class Departments {
  @Column('character', { primary: true, name: 'department', length: 50 })
  department: string;

  @Column('integer', { name: 'cost_center', nullable: true })
  costCenter: number | null;

  @Column('boolean', { name: 'is_board', nullable: true })
  isBoard: boolean | null;

  @Column('character', { name: 'board', nullable: true, length: 50 })
  board: string | null;
}
