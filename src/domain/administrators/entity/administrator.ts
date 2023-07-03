import { Entity } from '@/core/entities/entity';

export interface AdministratorProps {
  id: string;
  email: string;
  username: string;
  displayName: string;
  password: string;
}

export class Administrator extends Entity<AdministratorProps> {
  static create(props: AdministratorProps) {
    const administrator = new Administrator({
      ...props,
    });
    return administrator;
  }

  get id() {
    return this.props.id;
  }

  set id(id: string) {
    this.props.id = id;
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get username() {
    return this.props.username;
  }

  set username(username: string) {
    this.props.username = username;
  }

  get displayName() {
    return this.props.displayName;
  }

  set displayName(displayName: string) {
    this.props.displayName = displayName;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }
}
