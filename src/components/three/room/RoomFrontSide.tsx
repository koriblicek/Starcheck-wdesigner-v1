import { Material } from "three";
import { Plane } from "@react-three/drei";
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IWardrobeRoomSetup, IWardrobeSaveDimensions, IWardrobeSaveSidePartitions } from "src/types";
import Board from "../atoms/Board";

const leftWallDepth = 1.50;
const rightWallExtraDepth = 0.10;
const bottomWallHeight = 0.20;
const bottomWallExtraDepth = 0.02;

interface IRoomFrontSideProps {
    wallMaterial: Material;
    bottomWallMaterial: Material;
    setup: IWardrobeRoomSetup;
    wardrobeDimensions: IWardrobeSaveDimensions;
    sidePartitions: IWardrobeSaveSidePartitions;
}

const RoomFrontSide = ({
    wallMaterial,
    bottomWallMaterial,
    setup,
    wardrobeDimensions,
    sidePartitions
}: IRoomFrontSideProps) => {

    return (
        <group>
            {/* wall */}
            <Plane receiveShadow args={[setup.width, setup.height]} material={wallMaterial} position={[0, setup.height / 2, -setup.depth / 2]} />
            {/* left side wall & left side bottom wall*/}
            {!sidePartitions.left &&
                <group>
                    <Board
                        size={[(setup.width - wardrobeDimensions.width) / 2, setup.height, leftWallDepth]}
                        position={[-setup.width / 2, 0, -setup.depth / 2]}
                        anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.back }}
                        material={wallMaterial}
                    />
                    <Board
                        size={[(setup.width - wardrobeDimensions.width) / 2 + bottomWallExtraDepth, bottomWallHeight, leftWallDepth + bottomWallExtraDepth - wardrobeDimensions.depth]}
                        position={[-setup.width / 2, 0, -setup.depth / 2 + wardrobeDimensions.depth]}
                        anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.back }}
                        material={bottomWallMaterial}
                    />
                </group>
            }
            {/* right side wall & right side bottom wall*/}
            {!sidePartitions.right &&
                <group>
                    <Board size={[(setup.width - wardrobeDimensions.width) / 2, wardrobeDimensions.height, wardrobeDimensions.depth + rightWallExtraDepth]}
                        position={[setup.width / 2, 0, -setup.depth / 2]}
                        anchor={{ x: EObjectXAnchor.right, y: EObjectYAnchor.bottom, z: EObjectZAnchor.back }}
                        material={wallMaterial}
                    />
                    <Board
                        size={[(setup.width - wardrobeDimensions.width) / 2 + bottomWallExtraDepth, bottomWallHeight, rightWallExtraDepth + bottomWallExtraDepth]}
                        position={[setup.width / 2, 0, -setup.depth / 2 + wardrobeDimensions.depth]}
                        anchor={{ x: EObjectXAnchor.right, y: EObjectYAnchor.bottom, z: EObjectZAnchor.back }}
                        material={bottomWallMaterial}
                    />
                </group>
            }

            {/* top wall */}
            <Board size={[
                setup.width, setup.height - wardrobeDimensions.height, wardrobeDimensions.depth + rightWallExtraDepth]}
                position={[0, setup.height, -setup.depth / 2]}
                anchor={{ x: EObjectXAnchor.middle, y: EObjectYAnchor.top, z: EObjectZAnchor.back }}
                material={wallMaterial}
            />
        </group>
    );
};

export default RoomFrontSide;