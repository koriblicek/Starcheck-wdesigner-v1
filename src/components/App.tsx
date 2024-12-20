import { Canvas } from '@react-three/fiber';
import { NoToneMapping } from 'three';
// import { Perf } from 'r3f-perf';
import { Controls } from './ui/Controls';
import { Drawers } from './ui/drawers/Drawers';
import { ExtendedOrbitControls } from './three/utils/camera/ExtendedOrbitControls';
import { Room } from './three/room/Room';
import { Suspense } from 'react';
import { Environment, SoftShadows } from '@react-three/drei';
import { RoomScreenshoting } from './three/room/RoomScreenshoting';
import { useAppSelector } from 'src/store/hooks';
import { Screenshoter } from './three/utils/Screenshoter';
import Wardrobe from './three/wardrobe/Wardrobe';
import TextureLoaders from './three/utils/loaders/TextureLoaders';
import LightScreenshoting from './three/utils/lights/LightScreenshoting';
import Light from './three/utils/lights/Light';
import { FULLSCREEN_DIV_ID } from 'src/types';

interface IThreeAppProps {
    sectionsScreenshoting: boolean;
}

function ThreeApp({ sectionsScreenshoting }: IThreeAppProps) {
    const shadows = useAppSelector(state => state.wardrobeApp.shadows);

    //const rootElement = useAppSelector(state => state.wardrobeApp.in)
    return (
        <Canvas shadows={shadows} gl={{ antialias: true, toneMapping: NoToneMapping, preserveDrawingBuffer: false }} linear camera={{ position: [0, 2, 10] }}>
            <TextureLoaders />
            <ExtendedOrbitControls />
            {/* <Perf position="bottom-left" showGraph={false} /> */}
            {sectionsScreenshoting ? <LightScreenshoting /> : <Light shadows={shadows} />}
            {shadows && <SoftShadows size={14} focus={0} />}
            <Suspense fallback={null}>
                <Environment background preset="night" />
            </Suspense>
            {sectionsScreenshoting ? <RoomScreenshoting /> : <Room />}
            <Wardrobe />
            <Screenshoter />
        </Canvas>
    );
}


export function App() {
    return (
        <div id={FULLSCREEN_DIV_ID} style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <ThreeApp sectionsScreenshoting={false} />
            <Controls />
            <Drawers />
        </div>
    );
}
