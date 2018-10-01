import _ from "lodash"
import { Node } from "agora-graph"
import { NN } from "./neighbor-nodes"

// export interface TNNFunction extends NNFunction { }
export interface TNNMap {
  [key: number]: boolean;
}

/**
 * Transfer neighbor nodes (definition3)
 * @param V
 * @param q
 * @param d
 */
export function TNN(V: Node[], q: Node, d: number): Node[] {
  const accumulator: TNNMap = {};
  const array: Node[] = [];

  accumulator[q.index] = true;

  rTNN(V, NN(V, q, d), accumulator, array, d);

  return array;
}

function rTNN(
  V: Node[],
  NN_q: Node[],
  check: TNNMap,
  array: Node[],
  d: number
): void {
  _.forEach(NN_q, j => {
    if (check[j.index] !== true) {
      check[j.index] = true;
      array.push(j);
      rTNN(V, NN(V, j, d), check, array, d);
    }
  });
}
