import { Column, Entity, Index } from 'typeorm';

@Index('departments_pkey', ['name'], { unique: true })
@Entity('departments', { schema: 'public' })
export class DepartmentSchema {
  @Column('character', { primary: true, name: 'name', length: 50 })
  name: string;

  @Column('integer', { name: 'cost_center', nullable: true })
  costCenter: number | null;

  @Column('boolean', { name: 'is_board', nullable: true })
  isBoard: boolean | null;

  @Column('character', { name: 'board', nullable: true, length: 50 })
  board: string | null;
}
