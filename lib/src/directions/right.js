"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = __importDefault(require("lodash/filter"));
var agora_graph_1 = require("agora-graph");
/**
 * Returns a subset of v where each node is at the right of q
 * @param v set of nodes
 * @param q seed node
 */
function R(v, q) {
    return filter_1.default(v, function (i) { return agora_graph_1.left(i) >= agora_graph_1.left(q); });
}
exports.R = R;
/* // Unused
export namespace R {
  export const NN: NNFunction = (V, q, d) => R(cNN(V, q, d), q)
  export const TNN: TNNFunction = (V, q, d) => R(cTNN(V, q, d), q)
} */
