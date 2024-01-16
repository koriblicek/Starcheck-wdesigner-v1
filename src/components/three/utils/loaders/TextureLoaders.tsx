import { Suspense } from "react";
import { useAppSelector } from "src/store/hooks";
import { EMaterialLoader } from "src/types";
import MaterialLoader from "src/components/three/utils/loaders/MaterialLoader";

function TextureLoaders() {
    const storeSettings = useAppSelector((state) => state.wardrobeSettings);
    const { corpusMaterialId, ironWorkMaterialId, photoWallpaperMaterialId } = useAppSelector((state) => state.wardrobeSave.save.materials);
    const cmid = storeSettings.corpusMaterialSetup[corpusMaterialId];
    const iwid = storeSettings.ironWorkMaterialSetup[ironWorkMaterialId];
    const pwpid = storeSettings.photoWallpaperMaterialSetup[photoWallpaperMaterialId];

    return (
        <Suspense fallback={null}>
            {cmid && <MaterialLoader type={EMaterialLoader.corpus} data={cmid} />}
            {iwid && <MaterialLoader type={EMaterialLoader.ironWorks} data={iwid} />}
            {pwpid && <MaterialLoader type={EMaterialLoader.photoWallpaper} data={pwpid} />}
        </Suspense>
    );
}

export default TextureLoaders;