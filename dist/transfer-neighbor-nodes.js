"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var neighbor_nodes_1 = require("./neighbor-nodes");
/**
 * Transfer neighbor nodes (definition3)
 * @param V
 * @param q
 * @param d
 */
function TNN(V, q, d) {
    var accumulator = {};
    var array = [];
    accumulator[q.index] = true;
    rTNN(V, neighbor_nodes_1.NN(V, q, d), accumulator, array, d);
    return array;
}
exports.TNN = TNN;
function rTNN(V, NN_q, check, array, d) {
    lodash_1.default.forEach(NN_q, function (j) {
        if (check[j.index] !== true) {
            check[j.index] = true;
            array.push(j);
            rTNN(V, neighbor_nodes_1.NN(V, j, d), check, array, d);
        }
    });
}
