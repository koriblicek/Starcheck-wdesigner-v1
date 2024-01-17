import { useTexture } from '@react-three/drei';
import { useLayoutEffect, useState } from 'react';
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IWardrobeRoomSetup } from 'src/types';
import * as THREE from 'three';
import Board from '../atoms/Board';

interface IRoomFloorProps {
    setup: IWardrobeRoomSetup;
}
const RoomFloor = ({
    setup
}: IRoomFloorProps) => {
    const textureProps = useTexture({
        map: setup.floorTexture
    });

    const [mat] = useState<THREE.MeshStandardMaterial>(new THREE.MeshStandardMaterial({ metalness: 0, roughness: 2, color: 0xffffff }));

    useLayoutEffect(() => {
        textureProps.map.wrapS = THREE.RepeatWrapping;
        textureProps.map.wrapT = THREE.RepeatWrapping;
        textureProps.map.offset.set(0, 0);
        textureProps.map.repeat.set(8, 8);
        mat.map = textureProps.map;
    }, [textureProps, mat]);

    return (
        <Board position={[0, 0, 0]} size={[setup.width, 1, setup.depth]} anchor={{ x: EObjectXAnchor.middle, y: EObjectYAnchor.top, z: EObjectZAnchor.middle }} material={mat} />
    );
};


export default RoomFloor;