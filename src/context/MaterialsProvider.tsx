import { PropsWithChildren, useReducer } from 'react';
import { MeshStandardMaterial } from 'three';
import { IMaterialsStateContext, MaterialsDispatchContext, MaterialsStateContext } from './context';
import * as THREE from 'three';

const defaultMaterialsState: IMaterialsStateContext = {
    hangerMaterial: new MeshStandardMaterial({ color: 0xeeeeee, metalness: .66, roughness: .2 }),
    selectionMaterialOver: new MeshStandardMaterial({ transparent: true, depthTest: true, depthWrite: false, opacity: .3, color: '#dce00d' }),
    selectionMaterialOut: new MeshStandardMaterial({ transparent: true, depthTest: true, depthWrite: false, opacity: 0 }),
    corpusMaterial: new MeshStandardMaterial({ color: "#ff0000" }),
    ironWorkMaterial: new MeshStandardMaterial({ color: 0xffffff }),
    photoWallpaperMaterial: new MeshStandardMaterial({ side: THREE.DoubleSide }),
    roomWallMaterial: new MeshStandardMaterial({ color: 0xffffff }),
    roomBottomWallMaterial: new MeshStandardMaterial({ color: 0xcccccc }),
    screenshot1: "",
    screenshot2: ""
};

export type TMaterialAction =
    | { type: 'UPDATE_CORPUS_MATERIAL', material: MeshStandardMaterial; }
    | { type: 'UPDATE_IRONWORK_MATERIAL', material: MeshStandardMaterial; }
    | { type: 'UPDATE_PHOTOWALLPAPER_MATERIAL', material: MeshStandardMaterial; }
    | { type: 'CHANGE_ROOMWALL_COLOR', color: number; }
    | { type: 'CHANGE_ROOMBOTTOMWALL_COLOR', color: number; }
    | { type: 'SET_SCREENSHOT1', screenshot: string; }
    | { type: 'SET_SCREENSHOT2', screenshot: string; };

function materialsReducer(state: IMaterialsStateContext, action: TMaterialAction) {
    switch (action.type) {
        case "UPDATE_CORPUS_MATERIAL": {
            const cm = state.corpusMaterial;
            //dispose old material
            if (cm) {
                if (cm.map) {
                    cm.map.dispose();
                }
                cm.dispose();
            }
            return { ...state, corpusMaterial: action.material };
        }
        case "UPDATE_IRONWORK_MATERIAL": {
            const iwm = state.ironWorkMaterial;
            //dispose old material
            if (iwm) {
                if (iwm.map) {
                    iwm.map.dispose();
                }
                iwm.dispose();
            }
            return { ...state, ironWorkMaterial: action.material };
        }
        case "UPDATE_PHOTOWALLPAPER_MATERIAL": {
            const pwpm = state.photoWallpaperMaterial;
            //dispose old material
            if (pwpm) {
                if (pwpm.map) {
                    pwpm.map.dispose();
                }
                pwpm.dispose();
            }
            return { ...state, photoWallpaperMaterial: action.material };
        }
        case "CHANGE_ROOMWALL_COLOR": {
            const rwm = state.roomWallMaterial;
            //dispose old material
            if (rwm) {
                if (rwm.map) {
                    rwm.map.dispose();
                }
                rwm.dispose();
            }
            return { ...state, roomWallMaterial: new MeshStandardMaterial({ color: action.color }) };
        }
        case "CHANGE_ROOMBOTTOMWALL_COLOR": {
            const rbwm = state.roomBottomWallMaterial;
            //dispose old material
            if (rbwm) {
                if (rbwm.map) {
                    rbwm.map.dispose();
                }
                rbwm.dispose();
            }
            return { ...state, roomBottomWallMaterial: new MeshStandardMaterial({ color: action.color }) };
        }
        case "SET_SCREENSHOT1": {
            return { ...state, screenshot1: action.screenshot };
        }
        case "SET_SCREENSHOT2": {
            return { ...state, screenshot2: action.screenshot };
        }

    }
    return defaultMaterialsState;
}


export function MaterialsProvider(props: PropsWithChildren) {
    const [materialsState, dispatchMaterialsAction] = useReducer(materialsReducer, defaultMaterialsState);

    return (
        <MaterialsStateContext.Provider value={materialsState}>
            <MaterialsDispatchContext.Provider value={dispatchMaterialsAction}>
                {props.children}
            </MaterialsDispatchContext.Provider>
        </MaterialsStateContext.Provider>
    );
}