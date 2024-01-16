import { useMaterialsStateContext } from "src/context/context";
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor } from "src/types";
import Board from "src/components/three/atoms/Board";

interface IHandlesProps {
    doorsWidth: number;
    wardrobeHeight: number;
}

const handlesWidth: number = 0.03;
const handlesDepth: number = 0.04;
const handlesOffset: number = 0.01;

function Handles({ doorsWidth, wardrobeHeight }: IHandlesProps) {
    //get iron works material
    const { ironWorkMaterial } = useMaterialsStateContext();

    return (
        <group>
            {/* left handle */}
            <Board
                size={[handlesWidth, wardrobeHeight, handlesDepth]}
                position={[-handlesOffset / 2, 0, 0]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.middle }}
                material={ironWorkMaterial}
                flipWxH
            />
            {/* right handle */}
            <Board
                size={[handlesWidth, wardrobeHeight, handlesDepth]}
                position={[doorsWidth + handlesOffset / 2, 0, 0]}
                anchor={{ x: EObjectXAnchor.right, y: EObjectYAnchor.bottom, z: EObjectZAnchor.middle }}
                material={ironWorkMaterial}
                flipWxH
            />
        </group>
    );
}

export default Handles;