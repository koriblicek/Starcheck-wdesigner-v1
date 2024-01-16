import { Material } from "three";
import { Plane } from "@react-three/drei";
import { IWardrobeRoomSetup } from "src/types";

interface IRoomCeilingProps {
    wallMaterial: Material;
    setup: IWardrobeRoomSetup;
}

const RoomCeiling = ({
    wallMaterial,
    setup,
}: IRoomCeilingProps) => {

    return (
        <group>
            {/* ceiling */}
            <Plane castShadow args={[setup.width, setup.depth]} material={wallMaterial} position={[0, setup.height, 0]} rotation={[Math.PI/2,0 , 0]} />
        </group>
    );
};

export default RoomCeiling;