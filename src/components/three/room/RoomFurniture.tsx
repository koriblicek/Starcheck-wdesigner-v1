import { useGLTF } from "@react-three/drei";
import { IWardrobeRoomSetup, IWardrobeSaveDimensions } from "src/types";
import { Suspense, useEffect, useMemo } from "react";

interface IRoomFurnitureProps {
    wardrobeDimensions: IWardrobeSaveDimensions;
    setup: IWardrobeRoomSetup;
}

const RoomFurniture = ({
    wardrobeDimensions,
    setup
}: IRoomFurnitureProps) => {

    const chair = useGLTF("/data/objects/room/chair.gltf");
    const table = useGLTF("/data/objects/room/table.gltf");
    const curtain = useGLTF("/data/objects/room/curtain.gltf");

    const chair1 = useMemo(() => chair.scene.clone(), [chair.scene]);
    const chair2 = useMemo(() => chair.scene.clone(), [chair.scene]);
    const table1 = useMemo(() => table.scene.clone(), [table.scene]);
    const curtain1 = useMemo(() => curtain.scene.clone(), [curtain.scene]);

    useEffect(() => {
        table.scene.traverse((child) => {
            if (child.isObject3D) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        chair.scene.traverse((child) => {
            if (child.isObject3D) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }, [table.scene, chair.scene]);

    return (
        <group>
            <Suspense fallback={null}>
                <group position={[-1.2, 0, .5]} rotation={[0, Math.PI * 2 / 3, 0]}>
                    <primitive object={chair1}/>
                </group>
                <group position={[1.3, 0, .5]} rotation={[0, Math.PI * 4.2 / 3, 0]} >
                    <primitive object={chair2} />
                </group>
                <group position={[0, 0, .3]} scale={[1.5, 1, 1.5]}>
                    <primitive object={table1} />
                </group>
                <group position={[setup.width / 2 - .3, 0, -setup.depth / 2 + wardrobeDimensions.depth + 0.2]} scale={[1, 1, 1]} rotation={[0, -Math.PI / 2, 0]}>
                    <primitive object={curtain1}/>
                </group>
            </Suspense>
        </group>
    );
};

export default RoomFurniture;