import filter from 'lodash/filter'

import { top as y1, Node } from 'agora-graph'

export function U(v: Node[], q: Node): Node[] {
  return filter(v, i => y1(i) < y1(q))
}

/* // Unused
export namespace U {
  export const NN: NNFunction = (V, q, d) => U(cNN(V, q, d), q)
  export const TNN: TNNFunction = (V, q, d) => U(cTNN(V, q, d), q)
} */
