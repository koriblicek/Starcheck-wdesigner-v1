import { Material, Vector3Tuple } from 'three';
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IObjectAnchor } from 'src/types';
import { getPosition } from 'src/utils';

interface IBoardProps {
    position: Vector3Tuple;
    size: Vector3Tuple;
    flipWxH?: boolean;
    anchor?: IObjectAnchor;
    material?: Material;
    visible?: boolean;
}

const defaultAnchor: IObjectAnchor = { x: EObjectXAnchor.middle, y: EObjectYAnchor.middle, z: EObjectZAnchor.middle };
const defaultRotation: Vector3Tuple = [0, 0, 0];
const flipWxHRotation: Vector3Tuple = [0, 0, Math.PI / 2];

function Board({
    position,
    size,
    flipWxH = false,
    anchor = defaultAnchor,
    material = undefined,
    visible = true
}: IBoardProps) {

    const offsetPosition = getPosition(position, anchor, size);

    if (flipWxH) {
        size = [size[1], size[0], size[2]];
    }

    return (
        <group position={offsetPosition} visible={visible}>
            <mesh castShadow receiveShadow material={material} rotation={flipWxH ? flipWxHRotation : defaultRotation}>
                <boxGeometry args={size} />
                {/* TODO Delete mesh standard material */}
                {!material && <meshStandardMaterial color={Math.random() * 65536 * 256} />}
            </mesh>
        </group>
    );
}

export default Board;