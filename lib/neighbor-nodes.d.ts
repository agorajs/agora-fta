import { Node } from 'agora-graph';
export interface NNFunction {
    (V: Node[], q: Node, d: number): Node[];
}
/**
 * neighbor node (definition1)
 * @param i
 * @param j
 * @param d minimum horizontal distance
 *
 * @returns true if the nodes are neighbor
 */
export declare function N(i: Node, j: Node, d: number): boolean;
/**
 * neighbor nodes (definition2)
 * @param V
 * @param q
 * @param d minimal horizontal distance
 */
export declare function NN(V: Node[], q: Node, d: number): Node[];
