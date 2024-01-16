import { PayloadAction, createSlice } from '@reduxjs/toolkit';
//import type { PayloadAction } from '@reduxjs/toolkit';
import { IWardrobeSave, IWardrobeSaveDoor, IWardrobeSettingsSetup } from 'src/types';

const initialState = {
    save: {} as IWardrobeSave,
    canAddSection: false,
    canRemoveSection: false,
    canAddDoor: false,
    canRemoveDoor: false,
    settingsSetup: {} as IWardrobeSettingsSetup
};

export const wardrobeSaveSlice = createSlice({
    name: 'wardrobeSave',
    initialState,
    reducers: {
        //#region INITIALIZATION
        initializeSave: (state, action: PayloadAction<{ data: IWardrobeSave; }>) => {
            state.save = action.payload.data;
            //recalculate all
            wardrobeSaveSlice.caseReducers.recalcAll(state);
        },
        initializeSettingsSetup: (state, action: PayloadAction<{ settingsSetup: IWardrobeSettingsSetup; }>) => {
            state.settingsSetup = action.payload.settingsSetup;
        },
        //#endregion
        //#region DIMENSIONS
        updateWidth: (state, action: PayloadAction<{ w: number; }>) => {
            state.save.dimensions.width = Math.max(state.settingsSetup.width.min, Math.min(action.payload.w, state.settingsSetup.width.max));
            //recalculate all
            wardrobeSaveSlice.caseReducers.recalcAll(state);
        },
        updateHeight: (state, action: PayloadAction<{ h: number; }>) => {
            state.save.dimensions.height = Math.max(state.settingsSetup.height.min, Math.min(action.payload.h, state.settingsSetup.height.max));
        },
        updateDepth: (state, action: PayloadAction<{ d: number; }>) => {
            state.save.dimensions.depth = Math.max(state.settingsSetup.depth.min, Math.min(action.payload.d, state.settingsSetup.depth.max));
        },
        //#endregion
        //#region MATERIALS
        updateCorpusMaterialId: (state, action: PayloadAction<{ materialId: string; }>) => {
            state.save.materials.corpusMaterialId = action.payload.materialId;
        },
        updateIronWorkMaterialId: (state, action: PayloadAction<{ materialId: string; }>) => {
            state.save.materials.ironWorkMaterialId = action.payload.materialId;
        },
        updatePhotoWallpaperMaterialId: (state, action: PayloadAction<{ materialId: string; }>) => {
            state.save.materials.photoWallpaperMaterialId = action.payload.materialId;
        },
        updateDoorPartMaterialId: (state, action: PayloadAction<{ doorId: number, doorPartId: number, materialId: string; }>) => {
            state.save.doors.doorsData[action.payload.doorId].doorPartsMaterialIds[action.payload.doorPartId] = action.payload.materialId;
        },
        //#endregion
        //#region SIDE PARTITIONS
        toggleLeftPartition: (state) => {
            state.save.sidePartitions.left = !state.save.sidePartitions.left;
            //recalculate all
            wardrobeSaveSlice.caseReducers.recalcAll(state);
        },
        toggleRightPartition: (state) => {
            state.save.sidePartitions.right = !state.save.sidePartitions.right;
            //recalculate all
            wardrobeSaveSlice.caseReducers.recalcAll(state);
        },
        //#endregion
        //#region SECTIONS
        updateSection: (state, action: PayloadAction<{ sectionId: number; sectionReferenceId: string; }>) => {
            state.save.sections.sectionsData[action.payload.sectionId] = action.payload.sectionReferenceId;
        },
        updateAllSections: (state, action: PayloadAction<{ sectionReferenceId: string; }>) => {
            state.save.sections.sectionsData = state.save.sections.sectionsData.map(() => action.payload.sectionReferenceId);
        },
        addSection: (state) => {
            state.save.sections.sectionsData = [...state.save.sections.sectionsData, state.settingsSetup.defaultSectionId];
            //recalculate all
            wardrobeSaveSlice.caseReducers.recalcAll(state);
        },
        removeSection: (state) => {
            state.save.sections.sectionsData = [...state.save.sections.sectionsData.slice(0, state.save.sections.sectionsData.length - 1)];
            //recalculate all
            wardrobeSaveSlice.caseReducers.recalcAll(state);
        },
        //#endregion
        //#region DOORS
        updateDoor: (state, action: PayloadAction<{ doorId: number; doorTypeId: string; doorPartsNumber: number; }>) => {
            state.save.doors.doorsData[action.payload.doorId] = { doorTypeId: action.payload.doorTypeId, doorPartsMaterialIds: Array(...Array(action.payload.doorPartsNumber)).map(() => state.settingsSetup.defaultDoorPartsMaterialId) } as IWardrobeSaveDoor;
        },
        updateSelectedDoor: (state, action: PayloadAction<{ doorId: number; doorPartId: number; }>) => {
            const materialId = state.save.doors.doorsData[action.payload.doorId].doorPartsMaterialIds[action.payload.doorPartId];
            state.save.doors.doorsData[action.payload.doorId] = { ...state.save.doors.doorsData[action.payload.doorId], doorPartsMaterialIds: Array(...Array(state.save.doors.doorsData[action.payload.doorId].doorPartsMaterialIds.length)).map(() => materialId) } as IWardrobeSaveDoor;
        },
        applyPhotoWallpaperForAllDoors: (state) => {
            state.save.doors.doorsData = state.save.doors.doorsData.map((data) => {
                return {
                    ...data,
                    doorPartsMaterialIds: data.doorPartsMaterialIds.map(() => state.settingsSetup.photoWallpaperDoorPartsMaterialId)
                } as IWardrobeSaveDoor;
            });
        },
        updateAllDoors: (state, action: PayloadAction<{ doorData: IWardrobeSaveDoor; }>) => {
            state.save.doors.doorsData = state.save.doors.doorsData.map(() => {
                return {
                    doorTypeId: action.payload.doorData.doorTypeId,
                    doorPartsMaterialIds: [...action.payload.doorData.doorPartsMaterialIds]
                } as IWardrobeSaveDoor;
            });
        },
        addDoor: (state) => {
            state.save.doors.doorsData = [...state.save.doors.doorsData, { doorTypeId: state.settingsSetup.defaultDoorTypeId, doorPartsMaterialIds: [...state.settingsSetup.defaultDoorPartsMaterialIds] } as IWardrobeSaveDoor];
            //recalculate all
            wardrobeSaveSlice.caseReducers.recalcAll(state);
        },
        removeDoor: (state) => {
            state.save.doors.doorsData = [...state.save.doors.doorsData.slice(0, state.save.doors.doorsData.length - 1)];
            //recalculate all
            wardrobeSaveSlice.caseReducers.recalcAll(state);
        },
        //#endregion
        recalcAll: (state) => {
            //SECTIONS
            //get width of boards based on partition existence
            const sp = ((state.save.sidePartitions.left ? 1 : 0) + (state.save.sidePartitions.right ? 1 : 0)) * state.settingsSetup.boardWidth;

            //remove section if section size is less then setup sectionWidth-min
            while (((state.save.dimensions.width - sp - (state.save.sections.sectionsData.length - 1) * state.settingsSetup.boardWidth) / state.save.sections.sectionsData.length) < state.settingsSetup.sectionWidth.min) {
                state.save.sections.sectionsData = [...state.save.sections.sectionsData.slice(0, state.save.sections.sectionsData.length - 1)];
            }
            //add section if section size is bigger then setup sectionWidth-max
            while (((state.save.dimensions.width - sp - (state.save.sections.sectionsData.length - 1) * state.settingsSetup.boardWidth) / state.save.sections.sectionsData.length) > state.settingsSetup.sectionWidth.max) {
                state.save.sections.sectionsData = [...state.save.sections.sectionsData, state.settingsSetup.defaultSectionId];
            }
            state.save.sections.sectionsWidth = (state.save.dimensions.width - sp - (state.save.sections.sectionsData.length - 1) * state.settingsSetup.boardWidth) / state.save.sections.sectionsData.length;

            state.canAddSection = (((state.save.dimensions.width - sp - (state.save.sections.sectionsData.length) * state.settingsSetup.boardWidth) / (state.save.sections.sectionsData.length + 1)) >= state.settingsSetup.sectionWidth.min);
            state.canRemoveSection = (((state.save.dimensions.width - sp - (state.save.sections.sectionsData.length - 2) * state.settingsSetup.boardWidth) / (state.save.sections.sectionsData.length - 1)) <= state.settingsSetup.sectionWidth.max);

            //DOORS
            //get width of side boards - both side boards are allways presented
            const sb = 2 * state.settingsSetup.boardWidth;

            //remove door if door size if less then setup doorWidth-min
            while (((state.save.dimensions.width - sb) / state.save.doors.doorsData.length) < state.settingsSetup.doorWidth.min) {
                state.save.doors.doorsData = [...state.save.doors.doorsData.slice(0, state.save.doors.doorsData.length - 1)];
            }
            //add door if door size if bigger then setup doorWidth-max
            while (((state.save.dimensions.width - sb) / state.save.doors.doorsData.length) > state.settingsSetup.doorWidth.max) {
                state.save.doors.doorsData = [...state.save.doors.doorsData, { doorTypeId: state.settingsSetup.defaultDoorTypeId, doorPartsMaterialIds: [...state.settingsSetup.defaultDoorPartsMaterialIds] } as IWardrobeSaveDoor];
            }
            state.save.doors.doorsWidth = (state.save.dimensions.width - sb) / state.save.doors.doorsData.length;

            state.canAddDoor = (((state.save.dimensions.width - sb) / (state.save.doors.doorsData.length + 1)) >= state.settingsSetup.doorWidth.min);
            state.canRemoveDoor = (((state.save.dimensions.width - sb) / (state.save.doors.doorsData.length - 1)) <= state.settingsSetup.doorWidth.max);
        }
        /*
    applyDefaults: (state) => {
        state.dimensions = { ...state.settings.defaults.dimensions };
        state.partitions = { ...state.settings.defaults.partitions };
        state.sections = { ...state.settings.defaults.sections };
        state.doors = { ...state.settings.defaults.doors };
        state.safetyBoard = state.settings.defaults.defaultSafetyBoard;
        state.corpusMaterialId = state.settings.defaults.defaultCorpusMaterialId;
        state.ironWorkMaterialId = state.settings.defaults.defaultIronWorkMaterialId;
        state.photoWallpaperMaterialId = state.settings.defaults.defaultPhotoWallpaperMaterialId;
        state.safetyBoard = state.settings.defaults.defaultSafetyBoard;
    },
    updateWidth: (state, action: PayloadAction<{ w: number; }>) => {
        wardrobeDataSlice.caseReducers.setSections(state, { type: "setSections", payload: { w: action.payload.w, lp: state.partitions.leftPartition, rp: state.partitions.rightPartition, adjustSectionCountBy: 0 } });
        wardrobeDataSlice.caseReducers.setDoors(state, { type: "setDoors", payload: { w: action.payload.w, adjustDoorCountBy: 0 } });
        // - set states -
        state.dimensions.width = action.payload.w;
    },
    updateHeight: (state, action: PayloadAction<{ h: number; }>) => {
        wardrobeDataSlice.caseReducers.setSafetyBoard(state, action);
        // - set states -
        state.dimensions.height = action.payload.h;
    },
    updateDepth: (state, action: PayloadAction<{ d: number; }>) => {
        // - set states -
        state.dimensions.depth = action.payload.d;
    },
    toggleLeftPartition: (state) => {
        wardrobeDataSlice.caseReducers.setSections(state, { type: "setSections", payload: { w: state.dimensions.width, lp: !state.partitions.leftPartition, rp: state.partitions.rightPartition, adjustSectionCountBy: 0 } });
        // - set states -
        state.partitions.leftPartition = !state.partitions.leftPartition;
    },
    toggleRightPartition: (state) => {
        wardrobeDataSlice.caseReducers.setSections(state, { type: "setSections", payload: { w: state.dimensions.width, lp: state.partitions.leftPartition, rp: !state.partitions.rightPartition, adjustSectionCountBy: 0 } });
        // - set states -
        state.partitions.rightPartition = !state.partitions.rightPartition;
    },
    addSection: (state) => {
        // - set states -
        wardrobeDataSlice.caseReducers.setSections(state, { type: "setSections", payload: { w: state.dimensions.width, lp: state.partitions.leftPartition, rp: state.partitions.rightPartition, adjustSectionCountBy: 1 } });
    },
    removeSection: (state) => {
        // - set states -
        wardrobeDataSlice.caseReducers.setSections(state, { type: "setSections", payload: { w: state.dimensions.width, lp: state.partitions.leftPartition, rp: state.partitions.rightPartition, adjustSectionCountBy: -1 } });
    },
    updateSection: (state, action: PayloadAction<{ sectionId: number, sectionTypeId: number; }>) => {
        // - set states -
        state.sections.sectionsData = state.sections.sectionsData.map((element, id) => {
            if (id === action.payload.sectionId) {
                return action.payload.sectionTypeId;
            }
            return element;
        });
    },
    updateAllSections: (state, action: PayloadAction<{ sectionTypeId: number; }>) => {
        // - set states -
        state.sections.sectionsData = state.sections.sectionsData.map((element, id) => {
            return action.payload.sectionTypeId;
        });
    },
    addDoor: (state) => {
        // - set states -
        wardrobeDataSlice.caseReducers.setDoors(state, { type: "setDoors", payload: { w: state.dimensions.width, adjustDoorCountBy: 1 } });
    },
    removeDoor: (state) => {
        // - set states -
        wardrobeDataSlice.caseReducers.setDoors(state, { type: "setDoors", payload: { w: state.dimensions.width, adjustDoorCountBy: -1 } });
    },
    updateDoor: (state, action: PayloadAction<{ doorId: number, doorTypeId: number; }>) => {
        // - set states -
        state.doors.data = state.doors.data.map((door, id) => {
            if (id === action.payload.doorId) {
                return {
                    doorTypeId: action.payload.doorTypeId,
                    doorPartsMaterialIds: Array(state.settings.doorsSetup.items[action.payload.doorTypeId].parts.length).fill(state.settings.defaults.defaultDoorPartMaterialId)
                } as IWardrobeDoor;
            }
            return door;
        });
    },
    updateAllDoors: (state, action: PayloadAction<{ doorId: number, doorTypeId: number; }>) => {
        // - set states -
        state.doors.data = state.doors.data.map((door, id) => {
            return {
                doorTypeId: action.payload.doorTypeId,
                doorPartsMaterialIds: [...state.doors.data[action.payload.doorId].doorPartsMaterialIds]
            } as IWardrobeDoor;
        });
    },
    updateDoorPart: (state, action: PayloadAction<{ doorId: number, doorPartId: number, doorPartMaterialId: number; }>) => {
        // - set states -
        state.doors.data = state.doors.data.map((door, id) => {
            if (id === action.payload.doorId) {
                return {
                    ...door,
                    doorPartsMaterialIds: door.doorPartsMaterialIds.map((part, id) => {
                        if (id === action.payload.doorPartId) {
                            return action.payload.doorPartMaterialId;
                        }
                        return part;
                    }
                    )
                } as IWardrobeDoor;
            }
            return door;
        });
    },
    updateDoorParts: (state, action: PayloadAction<{ doorId: number; }>) => {
        // - set states -
        state.doors.data = state.doors.data.map((door, id) => {
            if (id === action.payload.doorId) {
                return {
                    ...door,
                    doorPartsMaterialIds: door.doorPartsMaterialIds.map((part, id) => {
                        return 0;
                    }
                    )
                } as IWardrobeDoor;
            }
            return door;
        });
    },
    setSafetyBoard: (state, action: PayloadAction<{ h: number; }>) => {
        // - set states -
        state.safetyBoard = (action.payload.h >= state.settings.safetyBoardTrigger);
    },
    setSections: (state, action: PayloadAction<{ w: number, lp: boolean, rp: boolean, adjustSectionCountBy: number; }>) => {
        //get board width
        const bw = state.settings.boardWidth;
        //get section width boundaries
        const swb = state.settings.boundaries.sectionWidthBoundaries;
        //calculate actual sections count
        let sc = state.sections.sectionsCount + action.payload.adjustSectionCountBy;
        //get sections data
        let s = [...state.sections.sectionsData];
        //adjust section data if necessary
        switch (action.payload.adjustSectionCountBy) {
            case 1:
                s = [...state.sections.sectionsData, state.settings.defaults.defaultSectionId];
                break;
            case -1:
                s.pop();
                break;
        }
        //get width
        let widthForCalculation = action.payload.w;
        //remove width of left and right partition if not presented
        widthForCalculation = widthForCalculation - (action.payload.lp ? 1 : 0) * bw - (action.payload.rp ? 1 : 0) * bw;
        //get max and min number of sections
        let sectionsMax = Math.floor((widthForCalculation + bw) / (swb.min + bw));
        let sectionsMin = Math.ceil((widthForCalculation + bw) / (swb.max + bw));
        //if error
        if (sectionsMax < sectionsMin) {
            console.error("Min. section width is bigger then max. section width!!!");
        } else {
            while (sc < sectionsMin) {
                sc++;
                s.push(state.settings.defaults.defaultSectionId);
            }
            while (sc > sectionsMax) {
                sc--;
                s.pop();
            }
        }
        // - set states -
        //sections count
        state.sections.sectionsCount = sc;
        //section width
        state.sections.sectionsWidth = (widthForCalculation - (bw * (sc - 1))) / sc;
        //is section addable
        state.sections.isSectionAddable = sc < sectionsMax;
        //is section removable
        state.sections.isSectionRemovable = sc > sectionsMin;
        //sections data
        state.sections.sectionsData = s;
    },
    toggleDoors: (state) => {
        // - set states
        state.doors.areDoors = !state.doors.areDoors;
    },
    setDoors: (state, action: PayloadAction<{ w: number, adjustDoorCountBy: number; }>) => {
        //get board width
        const bw = state.settings.boardWidth;
        //get door width boundaries
        const dwb = state.settings.boundaries.doorWidthBoundaries;
        //calculate actual doors count
        let dc = state.doors.doorsCount + action.payload.adjustDoorCountBy;
        //get doors data
        let d = [...state.doors.data];
        //adjust door data if necessary
        switch (action.payload.adjustDoorCountBy) {
            case 1:
                d = [...d,
                {
                    doorTypeId: state.settings.defaults.defaultDoorId,
                    //TODO - musim najst id v poli podla state.settings.defaults.defaultDoorId hodnotuy
                    doorPartsMaterialIds: Array(state.settings.doorsSetup.items[state.settings.defaults.defaultDoorId].parts.length).fill(state.settings.defaults.defaultDoorPartMaterialId)
                } as IWardrobeDoor
                ];
                break;
            case -1:
                d.pop();
                break;
        }
        //get width
        let widthForCalculation = action.payload.w;
        //remove width of left and right board - always presented on  both sides
        widthForCalculation = widthForCalculation - 2 * bw;
        //get max and min number of sections
        let doorsMax = Math.floor((widthForCalculation) / (dwb.min));
        let doorsMin = Math.ceil((widthForCalculation) / (dwb.max));
        //if error
        if (doorsMax < doorsMin) {
            console.error("Min. door width is bigger then max. door width!!!");
        } else {
            while (dc < doorsMin) {
                dc++;
                d.push(
                    {
                        doorTypeId: state.settings.defaults.defaultDoorId,
                        doorPartsMaterialIds: Array(state.settings.doorsSetup.items[state.settings.defaults.defaultDoorId].parts.length).fill(state.settings.defaults.defaultDoorPartMaterialId)
                    } as IWardrobeDoor
                );
            }
            while (dc > doorsMax) {
                dc--;
                d.pop();
            }
        }
        //doors count
        state.doors.doorsCount = dc;
        //door width
        state.doors.doorsWidth = (widthForCalculation) / dc;
        //is door addable
        state.doors.isDoorAvailable = dc < doorsMax;
        //is door removable
        state.doors.isDoorRemovable = dc > doorsMin;
        //doors data
        state.doors.data = d;
    },
    updateCorpusMaterial: (state, action: PayloadAction<{ mJSX: JSX.Element; }>) => {
        // - set states -
        state.materials.corpusMaterialJSX = action.payload.mJSX;
    },
    updateCorpusMaterialId: (state, action: PayloadAction<{ materialId: number; }>) => {
        // - set states -
        state.corpusMaterialId = action.payload.materialId;
    },
    updateIronWorkMaterial: (state, action: PayloadAction<{ mJSX: JSX.Element; }>) => {
        // - set states -
        state.materials.ironWorkMaterialJSX = action.payload.mJSX;
    },
    updateIronWorkMaterialId: (state, action: PayloadAction<{ materialId: number; }>) => {
        // - set states -
        state.ironWorkMaterialId = action.payload.materialId;
    },
    updatePhotoWallpaperMaterial: (state, action: PayloadAction<{ mJSX: JSX.Element; }>) => {
        // - set states -
        state.materials.photoWallpaperMaterialJSX = action.payload.mJSX;
    },
    updatePhotoWallpaperMaterialId: (state, action: PayloadAction<{ materialId: number; }>) => {
        // - set states -
        state.photoWallpaperMaterialId = action.payload.materialId;
    }
    */
    }
});

// Action creators are generated for each case reducer function
export const wardrobeSaveActions = wardrobeSaveSlice.actions;
export const wardrobeSaveReducer = wardrobeSaveSlice.reducer;