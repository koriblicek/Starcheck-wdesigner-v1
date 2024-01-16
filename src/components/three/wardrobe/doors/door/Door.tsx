import { Group, Vector2Tuple, Vector3Tuple } from "three";
import { useAppSelector } from "src/store/hooks";
import { ETextureType, IWardrobeSaveDoor } from "src/types";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import { useDispatch } from "react-redux";
import { Suspense, useEffect, useRef, useState } from "react";
import Handles from "./parts/Handles";
import Divider from "./parts/Divider";
import DoorPartPhotoWallpaper from "./parts/DoorPartPhotoWallpaper";
import DoorPart from "./parts/DoorPart";
import DoorClickBox from "./box/DoorClickBox";
import DoorMoveBox from "./box/DoorMoveBox";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as TWEEN from '@tweenjs/tween.js';
import { useFrame } from "@react-three/fiber";

export interface IDoorProps {
    doorId: number;
    doorReferenceId: string;
    doorCount: number;
    position: Vector3Tuple;
    data: IWardrobeSaveDoor;
    size: Vector2Tuple;
}

function Door({
    doorId,
    doorReferenceId,
    doorCount,
    position,
    data,
    size
}: IDoorProps) {

    const dispatch = useDispatch();

    const { doorsSetup, doorPartsMaterialSetup, wardrobeSetup } = useAppSelector((state) => state.wardrobeSettings);

    const visibleDoorsClickBoxes = useAppSelector(state => state.wardrobeApp.visibleDoorsClickBoxes);
    const visibleDoorsMoveBoxes = useAppSelector(state => state.wardrobeApp.visibleDoorsMoveBoxes);

    const selectedDoor = useAppSelector(state => state.wardrobeApp.selectedDoor);

    const [move, setMove] = useState<boolean>(false);
    //get current door data from settings
    const doorData = doorsSetup[doorReferenceId];

    let doorParts: JSX.Element[] = [];
    let doorPartPhotoWallpapers: JSX.Element[] = [];
    let partsDividers: JSX.Element[] = [];
    let handles: JSX.Element = <></>;

    if (doorData !== undefined) {
        if (doorData.parts !== undefined) {
            //parts
            doorParts = doorData.parts.map((element, partId) => {
                return <DoorPart
                    key={partId}
                    doorId={doorId}
                    doorPartId={partId}
                    doorsWidth={size[0]}
                    negativePosition={position}
                    wardrobeHeight={size[1]}
                    textureId={data.doorPartsMaterialIds[partId]}
                    data={element}
                />;
            });
            //photo wall papers
            doorPartPhotoWallpapers = doorData.parts.map((element, id) => {
                const tt = doorPartsMaterialSetup[data.doorPartsMaterialIds[id]];
                if (!tt) {
                    console.error("door part material '", data.doorPartsMaterialIds[id], ", not found in doorPartsMaterialSetup");
                }
                return <DoorPartPhotoWallpaper
                    key={id}
                    doorId={doorId}
                    doorsWidth={size[0]}
                    doorsCount={doorCount}
                    wardrobeHeight={size[1]}
                    isVisible={tt ? tt.textureType === ETextureType.TRANSPARENT : false}
                    data={element}
                />;
            });
            //parts dividers
            partsDividers = doorData.parts
                .filter((_, id) => id < (doorData.parts.length - 1))
                .map((element, id) => {
                    return <Divider
                        key={id}
                        doorsWidth={size[0]}
                        wardrobeHeight={size[1]}
                        data={element}
                    />;
                });
            //handles
            handles = <Handles doorsWidth={size[0]} wardrobeHeight={size[1]} />;
        }
    }
    function handleClick() {
        dispatch(wardrobeAppActions.selectDoor({ doorId }));
        dispatch(wardrobeAppActions.toggleDoorsDrawer());
    }

    function handleChange(over: boolean) {
        setMove(over);
    }

    const [groupPosition, setGroupPosition] = useState<Vector3Tuple>([position[0], position[1], position[2]]);

    const groupRef = useRef<Group | null>(null);

    useEffect(() => {
        if (visibleDoorsMoveBoxes) {
            if (move) {
                new TWEEN.Tween(groupPosition)
                    .to([position[0] + size[0] * ((doorId % 2) ? -1 : ((doorId === (doorCount - 1)) ? -1 : 1)), position[1], position[2]], 500)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                        setGroupPosition(groupPosition);
                    })
                    .start();
            } else {
                new TWEEN.Tween(groupPosition)
                    .to([position[0], position[1], position[2]], 500)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                        setGroupPosition(groupPosition);
                    })
                    .start();
            }
        }
    }, [groupPosition, move, doorCount, doorId, size, position, visibleDoorsMoveBoxes]);

    useEffect(() => {
        setGroupPosition([...position] as Vector3Tuple);
    }, [position]);

    useFrame(() => {
        TWEEN.update();
        groupRef.current && groupRef.current.position.set(...groupPosition);
    });

    return (
        <group>
            <group position={[position[0], 0, -wardrobeSetup.doorsDepth / 2]}>
                {visibleDoorsClickBoxes && <DoorClickBox onClick={() => handleClick()} size={[size[0], size[1], wardrobeSetup.doorsDepth]} visible={selectedDoor === doorId} />}
                {visibleDoorsMoveBoxes && <DoorMoveBox onChange={handleChange} size={[size[0], size[1], wardrobeSetup.doorsDepth]} />}
            </group>
            <group ref={groupRef} position={groupPosition}>
                <Suspense fallback={null}>
                    {doorParts}
                </Suspense>
                {doorPartPhotoWallpapers}
                {partsDividers}
                {handles}
            </group>
        </group >
    );
}

export default Door;