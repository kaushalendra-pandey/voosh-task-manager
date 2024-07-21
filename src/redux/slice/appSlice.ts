import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBoard,ITask } from '../../types/type'
import { getUserInfo } from '../../services/ApiService';

export interface IAppSlice {
    loading: boolean;
}

const initialState: IAppSlice = {
  loading: false,
}


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload
    }
  },
  
})

// Action creators are generated for each case reducer function
export const { setLoading } = appSlice.actions

export default appSlice.reducer