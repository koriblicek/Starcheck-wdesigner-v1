import { Fragment } from "react";
import { CorpusMaterialDrawer } from "./CorpusMaterialDrawer";
import { IronWorkMaterialDrawer } from "./IronWorkMaterialDrawer";
import { DimensionsDrawer } from "./DimensionsDrawer";
import { SectionsDrawer } from "./SectionsDrawer";
import { DoorsDrawer } from "./DoorsDrawer";
import { PhotoWallpapersDrawer } from "./PhotoWallpapersDrawer";
import { DoorsPartsMaterialDrawer } from "./DoorsPartsMaterialDrawer";

export function Drawers() {
    return (
        <Fragment>
            <CorpusMaterialDrawer />
            <IronWorkMaterialDrawer />
            <DimensionsDrawer />
            <SectionsDrawer />
            <DoorsDrawer />
            <DoorsPartsMaterialDrawer />
            <PhotoWallpapersDrawer />
        </Fragment>
    );
}
