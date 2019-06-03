"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var transfer_neighbor_nodes_1 = require("./transfer-neighbor-nodes");
var lodash_1 = __importDefault(require("lodash"));
var onechange = {
    nodes: [
        {
            index: 0,
            x: 15,
            y: 10,
            label: '0',
            width: lodash_1.default.random(10) + 5,
            height: lodash_1.default.random(10) + 5
        },
        {
            index: 1,
            x: 10,
            y: 20,
            label: '0',
            width: lodash_1.default.random(10) + 5,
            height: lodash_1.default.random(10) + 5
        },
        {
            index: 3,
            x: 20,
            y: 20,
            label: '0',
            width: lodash_1.default.random(10) + 5,
            height: lodash_1.default.random(10) + 5
        },
        {
            index: 4,
            x: 20,
            y: 10,
            label: '0',
            width: lodash_1.default.random(10) + 5,
            height: lodash_1.default.random(10) + 5
        },
        {
            index: 5,
            x: 15,
            y: 22,
            label: '0',
            width: lodash_1.default.random(10) + 5,
            height: lodash_1.default.random(10) + 5
        },
        {
            index: 6,
            x: 14,
            y: 23,
            label: '0',
            width: lodash_1.default.random(10) + 5,
            height: lodash_1.default.random(10) + 5
        }
    ],
    edges: []
};
test('Transfer neigbor nodes is working', function () {
    for (var _i = 0, _a = onechange.nodes; _i < _a.length; _i++) {
        var tested = _a[_i];
        var current = lodash_1.default.orderBy(transfer_neighbor_nodes_1.TNN(onechange.nodes, tested, 0), ['index']);
        var old = lodash_1.default.orderBy(transfer_neighbor_nodes_1.oldTNN(onechange.nodes, tested, 0), ['index']);
        expect(current).toEqual(old);
    }
});
