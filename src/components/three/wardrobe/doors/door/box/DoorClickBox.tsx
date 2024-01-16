import { useMaterialsStateContext } from "src/context/context";
import { Mesh, Vector3Tuple } from "three";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { Edges } from "@react-three/drei";

interface IDoorClickBoxProps {
    onClick: () => void;
    size: Vector3Tuple;
    visible: boolean;
}

export default function DoorClickBox({
    size,
    visible,
    onClick
}: IDoorClickBoxProps) {

    const dispatch = useDispatch();

    const [over, setOver] = useState<boolean>(false);
    //get click material
    const { selectionMaterialOut, selectionMaterialOver } = useMaterialsStateContext();

    const ref = useRef<Mesh | null>(null);

    return (
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
            position={[size[0] / 2, size[1] / 2, 0]}
            material={over || visible ? selectionMaterialOver : selectionMaterialOut}
        >
            <boxGeometry args={[size[0], size[1], size[2]]} />
            <Edges visible={over || visible} color='white' />
        </mesh>
    );
}