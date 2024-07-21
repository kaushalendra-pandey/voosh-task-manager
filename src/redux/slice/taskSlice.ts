import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBoard,ITask } from '../../types/type'
import { getUserInfo } from '../../services/ApiService';

export interface ITaskSlice {
  boards: IBoard[];
  tasks: ITask[];
}

const initialState: ITaskSlice = {
  boards: [],
  tasks: [],
}

export const initTask = createAsyncThunk("tasks/list", async (userId: string) => {
    try {
      const res = await getUserInfo(userId);
      console.log(res);
      return res;
    } catch (error) {
      return [];
    }
  });

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
        state.tasks.push(action.payload)
    },
    removeTask: (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task.taskId !== action.payload)
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
        const index = state.tasks.findIndex((task) => task.taskId === action.payload.taskId)
        if (index !== -1) {
            state.tasks[index] = action.payload
        }
    },

  },
  extraReducers: (menu) => {
    menu
      .addCase(initTask.pending, (state) => {
        if (state.tasks.length === 0) {
          state.tasks = [];
        }
      })
      .addCase(initTask.fulfilled, (state, action) => {
        //@ts-ignore
        state.tasks = action.payload;
      });
  },
})

// Action creators are generated for each case reducer function
export const { addTask, removeTask, updateTask } = taskSlice.actions

export default taskSlice.reducer