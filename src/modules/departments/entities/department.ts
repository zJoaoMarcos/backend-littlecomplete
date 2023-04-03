export interface DepartmentProps {
  name: string;
  cost_center: number;
  is_board: boolean;
  board: string;
}

export class Department {
  private props: DepartmentProps;

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

  constructor(props: DepartmentProps) {
    this.props = props;
  }
}
