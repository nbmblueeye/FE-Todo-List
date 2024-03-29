import { Tuple, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk';
import taskReducer from './sliders/taskSlider'
// ...

export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
  middleware: () => new Tuple(thunk),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch