export class Department {
  name: string;
  cost_center: number;
  is_board: boolean;
  board: string;

  constructor(
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
  ) {
    this.name = name;
    this.cost_center = cost_center;
    this.is_board = is_board;
    this.board = board;
  }
}
