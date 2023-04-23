/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Entity } from '../../core/entities/entity';

interface DepartmentProps {
  name: string;
  cost_center: number;
  is_board: boolean;
  board: string;
}

export class Department extends Entity<DepartmentProps> {
  static create(props: DepartmentProps) {
    const department = new Department({
      ...props,
    });

    return department;
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

  set cost_center(cost_center: number) {
    this.props.cost_center = cost_center;
  }
}
