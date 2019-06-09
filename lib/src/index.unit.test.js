"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var NaN_1 = __importDefault(require("../data/NaN"));
var nomove = {
    nodes: [
        {
            index: 0,
            x: 15,
            y: 10,
            label: '0',
            width: 10,
            height: 10
        },
        {
            index: 1,
            x: 10,
            y: 20,
            label: '0',
            width: 10,
            height: 10
        },
        {
            index: 3,
            x: 20,
            y: 20,
            label: '0',
            width: 10,
            height: 10
        }
    ],
    edges: []
};
var move = {
    nodes: [
        {
            index: 0,
            x: 10,
            y: 10,
            label: '0',
            width: 15,
            height: 15
        },
        {
            index: 1,
            x: 10,
            y: 20,
            label: '0',
            width: 15,
            height: 15
        },
        {
            index: 3,
            x: 20,
            y: 20,
            label: '0',
            width: 15,
            height: 15
        }
    ],
    edges: []
};
test('Agora FTA', function () {
    expect(_1.forceTransfer(nomove).graph).toEqual(nomove);
    expect(_1.forceTransfer(move).graph).toEqual({
        edges: [],
        nodes: [
            {
                height: 15,
                index: 0,
                label: '0',
                width: 15,
                x: 10,
                y: 10
            },
            {
                height: 15,
                index: 1,
                label: '0',
                width: 15,
                x: 15,
                y: 25
            },
            {
                height: 15,
                index: 3,
                label: '0',
                width: 15,
                x: 30,
                y: 25
            }
        ]
    });
});
test('agora-FTA Nani', function () {
    var result = _1.forceTransfer(NaN_1.default).graph;
});
