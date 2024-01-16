import { useAppSelector } from 'src/store/hooks';
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor } from 'src/types';
import { useMaterialsStateContext } from 'src/context/context';
import Board from 'src/components/three/atoms/Board';

interface ITopSlideProps {
    width: number;
    height: number;
}
const bottomBoardHeight = 0.005;
const blockerHeight = 0.02;

function TopSlide({ width, height }: ITopSlideProps) {

    //get settings from store
    const { boardWidth, doorsDepth } = useAppSelector((state) => state.wardrobeSettings.wardrobeSetup);
    //get iron works material
    const { ironWorkMaterial } = useMaterialsStateContext();

    return (
        <group>
            {/* top slide */}
            <Board
                size={[width - boardWidth * 2, bottomBoardHeight, doorsDepth]}
                position={[boardWidth, height, 0]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.top, z: EObjectZAnchor.front }}
                material={ironWorkMaterial}
            />
            {/* front blocker */}
            <Board
                size={[width - boardWidth * 2, blockerHeight, bottomBoardHeight]}
                position={[boardWidth, height - bottomBoardHeight, 0]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.top, z: EObjectZAnchor.front }}
                material={ironWorkMaterial}
            />
            {/* middle blocker */}
            <Board
                size={[width - boardWidth * 2, blockerHeight, bottomBoardHeight]}
                position={[boardWidth, height - bottomBoardHeight, -doorsDepth / 2]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.top, z: EObjectZAnchor.middle }}
                material={ironWorkMaterial}
            />
            {/* back blocker */}
            <Board
                size={[width - boardWidth * 2, blockerHeight, bottomBoardHeight]}
                position={[boardWidth, height - bottomBoardHeight, -doorsDepth]}
                anchor={{ x: EObjectXAnchor.left, y: EObjectYAnchor.top, z: EObjectZAnchor.back }}
                material={ironWorkMaterial}
            />
        </group>

    );
}

export default TopSlide;