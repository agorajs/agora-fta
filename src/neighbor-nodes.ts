import filter from 'lodash/filter';
import { Node, overlap } from 'agora-graph';

export interface NNFunction {
  (V: Node[], q: Node, d: number): Node[];
}

/**
 * neighbor node (definition1)
 *
 * @returns true if the nodes are overlapping and i !== j
 */
export function N(i: Node, j: Node, padding: number): boolean {
  return i !== j && overlap(i, j, { padding });
}

/**
 * neighbor nodes (definition2)
 */
export function NN(V: Node[], q: Node, padding: number): Node[] {
  return filter(V, (i) => N(i, q, padding));
}
