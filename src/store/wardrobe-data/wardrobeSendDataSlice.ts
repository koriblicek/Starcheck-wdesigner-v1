import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IWardrobeSendData, LOCAL_STORAGE_USER_DATA_KEY } from 'src/types';


const initialState = {
    nameAndSurname: "",
    email: "",
    phone: "",
    assemblyPlace: "",
    comment: "",
    summary: ""
} as IWardrobeSendData;

export const wardrobeSendDataSlice = createSlice({
    name: 'wardrobeSendData',
    initialState,
    reducers: {
        initializeSendData: (state) => {
            const ls = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);
            if (ls) {
                return { ...state, ...(JSON.parse(ls) as IWardrobeSendData) };
            }
        },
        updateSendData: (state, action: PayloadAction<{ data: IWardrobeSendData; }>) => {
            //initialize app data
            state = { ...state, ...action.payload.data };
            wardrobeSendDataSlice.caseReducers.saveStateToLocalStorage(state);
        },
        saveStateToLocalStorage: (state) => {
            localStorage.setItem(LOCAL_STORAGE_USER_DATA_KEY, JSON.stringify(state));
        }
    }
});

// Action creators are generated for each case reducer function
export const wardrobeSendDataActions = wardrobeSendDataSlice.actions;
export const wardrobeSendDataReducer = wardrobeSendDataSlice.reducer;