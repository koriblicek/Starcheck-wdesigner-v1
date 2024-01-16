import { Vector3Tuple } from "three";
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IWardrobeSaveSidePartitions } from "src/types";
import { useAppSelector } from "src/store/hooks";
import { useMaterialsStateContext } from "src/context/context";
import Board from "src/components/three/atoms/Board";

export interface ISidePartitionsProps {
    size: Vector3Tuple;
    sidePartitionsData: IWardrobeSaveSidePartitions;
}

function SidePartitions({
    size,
    sidePartitionsData
}: ISidePartitionsProps) {

    //get settings
    const { boardWidth, doorsDepth } = useAppSelector((state) => state.wardrobeSettings.wardrobeSetup);
    //get corpus material
    const { corpusMaterial } = useMaterialsStateContext();

    //setup left and right partitions
    const leftBoard = <Board
        position={[0, 0, 0]}
        size={[boardWidth, size[1], sidePartitionsData.left ? size[2] : doorsDepth]}
        anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.front }}
        material={corpusMaterial}
        flipWxH
    />;
    const rightBoard = <Board
        position={[size[0], 0, 0]}
        size={[boardWidth, size[1], sidePartitionsData.right ? size[2] : doorsDepth]}
        anchor={{ x: EObjectXAnchor.right, y: EObjectYAnchor.bottom, z: EObjectZAnchor.front }}
        material={corpusMaterial}
        flipWxH
    />;

    return (
        <group>
            {leftBoard}
            {rightBoard}
        </group>
    );
}

export default SidePartitions;