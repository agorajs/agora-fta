"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = __importDefault(require("lodash/filter"));
var agora_graph_1 = require("agora-graph");
/**
 * neighbor node (definition1)
 * @param i
 * @param j
 * @param d minimum horizontal distance
 *
 * @returns true if the nodes are neighbor
 */
function N(i, j, d) {
    return i !== j && agora_graph_1.overlap(i, j, d);
}
exports.N = N;
/**
 * neighbor nodes (definition2)
 * @param V
 * @param q
 * @param d minimal horizontal distance
 */
function NN(V, q, d) {
    return filter_1.default(V, function (i) { return N(i, q, d); });
}
exports.NN = NN;
