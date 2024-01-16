import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, ETextureType, IWardrobeSettingsDoorsPartData, IWardrobeSettingsMaterialItem } from "src/types";
import { useTexture } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Material, MeshStandardMaterial, Vector3Tuple } from "three";
import { useAppSelector } from "src/store/hooks";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { useDispatch } from "react-redux";
import PlaneUV from "src/components/three/atoms/PlaneUv";
import DoorPartClickBox from "../box/DoorPartClickBox";

function useDoorPartMaterialLoader(data: IWardrobeSettingsMaterialItem) {
    //const envMap = useEnvironment({ files: "/data/envMaps/HDR_111_Parking_Lot_2_Env.hdr" });
    const [material, setMaterial] = useState<Material>(new MeshStandardMaterial());
    const { map } = useTexture({ map: data.texture });

    useEffect(() => {
        if (map) {
            switch (data.textureType) {
                case ETextureType.STANDARD:
                    setMaterial(new MeshStandardMaterial({ map: map }));
                    break;
                case ETextureType.REFLECTIVE:
                    //setMaterialJSX(<MeshReflectorMaterial resolution={1024} mirror={0} map={map} mixStrength={.2} />);
                    setMaterial(new MeshStandardMaterial({ map: map }));
                    break;
                case ETextureType.METALLIC:
                    setMaterial(new MeshStandardMaterial({ map: map, metalness: .68, roughness: .7 }));
                    break;
                case ETextureType.SEMITRANSPARENT:
                    //setMaterialJSX(<MeshReflectorMaterial depthWrite={true} depthTest={true} transparent={true} opacity={.4} resolution={1024} mirror={0} map={map} mixStrength={1} />);
                    setMaterial(new MeshStandardMaterial({ map: map, depthWrite: false, depthTest: true, transparent: true, opacity: 0.6 }));
                    break;
                case ETextureType.TRANSPARENT:
                    setMaterial(new MeshStandardMaterial({ map: map, depthWrite: false, depthTest: true, transparent: true, opacity: 0.2 }));
                    break;
                case ETextureType.MIRROR:
                    //setMaterialJSX(<MeshReflectorMaterial mirror={.8} resolution={1024} mixBlur={1.25} mixStrength={1.25} depthScale={10} minDepthThreshold={.25} maxDepthThreshold={.8} metalness={0} roughness={1} map={map} />);
                    setMaterial(new MeshStandardMaterial({ map: map }));
                    break;
            }
        }
    }, [map, data.textureType]);

    return material;
}

interface IDoorPartProps {
    doorsWidth: number;
    doorId: number;
    doorPartId: number;
    wardrobeHeight: number;
    negativePosition: Vector3Tuple;
    textureId: string;
    data: IWardrobeSettingsDoorsPartData;
}

const DoorPart = ({
    doorId,
    doorPartId,
    doorsWidth,
    wardrobeHeight,
    negativePosition,
    textureId,
    data
}: IDoorPartProps) => {

    const dispatch = useDispatch();

    const { doorPartsMaterialSetup, wardrobeSetup } = useAppSelector((state) => state.wardrobeSettings);

    //find texture from doorPartsMaterialSetup
    const texture = doorPartsMaterialSetup[textureId];

    const material = useDoorPartMaterialLoader(texture);

    const visibleDoorsParts = useAppSelector(state => state.wardrobeApp.visibleDoorsPartsClickBoxes);

    const selectedDoor = useAppSelector(state => state.wardrobeApp.selectedDoor);
    const selectedDoorPart = useAppSelector(state => state.wardrobeApp.selectedDoorPart);

    function handleClick() {
        dispatch(wardrobeAppActions.selectDoor({ doorId }));
        dispatch(wardrobeAppActions.selectDoorPart({ doorPartId }));
        dispatch(wardrobeAppActions.toggleDoorsPartsDrawer());
    }

    return (
        <group>
            <group position={[0, -negativePosition[1], -negativePosition[2] - wardrobeSetup.doorsDepth / 2]}>
                {visibleDoorsParts &&
                    <DoorPartClickBox
                        onClick={() => handleClick()}
                        size={[data.width * doorsWidth, data.height * wardrobeHeight, wardrobeSetup.doorsDepth]}
                        position={[0, data.y * wardrobeHeight, 0]}
                        anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.middle }}
                        visible={(selectedDoorPart === doorPartId && selectedDoor === doorId)}
                    />
                }
            </group>
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
                    data.y, data.x + data.width,
                    data.y + data.height, data.x + data.width,
                    data.y, data.x,
                    data.y + data.height, data.x
                ]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.middle }}
                material={material}
                flipWxH
            />
        </group>
    );
};


export default DoorPart;