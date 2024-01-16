import { useAppSelector } from "src/store/hooks";
import { Box } from "@react-three/drei";
import * as THREE from 'three';

export function RoomScreenshoting() {

    const roomSetup = useAppSelector(state => state.wardrobeSettings.roomSetup);

    return (
        <group position={[0, 0, roomSetup.depth / 2]}>
            <Box args={[roomSetup.width, roomSetup.height, roomSetup.depth]} position={[0,roomSetup.height/2,0]}>
                <meshStandardMaterial side={THREE.DoubleSide} />
            </Box>
        </group>
    );
}
