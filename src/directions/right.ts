import filter from 'lodash/filter';

import { left as x1, Node } from 'agora-graph';

/**
 * Returns a subset of v where each node is at the right of q
 * @param v set of nodes
 * @param q seed node
 */
export function R(v: Node[], q: Node): Node[] {
  return filter(v, (i) => x1(i) >= x1(q));
}

/* // Unused
export namespace R {
  export const NN: NNFunction = (V, q, d) => R(cNN(V, q, d), q)
  export const TNN: TNNFunction = (V, q, d) => R(cTNN(V, q, d), q)
} */
