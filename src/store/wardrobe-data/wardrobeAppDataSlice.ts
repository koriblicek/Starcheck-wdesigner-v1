import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAppData } from 'src/types';

const initialState = {
} as IAppData;

export const wardrobeAppDataSlice = createSlice({
    name: 'wardrobeAppData',
    initialState,
    reducers: {
        initializeAppData: (_, action: PayloadAction<{ data: IAppData; }>) => {
            //initialize app data
            return { ...action.payload.data };
        }
    }
});

// Action creators are generated for each case reducer function
export const wardrobeAppDataActions = wardrobeAppDataSlice.actions;
export const wardrobeAppDataReducer = wardrobeAppDataSlice.reducer;