/**
 * Implementation of the Force Transfer Algorithm (FTA) algorithm
 *
 * Xiaodi Huang, Wei Lai, A.S.M. Sajeev, Junbin Gao,
 * A new algorithm for removing node overlapping in graph visualization,
 * Information Sciences,
 * Volume 177, Issue 14,
 * 2007,
 * Pages 2821-2844,
 * ISSN 0020-0255,
 * https://doi.org/10.1016/j.ins.2007.02.016.
 * (http://www.sciencedirect.com/science/article/pii/S0020025507000989)
 */
import _ from 'lodash';
import {
  Graph,
  Node,
  left,
  right,
  top,
  bottom,
  CartesianVector,
  Point,
  hasOverlap
} from 'agora-graph';
import {
  VirtualNode,
  createVirtualNode,
  getBox,
  getBorders,
  getBorderNodes
} from './virtual-nodes';

import { U, R, D, L } from './directions';
import { DirectionRemoval } from './direction-removal';
import { N, NN } from './neighbor-nodes';
import { TNN } from './transfer-neighbor-nodes';
import { createFunction } from 'agora-algorithm';

// refaire la 1ere version de fta
export const forceTransfer = createFunction(function(
  graph,
  options: { padding: number; seed: Point } = {
    padding: 0,
    seed: { x: 0, y: 0 }
  }
) {
  while (hasOverlap(graph.nodes, -0.0001)) {
    const d = options.padding;
    // const seed: SeedNode = createSeed(options.seed);

    // first we get the virtual nodes
    const virtuals = getVirtualNodes(graph, d);
    // then we iterate over the virtual nodes to remove overlap inside them

    // console.log('virtuals:', virtuals)
    _.forEach(virtuals, virtualNode =>
      removeOverlap(virtualNode.nodes, virtualNode.seed, d)
    );

    _.forEach(virtuals, virtual => {
      const borders = getBorders(getBorderNodes(virtual.nodes));
      const box = getBox(borders);
      const center: Point = {
        x: borders.left + box.width / 2,
        y: borders.top + box.height / 2
      };
      virtual.x = center.x;
      virtual.y = center.y;
      virtual.origin = center;
      virtual.height = box.height;
      virtual.width = box.width;
    });

    // then we remove the overlap over the virtual nodes
    _.forEach(virtuals, virtual => removeVirtualOverlap(virtuals, virtual, d));

    // if the virtual nodes have moved, then we apply this movement to the nodes they contain
    _.forEach(virtuals, virtualNode => {
      const delta: CartesianVector = {
        x: virtualNode.x - virtualNode.origin.x,
        y: virtualNode.y - virtualNode.origin.y
      };

      if (delta.x === 0 && delta.y === 0) return; // nothing changed

      _.forEach(virtualNode.nodes, i => {
        i.x += delta.x;
        i.y += delta.y;
      });
    });
  }

  return { graph: graph };
});

function getVirtualNodes(G: Graph, d: number): VirtualNode[] {
  // we iterate over each node, if the node is not in any existing virtual node, then we get the tnn of this node
  const virtuals: VirtualNode[] = [];

  _.forEach(G.nodes, self => {
    let present = false;

    _.forEach(virtuals, virtual => {
      present = _.includes(virtual.nodes, self);
      return !present;
    });

    if (!present) {
      // if node is not present in any virtual
      const nodes = TNN(G.nodes, self, d);

      nodes.push(self); // adding self to the list

      virtuals.push(createVirtualNode(virtuals.length, nodes));
    }
  });

  return virtuals;
}

const RightRemoval: DirectionRemoval = {
  name: 'right',
  filter: R,
  sort: (a, b) => a.x - b.x,
  delta(i, j) {
    const delta = {
      x: right(i) - left(j),
      y: Math.min(Math.abs(top(i) - bottom(j)), Math.abs(bottom(i) - top(j)))
    };

    if (delta.x <= delta.y) return delta.x;
    return 0;
  },
  update(j, delta, d) {
    j.x += delta + d;
  }
};

const LeftRemoval: DirectionRemoval = {
  name: 'left',
  filter: L,
  sort: (a, b) => b.x - a.x,
  delta(i, j) {
    const delta = {
      x: right(j) - left(i),
      y: Math.min(Math.abs(top(i) - bottom(j)), Math.abs(bottom(i) - top(j)))
    };

    if (delta.x <= delta.y) return delta.x;
    return 0;
  },
  update(j, delta, d) {
    j.x = j.x - (delta + d);
  }
};

