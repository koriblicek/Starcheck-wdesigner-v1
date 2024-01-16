import { Material } from "three";
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IWardrobeRoomSetup } from "src/types";
import Board from "../atoms/Board";


interface IRoomBackSideProps {
    wallMaterial: Material;
    setup: IWardrobeRoomSetup;
}

const RoomBackSide = ({
    wallMaterial,
    setup,
}: IRoomBackSideProps) => {

    return (
        <group>
            {/* wall */}
            <Board
                size={[setup.width, setup.height, .15]}
                position={[0, 0, setup.depth / 2]}
                material={wallMaterial}
                anchor={{ x: EObjectXAnchor.middle, y: EObjectYAnchor.bottom, z: EObjectZAnchor.back }}
            />
            {/* <Plane castShadow size={[setup.width, setup.height]} material={wallMaterial} position={[0, setup.height / 2, setup.depth / 2]} rotation={[0, Math.PI, 0]} /> */}
        </group>
    );
};

export default RoomBackSide;