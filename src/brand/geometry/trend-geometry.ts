import type { Point } from '../types.ts'

export interface ArrowHead {
  tip: Point
  left: Point
  right: Point
}

export function pathFromPoints(points: Point[]): string {
  if (points.length === 0) {
    return ''
  }

  const [first, ...rest] = points
  const segments = rest.map((point) => `L${point.x} ${point.y}`).join(' ')
  return `M${first.x} ${first.y} ${segments}`
}

export function createArrowHead(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  headLength = 24,
  headWidth = 18,
): ArrowHead | null {
  const dx = x2 - x1
  const dy = y2 - y1
  const length = Math.hypot(dx, dy)

  if (length === 0) {
    return null
  }

  const unitX = dx / length
  const unitY = dy / length
  const perpendicularX = -unitY
  const perpendicularY = unitX
  const halfWidth = headWidth / 2

  // Base sits on the last trend point; tip extends along the segment.
  const base = { x: x2, y: y2 }
  const tip = {
    x: x2 + unitX * headLength,
    y: y2 + unitY * headLength,
  }

  return {
    tip,
    left: {
      x: base.x + perpendicularX * halfWidth,
      y: base.y + perpendicularY * halfWidth,
    },
    right: {
      x: base.x - perpendicularX * halfWidth,
      y: base.y - perpendicularY * halfWidth,
    },
  }
}

export function arrowPathFromLastSegment(
  points: Point[],
  headLength: number,
  headWidth: number,
): string {
  if (points.length < 2) {
    return ''
  }

  const segmentEnd = points[points.length - 1]
  const segmentStart = points[points.length - 2]
  const arrow = createArrowHead(
    segmentStart.x,
    segmentStart.y,
    segmentEnd.x,
    segmentEnd.y,
    headLength,
    headWidth,
  )

  if (!arrow) {
    return ''
  }

  return `M${arrow.tip.x} ${arrow.tip.y} L${arrow.left.x} ${arrow.left.y} L${arrow.right.x} ${arrow.right.y} Z`
}
