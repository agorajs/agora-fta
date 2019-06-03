"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var lodash_1 = __importDefault(require("lodash"));
var agora_graph_1 = require("agora-graph");
var virtual_nodes_1 = require("./virtual-nodes");
var directions_1 = require("./directions");
var neighbor_nodes_1 = require("./neighbor-nodes");
var transfer_neighbor_nodes_1 = require("./transfer-neighbor-nodes");
var agora_algorithm_1 = require("agora-algorithm");
// refaire la 1ere version de fta
exports.forceTransfer = agora_algorithm_1.createFunction(function (graph, options) {
    if (options === void 0) { options = {
        padding: 0,
        seed: { x: 0, y: 0 }
    }; }
    var _loop_1 = function () {
        var d = options.padding;
        // const seed: SeedNode = createSeed(options.seed);
        // first we get the virtual nodes
        var virtuals = getVirtualNodes(graph, d);
        // then we iterate over the virtual nodes to remove overlap inside them
        // console.log('virtuals:', virtuals)
        lodash_1.default.forEach(virtuals, function (virtualNode) {
            return removeOverlap(virtualNode.nodes, virtualNode.seed, d);
        });
        lodash_1.default.forEach(virtuals, function (virtual) {
            var borders = virtual_nodes_1.getBorders(virtual_nodes_1.getBorderNodes(virtual.nodes));
            var box = virtual_nodes_1.getBox(borders);
            var center = {
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
        lodash_1.default.forEach(virtuals, function (virtual) { return removeVirtualOverlap(virtuals, virtual, d); });
        // if the virtual nodes have moved, then we apply this movement to the nodes they contain
        lodash_1.default.forEach(virtuals, function (virtualNode) {
            var delta = {
                x: virtualNode.x - virtualNode.origin.x,
                y: virtualNode.y - virtualNode.origin.y
            };
            if (delta.x === 0 && delta.y === 0)
                return; // nothing changed
            lodash_1.default.forEach(virtualNode.nodes, function (i) {
                i.x += delta.x;
                i.y += delta.y;
            });
        });
    };
    while (agora_graph_1.hasOverlap(graph.nodes, options.padding)) {
        _loop_1();
    }
    return { graph: graph };
});
function getVirtualNodes(G, d) {
    // we iterate over each node, if the node is not in any existing virtual node, then we get the tnn of this node
    var virtuals = [];
    lodash_1.default.forEach(G.nodes, function (self) {
        var present = false;
        lodash_1.default.forEach(virtuals, function (virtual) {
            present = lodash_1.default.includes(virtual.nodes, self);
            return !present;
        });
        if (!present) {
            // if node is not present in any virtual
            var nodes = transfer_neighbor_nodes_1.oldTNN(G.nodes, self, d);
            nodes.push(self); // adding self to the list
            virtuals.push(virtual_nodes_1.createVirtualNode(virtuals.length, nodes));
        }
    });
    return virtuals;
}
var RightRemoval = {
    name: 'right',
    filter: directions_1.R,
    sort: function (a, b) { return a.x - b.x; },
    delta: function (i, j) {
        var delta = {
            x: agora_graph_1.right(i) - agora_graph_1.left(j),
            y: Math.min(Math.abs(agora_graph_1.top(i) - agora_graph_1.bottom(j)), Math.abs(agora_graph_1.bottom(i) - agora_graph_1.top(j)))
        };
        if (delta.x <= delta.y)
            return delta.x;
        return 0;
    },
    update: function (j, delta, d) {
        j.x += delta + d;
    }
};
var LeftRemoval = {
    name: 'left',
    filter: directions_1.L,
    sort: function (a, b) { return b.x - a.x; },
    delta: function (i, j) {
        var delta = {
            x: agora_graph_1.right(j) - agora_graph_1.left(i),
            y: Math.min(Math.abs(agora_graph_1.top(i) - agora_graph_1.bottom(j)), Math.abs(agora_graph_1.bottom(i) - agora_graph_1.top(j)))
        };
        if (delta.x <= delta.y)
            return delta.x;
        return 0;
    },
    update: function (j, delta, d) {
        j.x = j.x - (delta + d);
    }
};
var DownRemoval = {
    name: 'down',
    filter: directions_1.D,
    sort: function (a, b) { return a.y - b.y; },
    delta: function (i, j) {
        var delta = {
            x: Math.min(Math.abs(agora_graph_1.left(i) - agora_graph_1.right(j)), Math.abs(agora_graph_1.right(i) - agora_graph_1.left(j))),
            y: agora_graph_1.bottom(i) - agora_graph_1.top(j)
        };
        if (delta.y <= delta.x)
            return delta.y;
        return 0;
    },
    update: function (j, delta, d) {
        j.y += delta + d;
    }
};
var UpRemoval = {
    name: 'up',
    filter: directions_1.U,
    sort: function (a, b) { return b.y - a.y; },
    delta: function (i, j) {
        var delta = {
            x: Math.min(Math.abs(agora_graph_1.left(i) - agora_graph_1.right(j)), Math.abs(agora_graph_1.right(i) - agora_graph_1.left(j))),
            y: agora_graph_1.bottom(j) - agora_graph_1.top(i)
        };
        if (delta.y <= delta.x)
            return delta.y;
        return 0;
    },
    update: function (j, delta, d) {
        j.y = j.y - (delta + d);
    }
};
/**
 * remove overlaps on the right of the seed node
 * @param q seed nodes
 * @param V nodes
 * @param d padding
 */
function removeOverlap(V, q, d) {
    if (V.length === 1)
        return; // nothing to do
    var tnn = transfer_neighbor_nodes_1.oldTNN(V, q, d);
    if (tnn.length === 0)
        return; // nothing to do
    var nn = neighbor_nodes_1.NN(tnn, q, d);
    if (nn.length === 0)
        return; // nothing to do
    directedRemoveOverlap(nn, tnn, q, d, RightRemoval);
    directedRemoveOverlap(nn, tnn, q, d, LeftRemoval);
    directedRemoveOverlap(nn, tnn, q, d, UpRemoval);
    directedRemoveOverlap(nn, tnn, q, d, DownRemoval);
}
function removeVirtualOverlap(V, q, d) {
    if (V.length === 1)
        return; // nothing to do
    var tnn = transfer_neighbor_nodes_1.oldTNN(V, q, d);
    if (tnn.length === 0)
        return; // console.log(tnn)
    var nn = neighbor_nodes_1.NN(tnn, q, d);
    if (nn.length === 0)
        return; // console.log(nn)
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
function directedRemoveOverlap(nn, tnn, i, d, dir) {
    var directedNN = dir.filter(nn, i);
    if (directedNN.length === 0)
        return; // nothing to do : )
    directedNN.sort(dir.sort);
    var directedTNN = dir.filter(tnn, i);
    if (directedTNN.length === 0)
        return; // nothing to do :)
    directedTNN.sort(dir.sort);
    // console.groupCollapsed(i.label + ':' + i.index + ':' + dir.name)
    // console.log('i:', i, 'TNN:', directedTNN, 'NN:', directedNN)
    lodash_1.default.forEach(directedNN, function (j) {
        if (!neighbor_nodes_1.N(i, j, d))
            return; // if are not overlapping anymore stop here
        var delta = dir.delta(i, j); // how much do we need to move it ?
        // console.log(delta)
        if (delta === 0)
            return; // no need to move
        lodash_1.default.forEach(directedTNN, function (node) { return dir.update(node, delta, d); });
    });
    // recursive removal
    // v' can't be anything else than a subset of directedTNN
    lodash_1.default.forEach(directedTNN, function (j) {
        var jNN = dir.filter(neighbor_nodes_1.NN(directedTNN, j, d), j);
        var jTNN = dir.filter(transfer_neighbor_nodes_1.oldTNN(directedTNN, j, d), j);
        // console.log(j, jNN, jTNN)
        lodash_1.default.forEach(jNN, function (k) {
            if (!neighbor_nodes_1.N(j, k, d))
                return; // if are not overlapping anymore stop here
            var delta = dir.delta(j, k); // how much do we need to move it ?
            if (delta === 0)
                return; // no need to move
            lodash_1.default.forEach(jTNN, function (node) { return dir.update(node, delta, d); });
        });
    });
    // console.log('fin', directedNN)
    // console.groupEnd()
}
