import { oldTNN, TNN } from './transfer-neighbor-nodes';
import _ from 'lodash';
const onechange = {
  nodes: [
    {
      index: 0,
      x: 15,
      y: 10,
      label: '0',
      width: _.random(10) + 5,
      height: _.random(10) + 5
    },
    {
      index: 1,
      x: 10,
      y: 20,
      label: '0',
      width: _.random(10) + 5,
      height: _.random(10) + 5
    },
    {
      index: 3,
      x: 20,
      y: 20,
      label: '0',
      width: _.random(10) + 5,
      height: _.random(10) + 5
    },
    {
      index: 4,
      x: 20,
      y: 10,
      label: '0',
      width: _.random(10) + 5,
      height: _.random(10) + 5
    },
    {
      index: 5,
      x: 15,
      y: 22,
      label: '0',
      width: _.random(10) + 5,
      height: _.random(10) + 5
    },
    {
      index: 6,
      x: 14,
      y: 23,
      label: '0',
      width: _.random(10) + 5,
      height: _.random(10) + 5
    }
  ],
  edges: []
};

test('Transfer neigbor nodes is working', () => {
  for (const tested of onechange.nodes) {
    const current = _.orderBy(TNN(onechange.nodes, tested, 0), ['index']);
    const old = _.orderBy(oldTNN(onechange.nodes, tested, 0), ['index']);

    expect(current).toEqual(old);
  }
});
