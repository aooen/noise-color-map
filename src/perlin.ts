const { Noise } = require('noisejs')

import { width, height, size } from './consts'

const noise = new Noise(Math.random())

function getPerlinRandom(x: number, y: number, limit: number): number {
  return Math.floor(noise.perlin2(x / (width / size), y / (height / size)) * limit)
}

export function getPerlinChar(x: number, y: number) {
  return String.fromCharCode('가'.charCodeAt(0) + Math.abs(getPerlinRandom(x, y, 11172)))
}

export function getPerlinHSL(x: number, y: number, s = 50, l = 50) {
  return `hsl(${getPerlinRandom(x, y, 360)}deg ${s}% ${l}%)`
}
