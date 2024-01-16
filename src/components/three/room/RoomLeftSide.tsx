import { Material } from "three";
import { Plane } from "@react-three/drei";
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IWardrobeRoomSetup } from "src/types";
import Board from "../atoms/Board";

const bottomWallHeight = 0.20;
const bottomWallExtraDepth = 0.02;

interface IRoomFrontSideProps {
    wallMaterial: Material;
    bottomWallMaterial: Material;
    setup: IWardrobeRoomSetup;
}

const RoomLeftSide = ({
    wallMaterial,
    bottomWallMaterial,
    setup
}: IRoomFrontSideProps) => {

    return (
        <group>
            {/* wall */}
            <Plane receiveShadow args={[setup.depth, setup.height]} material={wallMaterial} position={[-setup.width / 2, setup.height / 2, 0]} rotation={[0, Math.PI / 2, 0]} />
            {/* left side bottom wall */}
            <Board
                size={[bottomWallExtraDepth, bottomWallHeight, setup.depth]}
                position={[-setup.width / 2, 0, -setup.depth / 2]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.back }}
                material={bottomWallMaterial}
            />
        </group>
    );
};

export default RoomLeftSide;