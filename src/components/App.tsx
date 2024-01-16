import { Canvas, useFrame } from '@react-three/fiber';
import { Group, NoToneMapping } from 'three';
import { Perf } from 'r3f-perf';
import { useAppSelector } from 'src/store/hooks';
import { Controls } from './ui/Controls';
import { Drawers } from './ui/drawers/Drawers';
import { ExtendedOrbitControls } from './three/utils/camera/ExtendedOrbitControls';
import { Room } from './three/room/Room';
import { Suspense, useRef, useState } from 'react';
import { easing } from "maath";
import { Environment, SoftShadows } from '@react-three/drei';
import { RoomScreenshoting } from './three/room/RoomScreenshoting';
import Wardrobe from './three/wardrobe/Wardrobe';
import TextureLoaders from './three/utils/loaders/TextureLoaders';
import * as THREE from 'three';

function Light() {
    const ref = useRef<Group>(null);
    const [o] = useState(() => new THREE.Object3D());

    useFrame((state, delta) => {
        if (ref.current !== null)
            //(state.pointer.y * Math.PI) / 8, (state.pointer.x * Math.PI) / 10
            easing.dampE(ref.current.rotation, [.2 + 0.1 * state.pointer.y, -0.1 + 0.1 * state.pointer.x, 0], .5, delta);
    });

    return (
        <group ref={ref}>
            <ambientLight intensity={1.4} />
            <directionalLight position={[8, 1, 1]} castShadow intensity={3.6} shadow-mapSize={2048} shadow-bias={-0.0001} target={o}>
                <orthographicCamera attach="shadow-camera" args={[-10, 3, 5, -6, 0, 15]} />
            </directionalLight>
            <directionalLight position={[0, 2, 0]} intensity={1.3} target={o} />
            <primitive object={o} position={[0, 0, -1]} />
        </group>
    );
}

function LightScreenshoting() {
    const [o] = useState(() => new THREE.Object3D());
    return (
        <group >
            <ambientLight intensity={3.6} />
            <directionalLight position={[0, 2, 0]} intensity={2.3} target={o} />
            <primitive object={o} position={[0, 0, -1]} />
        </group>
    );
}

export function App() {

    const [sectionsScreenshoting] = useState<boolean>(false);

    //todo DEL
    const save = useAppSelector(state => state.wardrobeSave);

    if (!save.save.dimensions) {
        return;
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <Canvas shadows={true} gl={{ antialias: true, toneMapping: NoToneMapping }} linear>
                <TextureLoaders />
                <ExtendedOrbitControls />
                <Perf position="bottom-left" showGraph={false} />
                {sectionsScreenshoting ? <LightScreenshoting /> : < Light />}
                <SoftShadows size={14} focus={0}/>
                <Suspense fallback={null}>
                    <Environment background preset="night" />
                </Suspense>
                {sectionsScreenshoting ? <RoomScreenshoting /> : <Room />}
                <Wardrobe />
            </Canvas>
            <Controls />
            <Drawers />
        </div>
    );
}
