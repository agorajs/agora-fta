"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var filter_1 = __importDefault(require("lodash/filter"));
var agora_graph_1 = require("agora-graph");
function U(v, q) {
    return filter_1.default(v, function (i) { return agora_graph_1.top(i) < agora_graph_1.top(q); });
}
exports.U = U;
/* // Unused
export namespace U {
  export const NN: NNFunction = (V, q, d) => U(cNN(V, q, d), q)
  export const TNN: TNNFunction = (V, q, d) => U(cTNN(V, q, d), q)
} */
