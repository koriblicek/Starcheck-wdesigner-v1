import { useMaterialsStateContext } from "src/context/context";
import { Mesh, Vector3Tuple } from "three";
import { useRef, useState } from "react";
import { IObjectAnchor } from "src/types";
import { getPosition } from "src/utils";
import { useDispatch } from "react-redux";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { Edges } from "@react-three/drei";

interface IDoorPartClickBoxProps {
    onClick: () => void;
    size: Vector3Tuple;
    position: Vector3Tuple;
    anchor: IObjectAnchor;
    visible: boolean;
}

export default function DoorPartClickBox({
    size,
    position,
    anchor,
    visible,
    onClick
}: IDoorPartClickBoxProps) {

    const dispatch = useDispatch();

    const [over, setOver] = useState<boolean>(false);
    //get click material
    const { selectionMaterialOut, selectionMaterialOver } = useMaterialsStateContext();

    const offsetPosition = getPosition(position, anchor, [size[0], size[1], size[2]]);

    const ref = useRef<Mesh | null>(null);

    return (
        <group position={offsetPosition}>
            <mesh
                ref={ref}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setOver(true);
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setOver(false);
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    if (ref.current) {
                        dispatch(wardrobeAppActions.setCameraTarget({ vec: [e.point.x, e.point.y, e.point.z] }));
                    }
                    onClick();
                }}
                position={[0, 0, 0]}
                material={over ? selectionMaterialOver : selectionMaterialOut}
            >
                <boxGeometry args={size} />
                <Edges visible={over || visible} color='white' />
            </mesh>
        </group>
    );
}