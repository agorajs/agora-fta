import { Node } from 'agora-graph';
export interface TNNMap {
    [key: number]: boolean;
}
/**
 * flat Transfer neighbor nodes (definition3)
 * @param V
 * @param q
 * @param d
 */
export declare function TNN(V: Node[], q: Node, d: number): Node[];
/**
 * Transfer neighbor nodes (definition3)
 * @param V
 * @param q
 * @param d
 * @deprecated
 */
export declare function oldTNN(V: Node[], q: Node, d: number): Node[];
