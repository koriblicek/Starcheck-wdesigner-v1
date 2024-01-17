import { useState } from 'react';
import * as THREE from 'three';

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

export default LightScreenshoting;