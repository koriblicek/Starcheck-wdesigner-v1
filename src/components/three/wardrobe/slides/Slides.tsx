import { Vector3Tuple } from 'three';
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IObjectAnchor } from 'src/types';
import { getPosition } from 'src/utils';
import BottomSlide from './bottom/BottomSlide';
import TopSlide from './top/TopSlide';

export interface ISlidesProps {
    size: Vector3Tuple;
    visible: boolean;
}

const defaultAnchor: IObjectAnchor = { x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.front };

function Slides({
    size,
    visible
}: ISlidesProps) {

    const offsetPosition = getPosition([-size[0], -size[1], size[2]], defaultAnchor, [size[0], size[1], size[2]]);

    return (
        <group position={offsetPosition} visible={visible}>
            <BottomSlide width={size[0]} />
            <TopSlide width={size[0]} height={size[1]} />
        </group>
    );
}

export default Slides;