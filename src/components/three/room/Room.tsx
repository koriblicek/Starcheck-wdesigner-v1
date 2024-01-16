import { useAppSelector } from "src/store/hooks";
import { useMaterialsStateContext } from "src/context/context";
import RoomFloor from "./RoomFloor";
import RoomFrontSide from "./RoomFrontSide";
import RoomCeiling from "./RoomCeiling";
import RoomLeftSide from "./RoomLeftSide";
import RoomRightSide from "./RoomRightSide";
import RoomBackSide from "./RoomBackSide";
import RoomFurniture from "./RoomFurniture";

export function Room() {

    const { roomWallMaterial, roomBottomWallMaterial } = useMaterialsStateContext();

    const roomSetup = useAppSelector(state => state.wardrobeSettings.roomSetup);

    const wardrobeDimensions = useAppSelector(state => state.wardrobeSave.save.dimensions);
    const sidePartitions = useAppSelector(state => state.wardrobeSave.save.sidePartitions);

    return (
        <group position={[0, 0, roomSetup.depth / 2]}>
            <RoomFloor setup={roomSetup} />
            <RoomFurniture setup={roomSetup} wardrobeDimensions={wardrobeDimensions} />
            <RoomFrontSide wallMaterial={roomWallMaterial} bottomWallMaterial={roomBottomWallMaterial} setup={roomSetup} wardrobeDimensions={wardrobeDimensions} sidePartitions={sidePartitions} />
            <RoomBackSide wallMaterial={roomWallMaterial} setup={roomSetup} />
            <RoomLeftSide wallMaterial={roomWallMaterial} bottomWallMaterial={roomBottomWallMaterial} setup={roomSetup} />
            <RoomRightSide wallMaterial={roomWallMaterial} bottomWallMaterial={roomBottomWallMaterial} setup={roomSetup} wardrobeDimensions={wardrobeDimensions} />
            <RoomCeiling wallMaterial={roomWallMaterial} setup={roomSetup} />
        </group>
    );
}
