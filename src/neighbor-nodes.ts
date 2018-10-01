import filter from 'lodash/filter'
import { Node, overlap } from 'agora-graph'

export interface NNFunction {
  (V: Node[], q: Node, d: number): Node[]
}

/**
 * neighbor node (definition1)
 * @param i
 * @param j
 * @param d minimum horizontal distance
 *
 * @returns true if the nodes are neighbor
 */
export function N(i: Node, j: Node, d: number): boolean {
  return i !== j && overlap(i, j, d)
}

/**
 * neighbor nodes (definition2)
 * @param V
 * @param q
 * @param d minimal horizontal distance
 */
export function NN(V: Node[], q: Node, d: number): Node[] {
  return filter(V, i => N(i, q, d))
}
