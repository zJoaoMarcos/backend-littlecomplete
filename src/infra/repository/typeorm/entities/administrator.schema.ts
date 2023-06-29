import { Column, Entity, Index } from 'typeorm';

@Index('administrator_pkey', ['email'], { unique: true })
@Index('administrator_username_key', ['username'], { unique: true })
@Entity('administrator', { schema: 'public' })
export class AdministratorSchema {
  @Column('character varying', { primary: true, name: 'email', length: 100 })
  email: string;

  @Column('character varying', { name: 'username', unique: true, length: 100 })
  username: string;

  @Column('character varying', { name: 'display_name', length: 50 })
  displayName: string;

  @Column('character varying', { name: 'password', length: 255 })
  password: string;
}
