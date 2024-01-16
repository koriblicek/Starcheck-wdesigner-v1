import { createContext, useContext } from "react";
import { Material, MeshStandardMaterial } from "three";
import { TMaterialAction } from "./MaterialsProvider";

//state
export interface IMaterialsStateContext {
    hangerMaterial: Material;
    selectionMaterialOver: MeshStandardMaterial;
    selectionMaterialOut: MeshStandardMaterial;
    corpusMaterial: MeshStandardMaterial;
    ironWorkMaterial: MeshStandardMaterial;
    photoWallpaperMaterial: MeshStandardMaterial;
    roomWallMaterial: MeshStandardMaterial;
    roomBottomWallMaterial: MeshStandardMaterial;
}

export const MaterialsStateContext = createContext<IMaterialsStateContext | undefined>(undefined);

export function useMaterialsStateContext() {
    const data = useContext(MaterialsStateContext);

    if (data === undefined) {
        throw new Error("useMaterialsStateContext must be used with a MaterialsProvider!");
    }

    return data;
}

//dispatch
export const MaterialsDispatchContext = createContext<React.Dispatch<TMaterialAction> | undefined>(undefined);

export function useMaterialsDispatchContext() {
    const functions = useContext(MaterialsDispatchContext);

    if (functions === undefined) {
        throw new Error("useMaterialsDispatchContext must be used with a MaterialsProvider!");
    }

    return functions;
}
