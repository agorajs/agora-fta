import _ from 'lodash';
import { forceTransfer } from '.';
import NaNi from '../data/NaN';
import { Node, left, overlap, right, delta, norm } from 'agora-graph';

const nomove = {
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

const move = {
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

test('Agora FTA', () => {
  expect(forceTransfer(nomove).graph).toEqual(nomove);

  expect(forceTransfer(move).graph).toEqual({
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

test('agora-FTA Nani', function() {
  const result = forceTransfer(NaNi).graph;
});
