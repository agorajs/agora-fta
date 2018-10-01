import filter from 'lodash/filter'

import { top as y1, Node } from 'agora-graph'

export function D(v: Node[], q: Node): Node[] {
  return filter(v, i => y1(i) >= y1(q))
}

/* // Unused
export namespace D {
  export const NN: NNFunction = (V, q, d) => D(cNN(V, q, d), q)
  export const TNN: TNNFunction = (V, q, d) => D(cTNN(V, q, d), q)
}
 */
