import { configureStore } from '@reduxjs/toolkit';
import { wardrobeSaveReducer } from './wardrobe-data/wardrobeSaveSlice';
import { wardrobeSettingsReducer } from './wardrobe-data/wardrobeSettingsSlice';
import { wardrobeAppReducer } from './wardrobe-data/wardrobeAppSlice';
import { wardrobeAppDataReducer } from './wardrobe-data/wardrobeAppDataSlice';
import { wardrobeSendDataReducer } from './wardrobe-data/wardrobeSendDataSlice';
import { wardrobeAppInputDataReducer } from './wardrobe-data/wardrobeAppInputDataSlice';

export const store = configureStore({
  reducer: {
    wardrobeAppData: wardrobeAppDataReducer,
    wardrobeAppInputData: wardrobeAppInputDataReducer,
    wardrobeSendData: wardrobeSendDataReducer,
    wardrobeSave: wardrobeSaveReducer,
    wardrobeSettings: wardrobeSettingsReducer,
    wardrobeApp: wardrobeAppReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;