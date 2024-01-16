import { Vector3Tuple } from "three";
import { useAppSelector } from "src/store/hooks";
import { useDispatch } from "react-redux";
import { wardrobeAppActions } from "src/store/wardrobe-data/wardrobeAppSlice";
import Shelf from "./parts/Shelf";
import VerticalShelf from "./parts/VerticalShelf";
import Hanger from "./parts/Hanger";
import Drawer from "./parts/Drawer";
import SectionClickBox from "./box/SectionClickBox";

export interface ISectionProps {
    sectionReferenceId: string;
    sectionId: number;
    position: Vector3Tuple;
    size: Vector3Tuple;
}

function Section({ sectionReferenceId, sectionId, position, size }: ISectionProps) {

    const dispatch = useDispatch();

    //get settings from store
    const { sectionsSetup } = useAppSelector((state) => state.wardrobeSettings);

    const visibleSectionsClickBoxes = useAppSelector(state => state.wardrobeApp.visibleSectionsClickBoxes);

    const selectedSection = useAppSelector(state => state.wardrobeApp.selectedSection);

    const shelves = sectionsSetup[sectionReferenceId].shelves?.map((item, index) => {
        return <Shelf
            key={index}
            size={[size[0], size[1], size[2]]}
            data={item}
        />;
    });
    const verticalShelves = sectionsSetup[sectionReferenceId].verticalShelves?.map((item, index) => {
        return <VerticalShelf
            key={index}
            size={[size[0], size[1], size[2]]}
            data={item}
        />;
    });
    const hangers = sectionsSetup[sectionReferenceId].hangers?.map((item, index) => {
        return <Hanger
            key={index}
            size={[size[0], size[1], size[2]]}
            data={item}
        />;
    });
    const drawers = sectionsSetup[sectionReferenceId].drawers?.map((item, index) => {
        return <Drawer
            key={index}
            size={[size[0], size[1], size[2]]}
            data={item}
        />;
    });

    function handleClick() {
        dispatch(wardrobeAppActions.selectSection({ sectionId }));
        dispatch(wardrobeAppActions.toggleSectionsDrawer());
    }

    return (
        <group position={position}>
            {visibleSectionsClickBoxes &&
                <SectionClickBox onClick={() => handleClick()} size={size} visible={selectedSection === sectionId} />
            }
            {shelves && shelves}
            {verticalShelves && verticalShelves}
            {hangers && hangers}
            {drawers && drawers}
        </group>
    );
}

export default Section;