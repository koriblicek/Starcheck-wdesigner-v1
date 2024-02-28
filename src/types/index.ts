import { Vector3Tuple } from "three";

export const APP_NAME = "APIWDESIGNER";
export const APP_LANGUAGES = ["sk", "gb"];

//#region APP
//Input data via div/scriptst
export interface IAppInputData {
    dataApiLink: string;
    dataId: string;
    dataModule: string;
    dataVersion: string;
}

//Settings from API
export interface IAppData {
    settingsURL: string;
    dataURL: string;
    sendUrl: string;
    emailClient: string;

/*
    emailAdressTest: string;
    imagesURL: string;
    outputURL: string;
     previewURL: string;
     */
}

//#endregion

//#region object alignment
export enum EObjectXAnchor {
    left = -0.5,
    middle = 0,
    right = 0.5
}
export enum EObjectYAnchor {
    bottom = -0.5,
    middle = 0,
    top = 0.5
}
export enum EObjectZAnchor {
    back = -0.5,
    middle = 0,
    front = 0.5
}
export interface IObjectAnchor {
    x: EObjectXAnchor;
    y: EObjectYAnchor;
    z: EObjectZAnchor;
}
//#endregion
//#region material loader
export enum EMaterialLoader {
    corpus = "corpus",
    ironWorks = "ironWorks",
    photoWallpaper = "photoWallpaper"
}
//#endregion
//#region material/texture types
export enum EMaterialType {
    NONE = "none",
    ALUMINIUM = "aluminium",
    STEEL = "steel",
    IRON = "iron",
    WOOD = "wood",
    LACOBEL = "lacobel",
    MIRROR = "mirror",
    GLASS = "glass"
}
export enum ETextureType {
    METALLIC = "metallic",
    STANDARD = "standard",
    REFLECTIVE = "reflective",
    MIRROR = "mirror",
    TRANSPARENT = "transparent",
    SEMITRANSPARENT = "semitransparent"
}
//#endregion

// -------------------------------------IWardrobeSave----------------------------------------

//#region IWardrobeSaveDimensions
/**
 * @typedef IWardrobeSaveDimensions
 * @param {number} width Wardrobe width
 * @param {number} height Wardrobe height
 * @param {number} depth Wardrobe depth
 */
export interface IWardrobeSaveDimensions {
    width: number;
    height: number;
    depth: number;
}
//#endregion

//#region IWardrobeSaveSidePartitions
/**
 * @typedef IWardrobeSaveSidePartitions
 * @param {boolean} left 'true' if there is left board requested
 * @param {boolean} right 'true' if there is right board requested
 */
export interface IWardrobeSaveSidePartitions {
    left: boolean;
    right: boolean;
}
//#endregion

//#region IWardrobeSaveSections
/**
 * @typedef IWardrobeSaveSections
 * @param {number} sectionsWidth section width
 * @param {string[]} data id of the section
 */
export interface IWardrobeSaveSections {
    sectionsWidth: number;
    sectionsData: string[];
}
//#endregion

//#region IWardrobeSaveDoors
/**
 * @typedef IWardrobeSaveDoor
 * @param {string} doorTypeId door type
 * @param {string[]} doorPartsMaterialIds door parts material ids
 */
export interface IWardrobeSaveDoor {
    doorTypeId: string;
    doorPartsMaterialIds: string[];
}

/**
 * @typedef IWardrobeSaveDoors
 * @param {boolean} doorsIncluded doors are included?
 * @param {number} doorsWidth door width
 * @param {IWardrobeSaveDoor[]} data doors data
 */
export interface IWardrobeSaveDoors {
    doorsIncluded: boolean;
    doorsWidth: number;
    doorsData: IWardrobeSaveDoor[];
}
//#endregion 

//#region IWardrobeSaveMaterials
/**
 * @typedef IWardrobeSaveMaterials
 * @param {string} corpusMaterialId corpus material ID
 * @param {string} ironWorkMaterialId iron work material ID
 * @param {string} photoWallpaperMaterialId photo wall paper material ID
 */
export interface IWardrobeSaveMaterials {
    corpusMaterialId: string;
    ironWorkMaterialId: string;
    photoWallpaperMaterialId: string;
}
//#endregion

//#region IWardrobeSave
export interface IWardrobeSave {
    dimensions: IWardrobeSaveDimensions;
    sidePartitions: IWardrobeSaveSidePartitions;
    sections: IWardrobeSaveSections;
    doors: IWardrobeSaveDoors;
    materials: IWardrobeSaveMaterials;
}
//#endregion

