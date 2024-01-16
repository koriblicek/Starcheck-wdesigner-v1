import { Vector3Tuple } from 'three';
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IWardrobeSaveSidePartitions } from 'src/types';
import { useAppSelector } from 'src/store/hooks';
import { useMaterialsStateContext } from 'src/context/context';
import Board from 'src/components/three/atoms/Board';

export interface ISafetyPartitionProps {
    size: Vector3Tuple;
    sidePartitionsData: IWardrobeSaveSidePartitions;
}

function SafetyPartition({
    size,
    sidePartitionsData
}: ISafetyPartitionProps) {

    //get settings from store
    const { boardWidth, doorsDepth, safetyBoardTrigger, safetyBoardHeight } = useAppSelector((state) => state.wardrobeSettings.wardrobeSetup);
    //get corpus material
    const { corpusMaterial } = useMaterialsStateContext();

    return (
        <group>
            <Board
                position={[(sidePartitionsData.left ? boardWidth : 0), safetyBoardHeight, -doorsDepth]}
                size={[size[0] - (sidePartitionsData.left ? 1 : 0) * boardWidth - (sidePartitionsData.right ? 1 : 0) * boardWidth, boardWidth, size[2] - doorsDepth]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.front }}
                material={corpusMaterial}
                visible={(size[1] >= safetyBoardTrigger)}
            />
        </group>
    );
}

export default SafetyPartition;