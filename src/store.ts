import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./redux/slice/taskSlice";
import appReducer from "./redux/slice/appSlice";
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    app: appReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
