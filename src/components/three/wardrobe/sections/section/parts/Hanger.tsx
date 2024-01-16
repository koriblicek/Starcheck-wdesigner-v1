import { useAppSelector } from "src/store/hooks";
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IObjectAnchor, IWardrobeSettingsSectionsItemData } from "src/types";
import { Group, Vector3Tuple } from "three";
import { Suspense, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Rod from "src/components/three/atoms/Rod";


export interface IHangerProps {
    size: Vector3Tuple;
    data: IWardrobeSettingsSectionsItemData;
}

const anchor = { x: EObjectXAnchor.left, y: EObjectYAnchor.middle, z: EObjectZAnchor.middle } as IObjectAnchor;

function Hanger({ size, data }: IHangerProps) {

    const [rnd] = useState<number>(0.7 + 0.3 * Math.random());
    const { boardWidth, safetyBoardHeight, rodSpace, rodRadius } = useAppSelector((state) => state.wardrobeSettings.wardrobeSetup);

    // const { scene:scene1 } = useGLTF("/data/objects/wardrobe/hanger1.gltf");
    const { scene:scene2 } = useGLTF("/data/objects/wardrobe/hanger2.gltf");
    const hangerCopy1 = useMemo(() => scene2.clone(), [scene2]);
    const hangerCopy2 = useMemo(() => scene2.clone(), [scene2]);

    const hRef1 = useRef<Group | null>(null);
    const hRef2 = useRef<Group | null>(null);

    useFrame((state) => {
        if (hRef1.current) {
            hRef1.current.rotation.z = 0.05 * Math.cos(state.clock.elapsedTime * rnd * 2);
            hRef1.current.rotation.y = 0.025 * Math.sin(state.clock.elapsedTime * rnd * 2);
        }
        if (hRef2.current) {
            hRef2.current.rotation.z = 0.05 * Math.sin(state.clock.elapsedTime * rnd * 1.9);
            hRef2.current.rotation.y = 0.025 * Math.cos(state.clock.elapsedTime * rnd * 1.8);
        }
    });
    return (
        <group position={[data.relativePositionX * size[0] + data.absoluteOffsetPositionXBoardWidth * boardWidth, data.relativePositionY * size[1] + safetyBoardHeight * data.relativeHeight - rodSpace, -size[2] / 2]}>
            <Suspense fallback={null}>
                <group castShadow ref={hRef1} position={[2 * (size[0] * data.relativeWidth + data.absoluteOffsetWidthBoardWidth * boardWidth) / 3, 0, 0]} scale={[1.2, 1.2, 1.2]} >
                    <primitive object={hangerCopy1} />
                </group>
                <group castShadow ref={hRef2} position={[(size[0] * data.relativeWidth + data.absoluteOffsetWidthBoardWidth * boardWidth) / 3, 0, 0]} scale={[1.2, 1.2, 1.2]} >
                    <primitive object={hangerCopy2} />
                </group>
            </Suspense>
            <Rod
                size={[
                    size[0] * data.relativeWidth + data.absoluteOffsetWidthBoardWidth * boardWidth,
                    rodRadius,
                    rodRadius
                ]}
                anchor={anchor}
            />
        </group>
    );
}

export default Hanger;