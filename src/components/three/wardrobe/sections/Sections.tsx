import { Vector3Tuple } from "three";
import { EObjectXAnchor, EObjectYAnchor, EObjectZAnchor, IObjectAnchor, IWardrobeSaveSections, IWardrobeSaveSidePartitions } from "src/types";
import { getPosition } from "src/utils";
import { useAppSelector } from "src/store/hooks";
import Section from "./section/Section";

export interface ISectionsProps {
    size: Vector3Tuple;
    sectionsData: IWardrobeSaveSections;
    sidePartitionsData: IWardrobeSaveSidePartitions;
}

const defaultAnchor: IObjectAnchor = { x: EObjectXAnchor.left, y: EObjectYAnchor.bottom, z: EObjectZAnchor.front };
function Sections({
    size,
    sectionsData,
    sidePartitionsData
}: ISectionsProps) {

    const { boardWidth, doorsDepth, safetyBoardHeight } = useAppSelector((state) => state.wardrobeSettings.wardrobeSetup);

    const sections = sectionsData.sectionsData.map((sectionReferenceId, index) => {
        return <Section
            key={index}
            sectionId={index}
            sectionReferenceId={sectionReferenceId}
            size={[sectionsData.sectionsWidth, safetyBoardHeight, size[2] - doorsDepth]}
            position={[(sidePartitionsData.left ? boardWidth : 0) + index * (sectionsData.sectionsWidth + boardWidth), 0, -doorsDepth]}
        />;
    });

    const offsetPosition = getPosition([-size[0], -size[1], size[2]], defaultAnchor, [size[0], size[1], size[2]]);

    return (
        <group position={offsetPosition}>
            {sections && sections}
        </group>
    );
}

export default Sections;