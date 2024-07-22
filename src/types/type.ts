export interface IBoard {
  title: string;
  userId: string;
  boardId: string;
}

export interface INewTask {
  title: string;
  description: string;
  dueDate: string;
}

export interface ITask extends INewTask {
  userId: string;
  boardId: string;
  taskId: string;
  createdAt: string;
}

export interface IUser {
  name: string;
  email: string;
  userId: string;
  profileImg ?: string;
}

export interface IErrorResponse {
  message: string;
  status: number;
  data: any;
}

export interface IUserWithBoardsAndTasks {
  boards: IBoard[];
  tasks: ITask[];
  user: IUser;
}

export interface ISignupDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export enum SortType {
  CREATED_AT_ASC = "createdAt-asc",
  CREATED_AT_DESC = "createdAt-desc",
  DUE_DATE_ASC = "dueDate-asc",
  DUE_DATE_DESC = "dueDate-desc",
}
