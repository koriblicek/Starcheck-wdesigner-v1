import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAppInputData } from 'src/types';

const initialState = {
} as IAppInputData;

export const wardrobeAppInputDataSlice = createSlice({
    name: 'wardrobeAppInputData',
    initialState,
    reducers: {
        initializeAppInitData: (_, action: PayloadAction<{ data: IAppInputData; }>) => {
            //initialize app input data
            return { ...action.payload.data };
        }
    }
});

// Action creators are generated for each case reducer function
export const wardrobeAppInputDataActions = wardrobeAppInputDataSlice.actions;
export const wardrobeAppInputDataReducer = wardrobeAppInputDataSlice.reducer;