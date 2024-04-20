import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useAppSelector } from "src/store/hooks";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { useDispatch } from "react-redux";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as TWEEN from '@tweenjs/tween.js';

export function ExtendedOrbitControls() {

    const dispatch = useDispatch();

    const enabledOrbitControls = useAppSelector(state => state.wardrobeApp.enabledOrbitControls);

    const newCameraTarget = useAppSelector(state => state.wardrobeApp.cameraTarget);

    const [cameraTarget, setCameraTarget] = useState(new Vector3(0, 0, 0));

    const { camera } = useThree();

    useEffect(() => {
        new TWEEN.Tween(cameraTarget)
            .to(new Vector3(newCameraTarget[0], newCameraTarget[1], newCameraTarget[2]), 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
                setCameraTarget(cameraTarget);
            })
            .start();
    }, [newCameraTarget, cameraTarget]);

    useEffect(() => {
        if (enabledOrbitControls) {
            dispatch(wardrobeAppActions.setDefaultCameraTarget());
        }
    }, [enabledOrbitControls, dispatch]);

    useFrame(() => {
        TWEEN.update();
        camera.lookAt(cameraTarget);
        camera.updateProjectionMatrix();
    });


    return (
        <OrbitControls
            enabled={enabledOrbitControls}
            target={newCameraTarget}
            minPolarAngle={Math.PI / 2.3}
            maxPolarAngle={Math.PI / 1.75}
            minAzimuthAngle={-Math.PI / 6}
            maxAzimuthAngle={Math.PI / 6}
            // minPolarAngle={-Math.PI}
            // maxPolarAngle={Math.PI}
            // minAzimuthAngle={-Math.PI}
            // maxAzimuthAngle={Math.PI}
            maxDistance={5}
            minDistance={1.4}
            enablePan={false}
            dampingFactor={0.3}
            // zoomSpeed={2}
            // domElement={document.body}
            makeDefault
        />

    );
}
