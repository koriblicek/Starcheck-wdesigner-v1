import { IObjectAnchor } from "src/types";
import { Vector3Tuple } from "three";

const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export function getPosition(position: Vector3Tuple, anchor: IObjectAnchor, size: Vector3Tuple): Vector3Tuple {
    return [-size[0] * anchor.x + position[0], -size[1] * anchor.y + position[1], -size[2] * anchor.z + position[2]];
}

export function getRandomKey(obj: object) {
    return Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
}

export default function isDev(): boolean {
    return development;
}