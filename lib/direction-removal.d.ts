import { Node } from 'agora-graph';
/**
 * Interface allowing to remove overlap in a given direction
 */
export interface DirectionRemoval {
    name: string;
    filter: (v: Node[], q: Node) => Node[];
    /**
     * Sorting Neighbor nodes
     * @param a
     * @param b
     */
    sort(a: Node, b: Node): number;
    /**
     * If > 0 : the shift distance to remove the overlap
     * @param i
     * @param j
     */
    delta(i: Node, j: Node): number;
    /**
     * how to apply delta to move the j
     * @param j
     * @param delta shift distance
     * @param d padding
     */
    update(j: Node, delta: number, d: number): void;
}
