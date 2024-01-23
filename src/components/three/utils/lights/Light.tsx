import { Fragment, useEffect, useRef, useState } from "react";
import { Group } from 'three';
import { easing } from "maath";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { useAppSelector } from "src/store/hooks";

interface ILightProps {
    shadows: boolean;
}
function Light({ shadows }: ILightProps) {
    const ref = useRef<Group>(null);
    const [o] = useState(() => new THREE.Object3D());

    useFrame((state, delta) => {
        if (ref.current !== null)
            //(state.pointer.y * Math.PI) / 8, (state.pointer.x * Math.PI) / 10
            easing.dampE(ref.current.rotation, [.2 + 0.1 * state.pointer.y, -0.1 + 0.1 * state.pointer.x, 0], .5, delta);
    });
    shadows = useAppSelector(state => state.wardrobeApp.shadows);

    const three = useThree();
    
    useEffect(() => {
        three.gl.render(three.scene, three.camera);
    }, [shadows]);

    return (
        <group ref={ref}>
            <ambientLight intensity={shadows ? 1.4 : 2.6} />
            {shadows &&
                <Fragment>
                    <directionalLight position={[8, 1, 1]} castShadow={true} intensity={3.6} shadow-mapSize={1024} shadow-bias={-.005} target={o}>
                        <orthographicCamera attach="shadow-camera" args={[-10, 3, 5, -6, 0, 15]} />
                    </directionalLight>
                    <directionalLight position={[0, 2, 0]} intensity={1.3} target={o} />
                    <primitive object={o} position={[0, 0, -1]} />
                </Fragment>
            }
        </group>
    );
}

export default Light;