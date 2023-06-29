import { Column, Entity, Index } from 'typeorm';

@Index('administrator_email_key', ['email'], { unique: true })
@Index('administrator_pkey', ['id'], { unique: true })
@Entity('administrator', { schema: 'public' })
export class AdministratorSchema {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'email', unique: true, length: 100 })
  email: string;

  @Column('character varying', { name: 'username', length: 50 })
  username: string;

  @Column('character varying', { name: 'display_name', length: 100 })
  displayName: string;

  @Column('character varying', { name: 'password', length: 255 })
  password: string;
}
