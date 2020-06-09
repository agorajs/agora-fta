import { Node } from 'agora-graph';
export interface NNFunction {
    (V: Node[], q: Node, d: number): Node[];
}
/**
 * neighbor node (definition1)
 *
 * @returns true if the nodes are overlapping and i !== j
 */
export declare function N(i: Node, j: Node, padding: number): boolean;
/**
 * neighbor nodes (definition2)
 */
export declare function NN(V: Node[], q: Node, padding: number): Node[];
//# sourceMappingURL=neighbor-nodes.d.ts.map