const DownRemoval: DirectionRemoval = {
  name: 'down',
  filter: D,
  sort: (a, b) => a.y - b.y,
  delta(i, j) {
    const delta = {
      x: Math.min(Math.abs(left(i) - right(j)), Math.abs(right(i) - left(j))),
      y: bottom(i) - top(j)
    };

    if (delta.y <= delta.x) return delta.y;
    return 0;
  },
  update(j, delta, d) {
    j.y += delta + d;
  }
};

const UpRemoval: DirectionRemoval = {
  name: 'up',
  filter: U,
  sort: (a, b) => b.y - a.y,
  delta: (i, j) => {
    const delta = {
      x: Math.min(Math.abs(left(i) - right(j)), Math.abs(right(i) - left(j))),
      y: bottom(j) - top(i)
    };

    if (delta.y <= delta.x) return delta.y;
    return 0;
  },
  update(j, delta, d) {
    j.y = j.y - (delta + d);
  }
};

/**
 * remove overlaps on the right of the seed node
 * @param q seed nodes
 * @param V nodes
 * @param d padding
 */
function removeOverlap(V: Node[], q: Node, d: number): void {
  if (V.length === 1) return; // nothing to do
  const tnn = TNN(V, q, d);
  if (tnn.length === 0) return; // nothing to do

  const nn = NN(tnn, q, d);
  if (nn.length === 0) return; // nothing to do

  directedRemoveOverlap(nn, tnn, q, d, RightRemoval);
  directedRemoveOverlap(nn, tnn, q, d, LeftRemoval);
  directedRemoveOverlap(nn, tnn, q, d, UpRemoval);
  directedRemoveOverlap(nn, tnn, q, d, DownRemoval);
}

function removeVirtualOverlap(
  V: VirtualNode[],
  q: VirtualNode,
  d: number
): void {
  if (V.length === 1) return; // nothing to do

  const tnn = TNN(V, q, d);
  if (tnn.length === 0) return; // console.log(tnn)

  const nn = NN(tnn, q, d);
  if (nn.length === 0) return; // console.log(nn)

  directedRemoveOverlap(nn, tnn, q, d, RightRemoval);
  directedRemoveOverlap(nn, tnn, q, d, DownRemoval);
}

/**
 * remove overlaps in the "dir" direction
 *
 * @param i current node
 * @param v nodes
 * @param d padding
 * @param dir direction object to use
 */
function directedRemoveOverlap(
  nn: Node[],
  tnn: Node[],
  i: Node,
  d: number,
  dir: DirectionRemoval
): void {
  const directedNN = dir.filter(nn, i);
  if (directedNN.length === 0) return; // nothing to do : )
  directedNN.sort(dir.sort);

  const directedTNN = dir.filter(tnn, i);
  if (directedTNN.length === 0) return; // nothing to do :)
  directedTNN.sort(dir.sort);

  // console.groupCollapsed(i.label + ':' + i.index + ':' + dir.name)
  // console.log('i:', i, 'TNN:', directedTNN, 'NN:', directedNN)

  _.forEach(directedNN, j => {
    if (!N(i, j, d)) return; // if are not overlapping anymore stop here

    const delta = dir.delta(i, j); // how much do we need to move it ?
    // console.log(delta)
    if (delta === 0) return; // no need to move

    _.forEach(directedTNN, node => dir.update(node, delta, d));
  });

  // recursive removal
  // v' can't be anything else than a subset of directedTNN
  _.forEach(directedTNN, j => {
    const jNN = dir.filter(NN(directedTNN, j, d), j);
    const jTNN = dir.filter(TNN(directedTNN, j, d), j);

    // console.log(j, jNN, jTNN)
    _.forEach(jNN, k => {
      if (!N(j, k, d)) return; // if are not overlapping anymore stop here

      const delta = dir.delta(j, k); // how much do we need to move it ?
      if (delta === 0) return; // no need to move

      _.forEach(jTNN, node => dir.update(node, delta, d));
    });
  });
  // console.log('fin', directedNN)
  // console.groupEnd()
}
