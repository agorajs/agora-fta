"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = __importDefault(require("lodash/filter"));
var agora_graph_1 = require("agora-graph");
/**
 * neighbor node (definition1)
 *
 * @returns true if the nodes are overlapping and i !== j
 */
function N(i, j, padding) {
    return i !== j && agora_graph_1.overlap(i, j, padding);
}
exports.N = N;
/**
 * neighbor nodes (definition2)
 */
function NN(V, q, padding) {
    return filter_1.default(V, function (i) { return N(i, q, padding); });
}
exports.NN = NN;
