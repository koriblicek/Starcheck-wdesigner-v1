import { Vector3Tuple } from 'three';
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IObjectAnchor, IWardrobeSaveSections, IWardrobeSaveSidePartitions } from 'src/types';
import { getPosition } from 'src/utils';
import SidePartitions from './side/SidePartitions';
import SectionsPartitions from './sections/SectionsPartitions';
import SafetyPartition from './safety/SafetyPartition';

export interface IPartitionsProps {
    size: Vector3Tuple;
    sectionsData: IWardrobeSaveSections;
    sidePartitionsData: IWardrobeSaveSidePartitions;
}

const defaultAnchor: IObjectAnchor = { x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.front };

function Partitions({
    size,
    sectionsData,
    sidePartitionsData
}: IPartitionsProps) {

    const offsetPosition = getPosition([-size[0], -size[1], size[2]], defaultAnchor, [size[0], size[1], size[2]]);

    return (
        <group position={offsetPosition}>
            <SidePartitions
                size={size}
                sidePartitionsData={sidePartitionsData}
            />
            <SectionsPartitions
                size={size}
                sectionsData={sectionsData}
                sidePartitionsData={sidePartitionsData}
            />
            <SafetyPartition
                size={size}
                sidePartitionsData={sidePartitionsData}
            />
        </group>
    );
}

export default Partitions;