import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMaterialsDispatchContext } from "src/context/context";
import { useAppSelector } from "src/store/hooks";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";

export function Screenshoter() {

    const visibleSendDesignDialog = useAppSelector(state => state.wardrobeApp.visibleSendDesignDialog);

    const dispatch = useDispatch();

    const three = useThree();

    const ctx = useMaterialsDispatchContext();

    const [noDoorScreenshot, setNoDoorScreenshot] = useState<boolean>(false);
    const [doorScreenshot, setDoorScreenshot] = useState<boolean>(false);

    useEffect(() => {
        if (visibleSendDesignDialog) {
            setNoDoorScreenshot(true);
            dispatch(wardrobeAppActions.setDoorsVisibility({ visible: false }));
        }
    }, [visibleSendDesignDialog, dispatch]);


    useEffect(() => {
        if (noDoorScreenshot) {
            setNoDoorScreenshot(false);
            dispatch(wardrobeAppActions.setDoorsVisibility({ visible: true }));
            setDoorScreenshot(true);
            three.gl.render(three.scene, three.camera);
            ctx({ type: "SET_SCREENSHOT1", screenshot: three.gl.domElement.toDataURL("image/png") });
            //setScreenshot1(gl.domElement.toDataURL("image/png").replace('image/png', 'image/octet-stream'));
        }
        if (doorScreenshot) {
            setDoorScreenshot(false);
            three.gl.render(three.scene, three.camera);
            ctx({ type: "SET_SCREENSHOT2", screenshot: three.gl.domElement.toDataURL("image/png", 10) });
        }
    }, [noDoorScreenshot, doorScreenshot, dispatch, ctx, three]);


    return null;
}
