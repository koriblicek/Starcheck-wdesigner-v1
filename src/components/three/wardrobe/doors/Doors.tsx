import { useAppSelector } from 'src/store/hooks';
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IObjectAnchor, IWardrobeSaveDoors } from 'src/types';
import { getPosition } from 'src/utils';
import { Vector3Tuple } from 'three';
import Door from './door/Door';

export interface IDoorsProps {
    size: Vector3Tuple;
    doorsData: IWardrobeSaveDoors;
    visible: boolean;
}

const defaultAnchor: IObjectAnchor = { x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.front };
function Doors({
    size,
    doorsData,
    visible
}: IDoorsProps) {

    const { boardWidth, doorsDepth } = useAppSelector((state) => state.wardrobeSettings.wardrobeSetup);

    const doors = doorsData.doorsData.map((item, index) => {
        return <Door
            key={`${index}-${item.doorTypeId}`}
            doorId={index}
            doorReferenceId={item.doorTypeId}
            doorCount={doorsData.doorsData.length}
            size={[doorsData.doorsWidth, size[1]]}
            data={doorsData.doorsData[index]}
            position={[boardWidth + index * doorsData.doorsWidth, 0, -doorsDepth * 1 / 4 - (index % 2) * doorsDepth * 2 / 4]}
        />;
    });

    const offsetPosition = getPosition([-size[0], -size[1], size[2]], defaultAnchor, [size[0], size[1], size[2]]);

    return (
        <group position={offsetPosition} visible={visible}>
            {doors}
        </group>
    );
}

export default Doors;