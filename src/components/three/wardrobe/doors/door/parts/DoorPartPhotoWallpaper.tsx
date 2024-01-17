import { useMaterialsStateContext } from "src/context/context";
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IWardrobeSettingsDoorsPartData } from "src/types";
import PlaneUV from "src/components/three/atoms/PlaneUv";

interface IDoorPartPhotoWallpaperProps {
    doorId: number;
    doorsWidth: number;
    doorsCount: number;
    wardrobeHeight: number;
    isVisible: boolean;
    data: IWardrobeSettingsDoorsPartData;
}

const DoorPartPhotoWallpaper = ({
    doorId,
    doorsWidth,
    doorsCount,
    wardrobeHeight,
    isVisible,
    data
}: IDoorPartPhotoWallpaperProps) => {
    
    const { photoWallpaperMaterial } = useMaterialsStateContext();

    const width = 1 / doorsCount;
    const x = doorId * width;
    return (
        <group visible={isVisible}>
            <PlaneUV
                size={[
                    data.width * doorsWidth,
                    data.height * wardrobeHeight
                ]}
                position={[
                    0,
                    data.y * wardrobeHeight,
                    0
                ]}
                uvs={[
                    x, data.y + data.height,
                    x + width, data.y + data.height,
                    x, data.y,
                    x + width, data.y
                ]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.middle }}
                material={photoWallpaperMaterial}
            />
        </group>
    );
};


export default DoorPartPhotoWallpaper;