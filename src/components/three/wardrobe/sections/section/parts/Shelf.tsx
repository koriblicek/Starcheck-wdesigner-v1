import { useAppSelector } from "src/store/hooks";
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IWardrobeSettingsSectionsItemData } from "src/types";
import { Vector3Tuple } from "three";
import { useMaterialsStateContext } from "src/context/context";
import Board from "src/components/three/atoms/Board";

export interface IShelfProps {
    size: Vector3Tuple;
    data: IWardrobeSettingsSectionsItemData;
}

function Shelf({ size, data }: IShelfProps) {
    //get corpus material
    const { corpusMaterial } = useMaterialsStateContext();

    const { boardWidth } = useAppSelector((state) => state.wardrobeSettings.wardrobeSetup);

    return (
        <group position={[data.relativePositionX * size[0], data.relativePositionY * size[1], 0]}>
            <Board
                position={[
                    data.absoluteOffsetPositionXBoardWidth * boardWidth,
                    data.absoluteOffsetPositionYBoardWidth * boardWidth,
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
        </group>
    );
}

export default Shelf;