import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AdministratorSchema } from './administrator.schema';

@Index('auditory_pkey', ['id'], { unique: true })
@Entity('auditory', { schema: 'public' })
export class AuditorySchema {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'module', length: 50 })
  module: string;

  @Column('character varying', { name: 'form', length: 100 })
  form: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @Column('character varying', { name: 'type', length: 200 })
  type: string;

  @ManyToOne(
    () => AdministratorSchema,
    (administrator) => administrator.auditories,
  )
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'email' }])
  createdBy: AdministratorSchema;
}
