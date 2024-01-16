import { useMaterialsStateContext } from "src/context/context";
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IObjectAnchor, IWardrobeSettingsDoorsPartData } from "src/types";
import Board from "src/components/three/atoms/Board";

interface IDividerProps {
    doorsWidth: number;
    wardrobeHeight: number;
    data: IWardrobeSettingsDoorsPartData;
}

const dividerHeight: number = 0.03;
const dividerDepth: number = 0.002;
const defaultAnchor: IObjectAnchor = { x: EObjectXAnchor.left, y: EObjectYAnchor.middle, z: EObjectZAnchor.middle };
function Divider({ doorsWidth, wardrobeHeight, data }: IDividerProps) {

    //get iron works material
    const { ironWorkMaterial } = useMaterialsStateContext();

    return (
        <group>
            <Board
                size={[doorsWidth * data.width, dividerHeight, dividerDepth]}
                position={[data.x, data.y * wardrobeHeight + data.height * wardrobeHeight, 0]}
                anchor={defaultAnchor}
                material={ironWorkMaterial}
            />
        </group>
    );
}

export default Divider;