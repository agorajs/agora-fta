"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var neighbor_nodes_1 = require("./neighbor-nodes");
/**
 * flat Transfer neighbor nodes (definition3)
 * @param V
 * @param q
 * @param d
 */
function TNN(V, q, d) {
    var accumulator = {};
    var array = [];
    accumulator[q.index] = true;
    var toVisit = [q];
    var node;
    while ((node = toVisit.pop())) {
        for (var _i = 0, _a = neighbor_nodes_1.NN(V, node, d); _i < _a.length; _i++) {
            var neighbor = _a[_i];
            if (accumulator[neighbor.index] !== true) {
                accumulator[neighbor.index] = true;
                toVisit.push(neighbor);
                array.push(neighbor);
            }
        }
    }
    return array;
}
exports.TNN = TNN;
/**
 * Transfer neighbor nodes (definition3)
 * @param V
 * @param q
 * @param d
 * @deprecated
 */
function oldTNN(V, q, d) {
    var accumulator = {};
    var array = [];
    accumulator[q.index] = true;
    rTNN(V, neighbor_nodes_1.NN(V, q, d), accumulator, array, d);
    return array;
}
exports.oldTNN = oldTNN;
/**
 *
 * @param V
 * @param NN_q
 * @param check
 * @param array
 * @param d
 * @deprecated
 */
function rTNN(V, NN_q, check, array, d) {
    lodash_1.default.forEach(NN_q, function (j) {
        if (check[j.index] !== true) {
            check[j.index] = true;
            array.push(j);
            rTNN(V, neighbor_nodes_1.NN(V, j, d), check, array, d);
        }
    });
}
