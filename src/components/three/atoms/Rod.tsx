import { Vector3Tuple } from 'three';
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IObjectAnchor } from 'src/types';
import { getPosition } from 'src/utils';
import { useMaterialsStateContext } from 'src/context/context';

interface IRodProps {
    size: Vector3Tuple;
    anchor?: IObjectAnchor;
}

const defaultPosition: Vector3Tuple = [0, 0, 0];
const defaultRotation: Vector3Tuple = [Math.PI / 4, 0, Math.PI / 2];
const defaultAnchor: IObjectAnchor = { x: EObjectXAnchor.middle, y: EObjectYAnchor.middle, z: EObjectZAnchor.middle };
const defaultRodSideWidth: number = 0.01;
function Rod({
    size,
    anchor = defaultAnchor
}: IRodProps) {

    const offsetPosition = getPosition(defaultPosition, anchor, size);

    const { hangerMaterial } = useMaterialsStateContext();

    return (
        <group position={offsetPosition}>
            <mesh rotation={defaultRotation} material={hangerMaterial}>
                <cylinderGeometry args={[size[1], size[1], size[0], 10, 1, true]} />
            </mesh>
            <mesh rotation={defaultRotation} position={[-size[0] / 2 + defaultRodSideWidth / 2, 0, 0]} material={hangerMaterial}>
                <cylinderGeometry args={[size[1] + .005, size[1] + .005, defaultRodSideWidth, 10, 1, false]} />
            </mesh>
            <mesh rotation={defaultRotation} position={[size[0] / 2 - defaultRodSideWidth / 2, 0, 0]} material={hangerMaterial}>
                <cylinderGeometry args={[size[1] + .005, size[1] + .005, defaultRodSideWidth, 10, 1, false]} />
            </mesh>
        </group>
    );
}

export default Rod;