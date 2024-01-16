import { configureStore } from '@reduxjs/toolkit';
import { wardrobeSaveReducer } from './wardrobe-data/wardrobeSaveSlice';
import { wardrobeSettingsReducer } from './wardrobe-data/wardrobeSettingsSlice';
import { wardrobeAppReducer } from './wardrobe-data/wardrobeAppSlice';

export const store = configureStore({
  reducer: {
    wardrobeSave: wardrobeSaveReducer,
    wardrobeSettings: wardrobeSettingsReducer,
    wardrobeApp: wardrobeAppReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;