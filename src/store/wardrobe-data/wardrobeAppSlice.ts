import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IWardrobeApp } from 'src/types';
import { Vector3Tuple } from 'three';

const defaultCameraTarget: Vector3Tuple = [0, 1.5, 0];

const initialState = {
    visibleDoors: false,
    visibleSectionsClickBoxes: false,
    visibleDoorsClickBoxes: false,
    visibleDoorsMoveBoxes: false,
    visibleDoorsPartsClickBoxes: false,
    selectedSection: -1,
    selectedDoor: -1,
    selectedDoorPart: -1,
    enabledOrbitControls: true,
    visibleDimensionsDrawer: false,
    visibleCorpusMaterialDrawer: false,
    visibleIronWorkMaterialDrawer: false,
    visibleSectionsDrawer: false,
    visibleDoorsDrawer: false,
    visibleDoorsPartsDrawer: false,
    visiblePhotoWallpaperDrawer: false,
    visibleNewDesignDialog: false,
    visibleNewDesignLoader: false,
    visibleSendDesignDialog: false,
    cameraTarget: defaultCameraTarget,
    roomWallColor: 0xffffff,
    roomBottomWallColor: 0x888888
} as IWardrobeApp;

export const wardrobeAppSlice = createSlice({
    name: 'wardrobeApp',
    initialState,
    reducers: {
        setDoorsVisibility: (state, action: PayloadAction<{ visible: boolean; }>) => {
            state.visibleDoors = action.payload.visible;
        },
        setSectionsClickBoxesVisibility: (state, action: PayloadAction<{ visible: boolean; }>) => {
            state.visibleSectionsClickBoxes = action.payload.visible;
        },
        setDoorsClickBoxesVisibility: (state, action: PayloadAction<{ visible: boolean; }>) => {
            state.visibleDoorsClickBoxes = action.payload.visible;
        },
        setDoorsMoveBoxesVisibility: (state, action: PayloadAction<{ visible: boolean; }>) => {
            state.visibleDoorsMoveBoxes = action.payload.visible;
        },
        setDoorsPartsClickBoxesVisibility: (state, action: PayloadAction<{ visible: boolean; }>) => {
            state.visibleDoorsPartsClickBoxes = action.payload.visible;
        },
        selectSection: (state, action: PayloadAction<{ sectionId: number; }>) => {
            state.selectedSection = action.payload.sectionId;
        },
        selectDoor: (state, action: PayloadAction<{ doorId: number; }>) => {
            state.selectedDoor = action.payload.doorId;
        },
        selectDoorPart: (state, action: PayloadAction<{ doorPartId: number; }>) => {
            state.selectedDoorPart = action.payload.doorPartId;
        },
        enableOrbitControls: (state, action: PayloadAction<{ enabled: boolean; }>) => {
            state.enabledOrbitControls = action.payload.enabled;
        },
        toggleDimensionsDrawer: (state) => {
            state.visibleDimensionsDrawer = !state.visibleDimensionsDrawer;
            wardrobeAppSlice.caseReducers.enableOrbitControls(state, { type: "enableOrbitControls", payload: { enabled: !state.visibleDimensionsDrawer } });
        },
        toggleCorpusMaterialDrawer: (state) => {
            state.visibleCorpusMaterialDrawer = !state.visibleCorpusMaterialDrawer;
            wardrobeAppSlice.caseReducers.enableOrbitControls(state, { type: "enableOrbitControls", payload: { enabled: !state.visibleCorpusMaterialDrawer } });
        },
        toggleIronWorkDrawer: (state) => {
            state.visibleIronWorkMaterialDrawer = !state.visibleIronWorkMaterialDrawer;
            wardrobeAppSlice.caseReducers.enableOrbitControls(state, { type: "enableOrbitControls", payload: { enabled: !state.visibleIronWorkMaterialDrawer } });
        },
        toggleSectionsDrawer: (state) => {
            state.visibleSectionsDrawer = !state.visibleSectionsDrawer;
            //to prevent error caused by deleting selected secion
            if (!state.visibleSectionsDrawer) {
                state.selectedSection = -1;
            }
            wardrobeAppSlice.caseReducers.enableOrbitControls(state, { type: "enableOrbitControls", payload: { enabled: !state.visibleSectionsDrawer } });
        },
        toggleDoorsDrawer: (state) => {
            state.visibleDoorsDrawer = !state.visibleDoorsDrawer;
            //to prevent error caused by deleting selected door
            if (!state.visibleDoorsDrawer) {
                state.selectedDoor = -1;
            }
            wardrobeAppSlice.caseReducers.enableOrbitControls(state, { type: "enableOrbitControls", payload: { enabled: !state.visibleDoorsDrawer } });
        },
        toggleDoorsPartsDrawer: (state) => {
            state.visibleDoorsPartsDrawer = !state.visibleDoorsPartsDrawer;
            //to prevent error caused by deleting selected door part
            if (!state.visibleDoorsPartsDrawer) {
                state.selectedDoor = -1;
                state.selectedDoorPart = -1;
            }
            wardrobeAppSlice.caseReducers.enableOrbitControls(state, { type: "enableOrbitControls", payload: { enabled: !state.visibleDoorsPartsDrawer } });
        },
        togglePhotoWallpaperDrawer: (state) => {
            state.visiblePhotoWallpaperDrawer = !state.visiblePhotoWallpaperDrawer;
            wardrobeAppSlice.caseReducers.enableOrbitControls(state, { type: "enableOrbitControls", payload: { enabled: !state.visiblePhotoWallpaperDrawer } });
        },
        setCameraTarget: (state, action: PayloadAction<{ vec: Vector3Tuple; }>) => {
            state.cameraTarget = action.payload.vec;
        },
        toggleNewDesignDialog: (state) => {
            state.visibleNewDesignDialog = !state.visibleNewDesignDialog;
            wardrobeAppSlice.caseReducers.enableOrbitControls(state, { type: "enableOrbitControls", payload: { enabled: !state.visibleNewDesignDialog } });
        },
        toggleNewDesignLoader: (state) => {
            state.visibleNewDesignLoader = !state.visibleNewDesignLoader;
            wardrobeAppSlice.caseReducers.enableOrbitControls(state, { type: "enableOrbitControls", payload: { enabled: !state.visibleNewDesignLoader } });
        },
        toggleSendDesignDialog: (state) => {
            state.visibleSendDesignDialog = !state.visibleSendDesignDialog;
            wardrobeAppSlice.caseReducers.enableOrbitControls(state, { type: "enableOrbitControls", payload: { enabled: !state.visibleSendDesignDialog } });
        },
        setDefaultCameraTarget: (state) => {
            state.cameraTarget = defaultCameraTarget;
        }
    }
});

// Action creators are generated for each case reducer function
export const wardrobeAppActions = wardrobeAppSlice.actions;
export const wardrobeAppReducer = wardrobeAppSlice.reducer;