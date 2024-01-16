import { Material } from "three";
import { useGLTF } from "@react-three/drei";
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IWardrobeRoomSetup, IWardrobeSaveDimensions } from "src/types";
import Board from "../atoms/Board";
import { Suspense, useMemo } from "react";

const rightWallExtraDepth = 0.30;
const rightWallWidth = 0.10;
const bottomWallHeight = 0.20;
const bottomWallExtraDepth = 0.02;

interface IRoomRightSideProps {
    wallMaterial: Material;
    bottomWallMaterial: Material;
    wardrobeDimensions: IWardrobeSaveDimensions;
    setup: IWardrobeRoomSetup;
}

const RoomRightSide = ({
    wallMaterial,
    bottomWallMaterial,
    wardrobeDimensions,
    setup
}: IRoomRightSideProps) => {

    const { scene } = useGLTF("/data/objects/room/window.gltf");
    scene.children.forEach((mesh) => {
        mesh.castShadow = true;
    });
    scene.castShadow = true;

    const window1 = useMemo(() => scene.clone(), [scene]);
    const window2 = useMemo(() => scene.clone(), [scene]);

    return (
        <group>
            <Suspense fallback={null}>
                <group position={[setup.width / 2, .05, -setup.depth / 2 + wardrobeDimensions.depth + rightWallExtraDepth]} >
                    <primitive object={window1} />
                </group>
                <group position={[setup.width / 2, .05, -setup.depth / 2 + wardrobeDimensions.depth + rightWallExtraDepth + 1.5]} >
                    <primitive object={window2} />
                </group>
            </Suspense>
            {/* wall */}
            {/* Right side wall - front */}
            <Board
                size={[rightWallWidth, setup.height, wardrobeDimensions.depth + rightWallExtraDepth]}
                position={[setup.width / 2, 0, -setup.depth / 2]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.back }}
                material={wallMaterial}
            />
            {/* Right side bottom wall - front */}
            <Board
                size={[bottomWallExtraDepth, bottomWallHeight, wardrobeDimensions.depth + rightWallExtraDepth]}
                position={[setup.width / 2, 0, -setup.depth / 2]}
                anchor={{ x: EObjectXAnchor.right, y: EObjectYAnchor.bottom, z: EObjectZAnchor.back }}
                material={bottomWallMaterial}
            />
            {/* Right side wall - under window*/}
            <Board
                size={[rightWallWidth, .05, 3.00]}
                position={[setup.width / 2, 0, -setup.depth / 2 + wardrobeDimensions.depth + rightWallExtraDepth]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.back }}
                material={wallMaterial}
            />
            {/* Right side wall - over window*/}
            <Board
                size={[rightWallWidth, setup.height - 2.2, 3.00]}
                position={[setup.width / 2, setup.height, -setup.depth / 2 + wardrobeDimensions.depth + rightWallExtraDepth]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.top, z: EObjectZAnchor.back }}
                material={wallMaterial}
            />
            {/* Right side wall - back */}
            <Board
                size={[rightWallWidth, setup.height, wardrobeDimensions.depth + rightWallExtraDepth + 3.00]}
                position={[setup.width / 2, 0, -setup.depth / 2 + wardrobeDimensions.depth + rightWallExtraDepth + 3.00]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.back }}
                material={wallMaterial}
            />
        </group>
    );
};

export default RoomRightSide;