"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
function createSeed(p) {
    return __assign({}, p, { width: 0, height: 0, label: 'seed', index: -1 });
}
exports.createSeed = createSeed;
function createVirtualNode(i, v, s) {
    var borderNodes = getBorderNodes(v);
    var borders = getBorders(borderNodes);
    var topleft = { x: borders.left, y: borders.top };
    if (s === void 0)
        if (agora_graph_1.norm(borderNodes.top, topleft) > agora_graph_1.norm(borderNodes.left, topleft)) {
            s = borderNodes.left;
        }
        else {
            s = borderNodes.top;
        }
    var box = getBox(borders);
    var corner = {
        x: borders.left,
        y: borders.top
    };
    var center = {
        // we don't care yet
        x: 0,
        y: 0
    };
    return __assign({ index: i }, center, box, { origin: center, nodes: v, label: 'virtual', seed: s });
}
exports.createVirtualNode = createVirtualNode;
function getBox(borders) {
    return {
        width: Math.abs(borders.right - borders.left),
        height: Math.abs(borders.bottom - borders.top)
    };
}
exports.getBox = getBox;
function getBorders(borderNodes) {
    return {
        top: agora_graph_1.top(borderNodes.top),
        right: agora_graph_1.right(borderNodes.right),
        bottom: agora_graph_1.bottom(borderNodes.bottom),
        left: agora_graph_1.left(borderNodes.left)
    };
}
exports.getBorders = getBorders;
function getBorderNodes(nodes) {
    return {
        top: agora_graph_1.top(nodes),
        right: agora_graph_1.right(nodes),
        bottom: agora_graph_1.bottom(nodes),
        left: agora_graph_1.left(nodes) // leftmost node
    };
}
exports.getBorderNodes = getBorderNodes;
