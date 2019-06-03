import { Node, Point, Box } from 'agora-graph';
export interface VirtualNode extends Node {
    nodes: Node[];
    origin: Point;
    seed: Node;
}
export interface SeedNode extends Node {
    width: 0;
    height: 0;
    label: 'seed';
    index: -1;
}
interface Borders<T> {
    top: T;
    right: T;
    bottom: T;
    left: T;
}
export declare function createSeed(p: Point): SeedNode;
export declare function createVirtualNode(i: number, v: Node[], s?: Node): VirtualNode;
export declare function getBox(borders: Borders<number>): Box;
export declare function getBorders(borderNodes: Borders<Node>): Borders<number>;
export declare function getBorderNodes(nodes: Node[]): Borders<Node>;
export {};
