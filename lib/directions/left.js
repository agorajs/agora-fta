"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = __importDefault(require("lodash/filter"));
var agora_graph_1 = require("agora-graph");
function L(v, q) {
    return filter_1.default(v, function (i) { return agora_graph_1.left(i) < agora_graph_1.left(q); });
}
exports.L = L;
/* // Unused
export namespace L {
  export const NN: NNFunction = (V, q, d) => L(cNN(V, q, d), q)
  export const TNN: TNNFunction = (V, q, d) => L(cTNN(V, q, d), q)
} */
