import filter from 'lodash/filter'

import { left as x1, Node } from 'agora-graph'

export function L(v: Node[], q: Node): Node[] {
  return filter(v, i => x1(i) < x1(q))
}
/* // Unused
export namespace L {
  export const NN: NNFunction = (V, q, d) => L(cNN(V, q, d), q)
  export const TNN: TNNFunction = (V, q, d) => L(cTNN(V, q, d), q)
} */
