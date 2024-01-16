import { useAppSelector } from 'src/store/hooks';
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IObjectAnchor } from 'src/types';
import { getPosition } from 'src/utils';
import { Vector3Tuple } from 'three';
import { useMemo } from 'react';
import Partitions from './partitions/Partitions';
import Slides from './slides/Slides';
import Sections from './sections/Sections';
import Doors from './doors/Doors';

interface IWardrobeProps {
    position?: Vector3Tuple;
    anchor?: IObjectAnchor;
}

const defaultAnchor: IObjectAnchor = { x: EObjectXAnchor.middle, y: EObjectYAnchor.bottom, z: EObjectZAnchor.back };
const defaultPosition: Vector3Tuple = [0, 0, 0];

function Wardrobe({ anchor = defaultAnchor, position = defaultPosition }: IWardrobeProps) {

    const {
        dimensions: wardrobeDataDimensions,
        sections: wardrobeDataSectionsData,
        sidePartitions: wardrobeDataSidePartitionsData,
        doors: wardrobeDataDoorsData,
    } = useAppSelector((state) => state.wardrobeSave.save);

    const visibleDoors = useAppSelector((state) => state.wardrobeApp.visibleDoors);

    const offsetPosition = useMemo(() => {
        return getPosition(position, anchor, [wardrobeDataDimensions.width, wardrobeDataDimensions.height, wardrobeDataDimensions.depth] as Vector3Tuple);
    }, [position, anchor, wardrobeDataDimensions]);

    const size = useMemo(() => {
        return [wardrobeDataDimensions.width, wardrobeDataDimensions.height, wardrobeDataDimensions.depth] as Vector3Tuple;
    }, [wardrobeDataDimensions]);

    return (
        <group position={offsetPosition}>
            <Partitions
                size={size}
                sectionsData={wardrobeDataSectionsData}
                sidePartitionsData={wardrobeDataSidePartitionsData}
            />
            <Slides
                size={[wardrobeDataDimensions.width, wardrobeDataDimensions.height, wardrobeDataDimensions.depth]}
                visible={visibleDoors}
            />
            <Sections
                size={[wardrobeDataDimensions.width, wardrobeDataDimensions.height, wardrobeDataDimensions.depth]}
                sectionsData={wardrobeDataSectionsData}
                sidePartitionsData={wardrobeDataSidePartitionsData}
            />
            <Doors
                size={[wardrobeDataDimensions.width, wardrobeDataDimensions.height, wardrobeDataDimensions.depth]}
                doorsData={wardrobeDataDoorsData}
                visible={visibleDoors}
            />

        </group>
    );
}

export default Wardrobe;