// ------------------------------------IWardrobeSettings-----------------------------------------

//#region IWardrobeSettingsSections
export interface IWardrobeSettingsSectionsItemData {
    relativeWidth: number;
    absoluteOffsetWidthBoardWidth: number;
    relativeHeight: number;
    absoluteOffsetHeightBoardWidth: number;
    relativePositionX: number;
    absoluteOffsetPositionXBoardWidth: number;
    relativePositionY: number;
    absoluteOffsetPositionYBoardWidth: number;
}
export interface IWardrobeSettingsSectionsItem {
    name: string;
    thumb: string;
    shelves?: IWardrobeSettingsSectionsItemData[];
    verticalShelves?: IWardrobeSettingsSectionsItemData[];
    drawers?: IWardrobeSettingsSectionsItemData[];
    hangers?: IWardrobeSettingsSectionsItemData[];
}
export interface IWardrobeSettingsSections {
    [id: string]: IWardrobeSettingsSectionsItem;
}
//#endregion

//#region IWardrobeSettingsDoors
export interface IWardrobeSettingsDoorsPartData {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface IWardrobeSettingsDoorsItem {
    name: string;
    thumb: string;
    parts: IWardrobeSettingsDoorsPartData[];
}
export interface IWardrobeSettingsDoors {
    [id: string]: IWardrobeSettingsDoorsItem;
}
//#endregion

//#region IWardrobeSettingsMaterial
export interface IWardrobeSettingsMaterialItem {
    name: string;
    texture: string;
    thumb: string;
    category: string;
    materialType: EMaterialType;
    textureType: ETextureType;
}

export interface IWardrobeSettingsMaterial {
    [id: string]: IWardrobeSettingsMaterialItem;
}
//#endregion

//#region IWardrobeSettingsSetup
export interface IMinMax {
    min: number;
    max: number;
}
export interface IWardrobeSettingsSetup {
    boardWidth: number;
    doorsDepth: number;
    rodSpace: number;
    rodRadius: number;
    safetyBoardTrigger: number;
    safetyBoardHeight: number;
    width: IMinMax;
    height: IMinMax;
    depth: IMinMax;
    sectionWidth: IMinMax;
    doorWidth: IMinMax;
    defaultSectionId: string;
    defaultDoorTypeId: string;
    defaultDoorPartsMaterialIds: string[];
    defaultDoorPartsMaterialId: string;
    photoWallpaperDoorPartsMaterialId: string;
    defaultSave: string;
}
//#endregion

//#region IWardrobeRoomSetup
export interface IWardrobeRoomSetup {
    width: number;
    height: number;
    depth: number;
    floorTexture: string;

}
//#endregion

//#region IWardrobeSettings
export interface IWardrobeSettings {
    wardrobeSetup: IWardrobeSettingsSetup;
    sectionsSetup: IWardrobeSettingsSections;
    doorsSetup: IWardrobeSettingsDoors;
    corpusMaterialSetup: IWardrobeSettingsMaterial;
    ironWorkMaterialSetup: IWardrobeSettingsMaterial;
    photoWallpaperMaterialSetup: IWardrobeSettingsMaterial;
    doorPartsMaterialSetup: IWardrobeSettingsMaterial;
    roomSetup: IWardrobeRoomSetup;
}
//#endregion

// -------------------------------------IWardrobeApp----------------------------------------

//#region IWardrobeApp
export interface IWardrobeApp {
    visibleDoors: boolean;
    visibleSectionsClickBoxes: boolean;
    visibleDoorsClickBoxes: boolean;
    visibleDoorsMoveBoxes: boolean;
    visibleDoorsPartsClickBoxes: boolean;
    selectedSection: number;
    selectedDoor: number;
    selectedDoorPart: number;
    enabledOrbitControls: boolean;
    visibleCorpusMaterialDrawer: boolean;
    visibleIronWorkMaterialDrawer: boolean;
    visibleDimensionsDrawer: boolean;
    visibleSectionsDrawer: boolean;
    visibleDoorsDrawer: boolean;
    visibleDoorsPartsDrawer: boolean;
    visiblePhotoWallpaperDrawer: boolean;
    visibleNewDesignDialog: boolean;
    visibleNewDesignLoader: boolean;
    visibleSendDesignDialog: boolean;
    cameraTarget: Vector3Tuple;
    shadows: boolean;
    // roomWallColor: number;
    // roomBottomWallColor: number;
}
//#endregion