import { useAppSelector } from "src/store/hooks";
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IWardrobeSettingsSectionsItemData } from "src/types";
import { Vector3Tuple } from "three";
import { useMaterialsStateContext } from "src/context/context";
import Board from "src/components/three/atoms/Board";

export interface IDrawerProps {
    size: Vector3Tuple;
    data: IWardrobeSettingsSectionsItemData;
}

function Drawer({ size, data }: IDrawerProps) {

    const { boardWidth } = useAppSelector((state) => state.wardrobeSettings.wardrobeSetup);
    //get corpus/hanger material
    const { corpusMaterial, hangerMaterial } = useMaterialsStateContext();

    return (
        <group position={[data.relativePositionX * size[0], data.relativePositionY * size[1], 0]}>
            {/* BOTTOM */}
            <Board
                position={[
                    0,
                    0,
                    0
                ]}
                size={[
                    size[0] * data.relativeWidth + data.absoluteOffsetWidthBoardWidth * boardWidth,
                    boardWidth,
                    size[2]
                ]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.front }}
                material={corpusMaterial}
            />
            {/* FRONT */}
            <Board
                position={[
                    0,
                    boardWidth,
                    0
                ]}
                size={[
                    size[0] * data.relativeWidth + data.absoluteOffsetWidthBoardWidth * boardWidth,
                    size[1] * data.relativeHeight,
                    boardWidth
                ]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.front }}
                material={corpusMaterial}
            />
            {/* BACK */}
            <Board
                position={[
                    0,
                    boardWidth,
                    -size[2]
                ]}
                size={[
                    size[0] * data.relativeWidth,
                    size[1] * data.relativeHeight,
                    boardWidth
                ]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.back }}
                material={corpusMaterial}
            />
            {/* LEFT */}
            <Board
                position={[
                    0,
                    boardWidth,
                    -boardWidth
                ]}
                size={[
                    boardWidth,
                    size[1] * data.relativeHeight,
                    size[2] - 2 * boardWidth
                ]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.front }}
                material={corpusMaterial}
            />
            {/* RIGHT */}
            <Board
                position={[
                    size[0] * data.relativeWidth + data.absoluteOffsetWidthBoardWidth * boardWidth,
                    boardWidth,
                    -boardWidth
                ]}
                size={[
                    boardWidth,
                    size[1] * data.relativeHeight,
                    size[2] - 2 * boardWidth

                ]}
                anchor={{ x: EObjectXAnchor.right, y: EObjectYAnchor.bottom, z: EObjectZAnchor.front }}
                material={corpusMaterial}
            />
            {/* HANDLE */}
            <Board
                position={[
                    (size[0] * data.relativeWidth + data.absoluteOffsetWidthBoardWidth * boardWidth) / 2,
                    (size[1] * data.relativeHeight) / 2,
                    0
                ]}
                size={[
                    .25,
                    .01,
                    .02

                ]}
                anchor={{ x: EObjectXAnchor.middle, y: EObjectYAnchor.middle, z: EObjectZAnchor.back }}
                material={hangerMaterial}
            />
        </group>
    );
}

export default Drawer;