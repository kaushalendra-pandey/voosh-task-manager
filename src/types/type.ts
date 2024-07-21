export interface IBoard {
    title: string;
    userId: string;
    boardId: string;
}

export interface ITask {
    title: string;
    description: string;
    userId: string;
    boardId: string;
    dueDate: Date;
    taskId: string;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    userId: string;
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