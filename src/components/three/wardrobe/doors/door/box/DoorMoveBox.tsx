import { useMaterialsStateContext } from "src/context/context";
import { Mesh, Vector3Tuple } from "three";
import { useRef } from "react";

interface IDoorMoveBoxProps {
    onChange: (over: boolean) => void;
    size: Vector3Tuple;
}

export default function DoorMoveBox({
    size,
    onChange

}: IDoorMoveBoxProps) {


    //get click material
    const { selectionMaterialOut } = useMaterialsStateContext();

    const ref = useRef<Mesh | null>(null);

    function handleChange(over: boolean) {
        onChange(over);
    }
    return (
        <mesh
            ref={ref}
            onPointerOver={(e) => {
                e.stopPropagation();
                handleChange(true);
            }}
            onPointerOut={(e) => {
                e.stopPropagation();
                handleChange(false);
            }}
            position={[size[0] / 2, size[1] / 2, 0]}
            material={selectionMaterialOut}
        >
            <boxGeometry args={[size[0], size[1], size[2]]} />
        </mesh>
    );
}