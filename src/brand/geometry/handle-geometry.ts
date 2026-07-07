import type { HandleSpec, LogoConfig, Point } from '../types.ts'

type LensCircle = Pick<LogoConfig['lens'], 'cx' | 'cy' | 'r'>

export function directionFromAngle(angleDeg: number): Point {
  const radians = (angleDeg * Math.PI) / 180
  return {
    x: Math.cos(radians),
    y: Math.sin(radians),
  }
}

export function buildAttachedHandlePath(lens: LensCircle, handle: HandleSpec): string {
  const unitDirection = directionFromAngle(handle.angleDeg)
  const start = {
    x: lens.cx + unitDirection.x * (lens.r + handle.overlapOffset),
    y: lens.cy + unitDirection.y * (lens.r + handle.overlapOffset),
  }
  const end = {
    x: start.x + unitDirection.x * handle.length,
    y: start.y + unitDirection.y * handle.length,
  }

  return `M${start.x} ${start.y} L${end.x} ${end.y}`
}
