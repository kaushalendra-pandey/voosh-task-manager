import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBoard, ITask, IUser } from "../../types/type";
import { getUserInfo } from "../../services/ApiService";

export interface ITaskSlice {
  boards: IBoard[];
  tasks: ITask[];
  user: IUser;
}

const initialState: ITaskSlice = {
  boards: [],
  tasks: [],
  user: {
    name: "",
    email: "",
    userId: "",
  },
};

export const initTask = createAsyncThunk(
  "tasks/list",
  async (userId: string) => {
    try {
      const res = await getUserInfo(userId);
      return res.data;
    } catch (error) {
      return [];
    }
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(
        (task) => task.taskId !== action.payload
      );
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const index = state.tasks.findIndex(
        (task) => task.taskId === action.payload.taskId
      );
      if (index !== -1) {
        state.tasks[index].title = action.payload.title;
        state.tasks[index].description = action.payload.description;
      }
    },
    localMoveTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        boardId: string;
      }>
    ) => {
      const index = state.tasks.findIndex(
        (task) => task.taskId === action.payload.taskId
      );
      if (index !== -1) {
        state.tasks[index].boardId = action.payload.boardId;
      }
    },
    localDeleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(
        (task) => task.taskId !== action.payload
      );
    },
    resetTask: (state) => {
      state.tasks = [];
      state.boards = [];
      state.user = {
        name: "",
        email: "",
        userId: "",
      };
    }
  },
  extraReducers: (menu) => {
    menu
      .addCase(initTask.pending, (state) => {
        if (state.tasks.length === 0) {
          state.tasks = [];
          state.boards = [];
        }
      })
      .addCase(initTask.rejected, (state) => {
        if (state.tasks.length === 0) {
          state.tasks = [];
          state.boards = [];
        }
      })
      .addCase(initTask.fulfilled, (state, action) => {
        //@ts-ignore
        state.tasks = action.payload.tasks;
        state.boards = action.payload.boards;
        state.user = action.payload.user;
      });
  },
});

// Action creators are generated for each case reducer function
export const { addTask, removeTask,resetTask, updateTask,localMoveTask, localDeleteTask } = taskSlice.actions;

export default taskSlice.reducer;
