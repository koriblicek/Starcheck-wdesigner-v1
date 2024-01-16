import { Vector3Tuple } from 'three';
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IWardrobeSaveSections, IWardrobeSaveSidePartitions } from 'src/types';
import { useAppSelector } from 'src/store/hooks';
import { useMaterialsStateContext } from 'src/context/context';
import Board from 'src/components/three/atoms/Board';

export interface ISidePartitionsProps {
    size: Vector3Tuple;
    sectionsData: IWardrobeSaveSections;
    sidePartitionsData: IWardrobeSaveSidePartitions;
}

function SectionsPartitions({
    size,
    sectionsData,
    sidePartitionsData
}: ISidePartitionsProps) {

    //get settings
    const { boardWidth, doorsDepth, safetyBoardTrigger, safetyBoardHeight } = useAppSelector((state) => state.wardrobeSettings.wardrobeSetup);

    //get corpus material
    const { corpusMaterial } = useMaterialsStateContext();

    const sectionsPartitionsHeight = (size[1] >= safetyBoardTrigger) ? safetyBoardHeight : size[1];

    const partitions = sectionsData.sectionsData.map((id, index) => {
        if (index === 0) {
            return null;
        }
        return <Board
            key={`${index}-${id}`}
            position={[(sidePartitionsData.left ? boardWidth : 0) + index * (sectionsData.sectionsWidth + boardWidth), 0, -doorsDepth]}
            size={[boardWidth, sectionsPartitionsHeight, size[2] - doorsDepth]}
            anchor={{ x: EObjectXAnchor.right, y: EObjectYAnchor.bottom, z: EObjectZAnchor.front }}
            material={corpusMaterial}
            flipWxH
        />;
    });
    
    return (
        <group>
            {partitions}
        </group>
    );
}

export default SectionsPartitions;