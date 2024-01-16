import { useAppSelector } from 'src/store/hooks';
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor } from 'src/types';
import { useMaterialsStateContext } from 'src/context/context';
import Board from 'src/components/three/atoms/Board';

interface IBottomSlideProps {
    width: number;
}

const bottomBoardHeight = 0.005;
const bottomSlideHeight = 0.01;
function BottomSlide({ width }: IBottomSlideProps) {

    //get settings from store
    const { boardWidth, doorsDepth } = useAppSelector((state) => state.wardrobeSettings.wardrobeSetup);

    //get iron works material
    const { ironWorkMaterial } = useMaterialsStateContext();

    return (
        <group>
            {/* bottom board */}
            <Board
                size={[width - boardWidth * 2, bottomBoardHeight, doorsDepth]}
                position={[boardWidth, 0, 0]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.front }}
                material={ironWorkMaterial}
            />

            {/* front slide */}
            <Board
                size={[width - boardWidth * 2, bottomSlideHeight, bottomSlideHeight]}
                position={[boardWidth, bottomBoardHeight, -doorsDepth * 3 / 4]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.middle }}
                material={ironWorkMaterial}
            />
            {/* back slide */}
            <Board
                size={[width - boardWidth * 2, bottomSlideHeight, bottomSlideHeight]}
                position={[boardWidth, bottomBoardHeight, -doorsDepth * 1 / 4]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.middle }}
                material={ironWorkMaterial}
            />
        </group>

    );
}

export default BottomSlide;