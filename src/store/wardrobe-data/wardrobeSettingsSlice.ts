import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IWardrobeSettings } from 'src/types';

const initialState = {
} as IWardrobeSettings;

export const wardrobeSettingsSlice = createSlice({
    name: 'wardrobeSettings',
    initialState,
    reducers: {
        initialize: (_, action: PayloadAction<{ data: IWardrobeSettings; }>) => {
            //initialize data
            console.log(action.payload.data)
            return { ...action.payload.data };
        }
    }
});

// Action creators are generated for each case reducer function
export const wardrobeSettingsActions = wardrobeSettingsSlice.actions;
export const wardrobeSettingsReducer = wardrobeSettingsSlice.reducer;