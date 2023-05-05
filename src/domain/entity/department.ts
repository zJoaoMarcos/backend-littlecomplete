/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Entity } from '../../core/entities/entity';

interface DepartmentProps {
  id: number;
  name: string;
  cost_center: number;
  is_board: boolean;
  board: string;
  responsible_id: string;
}

export class Department extends Entity<DepartmentProps> {
  static create(props: DepartmentProps) {
    const department = new Department({
      ...props,
    });

    return department;
  }
  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get cost_center() {
    return this.props.cost_center;
  }

  get is_board() {
    return this.props.is_board;
  }

  get board() {
    return this.props.board;
  }

  get responsible_id() {
    return this.props.responsible_id;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set cost_center(cost_center: number) {
    this.props.cost_center = cost_center;
  }

  set is_board(is_board: boolean) {
    this.props.is_board = is_board;
  }

  set board(board: string) {
    this.props.board = board;
  }

  set responsible_id(responsible_id: string) {
    this.props.responsible_id = responsible_id;
  }
}
