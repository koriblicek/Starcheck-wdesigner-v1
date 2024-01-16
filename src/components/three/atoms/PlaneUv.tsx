import { useEffect, useRef } from "react";
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IObjectAnchor } from "src/types";
import { getPosition } from "src/utils";
import { BufferAttribute, PlaneGeometry, Vector2Tuple, Vector3Tuple } from "three";
import { Material } from 'three';

interface IPlaneUVProps {
    size: Vector2Tuple;
    position: Vector3Tuple;
    material?: Material;
    materialJSX?: JSX.Element;
    anchor?: IObjectAnchor;
    uvs?: number[];
    flipWxH?: boolean;
}

const defaultAnchor: IObjectAnchor = { x: EObjectXAnchor.middle, y: EObjectYAnchor.middle, z: EObjectZAnchor.middle };
const defaultRotation: Vector3Tuple = [0, 0, 0];
const flipWxHRotation: Vector3Tuple = [0, 0, Math.PI / 2];
const PlaneUV = ({
    size,
    position,
    material,
    materialJSX,
    anchor = defaultAnchor,
    uvs = [0, 1, 1, 1, 0, 0, 1, 0],
    flipWxH = false
}: IPlaneUVProps) => {

    const uvRef = useRef<PlaneGeometry | null>(null);

    useEffect(() => {
        if (uvRef.current !== null) {
            const ta = new BufferAttribute(Float32Array.from(uvs), 2);
            uvRef.current.setAttribute("uv", ta);
        }
    }, [uvRef, uvs]);

    const offsetPosition = getPosition(position, anchor, [size[0], size[1], 0]);

    if (flipWxH) {
        size = [size[1], size[0]];
    }

    return (
        <group position={offsetPosition}>
            <mesh receiveShadow castShadow material={material} rotation={flipWxH ? flipWxHRotation : defaultRotation}>
                <planeGeometry args={size} ref={uvRef} />
                {materialJSX}
            </mesh >
        </group>
    );
};

export default PlaneUV;