import { useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import { useMaterialsDispatchContext } from 'src/context/context';
import { EMaterialLoader, ETextureType, IWardrobeSettingsMaterialItem } from 'src/types';
import { MeshStandardMaterial } from 'three';
import * as THREE from 'three';

function useMaterialLoader(type: EMaterialLoader, data: IWardrobeSettingsMaterialItem) {

    const ctx = useMaterialsDispatchContext();

    const { map } = useTexture({ map: data.texture });

    useEffect(() => {
        if (map) {
            let material: MeshStandardMaterial;
            switch (data.textureType) {
                case ETextureType.STANDARD:
                    material = new MeshStandardMaterial({ map: map });
                    break;
                case ETextureType.REFLECTIVE:
                    //mJSX = <MeshReflectorMaterial resolution={1024} mirror={0} map={map} mixStrength={.2} />;
                    material = new MeshStandardMaterial({ map: map });
                    break;
                case ETextureType.METALLIC:
                    material = new MeshStandardMaterial({ map: map, metalness: .68, roughness: .7 });
                    break;
                case ETextureType.TRANSPARENT:
                    material = new MeshStandardMaterial({ map: map, depthWrite: true, transparent: true, opacity: 0 });
                    break;
                default:
                    material = new MeshStandardMaterial();
                    break;
            }
            if (material) {
                switch (type) {
                    case EMaterialLoader.corpus:
                        ctx({ type: "UPDATE_CORPUS_MATERIAL", material: material });
                        break;
                    case EMaterialLoader.ironWorks:
                        ctx({ type: "UPDATE_IRONWORK_MATERIAL", material: material });
                        break;
                    case EMaterialLoader.photoWallpaper:
                        material.side = THREE.DoubleSide;
                        ctx({ type: "UPDATE_PHOTOWALLPAPER_MATERIAL", material: material });
                        break;
                }
            }
        }
    }, [map, data.textureType, type, ctx]);

    return;
}

interface IMaterialLoaderProps {
    type: EMaterialLoader;
    data: IWardrobeSettingsMaterialItem;
}

function MaterialLoader({ type, data }: IMaterialLoaderProps) {
    useMaterialLoader(type, data);
    return null;
}

export default MaterialLoader;