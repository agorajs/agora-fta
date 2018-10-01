import { Node, Point, right, left, bottom, top, Box, norm } from 'agora-graph'

export interface VirtualNode extends Node {
  nodes: Node[]
  origin: Point
  seed: Node
}

export interface SeedNode extends Node {
  width: 0
  height: 0
  label: 'seed'
  index: -1
}

interface Borders<T> {
  top: T
  right: T
  bottom: T
  left: T
}

export function createSeed(p: Point): SeedNode {
  return {
    ...p,
    width: 0,
    height: 0,
    label: 'seed',
    index: -1
  }
}

export function createVirtualNode(i: number, v: Node[], s?: Node): VirtualNode {
  const borderNodes = getBorderNodes(v)

  const borders = getBorders(borderNodes)

  const topleft: Point = { x: borders.left, y: borders.top }

  if (s === void 0)
    if (norm(borderNodes.top, topleft) > norm(borderNodes.left, topleft)) {
      s = borderNodes.left
    } else {
      s = borderNodes.top
    }

  const box: Box = getBox(borders)
  const corner: Point = {
    x: borders.left,
    y: borders.top
  }

  const center: Point = {
    // we don't care yet
    x: 0,
    y: 0
  }

  return {
    index: i,
    ...center,
    ...box,
    origin: center,
    nodes: v,
    label: 'virtual',
    seed: s
  }
}

export function getBox(borders: Borders<number>): Box {
  return {
    width: Math.abs(borders.right - borders.left),
    height: Math.abs(borders.bottom - borders.top)
  }
}

export function getBorders(borderNodes: Borders<Node>): Borders<number> {
  return {
    top: top(borderNodes.top),
    right: right(borderNodes.right),
    bottom: bottom(borderNodes.bottom),
    left: left(borderNodes.left)
  }
}

export function getBorderNodes(nodes: Node[]): Borders<Node> {
  return {
    top: top(nodes), //upmost node
    right: right(nodes), // rightmost node
    bottom: bottom(nodes), // bottomost node
    left: left(nodes) // leftmost node
  }
}
